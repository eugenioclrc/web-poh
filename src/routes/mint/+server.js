import { error, json } from '@sveltejs/kit';
import ethers from 'ethers';
import pinataSDK from '@pinata/sdk';

import { env } from '$env/dynamic/private';
import { PUBLIC_CHALLENGE_MANAGER, PUBLIC_PROOFOFHACKERNFT, PUBLIC_TESTNET_RPC } from '$env/static/public';


const abiManager = [
  "function userChallengeBreak(address user, address _challengeFactory) public view returns(bool)"
]

const challengeFactoryAbi = [
  "function name() external view virtual returns (string memory)",
  "function description() external view virtual returns (string memory)",
  "function image() external view virtual returns (string memory)",
  "function path() external view virtual returns (string memory)",
];

const challengeData = {}


/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const challenge = url.searchParams.get('challenge');
  const player = url.searchParams.get('player');
 
  if (!player || !challenge || !ethers.utils.isAddress(player) || !ethers.utils.isAddress(challenge)) {
    throw error(400, 'params errors');
  }
 
  // todo check player has end challenge
  const provider = new ethers.providers.JsonRpcProvider(PUBLIC_TESTNET_RPC);
  
  const signer = new ethers.Wallet(env.DEPLOYMENT_MINTERPK, provider);

  const factory = new ethers.Contract(PUBLIC_CHALLENGE_MANAGER, abiManager, provider);
  const solved = await factory.userChallengeBreak(player, challenge);
  if (!solved) {
    throw error(400, 'not solved');
  }

  if (!challengeData[challenge]) {
    const factoryChallenge = new ethers.Contract(challenge, challengeFactoryAbi, provider);
    const NFTmetadata = {};
    NFTmetadata.name = await factoryChallenge.name();
    NFTmetadata.description = await factoryChallenge.description();
    NFTmetadata.image = await factoryChallenge.image();
    NFTmetadata.external_url = 'https://www.ctfprotocol.com/';
    try {
      NFTmetadata.external_url += await factoryChallenge.path();
    } catch(err) {
      // empty
    } 

    const options = {
        pinataMetadata: {name: challenge },
        pinataOptions: { cidVersion: 0 }
    };
    const pinata = pinataSDK(env.PINATA_KEY, env.PINATA_SECRET);
    const result = await pinata.pinJSONToIPFS(NFTmetadata, options);
    if (!result.IpfsHash) {
      throw error(400, 'ipfs error');
    }
    challengeData[challenge] = `ipfs://${result.IpfsHash}`;
  }
  

  const hashed = ethers.utils.solidityKeccak256(
    ['address', 'address', 'address', 'string'],
    [
      PUBLIC_PROOFOFHACKERNFT,
      challenge,
      player,
      challengeData[challenge]
    ]
  );

  const signature = await signer.signMessage(ethers.utils.arrayify(hashed))

	return json({
    keccak: hashed,
		signature,
		nftUrl: challengeData[challenge]
	});
}

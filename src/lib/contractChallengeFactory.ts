import { get } from "svelte/store";
import { Contract } from "@ethersproject/contracts";
import { PUBLIC_CHALLENGE_MANAGER, PUBLIC_TESTNET_CHAINID } from '$env/static/public';
import { Contract as MContract } from 'ethers-multicall';

import { chainId, signer, wallet } from "./eth";

let contract: any;
let mcontract: any;

const abiFactory = [
    "function deployChallenge(address) external payable",
    "function breakChallenge(address) external",
    "function setUsername(bytes32 _name) external",
    "function usernames(address) external view returns(bytes32)",
    "function getChallengesInstances(address,address) external view returns(address[] memory)",
    "function checkChallenge(address user, address challengeFactory) public view returns(bool)",
    "function userChallengeBreak(address user, address challengeFactory) public view returns(bool)",
    "function challengeBreaks(address challengeFactory) public view returns(uint256)",
    "event ChallengeBreak(address indexed challenge, address indexed user, uint256 breakTimes)"
];

export default async function getContract() {
  const $signer = await get(signer);
  const $chainId = await get(chainId);

  if ($chainId !== Number(PUBLIC_TESTNET_CHAINID)) {
    throw new Error(`No contracts address for ${$chainId}`);
  }
  if (contract) {
    return {
      contract: contract.connect($signer),
      mcontract
    };
  }

  if (!PUBLIC_CHALLENGE_MANAGER) {
    throw new Error(`No contracts address for ${$chainId}`);
  }

  contract = new Contract(PUBLIC_CHALLENGE_MANAGER, abiFactory);
  mcontract = new MContract(PUBLIC_CHALLENGE_MANAGER, abiFactory);
  return {
    contract: contract.connect($signer),
    mcontract
  };
}
<!-- Foo.svelte -->
<script lang="ts">
import {chainId, wallet, login, signer, provider, changeNetwork} from '$lib/eth';
import getContract from '$lib/contractChallengeFactory';
import { PUBLIC_TESTNET_CHAINID, PUBLIC_MULTICALL, PUBLIC_TESTNET_RPC, PUBLIC_CHALLENGE_MANAGER, PUBLIC_MAINNET_RPC, PUBLIC_PROOFOFHACKERNFT } from '$env/static/public';
import { onMount } from 'svelte';
import { Contract as MContract, Provider as MProvider, Provider, setMulticallAddress } from 'ethers-multicall';
import {JsonRpcProvider} from "@ethersproject/providers";
import confetti from 'canvas-confetti';
import { BigNumber, Contract } from 'ethers';

export let challengeAddress;
let challengeManager;

let challenge = {
  instances: [],
  instancesNames: [],
  break: false,
  complete: false,
  value: 0,
  playersPass: 0,
  minted: true
}

let notSolved = true;

export let nameChallenge = ''
export let challengeImage = "";

let twitterLink = "";

onMount(async () => {
  if(!challengeAddress) {
    return;
  }
  twitterLink = "https://twitter.com/intent/tweet?text="+encodeURIComponent("I have just solve Challenge '"+nameChallenge+"' on "+String(window.location));

  const provider = new JsonRpcProvider(PUBLIC_TESTNET_RPC);
  const _c = new Contract(PUBLIC_CHALLENGE_MANAGER, [
    "function challengeBreaks(address challengeFactory) public view returns(uint256)",
  ], provider);

  challenge.playersPass = await _c.challengeBreaks(challengeAddress);
  challenge.playersPass = Number(challenge.playersPass);
});

const multicallAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
let ethcallProvider;

async function checkMint() {
  if (!$wallet) {
    return;
  }
  const provider = new JsonRpcProvider(PUBLIC_MAINNET_RPC);
  const _c = new Contract(PUBLIC_PROOFOFHACKERNFT, [
    "function balanceOf(address account, uint256 id) public view returns(uint256)",
  ], provider);
  const _balance = await _c.balanceOf($wallet, BigNumber.from(challengeAddress));
  challenge.minted = Number(_balance) > 0;
}

async function init() {
  checkMint();
  if (!ethcallProvider) {
    ethcallProvider = new MProvider($provider);
    if (PUBLIC_MULTICALL) {
      setMulticallAddress(Number(PUBLIC_TESTNET_CHAINID), PUBLIC_MULTICALL);
    }
    await ethcallProvider.init();
  }
  
  
  const managerContracts = await getContract();
  const managerMcall = managerContracts.mcontract;
  challengeManager = managerContracts.contract;
  const abiFactory = [
    "function deployValue() external view returns (uint256)",
    // @notice return name of the contract challenges
    "function contractNames() external view returns (string[] memory)"
  ];
  let challengeContract = new MContract(challengeAddress, abiFactory);
  
  [
    challenge.value,
    challenge.instancesNames,
    challenge.instances,
    challenge.complete,
    challenge.break,
    challenge.playersPass
  ] = await ethcallProvider.all([
    challengeContract.deployValue(),
    challengeContract.contractNames(),
    managerMcall.getChallengesInstances($wallet, challengeAddress),
    managerMcall.checkChallenge($wallet, challengeAddress),
    managerMcall.userChallengeBreak($wallet, challengeAddress),
    managerMcall.challengeBreaks(challengeAddress)
  ]);

  challenge.playersPass = Number(challenge.playersPass);
console.log(challenge);
  challenge = {...challenge};
}

let deploying = false;
async function deploy() {
  try {
    if (deploying) return;
    deploying = true;
    const tx = await challengeManager.deployChallenge(challengeAddress, {value: challenge.value});
    await tx.wait(1);
    await init();
  } catch(err){

  }
  deploying = false;
}

let checking = false;
async function checkSubmitChallenge() {
  if (!challenge.complete) {
    challenge.complete = await challengeManager.checkChallenge($wallet, challengeAddress);
    notSolved = !challenge.complete;
    challenge = {...challenge}
  }
  if (challenge.complete) {
    checking = true;
    try {
      const tx = await challengeManager.breakChallenge(challengeAddress);
      await tx.wait(1);
      await init();
      if (challenge.break) {
        confetti();
        /*
        if (solved && !showModal) {
          showModal = true;
          setTimeout(() => {
            modal = true;
          }, 700);
        }
        */
      }
    } catch(err) {
      console.error(err);
    }
    checking = false;
  }
    // if (solved && !showModal) {
    //   showModal = true;
    //   setTimeout(() => {
    //     modal = true;
    //   }, 700);
    // }
  
}

async function checkChallenge() {
  notSolved = false;
  challenge.complete = await challengeManager.checkChallenge($wallet, challengeAddress);
  notSolved = !challenge.complete;
  

  if (challenge.break) {
    confetti();
    /*
    if (solved && !showModal) {
      showModal = true;
      setTimeout(() => {
        modal = true;
      }, 700);
    }
    */
  }
}

let minting = false;

async function mintNFT() {
  minting = true;
  try {
    const _data = await (await fetch(`/mint?player=${$wallet}&challenge=${challengeAddress}`)).json()
    
    const nft = new Contract(PUBLIC_PROOFOFHACKERNFT, ["function mint(address player, address challenge, string memory ipfs, bytes calldata signature) external"], $signer);
    const tx = await nft.mint(
            $wallet, challengeAddress, _data.nftUrl, _data.signature
        );
    await tx.wait(1);
  } catch(err) {}
  await checkMint();
  minting = false;
}


$: if($wallet && $chainId == Number(PUBLIC_TESTNET_CHAINID) && challengeAddress) {
  init();
}


</script>

<div class="max-w-8xl mx-auto pt-6 px-4 sm:px-6 md:px-8 pb-6">

  <div class="lg:w-[920px] mx-auto pb-4 card shadow-2xl bg-base-100">
    {#if challengeImage}
      <figure class="max-h-48 overflow-hidden">
        <img src={challengeImage} class="w-full" alt={nameChallenge} /></figure>
    {/if}
  
    <div class="px-6 py-5 flex-auto prose w-full" style="max-width: 100%">
      <h1 class="text-4xl font-bold mb-4">
        {#if challenge.break}
          <span class="text-green-500">✓</span>
        {/if}
        <span class:line-through={challenge.break}>
          <slot name="challengeTitle" />
        </span>
      </h1>
      <blockquote>
        <p class="text-xs">
          This challenge 
          {#if !challenge.playersPass}
          has never been pass!!!
          {:else if challenge.playersPass == 1}
          has been pass only once!
          {:else}
          has been pass by {challenge.playersPass} hackers!
          {/if}
        </p>
      </blockquote>
    
    
      <slot name="content" />
    </div>
    {#if challenge.instances.length > 0}
      <hr />
      <div class="font-mono text-2xl py-6">
        {#each challenge.instancesNames as _name, i}
          Instance <b>{_name}</b> deployed at:
          <a href="https://goerli.etherscan.io/address/{challenge.instances[i]}" class="link-primary" target="_blank" rel="noreferrer">{challenge.instances[i]}</a><br />
        {/each}
      </div>
    {/if}

    <hr />
    <div class="form-control mt-6 w-1/2 mx-auto">
      {#if !challengeAddress}
        <div class="alert alert-warning shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Sorry, this challenge has not been published yet.</span>
          </div>
        </div>
      {/if}
      {#if !$wallet}
        <button class="btn btn-primary" on:click={login}>Connect wallet</button>
      {:else if $chainId != Number(PUBLIC_TESTNET_CHAINID)}
        <button class="btn btn-primary" on:click={() => {changeNetwork(PUBLIC_TESTNET_CHAINID)}}>Connect to goerli</button>
      {:else if challengeAddress}
        {#if challenge.instances.length == 0}
          <button class="btn btn-primary" class:cursor-wait={deploying}  disabled={deploying} on:click={deploy}>Deploy</button>
        {:else}
          {#if !challenge.minted && challenge.break}
            <button
              class:cursor-wait={minting} disabled={minting}
              on:click={mintNFT}
              class="btn text-white no-underline text-xl btn-secondary my-2" target="_blank" rel="noreferrer">Mint NFT badge</button>
          {/if}

          {#if challenge.break && challenge.complete}
            <a
              href={twitterLink}
              class="btn text-gray-800 no-underline text-xl btn-success my-2" target="_blank" rel="noreferrer">Share on twitter</a>
          {/if}
          
          {#if !challenge.break}
            <button on:click={checkSubmitChallenge}
            class:cursor-wait={checking}  disabled={checking}
            class:shake={notSolved} class="btn" class:btn-secondary={!challenge.break} class:btn-link={challenge.break}>Check</button>
          {:else}
            <button on:click={checkChallenge} class:shake={notSolved} class="btn" class:btn-secondary={!challenge.complete} class:btn-link={challenge.complete}>Check</button>
          {/if}
          <button class="btn btn-warning mt-2" class:cursor-wait={deploying}  disabled={deploying} on:click={deploy}>Reset</button> 
        {/if}        
      {/if}
      <slot name="bottomlinks"></slot>
    </div>
    
      
  </div>

  <slot name="code" />
</div>
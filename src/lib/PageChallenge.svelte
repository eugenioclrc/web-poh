<!-- Foo.svelte -->
<script lang="ts">
import {chainId, wallet, login, signer, provider, changeNetwork} from '$lib/eth';
import getContract from '$lib/contractChallengeFactory';
import { PUBLIC_TESTNET_CHAINID } from '$env/static/public';
import { onMount } from 'svelte';
import { Contract as MContract, Provider as MProvider, setMulticallAddress } from 'ethers-multicall';

import confetti from 'canvas-confetti';

export let challengeAddress;
let challengeManager;

let challenge = {
  instances: [],
  instancesNames: [],
  break: false,
  complete: false,
  value: 0,
  playersPass: 0,
}

let notSolved = true;

export let nameChallenge = ''

let twitterLink = "";

onMount(() => {
  twitterLink = "https://twitter.com/intent/tweet?text="+encodeURIComponent("I have just solve Challenge '"+nameChallenge+"' on "+String(window.location));
});

const multicallAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
let ethcallProvider;

async function init() {
  if (!ethcallProvider) {
    ethcallProvider = new MProvider($provider);
    setMulticallAddress(31337, multicallAddress);
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



$: if($wallet && $chainId == PUBLIC_TESTNET_CHAINID) {
  init();
}


</script>

<div style="background: #ABB8C3" class="max-w-8xl mx-auto pt-6 px-4 sm:px-6 md:px-8">

  <div class="lg:w-[920px] mx-auto py-4 px-4 card shadow-2xl bg-base-100">

    <div class="px-4 py-5 flex-auto prose">
      <!--<div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-sky-200">
            🏴‍☠️  
          </div> -->
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
      {#if !$wallet}
        <button class="btn btn-primary" on:click={login}>Connect wallet</button>
      {:else if $chainId != Number(PUBLIC_TESTNET_CHAINID)}
        <button class="btn btn-primary" on:click={() => {changeNetwork(PUBLIC_TESTNET_CHAINID)}}>Connect to goerli</button>
      {:else}
        {#if challenge.instances.length == 0}
          <button class="btn btn-primary" class:cursor-wait={deploying}  disabled={deploying} on:click={deploy}>Deploy</button>
        {:else}
          <!--<div class="form-control mt-6 w-1/2 mx-auto"><button class="btn btn-primary">Deploy</button> <a href="/play" class="btn btn-outline mt-2">All challenges</a></div>-->
          <!--
          -->
          {#if challenge.break && challenge.complete}
            <a
              href={twitterLink}
              class="btn text-white no-underline text-xl btn-secondary my-2" target="_blank">Share on twitter</a>
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
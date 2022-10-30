<script>
import { wallet } from '$lib/eth.js';

import Challenges from "$lib/levels-ethernaut";




</script>
<div class="container w-full mx-auto md:py-14 pb-10">
  <div class="card max-w-lg lg:max-w-2xl mx-auto shadow-2xl bg-base-100 rounded-t-none md:rounded-lg">
    <figure class="max-h-60 overflow-hidden"><img src="/ethernaut-cover.jpg" alt="Ethernaut" /></figure>
    <div class="card-body">
      <h2 class="card-title text-4xl flex flex-wrap">
        The Ethernaut
        <div class="badge badge-secondary badge-outline text-xs">As seen in OZ</div>
      </h2>
      <span class="text-sm">
        A Web3based wargame inspired by overthewire, to be played in the Ethereum Virtual Machine. Each level is a smart contract that needs to be 'hacked'.<br />
        The game acts both as a tool for those interested in learning ethereum, and as a way to catalogue historical 
        hacks as levels. There can be an infinite number of levels and the game does not require to be played in any 
        particular order. Source <a href="https://github.com/OpenZeppelin/ethernaut" class="link-primary" target="_blank" rel="noreferrer">OpenZeppelin/ethernaut</a>
        
      </span>

      <!--
      {#each Challenges as c,i}
        <div class="form-control mt-6">
          <div class="tooltip" data-tip={c.tip}>
            <a href={c.url} class="btn btn-primary" class:btn-link={c.solved}>
              {#if c.solved}
                <span class="text-green-500">✓</span>
              {/if}
              <span class:line-through={c.solved}>{c.name}</span>
            </a>
          </div>
        </div>
      {/each}     
      -->
    </div>
    <ul class="menu bg-base-300 w-full rounded-box border-t border-gray-400 rounded-t-none text-left">
      {#each $Challenges as c,i}
        <li class="hover-bordered" class:rounded-none={i == 0} class:border-t={i > 0} border-t-gray-500={i > 0}>
          <a href={c.url} class="flex flex-col flex-grow border-t-gray-500" 
          style={i > 0 ? 'border-bottom: 1px solid #666':''}>
            <div class="w-full text-xl flex justify-between">
              <div>{c.name}</div>
              {#if c.count === 0}
                <div class="badge badge-secondary badge-outline">Never hacked!!</div>
              {:else if c.count === 1}
                <div class="badge badge-outline badge-primary">Hacked only once!</div>
              {:else if c.count > 1}
                <div class="badge badge-outline">Hacked {c.count} times</div>
              {/if}
            </div>
            <div class="w-full">{c.desc}</div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
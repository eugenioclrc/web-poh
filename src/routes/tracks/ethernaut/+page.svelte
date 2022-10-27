<script>
import { wallet } from '$lib/eth.js';

let Challenges = [
  {
    tip: 'Fallback',
    name: "Level 0 - Fallback",
    desc: "Challenge made by Alejandro Santander",
    url: '/tracks/ethernaut/c0-fallback'
  },
  {
    tip: 'Fal1out',
    name: "Level 1 - Fallout",
    desc: "Challenge made by Alejandro Santander",
    url: '/tracks/ethernaut/c1-fallout'
  },
  {
    tip: 'CoinFlip',
    name: "Level 2 - CoinFlip",
    desc: "CoinFlip, challenge made by Kyle Riley",
    url: '/tracks/ethernaut/c2-coinflip'
  },  
];
</script>
<div class="container w-full mx-auto md:py-14">
  <div class="card max-w-lg lg:max-w-2xl mx-auto shadow-2xl bg-base-100">
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
      {#each Challenges as c,i}
        <li class="hover-bordered" class:rounded-none={i == 0} class:border-t={i > 0} border-t-gray-500={i > 0}>
          <a href={c.url} class="flex flex-col flex-grow">
            <div class="w-full text-xl">{c.name}</div>
            <div class="w-full">{c.desc}</div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
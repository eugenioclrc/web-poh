<script>
import { wallet } from '$lib/eth.js';

let Challenges = [
  // {url: '/tracks/ethernaut/c0-fallback'},
  // {url: '/tracks/ethernaut/c0-fallback'},
  // {url: '/tracks/ethernaut/c0-fallback'},
  // {url: '/tracks/ethernaut/c0-fallback'}
];
</script>
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">EKO Challenges</h1>
            {#if $wallet}
              <p class="py-6">Welcome 
                <b>{$wallet.slice(0,6)}...{$wallet.slice(-6)}</b>
                <br />
                <span class="underline">Please pick your challenge:</span>
              </p>
            {/if}
          </div>
          TODO
          {#each Challenges as c, i}
            <div class="form-control mt-6">
              <div class="tooltip" data-tip={c.tip}>
                <a href={c.url} class="btn btn-primary" class:btn-link={c.solved}>
                  {#if c.solved}
                    <span class="text-green-500">✓</span>
                  {/if}
                  <span class:line-through={c.solved}>Challenge {i}</span>
                </a>
              </div>
            </div>
          {/each}
          
        </div>
      </div>
  </div>
</div>
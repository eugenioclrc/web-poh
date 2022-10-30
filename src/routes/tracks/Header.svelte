<script>
  import { login, wallet, provider, chainId, changeNetwork, disconnect } from '$lib/eth.js';
  import {utils} from 'ethers';
  import { PUBLIC_TESTNET_CHAINID } from '$env/static/public';

  let balance = new Promise(() => {});
  let timeout;
  $: if($wallet) {

    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      balance = $provider.getBalance($wallet).catch();
    }, 1000);
  }
</script>
<div class="navbar bg-slate-900">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost text-white lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/tracks/ethernaut">Ethernaut</a></li>
          <li><a href="/tracks/eko2022">Eko</a></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case text-white text-xl">CTF Protocol</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0 text-white">
        <li><a href="/tracks/ethernaut">Ethernaut</a></li>
        <li><a href="/tracks/eko2022">Eko</a></li>
      </ul>
    </div>
    <div class="navbar-end">
        {#if !$wallet}
            <button on:click={login} class="btn btn-primary">Connect</button>
        {:else if $chainId == Number(PUBLIC_TESTNET_CHAINID)}
            {#await balance}
                <button class="btn btn-square loading -mr-4"></button>
            {:then value}
                <div class="btn no-animation cursor-default -mr-4">
                    {Number(utils.formatEther(value)).toFixed(2)} ETH
                </div>
            {/await}
            <div class="dropdown dropdown-hover dropdown-end z-10">
                <label tabindex="0" class="btn btn-outline m-1 bg-white">{$wallet.slice(0,6)}...{$wallet.slice(-4)}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button on:click={disconnect}>Disconnect</button></li>
                </ul>
            </div>
        {:else}
            <button on:click={() => changeNetwork(PUBLIC_TESTNET_CHAINID)} tabindex="0" class="btn-sm btn btn-outline m-1 text-xs bg-red-200">WRONG NETWORK</button>      
        {/if}
    </div>
</div>
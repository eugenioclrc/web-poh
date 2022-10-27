<script>
import { wallet } from '$lib/eth.js';

let Challenges = [
];
</script>
<div class="container w-full mx-auto md:py-14">
  <div class="card max-w-lg lg:max-w-2xl mx-auto shadow-2xl bg-base-100">
    <figure class="max-h-60 overflow-hidden"><img src="/eko2022-cover.jpg" alt="Ethernaut" /></figure>
    <div class="card-body">
      <h2 class="card-title text-4xl flex flex-wrap">
        EKO2022 Enter the metaverse
        <div class="badge badge-secondary badge-outline text-xs">NEW</div>
      </h2>
      <span class="text-sm">
        A collection of challenges made for the  <a href="https://www.ekoparty.org/" target="_blank" rel="noreferrer">EKO party</a> submited by some gigabrains hackers;
        @bronicle, @adriro, @nicobevi.eth, @tnth, @matta and 0x4non...<br />
        <b>Challenges will be posted the 02/11/2022.</b>
      </span>
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
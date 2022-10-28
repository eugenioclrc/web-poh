<script>
import { wallet } from '$lib/eth.js';

let Challenges = [
  {
    tip: 'The Lost Kitty',
    name: "The Lost Kitty",
    desc: "Lucas is a scientist who lives in a house with 2^256 rooms. His cat is lost in the house, each time you can you find it?",
    url: '/tracks/eko2022/hidden-kittycat',
    address: "",
    count: null,
  },
  {
    tip: 'Hack the Mothership',
    name: "Hack the Mothership",
    desc: "A big alien float is near the Earth! You and a small group of scientist have been working on a global counteroffensive agains the invader. Hack the Mothership, save the earth",
    url: '/tracks/eko2022/hack-the-mothership',
    address: "",
    count: null,
  },
  {
    tip: 'Trickster',
    name: "Trickster",
    desc: "We have spot a honeypot... Can you managed to see the real jackpot.",
    url: '/tracks/eko2022/trickster',
    address: "",
    count: null,
  },
  {
    tip: 'RootMe',
    name: "RootMe",
    desc: "Can you trick the machine to get root access?",
    url: '/tracks/eko2022/rootme',
    address: "",
    count: null,
  },
  {
    tip: 'Kioskito',
    name: "Kioskito",
    desc: "Everyone has  the World Cup trading cards and you only have one buck to buy some trading cards. :(",
    url: '/tracks/eko2022/kioskito',
    address: "",
    count: null,
  },
  {
    tip: 'Smart Horrorcrux',
    name: "Smart Horrorcrux",
    desc: "Some security researchers have recently found an octave Horrocrux, it seems that Voldermort has link to a smart contract, can you destroy it?",
    url: '/tracks/eko2022/smart-horrorcrux',
    address: "",
    count: null,
  },
  {
    tip: 'The Golden Ticket',
    name: "The Golden Ticket",
    desc: "Getting a ticket for the EKO party is tough, you will have to wait for many years and be really lucky",
    url: '/tracks/eko2022/the-golden-ticket',
    address: "",
    count: null,
  }
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
          <a href="#" class="flex flex-col flex-grow">
          <!-- <a href={c.url} class="flex flex-col flex-grow"></a>-->
            <div class="w-full text-xl">{c.name}</div>
            <div class="w-full">{c.desc}</div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
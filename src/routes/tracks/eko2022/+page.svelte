<script>
  import ekoLevels from "$lib/levels-eko";

  import getClient from "$lib/graphql";
  import { onMount } from "svelte";
  import * as ethers from "ethers"
  import NameOrAddress from "$lib/NameOrAddress.svelte";

  let leatherBoard = [];

  onMount(async () => {  
    getClient().query(`
      query {
        challenges(
          where: {id_in: ${JSON.stringify($ekoLevels.map(e => e.address.toLocaleLowerCase()))}}
        ) {
          id
          count
          attemps
        }
      }`).toPromise().then(({ data: {challenges}}) => {
        $ekoLevels.forEach((l,i) => {
          $ekoLevels[i].count = 0;
          $ekoLevels[i].pos = i;
        });
        challenges.forEach(c => {
          let id = $ekoLevels.findIndex(l => l.address.toLocaleLowerCase() == c.id);
          if(id > -1) {
            $ekoLevels[id].count = Number(c.count);
            $ekoLevels[id].attemps = Number(c.attemps);
          }
        });
      });

    const { data: {challengeSolveds}} = await getClient().query(`
    query {
      challengeSolveds(first: 500,  where: { challenge_in: ${JSON.stringify($ekoLevels.map(e => e.address.toLocaleLowerCase()))}}) {
        id
        challenge {
          id
          count
        }
        player {
          id
          totalHacks
          username
        }
      }
    }`).toPromise();
    const players = {}
    challengeSolveds.forEach(c => {
      players[c.player.id] = players[c.player.id] || {
        address: c.player.id,
        username: c.player.username, 
        totalHacks: c.player.totalHacks,
        score: 0,
      };

      players[c.player.id].score += Math.floor(1e18 / c.challenge.count);
    });

    leatherBoard = (Object.values(players)).sort((a, b) => b.score - a.score);

  })

  $: levels = [...$ekoLevels].sort((a, b) => (a.count|| 0) - (b.count|| 0));
</script>

<svelte:head>
  <title>EKO Blockchain CTF - Enter the metaverse</title>
</svelte:head>

<div class="container w-full mx-auto md:py-14 md:pb-10 block xl:flex">
  <div class="card rounded-none md:rounded-lg w-full md:w-auto lg:max-w-3xl mx-auto shadow-2xl bg-base-100">
    <figure class="max-h-60 overflow-hidden"><img src="/eko2022-cover.jpg" alt="Ethernaut" /></figure>
    <div class="card-body">
      <h2 class="card-title text-4xl flex flex-wrap">
        EKO2022 Enter the metaverse
        <div class="badge badge-secondary badge-outline text-xs">NEW</div>
      </h2>
      <span class="text-sm">
        A collection of challenges made for the  <a href="https://www.ekoparty.org/" class="link-hover link-neutral" target="_blank" rel="noreferrer">EKOparty</a> 2022 submited by some gigabrain hackers;
        <a href="https://twitter.com/Cryptonicle1" target="_blank" rel="noreferrer" class="link-hover link-neutral">@Br0niclΞ</a>,
        <a href="https://twitter.com/nicobevi_eth" target="_blank" rel="noreferrer" class="link-hover link-neutral">@nicobevi.eth</a>,
        <a href="https://twitter.com/mattaereal" target="_blank" rel="noreferrer" class="link-hover link-neutral">@matta</a>,
        <a href="https://twitter.com/tinchoabbate" target="_blank" rel="noreferrer" class="link-hover link-neutral">@tinchoabbate</a>,
        <a href="https://twitter.com/adrianromero" target="_blank" rel="noreferrer" class="link-hover link-neutral">@adriro</a>,
        <a href="https://twitter.com/AugustitoQ" target="_blank" rel="noreferrer" class="link-hover link-neutral">@bengalaQ</a>,
        <a href="https://linktr.ee/chiin.eth" target="_blank" rel="noreferrer" class="link-hover link-neutral">@chiin</a>,
        <a href="https://twitter.com/victor93389091" target="_blank" rel="noreferrer" class="link-hover link-neutral">@Rotciv</a>,
        <a href="https://twitter.com/bahurum" target="_blank" rel="noreferrer" class="link-hover link-neutral">@Bahurum</a>
        and 
        <a href="https://twitter.com/eugenioclrc" target="_blank" rel="noreferrer" class="link-hover link-neutral">@0x4non</a>...<br />
        Especial thanks to <a href="https://twitter.com/patrickd_de" target="_blank" rel="noreferrer" class="link-hover link-neutral">@patrickd</a> to give us a quick review&feedback of the contracts :D
      </span>
    </div>
    <ul class="menu bg-base-300 w-full border-t rounded-t-none text-left">
      {#each levels as c,i}
        <li class="hover-bordered last:border-b-red-900" class:rounded-none={i == 0}>
          <a href={c.url} class="flex flex-col flex-grow border-t-gray-500" 
          style={i > 0 ? 'border-top: 1px solid #666':''}>
          <!-- <a href={c.url} class="flex flex-col flex-grow"></a>-->
            <div class="w-full text-xl flex justify-between">
              <div>{c.emoji} {c.name}</div>
              <div>
                {#if c.count === 0}
                  <div class="badge badge-secondary badge-outline">Never hacked!!</div>
                {:else if c.count === 1}
                  <div class="badge badge-outline badge-primary text-xs">Hacked only once!</div>
                {:else if c.count > 1}
                  <div class="badge badge-outline text-xs">Hacked {c.count} times</div>
                {/if}
              </div>
            </div>
            <div class="w-full">{c.desc}</div>
            {#if c.attemps > 1}
              <small class="w-full">{c.attemps} attemps to hack this contract.</small>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="mt-3 xl:mt-0 w-full xl:max-w-md xl:ml-5 mx-auto ">
    <div class="w-full card rounded-none md:rounded-lg bg-base-100 shadow-2xl">
      <h1 class="text-center text-4xl mt-4">LeatherBoard</h1>
      <img src="/trophy.png" class="mx-auto my-4" alt="trophy" />
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>address / name</th>
              <th>Hacks</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {#each leatherBoard as p, i}
              <tr>
                <th>{i+1}</th>
                <td>
                  <a href="/profile/{p.address}" class="link-hover link-info">
                    {#if p.username}
                      {p.username}
                    {:else}
                      <NameOrAddress address={p.address} />
                    {/if}
                  </a>
                </td>
                <td>{p.totalHacks}</td>
                <td class="text-right">{(ethers.utils.formatEther(String(p.score)) * 100).toFixed(2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
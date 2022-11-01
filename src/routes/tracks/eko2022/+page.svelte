<script>
import ekoLevels from "$lib/levels-eko";
</script>
<svelte:head>
  <title>EKO Blockchain CTF - Enter the metaverse</title>
</svelte:head>
<div class="container w-full mx-auto md:py-14 pb-10">
  <div class="card rounded-t-none md:rounded-lg max-w-lg lg:max-w-2xl mx-auto shadow-2xl bg-base-100">
    <figure class="max-h-60 overflow-hidden"><img src="/eko2022-cover.jpg" alt="Ethernaut" /></figure>
    <div class="card-body">
      <h2 class="card-title text-4xl flex flex-wrap">
        EKO2022 Enter the metaverse
        <div class="badge badge-secondary badge-outline text-xs">NEW</div>
      </h2>
      <span class="text-sm">
        A collection of challenges made for the  <a href="https://www.ekoparty.org/" target="_blank" rel="noreferrer">EKO party</a> submited by some gigabrain hackers;
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
        <b>Challenges will be posted the 02/11/2022.</b>
      </span>
    </div>
    <ul class="menu bg-base-300 w-full rounded-box border-t border-gray-400 rounded-t-none text-left">
      {#each $ekoLevels as c,i}
        <li class="hover-bordered" class:rounded-none={i == 0}>
          <a href={c.url} class="flex flex-col flex-grow border-t-gray-500" 
          style={i > 0 ? 'border-top: 1px solid #666':''}>
          <!-- <a href={c.url} class="flex flex-col flex-grow"></a>-->
            <div class="w-full text-xl">{c.emoji} {c.name}</div>
            <div class="w-full">{c.desc}</div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
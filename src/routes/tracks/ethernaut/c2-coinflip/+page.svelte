<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ethernautLevels from "$lib/levels-ethernaut";
</script>

<PageChallenge challenge={$ethernautLevels[2]}>
  <slot slot="challengeTitle">Challenge 2, Coinflip</slot>
  <slot slot="content">
    <h6 class="text-2xl font-semibold">
      This is a coin flipping game where you need to build up your winning streak by guessing the outcome of a coin flip. To complete this level you'll need to use your psychic abilities to guess the correct outcome 10 times in a row.
    </h6>
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      <b>Things that might help:</b><br />
      - Remix - https://remix.ethereum.org
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L2.coinflip.sol" target="_blank" rel="noreferrer">
        L2.coinflip.sol
      </a>
    </p>
    
  </slot>
  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L2.coinflip.sol" target="_blank" rel="noreferrer">
      <img src="/ethernaut-level2.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/ethernaut" class="btn btn-outline mt-2">All ethernaut challenges</a>
</PageChallenge>
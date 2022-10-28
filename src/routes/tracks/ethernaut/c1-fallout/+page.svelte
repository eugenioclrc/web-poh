<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ethernautLevels from "$lib/levels-ethernaut";
</script>

<PageChallenge challenge={$ethernautLevels[1]}>
  <slot slot="challengeTitle">Challenge 1, Fallout</slot>
  <slot slot="content">
    <h6 class="text-2xl font-semibold">
      Just Claim ownership of the contract below to complete this level.
    </h6>
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      <b>Things that might help:</b><br />
      - Remix - https://remix.ethereum.org
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L1.fallout.sol" target="_blank" rel="noreferrer">
        L1.fallout.sol
      </a>
    </p>
    
  </slot>
  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L1.fallout.sol" target="_blank" rel="noreferrer">
      <img src="/ethernaut-level1.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/ethernaut" class="btn btn-outline mt-2">All ethernaut challenges</a>
</PageChallenge>
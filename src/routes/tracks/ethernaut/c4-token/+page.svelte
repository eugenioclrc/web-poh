<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ethernautLevels from "$lib/levels-ethernaut";
</script>

<PageChallenge challengeAddress={ethernautLevels[4].address} nameChallenge={'Telephone - Ethernaut - Level 4'}>
  <slot slot="challengeTitle">Challenge 4, Token</slot>
  <slot slot="content">
    <p class="text-xl">
      The goal of this level is for you to hack the basic token contract below.<br />
      You are given 20 tokens to start with and you will beat the level if you somehow manage to get your hands on any additional tokens. Preferably a very large amount of tokens.
    </p>
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      <b>Things that might help:</b><br />
      - Remix - https://remix.ethereum.org
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L4.token.sol" target="_blank" rel="noreferrer">
        L4.token.sol
      </a>
    </p>
    
  </slot>
  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L4.token.sol" target="_blank" rel="noreferrer">
      <img src="/ethernaut-level4.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/ethernaut" class="btn btn-outline mt-2">All ethernaut challenges</a>
</PageChallenge>
<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ethernautLevels from "$lib/levels-ethernaut";
</script>

<PageChallenge challengeAddress={$ethernautLevels[0].address} nameChallenge={'Fallback - Ethernaut - Level 0'}>
  <slot slot="challengeTitle">Challenge 0, Fallback</slot>
  <slot slot="content">
    <h6 class="text-2xl font-semibold">
      Look carefully at the contract's code.
    </h6>
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      You will beat this level if you <span class="text-primary-focus">claim ownership of the contract and you reduce its balance to 0.</span><br /> <br />
      <b>Things that might help:</b><br />
      - How to send ether when interacting with an ABI<br />
      - How to send ether outside of the ABI<br />
      - Fallback methods<br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L0.fallback.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        fallback.sol
      </a>
    </p>
  </slot>
  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L0.fallback.sol" target="_blank" rel="noreferrer">
      <img src="/ethernaut-level0.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/ethernaut" class="btn btn-outline mt-2">All ethernaut challenges</a>
</PageChallenge>
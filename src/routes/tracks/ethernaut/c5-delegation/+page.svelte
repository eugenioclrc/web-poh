<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ethernautLevels from "$lib/levels-ethernaut";
</script>

<PageChallenge challengeAddress={ethernautLevels[5]} nameChallenge={'Delegation - Ethernaut - Level 5'}>
  <slot slot="challengeTitle">Challenge 5, Delegation</slot>
  <slot slot="content">
    <p class="text-xl">
      The goal of this level is for you to claim ownership of the instance you are given.<br />
      <br />
      Things that might help:<br />
      - Look into Solidity's documentation on the delegatecall low level function, how it works, how it can be used to delegate operations to on-chain libraries, and what implications it has on execution scope.<br />
      - Fallback methods <br />
      - Method ids      <br />
    </p>
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L5.delegation.sol" target="_blank" rel="noreferrer">
        L5.delegation.sol
      </a>
    </p>
    
  </slot>
  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Ethernaut/L5.delegation.sol" target="_blank" rel="noreferrer">
      <img src="/ethernaut-level5.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/ethernaut" class="btn btn-outline mt-2">All ethernaut challenges</a>
</PageChallenge>
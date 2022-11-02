<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
  import Code from "$lib/Code.svelte";
</script>

<PageChallenge challenge={$ekoLevels[4]}>
  <slot slot="challengeTitle">{$ekoLevels[4].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      We are all living in the Inflation Metaverse, a digital world dominated by the INFLA token. Stability has become a scarce resource and even going to the store is a painful experience: we need to rely on oracles that sign off-chain data that lasts a couple of blocks because updating prices on-chain would be complete madness.<br />
      You are out of INFLAs and you are starving, can you defeat the system?<br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeMetaverseSupermarket.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeMetaverseSupermarket.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/adrianromero" target="_blank" rel="noreferrer" class="link-hover link-neutral">adriro</a>
      </small>
    </p>    
  </slot>

  <slot slot="code">
    <Code source="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeMetaverseSupermarket.sol" />
  </slot>

  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
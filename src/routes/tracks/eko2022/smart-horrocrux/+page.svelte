<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
  import Code from "$lib/Code.svelte";
</script>

<PageChallenge challenge={$ekoLevels[5]}>
  <slot slot="challengeTitle">{$ekoLevels[5].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      Some security researchers have recently found an eighth Horrocrux, it seems that Voldemort has link to a smart contract, can you destroy it?
      <br /><br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeSmartHorrocrux.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeMetaverseSupermarket.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/AugustitoQ" target="_blank" rel="noreferrer" class="link-hover link-neutral">bengalaQ</a>,
        a little guy who is interested in almost everything. School teacher in another life.
      </small>
    </p>
  </slot>

  <slot slot="code">
    <Code source="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeSmartHorrocrux.sol" />
  </slot>

  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
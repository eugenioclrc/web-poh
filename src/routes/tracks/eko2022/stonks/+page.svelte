<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[7]}>
  <slot slot="challengeTitle">{$ekoLevels[7].name}</slot>
  <slot slot="content">
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      You have infiltrated in a big investment firm (name says something about arrows), your task is to loose all their money.
      <br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeStonks.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeStonks.sol
      </a>
    </p>
    <small>Challenge author: 
        <a href="https://twitter.com/eugenioclrc" target="_blank" rel="noreferrer" class="link-hover link-neutral">0x4non</a>
    </small>
  </slot>

  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeStonks.sol" target="_blank" rel="noreferrer">
      <img src="/eko/code-stonks.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
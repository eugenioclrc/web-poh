<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
  import Code from "$lib/Code.svelte";
</script>

<PageChallenge challenge={$ekoLevels[9]}>
  <slot slot="challengeTitle">{$ekoLevels[9].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      You just open your eyes and are in Mexico 1986, help Diego to set the score from 1 to 2 goals for a win, do whatever is necessary!
      <br /><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengePelusa.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengePelusa.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/eugenioclrc" target="_blank" rel="noreferrer" class="link-hover link-neutral">0x4non</a>
      </small>
    </p>
  </slot>

  <slot slot="code">
    <Code source="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengePelusa.sol" />
  </slot>

  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
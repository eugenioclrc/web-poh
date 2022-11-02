<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[10]}>
  <slot slot="challengeTitle">{$ekoLevels[10].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      The evil Dr. N. Gas has put into orbit a machine that can suck all the air out of the atmosphere. You sneaked into his spaceship and must find a nozzle to open the main valve and stop the machine! Assert the situation and don't panic. Hint: on the valve is marked "model no. EIP-150"
      <br /><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeValve.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeValve.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/bahurum" target="_blank" rel="noreferrer" class="link-hover link-neutral">Bahurum</a>
      </small>
    </p>
    
    
  </slot>

  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeValve.sol" target="_blank" rel="noreferrer">
      <img src="/eko/code-gasvalve.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
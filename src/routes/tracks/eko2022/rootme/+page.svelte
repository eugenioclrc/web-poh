<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[3]}>
  <slot slot="challengeTitle">{$ekoLevels[3].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      Can you trick the machine to get root access?<br />
      <br />
      <b>Things that might help:</b><br />
      - Felling dizy? check out the user documentation <a href="https://docs.soliditylang.org/en/latest/abi-spec.html" target="_blank" rel="noreferrer">user documentation</a><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeRootMe.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeTrickster.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/tinchoabbate" target="_blank" rel="noreferrer" class="link-hover link-neutral">tinchoabbate</a>,
        ethereum security researcher. Former lead security auditor at OpenZeppelin, and before that web app pentester.
      </small>
  </slot>

  <slot slot="code">
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeRootMe.sol" target="_blank" rel="noreferrer">
      <img src="/eko/code-rootme.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
  </slot>
  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
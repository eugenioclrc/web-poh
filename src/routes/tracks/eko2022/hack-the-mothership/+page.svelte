<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
  import Code from "$lib/Code.svelte";
</script>

<PageChallenge challenge={$ekoLevels[1]}>
  <slot slot="challengeTitle">A big alien fleet is near the Earth!</slot>
  <slot slot="content">
    <p class="text-xl">
      You and a small group of scientists have been working on a global counteroffensive against the invader.<br />
      We've recovered some of the ship's source code and need to find a way to hack it!<br />
      You have already studied the code and realized that to survive you need to take control of the Mothership.<br />
      Your objective is to hack the Mothership instance (change the hacked bool to true).<br />
      Good luck, the earth's future depends on you!<br /><br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeMothership.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeMothership.sol
      </a>
    </p>
    <p>
      <small>Challenge author: <a href="https://twitter.com/nicobevi_eth" target="_blank" rel="noreferrer" class="link-hover link-neutral">nicobevi.eth</a></small>
    </p>
  </slot>

  <slot slot="code">
    <Code source="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeMothership.sol" />
  </slot>
  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>


<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challengeAddress={$ekoLevels[1].address} nameChallenge={$ekoLevels[1].name}>
  <slot slot="challengeTitle">A big alien fleet is near the Earth!</slot>
  <slot slot="content">
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      
      You and a small group of scientist have been working on a global counteroffensive against the invader.<br />
      We've recovered some of the ship's sourcecode and we need to find a way to hack it!<br />
      You have studied the code and you found out that you need to hack the mothership if you want to survive!<br />
      Your objetive is to hack the Mothership instance (change the hacked bool to true).<br />
      Good luck, the earth's future depends on you!
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        mothership.sol
      </a>
    </p>
  </slot>

  <slot slot="code">
    <!--
    <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/" target="_blank" rel="noreferrer">
      <img src="/ethernaut-level0.png" class="mx-auto w-full" style="max-width: 980px" alt="code" />
    </a>
    -->
  </slot>
  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>


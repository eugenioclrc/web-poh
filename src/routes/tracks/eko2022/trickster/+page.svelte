<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[2]}>
  <slot slot="challengeTitle">{$ekoLevels[2].name}</slot>
  <slot slot="content">
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      We might have spotted a honeypot... Can you manage to obtain the real jackpot?.<br />
      Hacking casino slot machines is considered illegal.
      <br /><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        jackpot.sol
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
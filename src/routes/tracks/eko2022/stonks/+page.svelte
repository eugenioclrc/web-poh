<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[7]}>
  <slot slot="challengeTitle">{$ekoLevels[7].name}</slot>
  <slot slot="content">
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      You have infiltrated in a big investment firm (name say something about arrows), your task is to loss all their money
      <br />
      <!--
      <b>Things that might help:</b><br />
      - Felling dizy? take a look to out <a href="https://docs.soliditylang.org/en/latest/abi-spec.html" target="_blank" rel="noreferrer">user documentation</a><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        rootme.sol
      </a>
      -->
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
<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[10]}>
  <slot slot="challengeTitle">{$ekoLevels[10].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      The evil Dr Gas has created a System to steal all gweis in existance. You must find a nozzle that opens the valve!
      <br /><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        valve.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/bahurum" target="_blank" rel="noreferrer" class="link-hover link-neutral">Bahurum</a>
      </small>
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
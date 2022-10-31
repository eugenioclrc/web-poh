<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[8]}>
  <slot slot="challengeTitle">{$ekoLevels[8].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      At an Antarctica research site, the discovery of an alien form contract leads you to a confrontation. Take ownership of <em>the think</em> or be assimilated.
      <br /><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        thething.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/victor93389091" target="_blank" rel="noreferrer" class="link-hover link-neutral">Rotciv</a>
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
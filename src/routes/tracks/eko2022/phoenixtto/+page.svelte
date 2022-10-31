<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[8]}>
  <slot slot="challengeTitle">{$ekoLevels[8].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      Within the world of crossovers there is a special one, where the universes of pokemon, harry potter and solidity intertwine. In 
      this crossover a mix creature is created between dumbledore's phoenix, a wild ditto and since we are in the solidity universe 
      this creature is a contract. We have called it Phoenixtto and it has two important abilities, that of being reborn from it's 
      ashes after its destruction and that of copying the behavior of another bytecode Try to capture the Phoenixtto, if you can...
      <br /><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        phoenixtto.sol
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
<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challengeAddress={$ekoLevels[0].address} nameChallenge={$ekoLevels[0].name} challengeImage={$ekoLevels[0].image}>
  <slot slot="challengeTitle">{$ekoLevels[0].name}</slot>
  <slot slot="content">
    <p class="mt-2 mb-4 text-slate-700 text-lg">
      Lucas is a scientist who lives in a house with 2^256 rooms. His cat is lost in the house, each time you can you find it?<br /> 
      Set the variable <code>catFound</code> to true to win this challenge.<br /><br />
      <b>Things that might help:</b><br />
      - Some basic YUL: <a href="https://docs.soliditylang.org/en/v0.8.17/yul.html#evm-dialect" class="link-secondary link-hover" target="_blank" rel="noreferrer">v0.8.17/yul.html</a><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src" target="_blank" rel="noreferrer" class="link-hover link-primary">
        hiddenkittycat.sol
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
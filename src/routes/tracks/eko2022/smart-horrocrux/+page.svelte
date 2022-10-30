<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[5]}>
  <slot slot="challengeTitle">{$ekoLevels[5].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      Some security researchers have recently found an eighth Horrocrux, it seems that Voldemort has link to a smart contract, can you destroy it?
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
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/AugustitoQ" target="_blank" rel="noreferrer" class="link-hover link-neutral">bengalaQ</a>,
        a little guy who is interested in almost everything. School teacher in another life.
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
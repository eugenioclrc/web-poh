<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
  import Code from "$lib/Code.svelte";
</script>

<PageChallenge challenge={$ekoLevels[0]}>
  <slot slot="challengeTitle">{$ekoLevels[0].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      Lucas is a scientist who lives with his cat in a big house that has 2^256 rooms. His cat likes to play hide and 
      seek and jumps to a random room whenever it hears a door opening in another one. Can you 
      find Lucas' cat? Set the variable <code>catFound</code> to <code>true</code> to win this challenge.
      <br /><br />
      <b>Things that might help:</b><br />
      - Some basic YUL: <a href="https://docs.soliditylang.org/en/v0.8.17/yul.html#evm-dialect" class="link-secondary link-hover" target="_blank" rel="noreferrer">v0.8.17/yul.html</a><br />
      <br />
      Source: <a href="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeHiddenKitty.sol" target="_blank" rel="noreferrer" class="link-hover link-primary">
        ChallengeHiddenKitty.sol
      </a>
    </p>
    <p>
      <small>Challenge author: 
        <a href="https://twitter.com/Cryptonicle1" target="_blank" rel="noreferrer" class="link-hover link-neutral">Br0niclΞ | luksgrin.lens</a>
      </small>
    </p>
  </slot>

  <slot slot="code">
    <Code source="https://github.com/Proof-Of-Hack-Protocol/challenges/blob/main/src/Eko/ChallengeHiddenKitty.sol" />
  </slot>

  <a slot="bottomlinks" href="/tracks/eko2022" class="btn btn-outline mt-2">All EKO challenges</a>
</PageChallenge>
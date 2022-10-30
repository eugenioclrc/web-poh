<script>
  import PageChallenge from "$lib/PageChallenge.svelte";
  import ekoLevels from "$lib/levels-eko";
</script>

<PageChallenge challenge={$ekoLevels[6]}>
  <slot slot="challengeTitle">{$ekoLevels[6].name}</slot>
  <slot slot="content">
    <p class="text-lg">
      The organizers of Ekoparty decided that the tickets for the 2023 conference would be purchased
      through a smart contract. However, the conference is oversold and you have to sign up for a 
      waitlist to get your ticket. The problem is that they put you on hold for two years and
    the only option you have is to extend the wait. After the wait is over, you have to enter
    to a raffle to see if you get the ticket
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
        <a href="https://linktr.ee/chiin.eth" target="_blank" rel="noreferrer" class="link-hover link-neutral">chiin.eth</a>
        Interested in smart contracts security since last month (thanks to WebtrES community).
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
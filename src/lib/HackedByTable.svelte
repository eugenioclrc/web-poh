<script>
	import { onMount } from "svelte";
  import getClient from "$lib/graphql";
  import ekoLevels from "$lib/levels-eko";
  import { page } from '$app/stores';
  import * as ethers from "ethers"
  import NameOrAddress from "./NameOrAddress.svelte";

  let players = {};
  async function getChallengePlayers() {
    const { address } = $ekoLevels.find(({ url }) => $page.routeId === url);
    let p = [];
    const { data: { challengeSolveds } } = await getClient().query(`
      query {
        challengeSolveds(where: {challenge_in: ${JSON.stringify([address.toLocaleLowerCase()])} }) {
          id
          player {
            id
            totalHacks
            username
            challenges {
              challenge {
                  id
                  count
              }
            }
          }
        }
      }`
    ).toPromise();

    challengeSolveds.forEach(({ player }) => {
      players[player.id] = {
        address: player.id,
        username: player.username, 
        totalHacks: player.totalHacks,
        score: player.challenges.reduce((score, { challenge }) => {
          return score + Math.floor(1e18 / parseInt(challenge.count, 10));
        }, 0),
      };
    });

    players = Object.values(players).sort((p1, p2) => p2.score - p1.score).slice(0, 3);
  }

  onMount(async () => {
    getChallengePlayers();
  });
</script>

{#if players.length}
  <div class="mt-3 xl:mt-0 w-full">
    <div class="w-full card">
      <h1 class="text-center text-2xl mt-4 mb-2">Top 3 hackers</h1>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>address / name</th>
              <th>Hacks</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {#each players as player, i}
              <tr>
                <th>{i + 1}</th>
                <td>
                  <a href="/profile/{player.address}" class="link-hover link-info">
                    {#if player.username}
                      {player.username}
                    {:else}
                      <NameOrAddress address={player.address} />
                    {/if}
                  </a>
                </td>
                <td>{player.totalHacks}</td>
                <td class="text-right">
                  {(ethers.utils.formatEther(String(player.score)) * 100).toFixed(2)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}
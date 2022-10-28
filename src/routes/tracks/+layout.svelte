<script>
	import { onMount } from "svelte";
	import { init } from "$lib/eth";
	import Header from "./Header.svelte";
	import levels from "$lib/levels-ethernaut";
	
	// import { PUBLIC_TESTNET_CHAINID } from '$env/static/public';
	import getClient from "$lib/graphql";

	onMount(async () => {
		init();

	const { data: {challenges}} = await getClient().query(`
		query {
			challenges(
				where: {id_in: ${JSON.stringify($levels.map(e => e.address.toLocaleLowerCase()))}}
			) {
				id
				count
			}
		}`).toPromise();
			$levels.forEach((l,i) => {
				$levels[i].count = 0;
			});
			challenges.forEach(c => {
				let id = $levels.findIndex(l => l.address.toLocaleLowerCase() == c.id);
				if(id > -1) {
					$levels[id].count = Number(c.count);
				}
			});

		// svelte stuff reactity
  	// levels = [...Object.values(levels)];
	})
</script>
<main>
	<Header />
	<slot></slot>
</main>

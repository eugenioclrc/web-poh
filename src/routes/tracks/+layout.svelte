<script>
import { onMount } from "svelte";
import { init } from "$lib/eth";
import Header from "../Header.svelte";


onMount(async () => {
	init();
	// svelte stuff reactity
	// levels = [...Object.values(levels)];
})
</script>
<main>
	<Header />
	<slot></slot>
</main>

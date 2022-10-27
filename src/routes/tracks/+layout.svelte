<script>
	import { onMount } from "svelte";
	import { init } from "$lib/eth";
	import Header from "./Header.svelte";

	onMount(() => {
		init();
	})
</script>
<main>
	<Header />
	<slot></slot>
</main>

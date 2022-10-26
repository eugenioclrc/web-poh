<script>
	import { onMount } from "svelte";
	import { init } from "$lib/eth";
	import Header from "./Header.svelte";

	onMount(() => {
		init();
	})
</script>
<main class="min-h-screen">
		<Header />
		<slot></slot>
	</main>

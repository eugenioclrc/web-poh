<script lang="ts">
	import { getEnsName } from "$utils/ens";
	import { onMount } from "svelte";

  export let address = '';

  let name;
  onMount(async () => {
    name = await getEnsName(address);
  });
</script>

<span>
  {#if name}
    {name}
  {:else} 
    {address.slice(0,6)}... {address.slice(-4)}
  {/if}
</span>

<script>
	import { onMount } from "svelte";
    import { page } from '$app/stores';
	import { init, wallet } from "$lib/eth";
	import Header from "../../Header.svelte";
    import { StaticJsonRpcProvider } from '@ethersproject/providers';

    import { AvatarResolver, utils as avtUtils } from '@ensdomains/ens-avatar';
	import { getAddress } from "ethers/lib/utils";
  
    let avatarURI = '/unknown.jpg';
    $: address = getAddress($page.params.address);
    onMount(async () => {
        init();
        const provider = new StaticJsonRpcProvider('https://rpc.ankr.com/eth');

        const avt = new AvatarResolver(provider);
        const _avatarURI = await avt.getAvatar(address);
        if(_avatarURI) {
            avatarURI = _avatarURI;
        }  
    })

    

/*
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
	})*/
</script>
<main>
	<Header />
	

    <div class="max-w-2xl mx-auto p-6">

        <div class="bg-white shadow rounded-lg p-10">
            <div class="flex flex-col gap-1 text-center items-center">
                <img class="h-32 w-32 bg-white p-2 rounded-full shadow mb-4" src={avatarURI} alt="Player avatar" />
                <p class="font-semibold">{address.slice(0,6)}.....{address.slice(-4)}</p>
                <div class="text-sm leading-normal text-gray-400 flex justify-center items-center">
                    
                <svg viewBox="0 0 24 24" class="mr-1" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <a href="https://goerli.etherscan.io/address/{address}" class="link-hover">View on goerli etherscan</a>
                </div>
                {#if address == $wallet}
                    <button
                        on:click={() => alert("TODO")}
                        class="btn text-white no-underline text-xl btn-secondary my-2" target="_blank" rel="noreferrer">Link twitter handle</button>
                {/if}
            </div>
            <div class="flex justify-center items-center gap-2 my-3">
                <div class="font-semibold text-center mx-4">
                    <p class="text-black">102</p>
                    <span class="text-gray-400">Posts</span>
                </div>
                <div class="font-semibold text-center mx-4">
                    <p class="text-black">102</p>
                    <span class="text-gray-400">Followers</span>
                </div>
                <div class="font-semibold text-center mx-4">
                    <p class="text-black">102</p>
                    <span class="text-gray-400">Folowing</span>
                </div>
            </div>
        </div>
    </div>
</main>

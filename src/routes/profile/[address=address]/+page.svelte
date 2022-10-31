
<script>
	import { onMount } from "svelte";
    import { page } from '$app/stores';
	import { init, wallet } from "$lib/eth";
	import Header from "../../Header.svelte";
    import getClient from "$lib/graphql";
    import getContract from '$lib/contractChallengeFactory';
    import { StaticJsonRpcProvider } from '@ethersproject/providers';
    
    import { AvatarResolver } from '@ensdomains/ens-avatar';
	import { getAddress, formatBytes32String, parseBytes32String } from "ethers/lib/utils";
	import { PUBLIC_CHALLENGE_MANAGER, PUBLIC_TESTNET_RPC } from "$env/static/public";
	import { Contract } from "ethers";
  
    let avatarURI = '/unknown.jpg';
    $: address = getAddress($page.params.address);
    let player = {
        username: '',
        totalHacks: 0,
        challenges: [],
    };

    let newUsername = '';
    let modalTw = false;
    let updating = false;
    
    onMount(async () => {
        const provider = new StaticJsonRpcProvider('https://rpc.ankr.com/eth');

        const avt = new AvatarResolver(provider);
        const _avatarURI = await avt.getAvatar(address);
        if(_avatarURI) {
            avatarURI = _avatarURI;
        }  
        await init();
        
	    const { data } = await getClient().query(`
		query {
            player(id: "${address.toLocaleLowerCase()}") {
                id
                username
                totalHacks
                challenges {
                    challenge {
                        id
                    }
                }
            }
		}`).toPromise();
		if (data.player) {
            player.username = data.player.username;
            player.totalHacks = data.player.totalHacks;
            player.challenges = data.player.challenges.map(c => c.challenge.id);
            newUsername = player.username || '';
        }

        try {
            const abiFactory = ["function usernames(address) external view returns(bytes32)",];
            const provider = new StaticJsonRpcProvider(PUBLIC_TESTNET_RPC);
            const manager = new Contract(PUBLIC_CHALLENGE_MANAGER, abiFactory, provider);
            const username = parseBytes32String(await manager.usernames(address));
            if (username) {
                player.username = username;
                newUsername = username || '';
            }
        } catch(err){
            console.log(err)
        }
    })

    
    async function setUsername() {
        newUsername = newUsername.replace("@", '').trim();
        try {
            const {contract: manager} = await getContract();
            const tx = await manager.setUsername(formatBytes32String(newUsername));
            updating = true;
            alert("please wait until transaction is finished and thegraph updates your username, usually takes a couple of minutes");
            await tx.wait(1);
            document.location.reload();
        } catch(err) {
            console.error(err);
            alert("there is an unexpected error, check your RPC node connection");
        }
        updating = false;
    }

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
                {#if player.username}
                    <a href="https://twitter.com/{player.username}" rel="noreferrer" target="_blank" class="link link-hover link-primary font-semibold">@{player.username}</a>
                {:else}
                    <p class="font-semibold">{address.slice(0,6)}.....{address.slice(-4)}</p>
                {/if}
                <div class="text-sm leading-normal text-gray-400 flex justify-center items-center">
                    
                <svg viewBox="0 0 24 24" class="mr-1" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <a href="https://goerli.etherscan.io/address/{address}" class="link-hover">View on goerli etherscan</a>
                </div>
                {#if address == $wallet}
                    <button
                        on:click={() => modalTw = true}
                        class="btn text-white no-underline text-xl btn-secondary my-2" target="_blank" rel="noreferrer">Link twitter handle</button>
                {/if}
            </div>
            <div class="flex justify-center items-center gap-2 my-3">
                <div class="font-semibold text-center mx-4">
                    <p class="text-black">{player.totalHacks}</p>
                    <span class="text-gray-400">Hacks</span>
                </div>
                <!--
                <div class="font-semibold text-center mx-4">
                    <p class="text-black">102</p>
                    <span class="text-gray-400">Followers</span>
                </div>
                <div class="font-semibold text-center mx-4">
                    <p class="text-black">102</p>
                    <span class="text-gray-400">Folowing</span>
                </div>
                -->
            </div>
        </div>
    </div>
</main>
<div class="modal backdrop-blur-sm" class:modal-open={modalTw}>
  <div class="modal-box p-0">
    <div class="p-4 text-center">
        <h3 class="font-bold text-lg">What is your twitter handle?</h3>
        <div class="form-control w-full max-w-xs mx-auto">
            <input type="text" placeholder="twitterUsername" bind:value={newUsername} class="input input-bordered w-full max-w-xs" />
            </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-around">
        <button type="button" class="btn btn-success" disabled={updating} on:click={setUsername}>{updating ? 'Wait..':' Update'}</button>
        <button type="button" class="btn btn-error btn-outline" on:click={() => { modalTw = false }}>Close</button>        
    </div>
  </div>
</div>

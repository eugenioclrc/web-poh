<script>
  import mainLogo from "$lib/assets/400x400.jpg";
</script>
<svelte:head>
  <title>CTF Protocol, HACK2MINT</title>
</svelte:head>
<div class="min-h-screen max-w-full flex flex-col">
  <div class="w-full h-1/2 min-h-[360px] flex-grow text-center hero" style="background-color: #0f1118">
    <div class="flex flex-col">
      <img src={mainLogo} class="rounded-sm mx-auto mt-4" alt="anon" /><br>
      <a href="/tracks/eko2022" class="btn btn-accent mx-4 md:mx-0 text-2xl my-4">Hey Anon, Let`s play!
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        
      </a>
    </div>

  </div>
  <div class="bg-base-300 w-full h-1/2 py-5 flex-grow hero">
    <div class="flex flex-col xl:flex-row">
      <div class="card w-96 bg-base-100 shadow-xl m-2">
        <div class="card-body">
          <h2 class="card-title">Description</h2>
          <p>
            This is a simple experiment of the <b>Proof of Hack Protocol</b>. Its a mix between classical blockchain challenges, and new ones, its permissionless, this page will curated some of them.<br />
						After you break each challenge you can claim a souldbond NFT on polygon.
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl m-2">
        <div class="card-body">
          <h2 class="card-title">How do i play? 🕹️</h2>
          <p>
            First make sure that you have installed the Metamask extension.<br />
            Then make sure you have some Görli ETH, which you will use to send transactions. If not you can get 
            some from <a href="https://goerli-faucet.pk910.de/" target="_blank" rel="noreferrer" class="link-primary hover">this faucet</a> or 
              <a href="https://faucetlink.to/goerli" target="_blank" rel="noreferrer" class="link-primary hover">check this faucet list</a>
            <br />
            Finally click play to connect your wallet.
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl m-2">
        <div class="card-body">
          <h2 class="card-title">About this</h2>
          <p>
						The Proof Of Hack Protocol its a game where you can learn by doing, earn NFTs trophies, validate your skills and brag with your anons frens.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<!--


<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<div class="container relative mx-auto pt-16">
	<div class="items-center flex flex-wrap">
		<div class="w-full  px-4 text-center">
			<div class="pt-12">
				<img src="/400x400.jpg" class="rounded-sm mx-auto" alt="anon" />
				<h1 class="text-white font-semibold text-5xl mt-6">
					Hey Anon, u up?
				</h1>
			
				<p class="mt-4 text-xl text-slate-200 flex justify-center">
					Free fun blockchain hacking challenges.
				</p>
			</div>

			<div class="pt-12">
				<h2 class="text-white font-semibold text-2xl mt-2">
					1) Pick your track.
				</h2>
				<h2 class="text-white font-semibold text-2xl mt-2">
					2) Break the challenge.
				</h2>
				<h2 class="text-white font-semibold text-2xl mt-2">
					2) Claim your nft.
				</h2>
			
				<p class="mt-4 text-xl text-slate-200 flex justify-center">
					Free fun blockchain hacking challenges.
				</p>
			</div>
		</div>
	</div>

	

	

	
</div>
-->
import { writable, get } from "svelte/store";

import { Web3Provider } from "@ethersproject/providers";

export const wallet = writable(null);
export const provider = writable(null);
export const signer = writable(null);
export const errorTx = writable(false);
export const networkDetails = writable({});
export const chainId = writable(-1);

/*
function hasMetamask() {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
}
*/

let _provider;

let web3Modal;

export async function disconnect() {

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavior.
    await web3Modal.clearCachedProvider();
    _provider = null;

    provider.set(_provider);
    networkDetails.set(null);
    chainId.set(null);
    wallet.set(null);
    signer.set(null);
}

export async function init() {
  
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        rpc : {  80001: "https://matic-mumbai.chainstacklabs.com/", 137: "https://rpc.ankr.com/polygon" },
      }
    },
  };
  
  web3Modal = web3Modal || new Web3Modal.default({
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
  
  // provider = await web3Modal.connect();
  if (web3Modal.cachedProvider) {
    let __p = await web3Modal.connect();
    // _provider = await web3Modal.connect();// if (web3Modal.cachedProvider) {
    // _provider = new Web3Provider(window.ethereum, "any");
    _provider = new Web3Provider(__p, "any");
    __p.on("chainChanged", (oldNetwork) => {
      if (oldNetwork) {
        setTimeout(() => {
          init();
        }, 0);
      }
    });
    
    const _signer = await _provider.getSigner();
    const _wallet = await _signer.getAddress();

    window.ethereum.on('networkChanged', async (networkId) => {
      chainId.set(Number(networkId));
      const _networkDetails = await _provider.getNetwork();
      networkDetails.set(_networkDetails);      
    })


    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts[0] !== _wallet) {
        //document.location.reload()
        setTimeout(() => {
          init();
        }, 0);
      }
      // document.location.reload();
    });

    __p.on("accountsChanged", (accounts) => {
      if (accounts[0] !== _wallet) {
        //document.location.reload()
        setTimeout(() => {
          init();
        }, 0);
      }
    });
    
    provider.set(_provider);
    const _networkDetails = await _provider.getNetwork();
    networkDetails.set(_networkDetails);
    chainId.set(_networkDetails.chainId);
    provider.set(_provider);

    wallet.set(_wallet);
    signer.set(_signer);


    if (_wallet) {
      // algo
    }
  }
}

export async function login() {
  await init();
  try {
    await web3Modal.connect();
    // await window.ethereum.enable();
  } catch(err) {
  }
  await init();
}

export async function changeNetwork(_chainId) {
  const chainId = `0x${(Number(_chainId)).toString(16)}`;
    try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        });
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code !== 4902) {
          return;
        }
        if(Number(_chainId) == 5) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Goerly',
                chainId,
                nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                rpcUrls: ['https://rpc.goerli.mudit.blog/']
              }
            ]
          });
        }
      }
/*
    await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
        {
          chainId: `0x${(5).toString(16)}`,
        }
      ]
    /*params: [
        {
          chainId: `0x${(80001).toString(16)}`,
          chainName: "Mumbai Polygon TestNet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "matic",
            decimals: 18,
          },
          rpcUrls: ["https://matic-testnet-archive-rpc.bwarelabs.com/", "https://matic-mumbai.chainstacklabs.com/", "https://rpc-mumbai.matic.today/"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
      ],
      */
    //});
    setTimeout(() => {
      // window.location.reload();
    }, 700);
  }

export async function getGasPrice() {
  let gasPrice = null;
  // let maxFeePerGas = null;
  // let maxPriorityFeePerGas = null;
  try {
    const _provider = await get(provider);
    const feeData = await _provider.getFeeData();
    gasPrice = String(feeData.gasPrice.mul(2));
    // maxFeePerGas = String(feeData.maxFeePerGas.mul(2));
    // maxPriorityFeePerGas = String(feeData.maxPriorityFeePerGas.mul(2));
  } catch(err) {
    console.log(err);
  }
  return gasPrice;
}
import { StaticJsonRpcProvider, JsonRpcProvider } from '@ethersproject/providers';
import { PUBLIC_TESTNET_RPC } from '$env/static/public';

let staticProvider;
export function getStaticProvider() {
	if (staticProvider) {
		return staticProvider;
	}
	staticProvider = new StaticJsonRpcProvider('https://rpc.ankr.com/eth');
	return staticProvider;
}

let provider;
export function getProvider() {
	if (provider) {
		return provider;
	}
	provider = new JsonRpcProvider(PUBLIC_TESTNET_RPC);
	return provider;
}

import { getStaticProvider } from './provider';

export async function getEnsName(address: string) {
	const provider = getStaticProvider();
	return await provider.lookupAddress(address);
}

export async function getEnsAvatar(address: string) {
	const provider = getStaticProvider();
	return await provider.getAvatar(address);
}

export async function getEnsInfo(address: string) {
	const [name, avatar] = await Promise.all([getEnsName(address), getEnsAvatar(address)]);
	return { name, avatar };
}

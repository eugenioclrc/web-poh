import { get } from "svelte/store";
import { Contract } from "@ethersproject/contracts";
import { PUBLIC_CHALLENGE_MANAGER, PUBLIC_TESTNET_CHAINID } from '$env/static/public';

import { chainId, signer, wallet } from "./eth";

let contract: any;

const abiFactory = [
    "function deployChallenge(address) external",
    "function breakChallenge(address) external",
    "function getChallengesInstances(address,address) external view returns(address[] memory)",
    "function checkChallenge(address user, address challengeFactory) public view returns(bool)",
    "function userChallengeBreak(address user, address challengeFactory) public view returns(bool)",
    "function challengeBreaks(address challengeFactory) public view returns(uint256)",
    "event ChallengeBreak(address indexed challenge, address indexed user, uint256 breakTimes)"
];

/*
async function eventChallengeBreak(challenge, player, times) {
  const $wallet = await get(wallet);
  if (player !== $wallet) {
    return;
  }
  const event = new CustomEvent('challengeBreak', {
    detail: [challenge, Number(times)].join(','),
    bubbles: true,
    cancelable: true,
    composed: true, // makes the event jump shadow DOM boundary
  });
  document.dispatchEvent(event);
}
*/

export default async function getContract() {
  const $signer = await get(signer);
  const $chainId = await get(chainId);

  if ($chainId !== Number(PUBLIC_TESTNET_CHAINID)) {
    throw new Error(`No contracts address for ${$chainId}`);
  }
  if (contract) {
    return contract.connect($signer);
  }

  if (!PUBLIC_CHALLENGE_MANAGER) {
    throw new Error(`No contracts address for ${$chainId}`);
  }

  // contract.on("ChallengeBreak", eventChallengeBreak);


  contract = new Contract(PUBLIC_CHALLENGE_MANAGER, abiFactory);
  return contract.connect($signer);
}
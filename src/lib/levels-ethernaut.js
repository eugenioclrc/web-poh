import { PUBLIC_TESTNET_CHAINID } from '$env/static/public';

export default [
  "0x67c696Abde4c7a9318276C234F377dA6dCFD0952", // level 0 fallback
  "0x88B47Af0987853EA5F0663a68E0b4ef0229580eE", // level 1 fallout
  "0xaDA5DA185F5bddB85Bf0fea2488101AC31BE3332", // level2 coinflip
  "0x16b206f9134Fb26fFeAe5670d179EC630ba48e67", // level3 telephone
  "0x0072144d036d6E9c21cB4D13a7B0c55a88A3fB72" // level4 token
];
/*
export default PUBLIC_TESTNET_CHAINID == "31337" ? [
  //
  "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // level 0 fallback
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // level 1 fallout
] : [
  // goerli
  "0x67c696Abde4c7a9318276C234F377dA6dCFD0952", // level 0 fallback
  "0x88B47Af0987853EA5F0663a68E0b4ef0229580eE" // level 1 fallout
]*/
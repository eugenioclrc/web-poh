import { PUBLIC_TESTNET_CHAINID } from '$env/static/public';

export default PUBLIC_TESTNET_CHAINID == "31337" ? [
  //
  "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // level 0 fallback
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // level 1 fallout
] : [
  // goerli
  "0x67c696Abde4c7a9318276C234F377dA6dCFD0952", // level 0 fallback
  "0x88B47Af0987853EA5F0663a68E0b4ef0229580eE" // level 1 fallout
]
import { ethers } from "hardhat";

async function deployPullPerks() {
  const CONTRACT_NAME = "PullPerks";
  const tokenAddress = "0x3295DE22A696a32026b1F106899f483FfEA8F5d9";
  const pullPerksAddress="0xA507a2F9DB509efcA43541950Fa3A5020C7B924a";
  const pullperks = await ethers.deployContract(CONTRACT_NAME);
  await pullperks.waitForDeployment();
  console.log(
    "Deployed RFI contract address:",
    await pullperks.getAddress()
  );
}

async function main() {
  await deployPullPerks();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

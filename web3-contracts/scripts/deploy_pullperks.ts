import { ethers } from "hardhat";

async function deployPullPerks() {
  const CONTRACT_NAME = "PullPerks";
  const tokenAddress = "";
  const buzziFi = await ethers.deployContract(CONTRACT_NAME, [
    tokenAddress,
  ]);
  await buzziFi.waitForDeployment();
  console.log(
    "Deployed RFI contract address:",
    await buzziFi.getAddress()
  );
}

async function main() {
  await deployPullPerks();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

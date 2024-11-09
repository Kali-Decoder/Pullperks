import { ethers } from "hardhat";

async function createContributeProject() {
  const PULLPERKS_CONTRACT_NAME = "PullPerks";
  const PullperksAddress = "";
  const sender = new ethers.Wallet(
    process.env.DEPLOYER_ACCOUNT_PRIV_KEY as any,
    ethers.provider
  );

  console.log("Deployer address:", sender.address);
  console.log("Creating pool...");
  const myPullPerksContract = await ethers.getContractAt(
    PULLPERKS_CONTRACT_NAME,
    PullperksAddress,
    sender
  );
  // address[] memory _contributors,
  // address _admin,
  // uint256[] memory _percentages,
  // uint256 _totalTokenAmount,
  // address _token
  const tx = await myPullPerksContract.addProjectContributions(
    [
      "0x367B17683E5f146Ed0DB4ca221e5868a85787A89",
      "0x367B17683E5f146Ed0DB4ca221e5868a85787A89",
    ],
    "0x367B17683E5f146Ed0DB4ca221e5868a85787A89",
    [50, 50],
    100,
    "0x367B17683E5f146Ed0DB4ca221e5868a85787A89"
  );
  await tx.wait();
  console.log("Pool Created Successfully:", tx.hash);
}

async function main() {
  await createContributeProject();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

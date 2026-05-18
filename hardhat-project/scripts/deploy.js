async function main() {
  console.log("🌟 Deploying MorningStar (Django Sound Root)...");
  const MorningStar = await ethers.getContractFactory("MorningStar");
  const morningStar = await MorningStar.deploy();
  await morningStar.waitForDeployment();
  console.log("✅ SUCCESS — MorningStar deployed to:", await morningStar.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

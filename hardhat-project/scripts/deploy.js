async function main() {
  console.log("🌟 Deploying MorningStar (Django Sound Root)...");

  const MorningStar = await ethers.getContractFactory("MorningStar");
  const morningStar = await MorningStar.deploy();

  await morningStar.waitForDeployment();

  console.log("✅ MorningStar deployed to:", await morningStar.getAddress());
  console.log("Root Frequency: 0.7 Hz Django Sound");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

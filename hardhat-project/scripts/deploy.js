async function main() {
  const MorningStar = await ethers.getContractFactory("MorningStar");
  const morningStar = await MorningStar.deploy();
  await morningStar.waitForDeployment();
  console.log("MorningStar deployed to:", await morningStar.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

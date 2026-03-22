const { ethers } = require("hardhat");

const AGENT = "0x7e7f825248Ae530610F34a5deB9Bc423f6d63373";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Sending 0.01 ETH to agent wallet...");
  console.log("From:", signer.address);
  console.log("To:", AGENT);
  
  const tx = await signer.sendTransaction({
    to: AGENT,
    value: ethers.parseEther("0.01")
  });
  await tx.wait();
  
  console.log("\n✅ Transaction:", tx.hash);
  console.log("Sent 0.01 ETH to", AGENT);
  
  const agentBalance = await ethers.provider.getBalance(AGENT);
  console.log("Agent ETH Balance:", ethers.formatEther(agentBalance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });

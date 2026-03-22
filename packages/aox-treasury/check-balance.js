const { ethers } = require("hardhat");

const OWNER = "0x05592957Fb56bd230f8fa41515eD902a1D3e94D0";
const AGENT = "0x7e7f825248Ae530610F34a5deB9Bc423f6d63373";
const WSTETH_BASE = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";

async function main() {
  console.log("\n========================================");
  console.log("Base Mainnet Balance Check");
  console.log("========================================\n");
  
  // Check ETH balances
  const ownerEth = await ethers.provider.getBalance(OWNER);
  const agentEth = await ethers.provider.getBalance(AGENT);
  
  console.log("Owner (CEO):", OWNER);
  console.log("  ETH Balance:", ethers.formatEther(ownerEth), "ETH");
  console.log("\nAgent (Banker):", AGENT);
  console.log("  ETH Balance:", ethers.formatEther(agentEth), "ETH");
  
  // Check wstETH balance
  const wstETH = await ethers.getContractAt("IERC20", WSTETH_BASE);
  const ownerWsteth = await wstETH.balanceOf(OWNER);
  const agentWsteth = await wstETH.balanceOf(AGENT);
  
  console.log("\nwstETH Balances:");
  console.log("  Owner:", ethers.formatEther(ownerWsteth), "wstETH");
  console.log("  Agent:", ethers.formatEther(agentWsteth), "wstETH");
  
  // Check if we have enough for deployment
  const deploymentCost = ethers.parseEther("0.01"); // Estimate
  const hasEnough = ownerEth >= deploymentCost;
  
  console.log("\n========================================");
  console.log("Deployment Status:", hasEnough ? "✅ Ready" : "❌ Insufficient ETH");
  console.log("Estimated Cost:", ethers.formatEther(deploymentCost), "ETH");
  console.log("========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

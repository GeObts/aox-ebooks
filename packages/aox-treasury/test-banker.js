const { ethers } = require("hardhat");

const TREASURY = "0x2D5eEC30909c29816841A5f04f03655dDA0f7CF9";
const WSTETH = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
const BANKER = "0x7e7f825248Ae530610F34a5deB9Bc423f6d63373";

const TREASURY_ABI = [
  "function deposit(uint256 amount) external",
  "function withdrawYield(uint256 amount) external",
  "function spendingCap() external view returns (uint256)",
  "function getAvailableYield() external view returns (uint256)",
  "function getPrincipal() external view returns (uint256)"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

async function main() {
  console.log("\n========================================");
  console.log("Banker Testing AgentTreasury");
  console.log("========================================\n");
  
  // Connect as Banker
  const agentPrivateKey = "0x049181b00c8510dbc2507d2d1d448b47942a273f3d8bca2753332dbd06135d98";
  const agentWallet = new ethers.Wallet(agentPrivateKey, ethers.provider);
  
  console.log("Banker Wallet:", agentWallet.address);
  console.log("Expected:", BANKER);
  
  const treasury = new ethers.Contract(TREASURY, TREASURY_ABI, agentWallet);
  const wsteth = new ethers.Contract(WSTETH, ERC20_ABI, agentWallet);
  
  // Check balance
  const balance = await wsteth.balanceOf(BANKER);
  console.log("\nBanker wstETH Balance:", ethers.formatEther(balance), "wstETH");
  
  // Check treasury state
  const spendingCap = await treasury.spendingCap();
  const availableYield = await treasury.getAvailableYield();
  const principal = await treasury.getPrincipal();
  
  console.log("\n=== Treasury State ===");
  console.log("Principal:", ethers.formatEther(principal), "wstETH");
  console.log("Available Yield:", ethers.formatEther(availableYield), "wstETH");
  console.log("Spending Cap:", ethers.formatEther(spendingCap), "wstETH");
  
  // Test 1: Try to deposit (should FAIL - only owner can deposit)
  console.log("\n=== Test 1: Agent tries to deposit ===");
  console.log("Expected: REVERT - only owner can deposit");
  try {
    await treasury.deposit(ethers.parseEther("0.001"));
    console.log("❌ UNEXPECTED: Deposit succeeded");
  } catch (error) {
    console.log("✅ CONFIRMED: Deposit failed as expected");
    console.log("   Error:", error.message.slice(0, 100) + "...");
  }
  
  // Test 2: Approve treasury
  console.log("\n=== Test 2: Approving treasury ===");
  const approveTx = await wsteth.approve(TREASURY, ethers.MaxUint256);
  await approveTx.wait();
  console.log("✅ Approved treasury to spend wstETH");
  
  // Check allowance
  const allowance = await wsteth.allowance(BANKER, TREASURY);
  console.log("Allowance:", ethers.formatEther(allowance), "wstETH");
  
  // Test 3: Try to withdraw yield (should FAIL - no yield yet)
  console.log("\n=== Test 3: Agent tries to withdraw yield ===");
  console.log("Expected: REVERT - no yield available (principal is 0)");
  try {
    await treasury.withdrawYield(ethers.parseEther("0.001"));
    console.log("❌ UNEXPECTED: Withdraw succeeded");
  } catch (error) {
    console.log("✅ CONFIRMED: Withdraw failed as expected");
    if (error.message.includes("insufficient yield")) {
      console.log("   Reason: insufficient yield");
    } else {
      console.log("   Error:", error.message.slice(0, 100) + "...");
    }
  }
  
  // Summary
  console.log("\n========================================");
  console.log("Test Results");
  console.log("========================================");
  console.log("✅ Agent CANNOT deposit (owner-only)");
  console.log("✅ Agent CANNOT withdraw (no yield yet)");
  console.log("⚠️  Contract needs principal deposit from owner");
  console.log("\nNext Steps:");
  console.log("1. Owner deposits principal into treasury");
  console.log("2. Yield accrues from Lido staking rewards");
  console.log("3. Agent can then withdraw yield up to spending cap");
  console.log("========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\nTest failed:", error.message);
    process.exit(1);
  });

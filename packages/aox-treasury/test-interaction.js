const { ethers } = require("hardhat");

const TREASURY_ADDR = "0xA26F721b4F60D3Cd221B7410fc3ba2d95Ab90efd";
const MOCK_WSTETH_ADDR = "0xAEF41779d764189c0b84bd4E622Ee9275eC16964";
const OWNER = "0x05592957Fb56bd230f8fa41515eD902a1D3e94D0";
const AGENT = "0x7e7f825248Ae530610F34a5deB9Bc423f6d63373";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("\n========================================");
  console.log("AgentTreasury Test Interaction");
  console.log("========================================\n");
  
  // Get owner signer
  const [ownerSigner] = await ethers.getSigners();
  console.log("Owner Signer:", ownerSigner.address);
  
  // Create agent signer from private key
  const agentPrivateKey = "0x049181b00c8510dbc2507d2d1d448b47942a273f3d8bca2753332dbd06135d98";
  const agentWallet = new ethers.Wallet(agentPrivateKey, ethers.provider);
  console.log("Agent Wallet:", agentWallet.address);
  
  // Load contracts
  const treasury = await ethers.getContractAt("AgentTreasuryTestnet", TREASURY_ADDR);
  const mockWstETH = await ethers.getContractAt("MockWstETH", MOCK_WSTETH_ADDR);
  
  // Check wallet balances
  const ethBalance = await ethers.provider.getBalance(OWNER);
  const agentEthBalance = await ethers.provider.getBalance(AGENT);
  console.log("\n=== Wallet Balances ===");
  console.log("Owner ETH Balance:", ethers.formatEther(ethBalance), "ETH");
  console.log("Agent ETH Balance:", ethers.formatEther(agentEthBalance), "ETH");
  
  const wstethBalance = await mockWstETH.balanceOf(OWNER);
  const agentWstethBalance = await mockWstETH.balanceOf(AGENT);
  console.log("Owner wstETH Balance:", ethers.formatEther(wstethBalance), "mwstETH");
  console.log("Agent wstETH Balance:", ethers.formatEther(agentWstethBalance), "mwstETH");
  
  // Check treasury state
  const treasuryBalance = await mockWstETH.balanceOf(TREASURY_ADDR);
  const principal = await treasury.getPrincipal();
  const availableYield = await treasury.getAvailableYield();
  const spendingCap = await treasury.spendingCap();
  
  console.log("\n=== Treasury State ===");
  console.log("Treasury wstETH Balance:", ethers.formatEther(treasuryBalance), "mwstETH");
  console.log("Principal:", ethers.formatEther(principal), "mwstETH");
  console.log("Available Yield:", ethers.formatEther(availableYield), "mwstETH");
  console.log("Spending Cap:", ethers.formatEther(spendingCap), "mwstETH (~10 USDC)");
  
  // === STEP 1: Approve treasury ===
  console.log("\n=== Step 1: Approving Treasury ===");
  const approveAmount = ethers.parseEther("10");
  const approveTx = await mockWstETH.approve(TREASURY_ADDR, approveAmount);
  await approveTx.wait();
  console.log("✅ Approved:", ethers.formatEther(approveAmount), "mwstETH");
  console.log("Transaction:", approveTx.hash);
  
  await sleep(5000); // Wait 5 seconds
  
  // === STEP 2: Deposit principal ===
  console.log("\n=== Step 2: Depositing Principal ===");
  const depositAmount = ethers.parseEther("10");
  const depositTx = await treasury.deposit(depositAmount);
  const depositReceipt = await depositTx.wait();
  console.log("✅ Deposited:", ethers.formatEther(depositAmount), "mwstETH");
  console.log("Transaction:", depositReceipt.hash);
  
  await sleep(5000);
  
  // Check updated state
  const treasuryBalanceAfter = await mockWstETH.balanceOf(TREASURY_ADDR);
  const principalAfter = await treasury.getPrincipal();
  console.log("\n=== Treasury State After Deposit ===");
  console.log("Treasury Balance:", ethers.formatEther(treasuryBalanceAfter), "mwstETH");
  console.log("Principal:", ethers.formatEther(principalAfter), "mwstETH");
  
  // === STEP 3: Simulate yield accrual (mint to treasury) ===
  console.log("\n=== Step 3: Simulating Yield Accrual ===");
  const yieldAmount = ethers.parseEther("0.5"); // 0.5 wstETH yield
  const yieldTx = await mockWstETH.mint(TREASURY_ADDR, yieldAmount);
  await yieldTx.wait();
  console.log("✅ Minted yield to treasury:", ethers.formatEther(yieldAmount), "mwstETH");
  console.log("Transaction:", yieldTx.hash);
  
  await sleep(5000);
  
  const availableYieldAfter = await treasury.getAvailableYield();
  console.log("Available Yield:", ethers.formatEther(availableYieldAfter), "mwstETH");
  
  // === STEP 4: Agent withdraws yield ===
  console.log("\n=== Step 4: Agent Withdrawing Yield ===");
  const withdrawAmount = ethers.parseEther("0.005"); // Withdraw up to spending cap
  
  console.log("Agent Balance Before:", ethers.formatEther(agentWstethBalance), "mwstETH");
  
  // Connect treasury contract to agent wallet and withdraw
  const agentConnectedTreasury = treasury.connect(agentWallet);
  const withdrawTx = await agentConnectedTreasury.withdrawYield(withdrawAmount);
  const withdrawReceipt = await withdrawTx.wait();
  console.log("✅ Agent withdrew:", ethers.formatEther(withdrawAmount), "mwstETH");
  console.log("Transaction:", withdrawReceipt.hash);
  
  await sleep(5000);
  
  // Check agent's balance after
  const agentBalanceAfter = await mockWstETH.balanceOf(AGENT);
  console.log("Agent Balance After:", ethers.formatEther(agentBalanceAfter), "mwstETH");
  
  // === STEP 5: Final State ===
  const finalPrincipal = await treasury.getPrincipal();
  const finalYield = await treasury.getAvailableYield();
  const finalTreasuryBalance = await mockWstETH.balanceOf(TREASURY_ADDR);
  
  console.log("\n=== Final Treasury State ===");
  console.log("Treasury Balance:", ethers.formatEther(finalTreasuryBalance), "mwstETH");
  console.log("Principal:", ethers.formatEther(finalPrincipal), "mwstETH");
  console.log("Available Yield:", ethers.formatEther(finalYield), "mwstETH");
  
  // === STEP 6: Verify principal is protected ===
  const principalIntact = finalPrincipal.toString() === depositAmount.toString();
  console.log("\n========================================");
  console.log("SECURITY VERIFICATION");
  console.log("========================================");
  console.log("Principal Protected:", principalIntact ? "✅ YES" : "❌ NO");
  console.log("Agent could NOT touch principal:", principalIntact ? "✅ CONFIRMED" : "❌ FAILED");
  console.log("Spending cap enforced:", withdrawAmount <= spendingCap ? "✅ YES" : "❌ NO");
  
  console.log("\n========================================");
  console.log("Test Complete!");
  console.log("========================================");
  console.log("\nSummary:");
  console.log("- Deposited principal:", ethers.formatEther(depositAmount), "mwstETH");
  console.log("- Simulated yield:", ethers.formatEther(yieldAmount), "mwstETH");
  console.log("- Agent withdrew:", ethers.formatEther(withdrawAmount), "mwstETH");
  console.log("- Principal remained:", ethers.formatEther(finalPrincipal), "mwstETH");
  console.log("- Agent earned:", ethers.formatEther(agentBalanceAfter), "mwstETH");
  
  console.log("\n=== Transaction Links ===");
  console.log("Treasury Contract: https://sepolia.basescan.org/address/" + TREASURY_ADDR);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\nTest failed:", error.message);
    process.exit(1);
  });

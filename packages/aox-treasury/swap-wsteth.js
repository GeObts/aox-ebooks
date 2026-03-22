const { ethers } = require("hardhat");

// Uniswap V3 on Base
const SWAP_ROUTER = "0x2626664c2603336E57B271c5C0b26F421741e481";
const WETH = "0x4200000000000000000000000000000000000006";
const WSTETH = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
const BANKER = "0x7e7f825248Ae530610F34a5deB9Bc423f6d63373";

// Uniswap V3 SwapRouter ABI (simplified)
const ROUTER_ABI = [
  "function exactInputSingle(tuple(address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

const WETH_ABI = [
  "function deposit() external payable",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)"
];

async function main() {
  console.log("\n========================================");
  console.log("Swapping ETH → wstETH on Uniswap V3");
  console.log("========================================\n");
  
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  
  const ethBalance = await ethers.provider.getBalance(signer.address);
  console.log("ETH Balance:", ethers.formatEther(ethBalance), "ETH");
  
  // Amount to swap: ~$5 worth of ETH
  const swapAmount = ethers.parseEther("0.0025"); // 0.0025 ETH ~ $5
  const gasBuffer = ethers.parseEther("0.001"); // Keep 0.001 ETH for gas
  
  if (ethBalance < swapAmount + gasBuffer) {
    throw new Error(`Insufficient ETH. Have: ${ethers.formatEther(ethBalance)}, Need: ${ethers.formatEther(swapAmount + gasBuffer)}`);
  }
  
  console.log("\nSwapping:", ethers.formatEther(swapAmount), "ETH");
  console.log("Target: wstETH (", WSTETH, ")");
  
  // Wrap ETH to WETH
  console.log("\n=== Step 1: Wrapping ETH to WETH ===");
  const weth = new ethers.Contract(WETH, WETH_ABI, signer);
  const wrapTx = await weth.deposit({ value: swapAmount });
  await wrapTx.wait();
  console.log("✅ Wrapped", ethers.formatEther(swapAmount), "ETH → WETH");
  console.log("Transaction:", wrapTx.hash);
  
  // Approve WETH to router
  console.log("\n=== Step 2: Approving WETH to Router ===");
  const approveTx = await weth.approve(SWAP_ROUTER, swapAmount);
  await approveTx.wait();
  console.log("✅ Approved", ethers.formatEther(swapAmount), "WETH to router");
  console.log("Transaction:", approveTx.hash);
  
  // Execute swap
  console.log("\n=== Step 3: Swapping WETH → wstETH ===");
  const router = new ethers.Contract(SWAP_ROUTER, ROUTER_ABI, signer);
  
  const params = {
    tokenIn: WETH,
    tokenOut: WSTETH,
    fee: 500, // 0.05% fee tier
    recipient: signer.address,
    amountIn: swapAmount,
    amountOutMinimum: 0, // Accept any amount (for testing - in production use slippage protection)
    sqrtPriceLimitX96: 0
  };
  
  const swapTx = await router.exactInputSingle(params);
  const swapReceipt = await swapTx.wait();
  console.log("✅ Swapped WETH → wstETH");
  console.log("Transaction:", swapReceipt.hash);
  
  // Check wstETH balance
  const wsteth = new ethers.Contract(WSTETH, ERC20_ABI, signer);
  const wstethBalance = await wsteth.balanceOf(signer.address);
  console.log("\n=== Result ===");
  console.log("wstETH Received:", ethers.formatEther(wstethBalance), "wstETH");
  
  // Send to Banker
  console.log("\n=== Step 4: Sending wstETH to Banker ===");
  console.log("Banker:", BANKER);
  
  const transferTx = await wsteth.transfer(BANKER, wstethBalance);
  await transferTx.wait();
  console.log("✅ Sent", ethers.formatEther(wstethBalance), "wstETH to Banker");
  console.log("Transaction:", transferTx.hash);
  
  // Verify
  const bankerBalance = await wsteth.balanceOf(BANKER);
  console.log("\n=== Final Verification ===");
  console.log("Banker wstETH Balance:", ethers.formatEther(bankerBalance), "wstETH");
  
  console.log("\n========================================");
  console.log("Complete!");
  console.log("========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\nSwap failed:", error.message);
    process.exit(1);
  });

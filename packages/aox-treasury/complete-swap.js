const { ethers } = require("hardhat");

const SWAP_ROUTER = "0x2626664c2603336E57B271c5C0b26F421741e481";
const WETH = "0x4200000000000000000000000000000000000006";
const WSTETH = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
const BANKER = "0x7e7f825248Ae530610F34a5deB9Bc423f6d63373";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)"
];

const ROUTER_ABI = [
  "function exactInputSingle(tuple(address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)"
];

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  
  const weth = new ethers.Contract(WETH, ERC20_ABI, signer);
  const wsteth = new ethers.Contract(WSTETH, ERC20_ABI, signer);
  const router = new ethers.Contract(SWAP_ROUTER, ROUTER_ABI, signer);
  
  // Check current balances
  const wethBalance = await weth.balanceOf(signer.address);
  const wstethBalance = await wsteth.balanceOf(signer.address);
  
  console.log("\nCurrent Balances:");
  console.log("  WETH:", ethers.formatEther(wethBalance), "WETH");
  console.log("  wstETH:", ethers.formatEther(wstethBalance), "wstETH");
  
  // If we have WETH, swap it
  if (wethBalance > 0) {
    console.log("\n=== Approving WETH to Router ===");
    const approveTx = await weth.approve(SWAP_ROUTER, wethBalance);
    await approveTx.wait();
    console.log("✅ Approved", ethers.formatEther(wethBalance), "WETH");
    console.log("Tx:", approveTx.hash);
    
    await new Promise(r => setTimeout(r, 5000));
    
    console.log("\n=== Swapping WETH → wstETH ===");
    const params = {
      tokenIn: WETH,
      tokenOut: WSTETH,
      fee: 500,
      recipient: signer.address,
      amountIn: wethBalance,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    };
    
    const swapTx = await router.exactInputSingle(params);
    const swapReceipt = await swapTx.wait();
    console.log("✅ Swapped WETH → wstETH");
    console.log("Tx:", swapReceipt.hash);
    
    await new Promise(r => setTimeout(r, 5000));
  }
  
  // Get updated wstETH balance
  const finalWstethBalance = await wsteth.balanceOf(signer.address);
  console.log("\nwstETH Balance:", ethers.formatEther(finalWstethBalance), "wstETH");
  
  // Send to Banker
  if (finalWstethBalance > 0) {
    console.log("\n=== Sending wstETH to Banker ===");
    const transferTx = await wsteth.transfer(BANKER, finalWstethBalance);
    await transferTx.wait();
    console.log("✅ Sent", ethers.formatEther(finalWstethBalance), "wstETH to Banker");
    console.log("Tx:", transferTx.hash);
    
    await new Promise(r => setTimeout(r, 5000));
    
    const bankerBalance = await wsteth.balanceOf(BANKER);
    console.log("\nBanker wstETH:", ethers.formatEther(bankerBalance), "wstETH");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\nError:", error.message);
    process.exit(1);
  });

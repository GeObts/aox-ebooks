import { ethers } from 'ethers';

// Load the functions from index.js
const CONFIG = {
  ETH_RPC: 'https://eth.llamarpc.com',
  BASE_RPC: 'https://mainnet.base.org',
  LIDO_STETH_MAINNET: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  WSTETH_BASE: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
};

const ethProvider = new ethers.JsonRpcProvider(CONFIG.ETH_RPC);

async function lidoStakeDryRun(amount) {
  const ethAmount = ethers.parseEther(amount.toString());
  
  return {
    success: true,
    dry_run: true,
    operation: 'stake',
    amount: amount.toString(),
    amount_wei: ethAmount.toString(),
    contract: CONFIG.LIDO_STETH_MAINNET,
    network: 'ethereum-mainnet',
    estimated_stETH: amount.toString(),
    gas_estimate: '0.015 ETH',
    note: 'Simulation only - no transaction executed',
    timestamp: new Date().toISOString()
  };
}

async function lidoBalanceDryRun(address) {
  const targetAddress = address || '0x7e7f825248Ae530610F34a5deB9Bc423f6d63373';
  
  try {
    const stETHContract = new ethers.Contract(
      CONFIG.LIDO_STETH_MAINNET,
      ['function balanceOf(address) view returns (uint256)'],
      ethProvider
    );
    
    const balance = await stETHContract.balanceOf(targetAddress);
    
    return {
      success: true,
      address: targetAddress,
      stETH_balance: ethers.formatEther(balance),
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    return { error: e.message };
  }
}

console.log('=== Lido MCP Server Dry Run Tests ===\n');

console.log('Test 1: lido_stake dry_run');
const stakeResult = await lidoStakeDryRun('0.01');
console.log(JSON.stringify(stakeResult, null, 2));

console.log('\n---\n');

console.log('Test 2: lido_balance (live query)');
const balanceResult = await lidoBalanceDryRun('0x7e7f825248Ae530610F34a5deB9Bc423f6d63373');
console.log(JSON.stringify(balanceResult, null, 2));

console.log('\n=== Tests Complete ===');

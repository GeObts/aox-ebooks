'use client';

const items = [
  'NEW TOKEN DETECTED ON BASE',
  'NFT CONTRACT VERIFIED \u2014 SCORE 87',
  'LEAD #1043 SOLD \u2014 25 USDC',
  'LIQUIDITY EVENT FLAGGED \u2014 $240K',
  'GITHUB REPO DETECTED \u2014 3 CONTRIBUTORS',
  'TREASURY UPDATED \u2014 +25 USDC',
  'DEPLOYER WALLET ANALYZED \u2014 4Y HISTORY',
];

export function Ticker() {
  // Duplicate for seamless infinite scroll
  const allItems = [...items, ...items];

  return (
    <div className="ticker">
      <div className="ticker-inner">
        {allItems.map((text, i) => (
          <span className="ticker-item" key={i}>
            <span className="dot">{'\u25C6'}</span> {text}
          </span>
        ))}
      </div>
    </div>
  );
}

const fkGroteskFamily = fetch(
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
).body;

const interFamily = fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;700&display=swap"
).body;

if (!fkGroteskFamily && !interFamily) {
  return;
}

const Theme = styled.div`
* {
    font-family: 'Space Grotesk, Inter';
}
  ${fkGroteskFamily}
  ${interFamily}
`;

const Heading1 = styled.div`
    font-family: 'Space Grotesk';
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
`;
const Text = styled.div`
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
`;
return (
  <Theme>
    <div class="text-center">
      <Heading1>Crypto ipsum near</Heading1>
      <Text>
        Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena
        polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin
        litecoin. Ethereum kadena{" "}
      </Text>
    </div>
  </Theme>
);

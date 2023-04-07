const Banner = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 35px;
`;
const Logo = styled.img`
    width: 80px;
    position: absolute;
    top: 120px;
    left: 50px;
    z-index: 1;
    border-radius: 50%;
    background: rgba(68, 152, 224, 0.75);
`;

const Lines = styled.div`
    position: absolute;
    top:24px;
    left:0;
    width: 100%;
    height: 200px;
    background: url("https://ipfs.near.social/ipfs/bafybeibrijoowwlrlhxn54skisw2uitt3bex54yirua74nlbo2gkee5d2a");
    background-size: contain;
    background-repeat: no-repeat;
`;

return (
  <Banner role="banner">
    <Logo src="https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq" />
    <Lines src="https://ipfs.near.social/ipfs/bafybeifjsr4vz2266xw27t4uvlhelnixnbxozfkmr7c7zhpsnkttucrkli" />
  </Banner>
);

const Banner = styled.div`
    width: 100%;
    height: 200px;
`;
const Logo = styled.img`
    width: 130px;
    position: absolute;
    top: 22px;
    left: 50px;
    z-index: 1;
    border-radius: 50%;
    background: rgba(68, 152, 224, 0.75);
`;

const Lines = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 200px;
    background: url("https://ipfs.near.social/ipfs/bafybeibrijoowwlrlhxn54skisw2uitt3bex54yirua74nlbo2gkee5d2a");
    background-size: contain;
    background-repeat: no-repeat;
`;

return (
  <Banner role="banner">
    <Logo src="https://ipfs.near.social/ipfs/bafkreihbisodby5rjawdzxqokdbqbrcskp2kayrqcos73smdba2svzciym" />
    <Lines src="https://ipfs.near.social/ipfs/bafybeifjsr4vz2266xw27t4uvlhelnixnbxozfkmr7c7zhpsnkttucrkli" />
  </Banner>
);

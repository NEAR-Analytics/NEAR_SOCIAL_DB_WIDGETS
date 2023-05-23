const Banner = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    margin-top: 24px;
`;
const Logo = styled.img`
    width: 70px;
    z-index: 1;
    border-radius: 50%;
    box-shadow:rgba(68, 152, 224, 0.5) -6px 2px 24px;
    margin-right: 30px;
    margin-left: 30px;
`;

const Lines = styled.div`
    width: 100%;
    height: 200px;
    background: url("https://ipfs.near.social/ipfs/bafybeibrijoowwlrlhxn54skisw2uitt3bex54yirua74nlbo2gkee5d2a");
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-mask-image:-webkit-gradient(linear, 50% center, left center, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 50px;
  }
`;

return (
    <Banner role="banner">
        <Header>
            <Logo src="https://pbs.twimg.com/profile_images/1409918699230744584/6kUQ-4xH_400x400.jpg" />
            <h1>Sputnik BOS</h1>

        </Header>
        <h2 style={{marginTop: '20px'}}>A complete dashboard and interface for any Sputnik DAO provided by
            <a href={'https://pikespeak.ai'} target={'_blank'}>
                <img
                    src={'https://pbs.twimg.com/profile_images/1539950049316278273/RoyRevrB_400x400.jpg'}
                    style={{width: "80px", borderRadius: '50%'}}
                />
            </a>
        </h2>
    </Banner>
);

const Card = styled.div`
width: 326px;
height: 328px;
margin-left:auto;
margin-right:auto;
background: #F8F8F9;
border-radius: 10px;
`;

const HeaderCard = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;
`;

const ProfileImg = styled.img`
width: 32px;
height: 32px;
flex: none;
order: 0;
flex-grow: 0;
`;

return (
  <Card>
    <HeaderCard>
      <ProfileImg
        alt="pic"
        src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmSvFXCFoR89xvnJKRER2DWEAqRhxtC6DxhyCrzdbP8g41?preview=1&_gl=1*ppkzv7*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njc4NDA5Ni41LjAuMTY4Njc4NDA5Ni42MC4wLjA.`}
      ></ProfileImg>
    </HeaderCard>
  </Card>
);

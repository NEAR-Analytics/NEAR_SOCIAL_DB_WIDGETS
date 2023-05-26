const componentsUrl = "#/near/widget/ComponentsPage";
//bozon.near/widget/WidgetHistory

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TextLink = styled.a`
  color: #006adc;
  outline: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  &:hover,
  &:focus {
    color: #006adc;
    text-decoration: underline;
  }
`;

return (
  <Wrapper>
    <Header>
      <H2>NFT Components</H2>
    </Header>

    <Items>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "jgodwill.near/widget/GenaDropmultichainminter" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mintbase.near/widget/nft-marketplace" }}
        />
      </Item>

      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884/widget/NFT-Collection-Holder-Snapshot",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884/widget/Wallet-Viewer-Indexer-xyz",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884/widget/NFT-Collection-Data",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "minorityprogrammers.near/widget/NFTSelector" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "cuongdcdev.near/widget/linkdrop_plus" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "cuongdcdev.near/widget/linkdrop-viewer" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "onboarder.near/widget/NFT-Transfer" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "jgodiwll/widget/genadropExplore" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mob.near/widget/YourNFTs" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "harmonic1.near/widget/NFTViewer" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "calebjacob.near/widget/NFTCollection" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "contesty.near/widget/NftVotingLeaderboard" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "genadrop.near/widget/GenaDropMultilisting",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mintbase.near/widget/minsta" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "namesky.near/widget/Widget-0" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mintbase.near/widget/ListToMarket" }}
        />
      </Item>
    </Items>
  </Wrapper>
);

// add mintbase widgets
// add geneadrop
// add indexer widgets
// add linkdrop widgets

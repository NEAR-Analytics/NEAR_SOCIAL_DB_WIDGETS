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
      <H2>EVM/Eth Components</H2>
    </Header>

    <Items>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "zavodil.near/widget/Lido" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "0xprometheus.near/widget/GainsNetwork" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "ejj.near/widget/swap" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mattlock.near/widget/canto-swap-container" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "alotaco.near/widget/SushiSwap" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "0xprometheus.near/widget/NftMinter" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "a_liutiev.near/widget/ETHDenver2023" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "zavodil.near/widget/erc20-sender" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "syi216.near/widget/Swap-ethxsushi-usdt-near" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "testbrrr.near/widget/zksync" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mattlock.near/widget/Galxe-SpaceID" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "testbrrr.near/widget/zk-bridge" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "testbrrr.near/widget/zkevm ciocan.near/widget/zk-bridge",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "syi216.near/widget/GNS-Container" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "onboarder.near/widget/polygon-erc20-sender" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "chanon.near/widget/1inch" }}
        />
      </Item>
    </Items>
  </Wrapper>
);

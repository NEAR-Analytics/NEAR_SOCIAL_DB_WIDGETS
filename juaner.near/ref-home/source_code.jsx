const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    .flex-grow{
      flex-grow: 1;
    }
`;
const MenuContainer = styled.div`
    padding:0 12px;
    .item{
        display:flex;
        align-items:center;
        justify-content:center;
        width:167px;
        height:46px;
        border-radius: 12px;
        font-weight: 500;
        font-size: 14px;
        color:#7E8A93;
        cursor:pointer;
        margin-bottom:20px;
    }
    .item.active{
        background: #1A2E33;
        color:#fff;
    }
    .item.disable{
       cursor:not-allowed;
    }
`;
const { activeMenu } = state;
State.init({
  activeMenu: "lending",
});
function changeTab(menu) {
  State.update({
    activeMenu: menu,
  });
}
return (
  <Container>
    <MenuContainer>
      <div
        onClick={() => {
          changeTab("lending");
        }}
        class={`item ${activeMenu == "lending" ? "active" : ""}`}
      >
        Lending
      </div>
      <div
        onClick={() => {
          changeTab("swap");
        }}
        class={`item ${activeMenu == "swap" ? "active" : ""}`}
      >
        Swap
      </div>
      <div class="item disable">Markets</div>
      <div class="item disable">Vaults</div>
      <div class="item disable">History</div>
    </MenuContainer>
    <div class="flex-grow">
      {activeMenu == "lending" ? (
        <Widget src="juaner.near/widget/ref-lending" />
      ) : null}
      {activeMenu == "swap" ? (
        <Widget src="weige.near/widget/ref-swap" />
      ) : null}
    </div>
  </Container>
);

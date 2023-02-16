const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .btn-outline-primary {
    --bs-btn-bg: rgba(0, 0, 0, 0.05);
    --bs-btn-color: rgba(0, 0, 0, 0.4);
    --bs-btn-border-color: rgba(0, 0, 0, 0.1);
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: rgba(0, 0, 0, 0.1);
    --bs-btn-hover-border-color: #0d6efd;
    --bs-btn-focus-shadow-rgb: 13,110,253;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #fff;
    --bs-btn-active-border-color: rgba(0, 0, 0, 0.1);
}


`;

const Nav = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const LeftPanel = styled.div`
  width: 60%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 400px;
  padding-right: 2rem;
`;

const RightPanel = styled.div`
  padding-left: 1rem;
`;

if (!state.actionTabs) {
  State.update({ actionTabs: "deposit" });
}

return (
  <Container>
    <Nav class="grid">
      <div class="">Burrow logo</div>
      <div class="px-4">Assets | Portfolio</div>
    </Nav>
    <Main>
      <LeftPanel>
        <Widget src="ciocan.near/widget/burrow-list" />
      </LeftPanel>
      <RightPanel>
        <div class="btn-group mb-4" role="group" aria-label="Deposit">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="deposit"
            autocomplete="off"
            checked={state.actionTabs === "deposit"}
            onClick={() => State.update({ actionTabs: "deposit" })}
          />
          <label class="btn btn-outline-primary" for="deposit">
            Deposit
          </label>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="borrow"
            autocomplete="off"
            checked={state.actionTabs === "borrow"}
            onClick={() => State.update({ actionTabs: "borrow" })}
          />
          <label class="btn btn-outline-primary" for="borrow">
            Borrow
          </label>
        </div>
        {state.actionTabs === "borrow" ? (
          <Widget src="ciocan.near/widget/burrow-borrow" />
        ) : (
          <Widget src="ciocan.near/widget/burrow-deposit" />
        )}
      </RightPanel>
    </Main>
  </Container>
);

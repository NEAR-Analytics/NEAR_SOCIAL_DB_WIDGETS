const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .list .btn-outline-primary {
    --bs-btn-bg: rgba(0, 0, 0, 0.05);
    --bs-btn-color: rgba(0, 0, 0, 0.4);
    --bs-btn-border-color: none;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #fff;
    --bs-btn-bg: #fff;
  }

  .action .btn-outline-primary {
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

  .badge {
    color: #4ED58A !important;
    background: rgba(71, 200, 128, 0.1) !important;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
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

if (!state.actionList) {
  State.update({ actionList: "assets" });
}

return (
  <Container>
    <Nav>
      <div class="fw-bold">Burrow</div>
      <div class="list btn-group" role="group" aria-label="List">
        <input
          type="radio"
          class="btn-check"
          name="btnradiolist"
          id="assets"
          autocomplete="off"
          checked={state.actionList === "assets"}
          onClick={() => State.update({ actionList: "assets" })}
        />
        <label class="btn btn-outline-primary" for="assets">
          Assets
        </label>
        <input
          type="radio"
          class="btn-check"
          name="btnradiolist"
          id="portfolio"
          autocomplete="off"
          checked={state.actionList === "portfolio"}
          onClick={() => State.update({ actionList: "portfolio" })}
        />
        <label class="btn btn-outline-primary" for="portfolio">
          Portfolio
        </label>
      </div>
    </Nav>
    <Main>
      <LeftPanel>
        {state.actionList === "assets" ? (
          <Widget src="ciocan.near/widget/burrow-list" />
        ) : (
          <Widget src="ciocan.near/widget/burrow-portfolio" />
        )}
      </LeftPanel>
      <RightPanel>
        <div class="action btn-group mb-4" role="group" aria-label="Deposit">
          <input
            type="radio"
            class="btn-check"
            name="btnradioaction"
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
            name="btnradioaction"
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

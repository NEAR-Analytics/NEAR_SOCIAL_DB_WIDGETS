const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

State.update({ actionTabs: "deposit" });

return (
  <Container>
    <Nav>Burrow</Nav>
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
        {state.actionTabs === "deposit" ? (
          <Widget src="ciocan.near/widget/burrow-deposit" />
        ) : (
          <Widget src="ciocan.near/widget/burrow-borrow" />
        )}
      </RightPanel>
    </Main>
  </Container>
);

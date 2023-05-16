const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-arround;
`;

const BetweenFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TokenWrapper = styled.input`
  text-align: end;
  min-width: 300px;
  width: 90%;
`;

const DropdownButton = styled.button`
  width: 150px;
  border: solid 1px;
  border-radius: 5px;
`;

const DollarWrapper = styled.input`
  width: 100%;
  border: 0;
`;

const Navigation = styled.p`
  cursor: pointer;
  margin: auto;
`;

const Settings = styled.div`
  cursor: pointer;
  margin: auto 0;
`;

const Token = (props) => (
  <TokenWrapper
    id={props.id}
    type="number"
    onChange={props.onChange}
    value={props.value}
  />
);

const Dollar = (props) => {
  return <DollarWrapper readOnly value={props.value} />;
};

const callContract = () =>
  Near.call("nearsocialexamples.near", "set_greeting", {
    message: `From Token: ${state.from_token} → To Token: ${state.to_token}`,
  });

const changeToken = ({ target }) => {
  State.update({
    ...state,
    [target.id]: target.value,
  });
};

State.init({
  from_token: 0,
  to_token: 0,
  greeting: Near.view("nearsocialexamples.near", "get_greeting", `{}`),
});

const viewContract = () => {
  State.update({
    ...state,
    greeting: Near.view("nearsocialexamples.near", "get_greeting", `{}`),
  });
};

console.log({ state });

return (
  <>
    <label>greeting message is..</label>
    <input type="text" value={state.greeting} readOnly />
    <button onClick={callContract}> Call Contract</button>
    <button onClick={viewContract}> View Contract</button>
    <BetweenFlexWrapper>
      <Token id="from_token" onChange={changeToken} value={state.from_token} />
    </BetweenFlexWrapper>
    <BetweenFlexWrapper>
      <Token id="to_token" onChange={changeToken} value={state.to_token} />
    </BetweenFlexWrapper>
  </>
);

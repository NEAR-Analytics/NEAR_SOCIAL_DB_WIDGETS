const Near3Wrapper = styled.div`
  background-color: lightcyan;
  padding: 1rem;
`;

State.init({ msg: "nothing" });

return (
  <Near3Wrapper>
    <p>Component-3 : near-3.jsx</p>
    <p>State : {state.msg}</p>
    <input
      onChange={(e) => {
        State.update({ msg: e.target.value });
      }}
    ></input>
  </Near3Wrapper>
);

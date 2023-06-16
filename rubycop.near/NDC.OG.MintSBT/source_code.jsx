const conrtactId = props.conrtactId ?? "community-v1.i-am-human.near";

const Container = styled.div`
  padding: 30px 0;
`;

const InputField = styled.div`
  margin: 20px 0;
`;

const PrimaryButton = styled.button`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border: 0;
`;

State.init({
  ogAccountId: "",
});

const handleMint = () => {
  Near.call([
    {
      contractName: conrtactId,
      methodName: "sbt_mint",
      args: { receiver: state.ogAccountId, metadata: { class: 1 } },
      gas: "70000000000000",
      deposit: 7000000000000000000000,
    },
  ]);
};

return (
  <Container>
    <h3>Mint SBT for selected OG member</h3>
    <InputField>
      <input
        type="text"
        onChange={(e) => State.update({ ogAccountId: e.target.value })}
      />
    </InputField>
    <PrimaryButton onClick={handleMint}>Mint</PrimaryButton>
  </Container>
);

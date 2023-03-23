if (state.sender === undefined) {
  return <Web3Connect connectLabel="Connect with Web3" />;
} else {
  return (
    <div>
      <h1>Lending</h1>
      <div>{state.sender}</div>
    </div>
  );
}

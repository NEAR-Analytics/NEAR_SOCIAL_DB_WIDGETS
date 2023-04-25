return <><button onClick={() => {
  Storage.set("S", "H");
}}>Set</button><button onClick={() => {
  console.log(Storage.get("S"));
}>Get</button></>;

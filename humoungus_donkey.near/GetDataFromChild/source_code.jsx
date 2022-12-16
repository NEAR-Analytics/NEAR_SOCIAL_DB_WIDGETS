const passDataUp = (message) => {
  console.log("received message:", message);
};

return (
  <Widget
    src="humoungus_donkey.near/widget/PassDataToParent"
    props={{ passDataUp }}
  />
);

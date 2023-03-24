return (
  <Widget
    src="calebjacob.near/widget/TestButtonSimple"
    onClick={(e) => {
      console.log(e);
      document.body.style.background = "red";
    }}
    props={{ label: "Click" }}
  />
);

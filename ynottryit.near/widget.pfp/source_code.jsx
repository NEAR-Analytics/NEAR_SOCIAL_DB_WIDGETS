const user = "ynottryit.near";
const props = { name: "PFP" };

return (
  <>
    <div class="container min-vw-100">
      <h3> PFP Widget </h3>
      <p> This widget is composable and reusable </p>
      <hr />

      <Widget src={`${user}/widget/PFP`} props={props} />
    </div>
  </>
);

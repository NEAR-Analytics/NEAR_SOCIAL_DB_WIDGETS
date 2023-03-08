const drAccount =
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055";

const mainApp = `${drAccount}/widget/Learning.Main`;

const currentPage = props.currentPage || `${drAccount}/widget/SimplyTest`;

const nameToUri = (name) => `${drAccount}/widget/${name}`;

const labels = ["Hello World", "SimplyTest"];
const widgets = [nameToUri("HelloWorld"), nameToUri("SimplyTest")];

if (labels.length != widgets.length) {
  return "Make sure the labels and widgets have the same length";
}

return (
  <>
    {state.widgetSrc}
    <div class="container">
      <div class="row">
        <div class="col-3">
          <b>Start</b>
          <Widget
            src={nameToUri("Learning.Menu")}
            props={{
              labels,
              widgets,
              mainApp,
            }}
          />
        </div>
        <div class="col-9" id="widget">
          <Widget src={currentPage} />
        </div>
      </div>
    </div>
  </>
);

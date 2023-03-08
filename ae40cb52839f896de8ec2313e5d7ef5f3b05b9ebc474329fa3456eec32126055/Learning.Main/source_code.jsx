const drAccount =
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055";
const nameToUrl = (name) => `${drAccount}/widget/${name}`;

const mainApp = `${drAccount}/widget/Learning.Main`;

const currentWidget = nameToUrl(props.currentWidget || `SimplyTest`);

const labels = ["Hello World", "SimplyTest"];
const widgets = ["HelloNear", "SimplyTest"];

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
            src={nameToUrl("Learning.Menu")}
            props={{
              labels,
              widgets,
              mainApp,
            }}
          />
        </div>
        <div class="col-9" id="widget">
          <Widget src={currentWidget} />
        </div>
      </div>
    </div>
  </>
);

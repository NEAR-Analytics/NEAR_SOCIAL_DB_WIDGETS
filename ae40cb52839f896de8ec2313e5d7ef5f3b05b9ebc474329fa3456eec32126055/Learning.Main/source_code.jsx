const currentPage =
  props.currentPage ||
  `ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/SimplyTest`;

const nameToUri = (name) =>
  `ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/${name}`;

const labels = ["Hello World", "SimplyTest"];
const widgets = [nameToUri("HelloWorld"), nameToUri("SimplyTest")];

if (labels.length != widgets.length) {
  throw Error("Make sure the labels and widgets have the same length");
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
              onclick: state.onclick,
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

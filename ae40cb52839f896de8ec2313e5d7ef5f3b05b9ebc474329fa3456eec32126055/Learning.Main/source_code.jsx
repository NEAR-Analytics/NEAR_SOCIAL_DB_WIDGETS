const srcWidget = (name) =>
  `ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/${name}`;

State.init({
  widgetSrc: srcWidget("SimplyTest"),
  onclick: (src) => {
    State.update({ widgetSrc: src });
  },
});

const labels = ["Hello World", "SimplyTest"];
const widgets = [srcWidget("HelloWorld"), srcWidget("SimplyTest")];

if (labels.length != widgets.length) {
  throw Error("Make sure the labels and widgets have the same length");
}

return (
  <>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <Widget
            src={srcWidget("Learning.Menu")}
            props={{
              labels,
              widgets,
              onclick: state.onclick,
            }}
          />
        </div>
        <div class="col-9">
          <Widget src={state.widgetSrc} />
        </div>
      </div>
    </div>
  </>
);

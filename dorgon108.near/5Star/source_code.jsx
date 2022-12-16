// Set Contract Name
const cName = "5star.dorgon108.near";
//Load widget Names
// let widgetNames = Near.view(cName, "getListOfWidgets");
let widgetNames = ["hey", "yeha"];

//Load Widget Rating Array
let ratingAverages = widgetNames.map((element, i) => {
  return Math.round(
    Near.view(cName, "getVoteAverage", {
      widgetName: element,
    })
  );
});

// let WidgetNames = ["poll", "checkers", "Dao"];
let value = 5;

return (
  <div>
    <Widget src="dorgon108.near/widget/NewWidgetForm" />
    <Widget
      src="dorgon108.near/widget/Star-Rating-Widget"
      props={{
        className: "float-start d-inline-block me-2",
      }}
    />

    <div>
      {widgetNames.map((el, i) => {
        let value = ratingAverages[i];
        let title = el;
        return (
          <div key={i} style={{ backgroundColor: "#A8A8A8", margin: "10px" }}>
            {
              <div>
                <div>
                  <h1>{el}</h1>
                  <h2>
                    <Widget
                      src="dorgon108.near/widget/Star-Rating-Static"
                      props={{
                        value,
                      }}
                    />
                  </h2>
                </div>
                <div>
                  <h2>"Add Your Rating"</h2>
                  <Widget
                    src="dorgon108.near/widget/Star-Rating-Widget"
                    props={{
                      title,
                    }}
                  />
                </div>
              </div>
            }
            {}
          </div>
        );
      })}
    </div>
  </div>
);

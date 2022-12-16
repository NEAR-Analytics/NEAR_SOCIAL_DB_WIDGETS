// Set Contract Name
const cName = "5star.dorgon108.near";
//Load widget Names
let widgetNames = Near.view(cName, "getListOfWidgets");
// let widgetNames = ["hey", "yeha"];

//get widgetInfo
let widgetInfo = widgetNames.map((el) => {
  return Near.view(cName, "getWidgetObject", { title: el });
});

//Load Widget Ranking Average
let ratingAverages = widgetNames.map((element, i) => {
  console.log("average title name", element);
  return Math.round(
    Near.view(cName, "getVoteAverage", {
      widgetName: element,
    })
  );
});

// Load Widget Ranking Array to get total votes
let rankingArraysLength = widgetNames.map((element, i) => {
  let arrays = Near.view(cName, "getRankingArray", { widgetName: element });
  return arrays.length;
});
console.log("vote array", rankingArraysLength);

// let WidgetNames = ["poll", "checkers", "Dao"];
let value = 5;

return (
  <div>
    <h1>5star</h1>
    <h2>`One stop shop for widget ratings`</h2>
    <Widget src="dorgon108.near/widget/NewWidgetForm" />

    <div>
      {widgetNames.map((el, i) => {
        let value = ratingAverages[i];
        let title = el;
        let owner = widgetInfo[i].owner;
        let url = widgetInfo[i].url;
        let image = widgetInfo[i].image;
        let totalVotes = rankingArraysLength[i];

        return (
          <div key={i} style={{ backgroundColor: "#A8A8A8", margin: "10px" }}>
            {
              <div>
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={image} style={{ width: "30vw" }} />
                  </div>

                  <h1>{el}</h1>
                  <h2>Owner:{owner}</h2>
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
                  <p>`total votes:{totalVotes}`</p>
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

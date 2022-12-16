let widgets = props.widgetNames || ["testtitle1", "testtitle2", "testtitle3"];
let ratings = [1, 2, 5];
return (
  <div>
    {widgets.map((el, i) => {
      let value = ratings[i];
      return (
        <div key={i} style={{ backgroundColor: "#A8A8A8", margin: "10px" }}>
          {
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
          }
        </div>
      );
    })}
  </div>
);

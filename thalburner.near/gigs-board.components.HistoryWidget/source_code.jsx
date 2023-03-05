function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Use template literal to construct the formatted string
  const formatted = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formatted;
}

const post = Near.view("devgovgigs.near", "get_post", {
  post_id: props.post_id,
});

const history = post.snapshot_history;

history.unshift(post.snapshot);

State.init({
  firstShownHistory: {},
  secondShownHistory: {},
  firstShown: false,
  secondShown: false,
  changes: [],
});

const changeFirstShownHistory = (timestamp) => {
  State.update({
    firstShownHistory: history.filter(
      (item) => item.timestamp === timestamp
    )[0],
    firstShown: true,
  });
  state.secondShownState &&
    State.update({
      changes: summaryOfChanges(),
    });
};

const changeSecondShownHistory = (timestamp) => {
  console.log(timestamp);
  console.log("before", state);
  State.update({
    secondShownHistory: history.filter(
      (item) => item.timestamp === timestamp
    )[0],
    secondShown: true,
  });
  state.firstShownState &&
    State.update({
      changes: summaryOfChanges(),
    });
};

const summaryOfChanges = () => {
  summaryOfChanges = [];
  if (state.firstShownHistory.editor_id != state.secondShownHistory.editor_id) {
    summaryOfChanges.push("The editors are different.");
  }
  if (state.firstShownHistory.name != state.secondShownHistory.name) {
    summaryOfChanges.push("The names are different.");
  }
  if (
    state.firstShownHistory.description != state.secondShownHistory.description
  ) {
    summaryOfChanges.push("The descriptions are different.");
  }
  return summaryOfChanges;
};

return (
  <div>
    {history ? (
      <div className="row">
        <div className="col-sm row">
          <h5>Select a timestamp </h5>
          <div>
            <select
              className="form-select col-sm"
              name="history_data1"
              id="history_data1"
              form="history_data1"
              onChange={(e) => changeFirstShownHistory(e.target.value)}
            >
              <option>Select a time stamp!</option>
              {history ? (
                history.map((item) => {
                  return (
                    <option value={item.timestamp}>
                      {`Lasted edited by ${item.editor_id} at ${formatDate(
                        parseInt(item.timestamp) / 1000000
                      )}`}
                    </option>
                  );
                })
              ) : (
                <option>No option available</option>
              )}
            </select>
          </div>
        </div>
        <div className="col-sm row">
          <h5>Select a second timestamp </h5>
          <div>
            <select
              className="form-select col-sm"
              name="history_data2"
              id="history_data2"
              form="history_data2"
              onChange={(e) => changeSecondShownHistory(e.target.value)}
            >
              <option value="">Select a time stamp!</option>
              {history ? (
                history.map((item) => {
                  return (
                    <option value={item.timestamp}>
                      {`Lasted edited by ${item.editor_id} at ${formatDate(
                        parseInt(item.timestamp) / 1000000
                      )}`}
                    </option>
                  );
                })
              ) : (
                <option>No option available</option>
              )}
            </select>
          </div>
        </div>
      </div>
    ) : (
      <div>loading...</div>
    )}
  </div>
);

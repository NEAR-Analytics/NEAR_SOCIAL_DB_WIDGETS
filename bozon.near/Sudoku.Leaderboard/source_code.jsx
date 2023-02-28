if (!props.leaderboard) return "";

State.init({
  top_by_count: Object.keys(props.leaderboard.top_by_count)
    .map((el) => [el, props.leaderboard.top_by_count[el]])
    .sort((a, b) => b[1] - a[1]),

  top_by_time: Object.keys(props.leaderboard.top_by_time)
    .map((el) => [el, props.leaderboard.top_by_time[el]])
    .sort((a, b) => a[1] - b[1]),

  tab: "top_by_count",
});

console.log(state.tab);

const Button = styled.button`
  border: none;
  background-color: rgb(143 217 165);
  border-radius: 10px;
  padding: 10px;

  &.selected {
    background-color: rgb(209 240 218);
  }
`;

return (
  <div>
    <div>
      <Button
        onClick={() => State.update({ tab: "top_by_count" })}
        className={`${state.tab === "top_by_count" ? "selected" : ""}`}
      >
        Top by count
      </Button>
      <Button
        onClick={() => State.update({ tab: "top_by_time" })}
        className={`${state.tab === "top_by_time" ? "selected" : ""}`}
      >
        Top by time
      </Button>
    </div>

    {state.tab == "top_by_count" &&
      state.top_by_count.map((el) => (
        <div class="p-4 d-flex flex-row justify-content-between align-items-center">
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: el[0] }}
          />
          {el[1]}
        </div>
      ))}

    {state.tab == "top_by_time" &&
      state.top_by_time.map((el) => (
        <div class="p-4 d-flex flex-row justify-content-between align-items-center">
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: el[0] }}
          />

          <Widget
            src="bozon.near/widget/TimeAgo"
            props={{
              diffSec: el[1],
            }}
          />
        </div>
      ))}
  </div>
);

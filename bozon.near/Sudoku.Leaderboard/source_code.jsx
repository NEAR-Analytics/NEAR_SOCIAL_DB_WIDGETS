if (!props.leaderboard) return "";

State.update({
  top_by_count: Object.keys(props.leaderboard.top_by_count)
    .map((el) => [el, props.leaderboard.top_by_count[el]])
    .sort((a, b) => a[1] - b[1]),
});

return (
  <div>
    {state.top_by_count.map((el) => (
      <div>
        {el[0]} {el[1]}
      </div>
    ))}
  </div>
);

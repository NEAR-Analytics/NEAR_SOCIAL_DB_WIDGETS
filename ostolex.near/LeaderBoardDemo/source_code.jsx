const names = [
  "Alex",
  "Yurii",
  "Dmitry",
  "Nick",
  "Maria",
  "Larry",
  "Legend",
  "User222",
  "BestPlayer",
  "Gamer",
];

const data = [];

for (let i = 0; i < 500; i++) {
  data.push({
    name: names[Math.floor(Math.random() * names.length)],
    score: Math.ceil(Math.random() * 1000),
  });
}

State.init({
  theme: "light",
  displayNums: [],
  lastIndex: 0,
  orderBy: 1,
  orderDirection: 1,
  rerender: false,
});

data.sort((a, b) => {
  if (a.score < b.score) {
    return -state.orderDirection;
  } else if (a.score > b.score) {
    return state.orderDirection;
  } else {
    return 0;
  }
});

const loadMore = (page) => {
  console.log(state.lastIndex < data.length);
  data
    .slice(state.lastIndex, state.lastIndex + 100)
    .forEach((i) => state.displayNums.push(i));
  state.lastIndex += 100;
  State.update();
};

const hasMore = () => {
  console.log(state.lastIndex < data.length);
  if (state.lastIndex < data.length) {
    return true;
  }
  return false;
};

const changeOrder = () => {
  if (state.orderDirection == 1) {
    State.update({ orderDirection: -1, displayNums: [], lastIndex: 0 });
  } else {
    State.update({ orderDirection: 1, displayNums: [], lastIndex: 0 });
  }
};

const changeTheme = () => {
  if (state.theme == "light") {
    State.update({ theme: "dark" });
  } else {
    State.update({ theme: "light" });
  }
};

return (
  <>
    <button onClick={changeOrder}>orderBy </button>
    <button onClick={changeTheme}>{state.theme}</button>
    <Widget
      src="ostolex.near/widget/LeaderBoardWidget"
      props={{
        thead: { User: "name", Score: "score" },
        data: state.displayNums,
        hasMore: hasMore,
        loadMore: loadMore,
        tableClass:
          state.theme == "light" ? "table table-striped" : "table table-dark",
      }}
    />
  </>
);

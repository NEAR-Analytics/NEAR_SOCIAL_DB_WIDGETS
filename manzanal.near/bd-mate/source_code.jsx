let accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

let counter = socialGet(`${accountId}/matecounter`);

if (!counter) {
  // no counter, initialize
  counter = 0;
} else {
  counter = parseInt(counter);
}

let nextState = {
  matecounter: counter + 1,
};
let mates = [];
for (let i = 0; i < counter; i++) {
  mates.push(<span>🧉</span>);
}

return (
  <div className="container">
    <div className="row mb-3">
      <div>Track your mate intake</div>
      <div>{mates}</div>
      <div className="mt-2">
        <CommitButton data={nextState}>drink a mate</CommitButton>
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h4>How to make mate</h4>
        <div>
          <a href="https://thewiki.near.page/near.social">
            https://yerbamatero.com/blogs/guides/how-to-prepare-yerba-mate
          </a>
        </div>
      </div>
    </div>
  </div>
);

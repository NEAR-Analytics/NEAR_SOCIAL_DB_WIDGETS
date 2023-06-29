const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const getPrompt = (page, cb) =>
  asyncFetch(
    `https://alpha.tryhologram.art/api/prompt/pagination?page=${page}`
  ).then(cb);

const initialPage = getRandomInt(10);
const lastPage = initialPage + 10;

State.init({
  contents: [],
  currentPage: initialPage,
  lastPage: lastPage,
  isLoading: true,
});

const loadMore = () => {
  State.update({
    isLoading: true,
    ...state,
  });
  const newPage = state.currentPage + 1;
  getPrompt(newPage, (res) => {
    console.log({ res });
    State.update({
      contents: state.contents.concat(res.body.prompt.rows),
      currentPage: newPage,
      lastPage: res.body.lastPage,
      isLoading: false,
    });
  });
};

const createCard = ({ imageUrl, creatorAddress, prompt, objectName }) => {
  return (
    <div class="text-center p-2">
      <p>
        <strong>⚡️ {objectName} ⚡️</strong>
      </p>
      <img class="border border-dark rounded" src={imageUrl} />
      <p>⛓️ {creatorAddress}</p>
      <p>🖌️ {prompt}</p>
    </div>
  );
};

return (
  <>
    {state.isLoading && (
      <div class="position-sticky alert alert-primary" role="alert">
        Loading...
      </div>
    )}

    <div class="container border border-info p-3 text-center min-vw-90">
      <h1>Hologram AI</h1>
      <p>What you are imagining today?</p>
    </div>
    <div className="px-2 mx-auto">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={state.currentPage ? state.currentPage < state.lastPage : true} // infinite
      >
        {state.contents.map(createCard)}
      </InfiniteScroll>
    </div>
  </>
);

const amountOfResultsToShowFirst = 5;
State.init({
  promotedPosts: [],
  shownPromotedPosts: [],
});

const daysBetweenTimestamps = (timestamp1, timestamp2) => {
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const timeDiff = Math.abs(timestamp2 - timestamp1); // difference in milliseconds
  const numDays = Math.round(timeDiff / oneDay); // round to nearest integer
  return numDays;
};

const calculateBidPower = (deposit) => {
  const daysBetween = daysBetweenTimestamps(
    deposit.timestamp,
    deposit.expire_timestamp
  );
  return deposit.amount / daysBetween;
};

const findPromotedPosts = (posts, deposits) => {
  console.log(deposits);
  const postsDepositsDictionary = {};

  deposits
    .filter((deposit) => deposit.expire_timestamp > Date.now())
    .forEach((deposit) => {
      const postId = deposit.post_id;
      const currentBidPower = (
        postsDepositsDictionary[postId] || { bidPower: 0 }
      ).bidPower;

      postsDepositsDictionary[postId] = {
        bidPower: currentBidPower + calculateBidPower(deposit),
      };
    });

  const promotedPosts = posts.filter((post) =>
    postsDepositsDictionary.hasOwnProperty(post.id)
  );

  promotedPosts.sort((a, b) => {
    const postABidPower = postsDepositsDictionary[a.id].bidPower;
    const postBBidPower = postsDepositsDictionary[b.id].bidPower;

    if (postABidPower !== postBBidPower) {
      // If scores are different, sort by score in descending order
      return postBBidPower - postABidPower;
    } else {
      // If scores are equal, add a random factor to the sorting
      return Math.random() - 0.5;
    }
  });
  return promotedPosts;
};

const showMorePromotedPosts = () => {
  const shownPromotedPosts = state.shownPromotedPosts || [];
  console.log(shownPromotedPosts);
  const newShownPromotedPosts = state.promotedPosts.slice(
    0,
    shownPromotedPosts.length + amountOfResultsToShowFirst
  );
  console.log(newShownPromotedPosts);
  State.update({ shownPromotedPosts: newShownPromotedPosts });
};

const deposits = Near.view("promotepost.near", "get_all_deposits") || [];
const posts = Near.view("devgovgigs.near", "get_posts") || [];
if (!state.promotedPosts.length) {
  const promotedPosts = findPromotedPosts(posts, deposits);
  State.update({
    promotedPosts,
    shownPromotedPosts: promotedPosts.slice(0, amountOfResultsToShowFirst),
  });
}

return (
  <div>
    <div class="d-flex justify-content-between align-items-end">
      <div class="fs-5">
        <i class="bi-cash-coin"></i>
        <span>Promoted Posts</span>
      </div>
      <a
        href="https://near.social/#/markeljan.near/widget/PromotePost"
        target="_blank"
      >
        Promote your post
      </a>
    </div>
    {!!state.shownPromotedPosts.length ? (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={showMorePromotedPosts}
          hasMore={state.shownPromotedPosts.length < state.promotedPosts.length}
          loader={<div className="loader">Loading ...</div>}
        >
          {state.shownPromotedPosts.map((post) => {
            return (
              <div key={post.id} style={{ "min-height": "10em" }}>
                <Widget
                  src={`p516entropy.near/widget/SearchResultPost`}
                  props={{
                    post: post,
                  }}
                  key={key}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    ) : (
      <div class="py-2" style={{ "min-height": "10em" }}>
        Not posts have been promoted recently
      </div>
    )}
  </div>
);

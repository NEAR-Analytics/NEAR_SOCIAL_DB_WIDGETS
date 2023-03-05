State.init({
  promotedPosts: [],
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
  return promotedPosts.slice(0, 3);
};

const deposits = Near.view("promotepost.near", "get_all_deposits") || [];

const posts = Near.view("devgovgigs.near", "get_posts") || [];
const promotedPosts = findPromotedPosts(posts, deposits);
State.update({ promotedPosts });

const randomizeInitialIndex = () => {
  const amountOfPromotedPosts = state.promotedPosts.length;
  let initialCarouselIndex = 0;
  const randomNum = Math.random();

  if (randomNum < 0.5) {
    initialCarouselIndex = 0;
  } else if (randomNum < 0.8) {
    initialCarouselIndex = 1;
  } else {
    initialCarouselIndex = 2;
  }

  if (initialCarouselIndex >= amountOfPromotedPosts) {
    initialCarouselIndex = amountOfPromotedPosts - 1;
  }

  return initialCarouselIndex;
};

const initialCarouselIndex = randomizeInitialIndex();

return (
  <div>
    <div id="carouselExampleIndicators" class="carousel carousel-dark slide">
      <div class="carousel-indicators mb-1">
        {state.promotedPosts.map((post, i) => {
          return (
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={i}
              class={i === initialCarouselIndex ? "active" : undefined}
            ></button>
          );
        })}
      </div>
      <div class="card card-body pb-4">
        <div class="d-flex justify-content-between align-items-end">
          <div class="fs-5">
            <i class="bi-cash-coin"></i>
            <span>Promoted Posts</span>
          </div>
          <a
            href="https://near.social/#/p516entropy.near/widget/PromotedPosts"
            target="_blank"
          >
            All promoted posts
          </a>
        </div>
        {!state.promotedPosts.length && (
          <div class="py-2">Not posts have been promoted recently</div>
        )}
        <div class="carousel-inner">
          {state.promotedPosts.map((post, i) => {
            return (
              <div key={post.id}>
                <div
                  class={
                    i === initialCarouselIndex
                      ? "carousel-item active"
                      : "carousel-item"
                  }
                >
                  <div alt="First slide">
                    <Widget
                      src={`p516entropy.near/widget/SearchResultPost`}
                      props={{
                        post: post,
                      }}
                      key={key}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

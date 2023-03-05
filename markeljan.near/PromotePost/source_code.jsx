/*
Props = {
  postId: number,
  bidAmount: number,
  duration: number,
}

*/

let contract = "promotepost.near";

const deposits = Near.view(contract, "get_all_deposits") || [];

initState({
  postId: props.postId ?? 0,
  amount: props.bidAmount ?? 0,
  duration: props.duration ?? 1,
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
  const promotedPosts = [];

  deposits
    .filter((deposit) => deposit.expire_timestamp > Date.now())
    .forEach((deposit) => {
      const postId = deposit.post_id;
      const currentBidPower = (
        promotedPosts.find((post) => post.id === postId) || { bidPower: 0 }
      ).bidPower;

      const newBidPower = currentBidPower + calculateBidPower(deposit);

      if (promotedPosts.length < 3 || newBidPower > promotedPosts[2].bidPower) {
        promotedPosts.push({ id: postId, bidPower: newBidPower });
        promotedPosts.sort((a, b) => b.bidPower - a.bidPower);
        promotedPosts.splice(3);
      }
    });

  return promotedPosts;
};

const posts = Near.view("devgovgigs.near", "get_posts") || [];
const promotedPosts = findPromotedPosts(posts, deposits);

console.log(promotedPosts, "hey");
//gets current timestamp and days to add, returns expire timestamp in milliseconds
const calculateExpireTimestamp = (days) => {
  const date = new Date();
  const timestamp = date.getTime();
  const ONE_DAY_MILLISECONDS = 86400000;
  const expireTimestamp = timestamp + days * ONE_DAY_MILLISECONDS;
  return expireTimestamp;
};

const calculatePower = () => {
  const power = `${(state.amount / state.duration).toFixed(3)} / day`;
  return power;
};

const depositBid = () => {
  Near.call(
    contract,
    "deposit",
    {
      post_id: parseInt(state.postId),
      expire_timestamp: calculateExpireTimestamp(state.duration),
    },
    "30000000000000",
    state.amount * 1e24
  );
};
const onChangePostId = (postId) => {
  State.update({
    postId,
  });
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};
const onChangeDuration = (duration) => {
  State.update({
    duration,
  });
};

return (
  <>
    <div className="container mt-5 ">
      <div className="row justify-content-center ">
        <div className="col-md-6 border rounded p-4 pt-3">
          <h1 className="text-center mb-3">Promote Post</h1>
          <span class="text-muted">Current NEAR daily bids:</span>
          <div className=" d-flex justify-content-between mt-1">
            {promotedPosts.map((post, index) => (
              <div key={index} class=" mb-2">
                {index === 0 && (
                  <span role="img" aria-label="Gold Medal">
                    🥇
                  </span>
                )}
                {index === 1 && (
                  <span role="img" aria-label="Silver Medal">
                    🥈
                  </span>
                )}
                {index === 2 && (
                  <span role="img" aria-label="Bronze Medal">
                    🥉
                  </span>
                )}
                {(post.bidPower / 1e24).toFixed(3)}
              </div>
            ))}
          </div>
          <h2 className=" text-center text-primary mb-2">{calculatePower()}</h2>
          <div className="mb-3">
            <label htmlFor="postId" className="form-label">
              Post ID
            </label>
            <input
              type="number"
              className="form-control"
              id="postId"
              value={state.postId}
              onChange={(e) => onChangePostId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Total Bid (NEAR)
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={state.amount}
              onChange={(e) => onChangeAmount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration (Days)
            </label>
            <div className="d-flex align-items-center">
              <input
                type="range"
                className="form-range"
                id="duration"
                min="1"
                max="365"
                value={state.duration}
                onChange={(e) => onChangeDuration(e.target.value)}
              />
              <div className="ms-3">{state.duration} days</div>
            </div>
          </div>
          <button
            disabled={context.loading}
            onClick={depositBid}
            className={`btn ${
              context.loading ? "btn-outline-dark" : "btn-primary"
            } w-100`}
          >
            Promote Post {state.postId} with {state.amount} NEAR
          </button>
        </div>
      </div>
    </div>
  </>
);

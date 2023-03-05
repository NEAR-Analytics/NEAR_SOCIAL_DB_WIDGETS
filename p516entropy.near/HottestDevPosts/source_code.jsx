State.init({
  hottestsPosts: [],
  interval: false,
  period: "week", // 'day', 'week', 'month'
});

const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = 60 * 60 * 24 * 1000 * 7;
const ONE_MONTH = 60 * 60 * 24 * 1000 * 30;

function getHotnessScore(post) {
  //post.id - shows the age of the post, should grow exponentially, since newer posts are more important
  //post.likes.length - linear value
  const age = Math.pow(post.id, 5);
  const comments = post.comments;
  const commentAge = comments.reduce((sum, age) => sum + Math.pow(age, 5), 0);
  const totalAge = age + commentAge;
  //use log functions to make likes score and exponentially big age score close to each other
  return Math.log10(post.likes.length) + Math.log(Math.log10(totalAge));
}

const calculatePostScore = (likesAmount, commentsAmount) => {
  return likesAmount + commentsAmount;
};

const getPeriodText = (period) => {
  let text = "Last 24 hours";
  if (period === "week") {
    text = "Last week";
  }
  if (period === "month") {
    text = "Last month";
  }
  return text;
};

const findHottestsPosts = (posts, period) => {
  let periodTime = ONE_DAY;
  if (period === "week") {
    periodTime = ONE_WEEK;
  }
  if (period === "month") {
    periodTime = ONE_MONTH;
  }
  const periodLimitedPosts = posts.filter((post) => {
    const timestamp = post.snapshot.timestamp / 1000000;
    return Date.now() - timestamp < periodTime;
  });
  const modifiedPosts = periodLimitedPosts.map((post) => {
    const comments =
      Near.view("devgovgigs.near", "get_children_ids", {
        post_id: post.id,
      }) || [];
    post = { ...post, comments };
    return {
      ...post,
      postScore: getHotnessScore(post),
    };
  });
  modifiedPosts.sort((a, b) => b.postScore - a.postScore);
  return modifiedPosts.slice(0, 3);
};

const posts = Near.view("devgovgigs.near", "get_posts") || [];
const hottestsPosts = findHottestsPosts(posts, state.period);
State.update({ hottestsPosts });

return (
  <div>
    <div class="row">
      <div class="fs-5 col-6 align-self-center">
        <i class="bi-fire"></i>
        <span>Hottest Posts</span>
      </div>
      <div class="col-6 dropdown d-flex justify-content-end">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {getPeriodText(state.period)}
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <button
              class="dropdown-item"
              onClick={() => {
                State.update({ period: "day" });
              }}
            >
              {getPeriodText("day")}
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              onClick={() => {
                State.update({ period: "week" });
              }}
            >
              {getPeriodText("week")}
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              onClick={() => {
                State.update({ period: "month" });
              }}
            >
              {getPeriodText("month")}
            </button>
          </li>
        </ul>
      </div>
    </div>
    {state.hottestsPosts.map((post) => {
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
  </div>
);

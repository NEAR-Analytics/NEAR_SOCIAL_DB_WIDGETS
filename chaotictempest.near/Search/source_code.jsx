const SEARCH_API_KEY = "57ad1944e94432510f067a6e3d13f022";
const APPLICATION_ID = "B6PI9UKKJT";
const INDEX = "test_near-social-feed";
const API_URL = `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;

const writeStateTerm = (term) => {
  console.log("writeStateTerm:", term);

  State.update({
    term,
  });

  if (term === "") {
    State.update({
      post: [],
      comment: [],
      profile: [],
    });
  }
};

const profileWidgets = (content) => {
  const profiles = [];

  for (const profile of content || []) {
    const accountId = profile.author;
    profiles.push(
      <div className="mb-2">
        <Widget src="mob.near/widget/Profile" props={{ accountId }} />
      </div>
    );
  }

  return profiles;
};

const postWidgets = (content, postType) => {
  const posts = [];

  for (const post of content || []) {
    const accountId = post.author;
    if (!post.ref) {
      console.log(`No ref to ${postType} for ${accountId}`);
    }

    const blockHeight = post.ref.block_height;
    const widgetType =
      postType === "post" ? "MainPage.Post.Page" : "MainPage.Comment.Page";
    const link = `#/mob.near/widget/${widgetType}?accountId=${accountId}&blockHeight=${blockHeight}`;
    const post_content = {
      type: "md",
      text: post.content,
    };

    // ${
    //   highlight ? "bg-warning bg-opacity-10" : ""
    // }
    const headerStyling =
      postType === "post"
        ? "border rounded-4 p-3 pb-1"
        : "pt-3 border-top pb-2";

    posts.push(
      <div className={headerStyling}>
        <Widget
          src="mob.near/widget/MainPage.Post.Header"
          props={{ accountId, blockHeight, link, postType }}
        />
        <div className="mt-3 text-break">
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content: post_content }}
          />
        </div>
      </div>
    );
  }
  return posts;
};

const computeResults = (term) => {
  console.log("computeResults:", term);
  fetchAlgoliaData(term).then((res) => {
    const data = getCategoryResults(res.body);
    State.update({
      term,
      post: postWidgets(data["post"], "post"),
      comment: postWidgets(data["comment, post"], "comment"),
      profile: profileWidgets(data["profile"]),
    });
  });
};

const fetchAlgoliaData = (queryURI) => {
  let search_params = `query=${queryURI}`;
  return asyncFetch(API_URL, {
    body: `{ "params": "${search_params}" }`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Algolia-Api-Key": `${SEARCH_API_KEY}`,
      "X-Algolia-Application-Id": `${APPLICATION_ID}`,
    },
    method: "POST",
  });
};

const getCategoryResults = (raw_result_data) => {
  const results = {};
  for (const result of raw_result_data.hits) {
    const {
      author,
      content,
      objectID,
      categories: categories_raw,
      ref,
      _highlightResult,
    } = result;

    if (categories_raw.length > 1) {
      categories_raw.sort();
    }

    const categories = categories_raw.join(", ");
    results[categories] = results[categories] || [];
    results[categories].push({
      author,
      content,
      objectID,
      categories,
      ref,
      _highlightResult,
    });
  }

  return results;
};

return (
  <div>
    <div>
      <input
        type="text"
        value={state.term ?? ""}
        onChange={(e) => writeStateTerm(e.target.value)}
        placeholder="Search..."
      />
      {state.term && (
        <div>
          <button type="button" onClick={() => writeStateTerm("")}>
            Clear
          </button>
          <button type="button" onClick={() => computeResults(state.term)}>
            Go
          </button>
        </div>
      )}
    </div>

    {state.term && (
      <>
        {state.profile?.length > 0 && (
          <div>
            <p>Profiles:</p>
            <ul>{state.profile}</ul>
          </div>
        )}

        {state.post?.length > 0 && (
          <div>
            <p>Posts:</p>
            <ul>{state.post}</ul>
          </div>
        )}

        {state.comment?.length > 0 && (
          <div>
            <p>Comments:</p>
            <ul>{state.comment}</ul>
          </div>
        )}
      </>
    )}

    {state.term && state.apps?.length === 0 && state.people?.length === 0 && (
      <p>No people or applications match your search.</p>
    )}

    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}
  </div>
);

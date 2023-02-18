const SEARCH_API_KEY = "57ad1944e94432510f067a6e3d13f022";
const APPLICATION_ID = "B6PI9UKKJT";
const INDEX = "test_near-social-feed";
let search_params = "query=";
const api_url = `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?${search_params}`;

const writeStateTerm = (term) => {
  console.log("writeStateTerm:", term);

  State.update({
    term,
  });
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

const postWidgets = (content) => {
  const posts = [];

  for (const post of content || []) {
    console.log("post", post);
    const accountId = post.author;
    if (!post.ref) {
      console.log(`No ref to post for ${accountId}`);
    }

    const blockHeight = post.ref.block_height;
    const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
    const post_content = {
      type: "md",
      text: post.content,
    };

    posts.push(
      <div className="border rounded-4 p-3 pb-1">
        <Widget
          src="mob.near/widget/MainPage.Post.Header"
          props={{ accountId, blockHeight, link, postType: "post" }}
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

const commentWidgets = (content) => {
  const comments = [];

  for (const comment of content || []) {
    const accountId = comment.author;
    const blockHeight = comment.ref.block_height;
    const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
    const comment_content = {
      type: "md",
      text: comment.content,
    };

    if (!comment.ref) {
      console.log(`No ref to comment for ${accountId}`);
    }

    // ${
    //   highlight ? "bg-warning bg-opacity-10" : ""
    // }
    comments.push(
      <div className="pt-3 border-top pb-2">
        <Widget
          src="mob.near/widget/MainPage.Post.Header"
          props={{ accountId, blockHeight, link, postType: "comment" }}
        />
        <div className="mt-3 text-break">
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content: comment_content }}
          />
        </div>
      </div>
    );
  }
  return comments;
};

const computeResults = (term) => {
  console.log("computeResults:", term);
  const raw_content = fetchAlgoliaData(term);
  const contents = getCategoryResults(raw_content);
  console.log("contents", contents["comment, post"]);

  State.update({
    term,
    post: postWidgets(contents["post"]),
    comment: commentWidgets(contents["comment, post"]),
    profile: profileWidgets(contents["profile"]),
  });
};

const fetchAlgoliaData = (queryURI) => {
  search_params = `query=${queryURI}`;
  const res_data = useCache(
    () =>
      asyncFetch(api_url, {
        body: `{ "params": "${search_params}" }`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Algolia-Api-Key": `${SEARCH_API_KEY}`,
          "X-Algolia-Application-Id": `${APPLICATION_ID}`,
        },
        method: "POST",
      }).then((res) => res.body),
    "apiResponse1",
    { subscribe: true }
  );
  return res_data;
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

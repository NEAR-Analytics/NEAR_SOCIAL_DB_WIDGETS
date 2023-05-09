const articleId = props.articleId ?? "Test";
const author =
  props.author ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const timeCreate = props.timeCreate ?? {
  date: 2000,
  time: 2000,
};
const headerOptionsItems = props.headerOptionsItems ?? [
  {
    type: "copyLink",
    link: "https://near.social/#/f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Kudos.Styles?sharedBlockHeight=91076343",
    text: "Copy kudo link",
    iconBeforeText: "bi bi-clipboard",
  },
  {
    type: "markdownSource",
    link: "https://near.social/#/mob.near/widget/MainPage.Post.Page?accountId=blaze.near&blockHeight=91076343&raw=true",
    text: "View raw markdown source",
    iconBeforeText: "bi bi-filetype-raw",
  },
  {
    type: "hideAccount",
    accountId: "silkking.near",
  },
  {
    type: "flagItem",
    flagItem: {
      type: "social",
      path: "silkking.near/post/main",
      postBlockHeight: 1111111111111,
    },
    postType: "post",
  },
];

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const propsPassedWrongFeedback = () => {
  let feedbackArray = [];

  if (!timeCreate.date) {
    feedbackArray.push("Time creation date passed wrongly");
  }
  if (!timeCreate.time) {
    feedbackArray.push("Time creation time passed wrongly");
  }
  if (!author) {
    feedbackArray.push("Author passed wrongly");
  }

  return (
    <>
      <h5 className="text-danger">Error:</h5>
      <ul>
        {feedbackArray.map((element) => {
          return <li>{element}</li>;
        })}
      </ul>
    </>
  );
};

if (!timeCreate.time || !timeCreate.date || !author) {
  return <>{propsPassedWrongFeedback()}</>;
}

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

return (
  <div className="row d-flex justify-content-center">
    {articleId && (
      <h5 className="card-title text-center pb-2 mb-2 border-bottom">
        {articleId}
      </h5>
    )}

    <div className="col flex-grow-1">
      <Widget
        src={`${widgetOwner}/widget/Profile.ShortInlineBlock`}
        props={{ accountId: author, tooltip: true, maxWidth: "100%" }}
      />
    </div>

    <div className="d-none d-lg-block col flex-grow-0">
      <p className="card-subtitle text-muted text-end">
        {getDateLastEdit(article.timeCreate).date}
      </p>
      <p className="card-subtitle text-muted text-end">
        {getDateLastEdit(article.timeCreate).time}
      </p>
    </div>

    {headerOptionsItems && (
      <Widget
        src={`${widgetOwner}/widget/general_neardigitalcollective_headers.options`}
        props={{
          items: headerOptionsItems,
        }}
      />
    )}
  </div>
);

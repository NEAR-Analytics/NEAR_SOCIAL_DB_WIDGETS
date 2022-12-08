let questionTimestamp = props.questionTimestamp;
let questionBlockHeight = props.questionBlockHeight ?? 79932883;

//Using the questionBlockheight you have to retrive the answers and you should get an array of objects like the next one
let answers = [
  {
    accountId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
    value: {
      user_answer: "This is my answer",
      answer_timeStamp: Date.now(),
    },
  },
];

function stringToTimeStampFormat(string) {
  let timeStampFormat = 1321566516131;
  //TODO
  return timeStampFormat;
}

return (
  <>
    {answers.map((answer) => {
      let profile = Social.getr(`${answer.accountId}/profile`);
      return (
        <div>
          <div
            className="d-flex align-items-start"
            style={{
              padding: "1.5rem 0",
              borderBottom: "1px solid #e9e9e9",
            }}
          >
            <div>
              {profileLink(
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{ accountId: answer.accountId }}
                />
              )}
            </div>
            <div className="d-flex">
              <div className="flex-grow-1 me-1 text-truncate">
                {profileLink(
                  <>
                    <span className="fw-bold">{profile.name}</span>
                    <span className="text-secondary">@{answer.accountId}</span>
                  </>
                )}
              </div>
              <div>
                <small className="ps-1 text-nowrap text-muted ms-auto">
                  <i className="bi bi-clock me-1"></i>
                  {timeAgo(Date.now() - stringToTimeStampFormat(startDate))}
                </small>
              </div>
            </div>
          </div>
          <textarea
            className="w-100"
            value={answer.value.user_answer}
            readonly
          />
        </div>
      );
    })}
  </>
);

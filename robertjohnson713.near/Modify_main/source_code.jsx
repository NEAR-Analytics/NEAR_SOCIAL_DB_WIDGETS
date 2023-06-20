State.init({
  questionbar_view: true,
  ques_id: [],
  ques_content: [],
  showPoll: 0,
  showPollbar: false,
  showPollcontent: 0,
  profile: {},
  polls: {},
  answers: {},
  setpoll: {},
  showkeyval: 0,
  setpoll: {},
  setblockHeiht: 0,
});

//Define Style
const scrolldiv = styled.div`
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: white;
        border-radius: 20px;
    }
`;
const widgetOwner = "easypoll.near";
const contentbgcolor = "#c7bdbe";
const accountlistcolor = "#00bcd4";
const accountlistsetcolor = "#ff9800";
const bgcolor = "#373a3b";
const accountbgcolor = "#c7bdbe";
const sidebgcolor = "#a99a9c";
const viewpollbg = "#71757b";
const mainbg = "#C6C9D0";
const bgAccountheight = "65vh";
const bgPollheight = "60vh";
const bgQuestionheight = "65vh";
const boxShadow =
  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const boxShadowTitle =
  "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 1px 0 rgba(0, 0, 0, 0.1)";
const divinputsytle = styled.div`
  width: 5%;
  float: left;
  display: inline-block;
`;
const divlabelstyle = styled.div`
  color: black;
  margin-left: 2%;
  width: 90%"
  display: inline-block;
`;

const Gettime = (time) => {
  const d = new Date(time);
  let years = d.getFullYear();
  let months = d.getMonth();
  let days = d.getDate();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  return (
    years +
    "-" +
    months +
    "-" +
    days +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
};
//Shorter AccountId
function ShorterId(accountId, length) {
  if (accountId.length > length) {
    return accountId.slice(0, length) + "...";
  }
  return accountId;
}

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

function isActive(polls) {
  return polls.startTimestamp < Date.now() && Date.now() < polls.endTimestamp;
}

function isUpcoming(polls) {
  return polls.startTimestamp > Date.now();
}
function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  const answers = Social.index("poll_question", "answer-v3.1.0");

  if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
    State.update({ answers: answers });
  }

  if (!answers) {
    return "Loading";
  }
  const answersFromThisQuestion = answers.filter(
    (a) => a.value.questionBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisQuestion.map((a) => a.accountId);
  const usersWithAnswersWithoutDuplicates = usersWithAnswers.filter(
    (u, index) => usersWithAnswers.indexOf(u) == index
  );
  return usersWithAnswersWithoutDuplicates.length;
}

//Loading Polls
//Input Polls
let polls = Social.index("poll_question", "question-v3.1.0");
if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}
if (!polls) {
  return "loading";
}
polls.sort((a, b) => b.value.startTimestamp - a.value.startTimestamp);
let sort_polls = [
  {
    id: polls[0].accountId,
    value: [polls[0].value],
    blockHeight: polls[0].blockHeight,
    activeCount: 0,
    upcomeingCount: 0,
    closedCount: 0,
  },
];
for (let i = 1; i < polls.length; i++) {
  let flag = 0;
  for (let j = 0; j < sort_polls.length; j++) {
    if (polls[i].accountId != sort_polls[j].id) {
      flag = 1;
    } else {
      flag = 0;
      sort_polls[j].value.push(polls[i].value);
      sort_polls[j].blockHeight.push(polls[i].blockHeight);
      {
        isUpcoming(polls[i].value)
          ? sort_polls[j].upcomeingCount++
          : isActive(polls[i].value)
          ? sort_polls[j].activeCount++
          : sort_polls[j].closedCount++;
      }
      break;
    }
  }
  if (flag == 1) {
    sort_polls.push({
      id: polls[i].accountId,
      value: [polls[i].value],
      blockHeight: [polls[i].blockHeight],
    });
    sort_polls[sort_polls.length - 1].upcomeingCount = 0;
    sort_polls[sort_polls.length - 1].activeCount = 0;
    sort_polls[sort_polls.length - 1].closedCount = 0;
    isUpcoming(polls[i].value)
      ? sort_polls[sort_polls.length - 1].upcomeingCount++
      : isActive(polls[i].value)
      ? sort_polls[sort_polls.length - 1].activeCount++
      : sort_polls[sort_polls.length - 1].closedCount++;
  }
}
if (!sort_polls) {
  return "loading";
}

//View User's Profile
const onviewAccount = (id, view_site, activeCount) => {
  let profile = Social.getr(`${id}/profile`);
  if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
    State.update({ profile: profile });
  }

  if (state.profile == {}) {
    return "Loading";
  }
  return (
    <div>
      <div
        className="d-flex"
        style={{
          float: "left",
          display: "inline-block",
          borderRadius: "5px",
          width: "90%",
        }}
      >
        <a
          className="d-flex"
          href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${id}`}
          style={{ color: "#010A2D" }}
        >
          {profile ? (
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                profile,
                accountId: id,
                className: "float-start d-inline-block me-1 ",
                style: { width: "2em", height: "2em" },
              }}
            />
          ) : (
            <div className="d-flex">
              <div
                className="profile-image d-inline-block me-1 "
                style={{ width: "2em", height: "2em" }}
              >
                <img
                  className="rounded w-100 h-100"
                  src="https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm"
                  alt={id}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}
        </a>
        {view_site == 0 ? (
          <div>
            <div
              style={{
                fontWeight: "500",
                fontSize: "0.8rem",
                textDecotarion: "none",
                padding: "0",
                float: "left",
                textAlign: "left",
              }}
            >
              {profile == {}
                ? "Loading"
                : profile != undefined
                ? ShorterId(profile.name, 12)
                : ShorterId(id, 12)}
            </div>
            <div
              style={{
                textDecotarion: "none",
                padding: "0",
                fontSize: "0.6rem",
                textAlign: "left",
              }}
            >
              {ShorterId(id, 15)}
            </div>
          </div>
        ) : (
          <div>
            {profile == {}
              ? "Loading"
              : profile != undefined
              ? ShorterId(profile.name, 25)
              : ShorterId(id, 25)}
          </div>
        )}
      </div>
      <div
        style={{
          float: "right",
          display: "inline-block",
          borderRadius: "5px",
          width: "10%",
        }}
      >
        {activeCount != 0 && view_site == 0 && (
          <span
            style={{
              backgroundColor: "white",
              padding: "0 5px",
              fontSize: "0.7rem",
              borderRadius: "10px",
              color: "black",
            }}
          >
            {activeCount}
          </span>
        )}
      </div>
    </div>
  );
};

return (
  <div
    className="pt-4"
    style={{
      borderRadius: "0.375rem",
      backgroundImage: `linear-gradient(to right bottom, white, ${mainbg})`,
      boxShadow: boxShadow,
      padding: "20px 20px",
      height: "80vh",
      margin: "0 auto",
    }}
  >
    <div
      style={{
        padding: "3px 3px",
        backgroundColor: "white",
        boxShadow: boxShadow,
        borderRadius: "20px",
        textAlign: "center",
        textShadow: "2px 2px 4px #000000",
        fontWeight: 800,
        fontSize: "1rem",
      }}
    >
      View_Polls
    </div>
    <div
      className=""
      style={{
        backgroundColor: `${accountbgcolor}`,
        width: "20%",
        display: "inline-block",
        float: "left",
        padding: "2px, 2px",
        borderTopLeftRadius: "10px",
        boxShadow: boxShadow,
        marginBottom: "1 auto",
      }}
    >
      <div
        style={{
          padding: "3px 3px",
        }}
      >
        <input
          type="search"
          style={{
            padding: "2px 3px",
            width: "100%",
            color: "black",
            height: "30px",
            Maxheight: "30px",
          }}
          placeholder="Search"
        ></input>
      </div>
      <scrolldiv
        style={{
          height: `${bgAccountheight}`,
          maxHeight: `${bgAccountheight}`,
          paddingTop: "5px",
          overflowY: "auto",
        }}
      >
        {sort_polls.length > 0 ? (
          sort_polls.map((account, index) => (
            <button
              key={index}
              style={{
                padding: "1px 2px",
                marginLeft: "2%",
                marginTop: "1px",
                backgroundColor: `${
                  index == state.showPoll
                    ? accountlistsetcolor
                    : accountlistcolor
                }`,
                boxShadow: boxShadow,
                width: "98%",
                overflow: "hidden",
                borderStyle: "none",
              }}
              onClick={() => {
                State.update({ showPoll: index, showPollbar: false });
              }}
            >
              {onviewAccount(account.id, 0, account.activeCount)}
            </button>
          ))
        ) : (
          <h4>No sort_polls found...</h4>
        )}
      </scrolldiv>
    </div>
    {state.showPollbar == false && (
      <div
        style={{
          backgroundColor: `${contentbgcolor}`,
          width: `${state.questionbar_view == true ? "50%" : "80%"}`,
          display: "inline-block",
          boxShadow: boxShadowTitle,
          borderTopRightRadius: `${
            state.questionbar_view == true ? "" : "15px"
          }`,
        }}
      >
        <div
          style={{
            boxShadow: boxShadowTitle,
          }}
        >
          <h3
            style={{
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px 4px #000000",
              height: "30px",
              Maxheight: "30px",
            }}
          >
            POLLS
          </h3>
          <div>
            {state.questionbar_view == true ? (
              <button
                onClick={() => {
                  State.update({
                    questionbar_view: false,
                  });
                }}
                style={{
                  backgroundColor: "white",
                  width: "5px",
                  padding: "10px 10px",
                  borderRadius: "15px",
                  boxShadow: boxShadow,
                  borderStyle: "none",
                  marginRight: "-10px",
                  float: "right",
                }}
              ></button>
            ) : (
              <button
                onClick={() => {
                  State.update({
                    questionbar_view: true,
                    showPollbar: false,
                  });
                }}
                style={{
                  backgroundColor: "white",
                  width: "5px",
                  padding: "15px 15px",
                  borderRadius: "15px",
                  boxShadow: boxShadow,
                  borderStyle: "none",
                  marginRight: "-15px",
                  float: "right",
                }}
              ></button>
            )}
          </div>
        </div>
        <div
          className="d-flex"
          style={{
            backgroundColor: sidebgcolor,
            boxShadow: boxShadow,
            borderTopRightRadius: "30px",
            marginBottom: "10px",
            width: "90%",
          }}
        >
          <p
            style={{
              color: "white",
              display: "inline-block",
              marginLeft: "2%",
              marginTop: "4px",
              marginBottom: "0",
              overflow: "hidden",
              width: "75%",
            }}
          >
            {onviewAccount(sort_polls[state.showPoll].id, 1)}
          </p>
          <div
            style={{
              width: "25%",
              display: "inline-block",
              float: "right",
              fontSize: "0.8rem",
              marginBottom: "0px",
            }}
          >
            <p style={{ color: "white", margin: "0px" }}>
              Active:
              <span
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#D9FCEF",
                  borderRadius: "10px",
                  padding: "0 5px",
                  color: "black",
                }}
              >
                {sort_polls[state.showPoll].activeCount}
              </span>
            </p>
            <p style={{ color: "white", margin: "0px" }}>
              Closed:
              <span
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#FFE5E5",
                  borderRadius: "10px",
                  padding: "0 5px",
                  color: "black",
                }}
              >
                {sort_polls[state.showPoll].closedCount}
              </span>
            </p>
          </div>
        </div>
        <scrolldiv
          className=""
          style={{
            height: `${bgPollheight}`,
            maxHeight: `${bgPollheight}`,
            overflowY: "auto",
          }}
        >
          {sort_polls[state.showPoll].value.length > 0 ? (
            sort_polls[state.showPoll].value.map((polls, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 10px",
                  marginLeft: "2%",
                  marginRight: "2%",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  let keyval = isUpcoming(polls) ? 0 : isActive(polls) ? 1 : 2;
                  State.update({
                    showPollcontent: index,
                    showkeyval: keyval,
                    setpoll: polls,
                    setblockHeiht:
                      sort_polls[state.showPoll].blockHeight[index],
                  });
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "3px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <button
                    style={{
                      position: "relative",
                      border: "2px solid transparent",
                      fontWeight: "500",
                      fontSize: "0.8rem",
                      padding: "0rem 0.2rem",
                      backgroundColor: bgcolor,
                      marginRight: "5px",
                      color: "white",
                      float: "right",
                      zIndex: "9",
                    }}
                    onClick={() => {
                      let keyval = isUpcoming(polls)
                        ? 0
                        : isActive(polls)
                        ? 1
                        : 2;
                      State.update({
                        showPollbar: true,
                        showPollcontent: index,
                        showkeyval: keyval,
                        setpoll: polls,
                        setblockHeiht:
                          sort_polls[state.showPoll].blockHeight[index],
                      });
                    }}
                  >
                    {isUpcoming(polls)
                      ? "Preview"
                      : isActive(polls)
                      ? "Vote"
                      : "Result"}
                  </button>
                  <div>
                    <span
                      style={{
                        backgroundColor: isUpcoming(polls)
                          ? "#FFF3B4"
                          : isActive(polls)
                          ? "#D9FCEF"
                          : "#FFE5E5",
                        height: "1.5rem",
                        width: "4rem",
                        textAlign: "center",
                        borderRadius: "5px",
                        marginRight: "1rem",
                        lineHeight: "1.5rem",
                        fontSize: "0.8rem",
                        letterSpacing: "-0.025rem",
                        padding: "2px 4px",
                        color: isUpcoming(polls)
                          ? "#FFC905"
                          : isActive(polls)
                          ? "#00B37D"
                          : "#FF4747",
                        fontWeight: "500",
                      }}
                    >
                      {isUpcoming(polls)
                        ? "Upcoming"
                        : isActive(polls)
                        ? "Active"
                        : "Closed"}
                    </span>
                    <span>
                      <i className="bi bi-people"></i>
                      <span>
                        {getValidAnswersQtyFromQuestion(
                          sort_polls[state.showPoll].blockHeight[index]
                        )}
                      </span>
                    </span>
                  </div>
                </div>
                <h5
                  style={{
                    padding: "5px 5px",
                    color: "#76c2f3",
                    backgroundColor: `${contentbgcolor}`,
                    paddingLeft: "2%",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "2px",
                    borderBottomColor: "white",
                    boxShadow: boxShadow,
                    marginBottom: "0",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      marginBottom: "0",
                      fontSize: "1.1rem",
                    }}
                  >
                    TiTlE:
                    <span style={{ marginLeft: "5px", color: "white" }}>
                      {polls.title}
                    </span>
                  </p>
                </h5>
                <div
                  style={{
                    backgroundColor: `white`,
                    borderColor: "white",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    boxShadow: boxShadow,
                    width: "100%",

                    overflow: "hidden",
                  }}
                >
                  <p
                    style={{
                      color: "bloack",
                      paddingLeft: "2%",
                      textShadow: "2px 2px 4px #000000",
                      margin: 0,
                      textDecorationLine: "underline",
                      textDecorationColor: "blue",
                    }}
                  >
                    Description:
                  </p>
                  <p
                    style={{
                      color: "black",
                      width: "100%",
                      backgroundColor: "white",
                      paddingLeft: "3%",
                      marginBottom: 2,
                    }}
                  >
                    {polls.description}
                  </p>
                </div>
                <h5
                  style={{
                    padding: "5px 5px",
                    color: "#76c2f3",
                    backgroundColor: `${contentbgcolor}`,
                    paddingLeft: "2%",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "2px",
                    borderBottomColor: "white",
                    borderBottomLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                    boxShadow: boxShadow,
                    marginBottom: "0",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      marginBottom: "0",
                      fontSize: "0.7rem",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: `black`,
                        marginRight: "2px",
                        borderRadius: "3px",
                        fontWeight: "500",
                        fontSize: "1rem",
                      }}
                    >
                      Period:
                    </span>
                    {Gettime(polls.startTimestamp)}
                    <span style={{ marginLeft: "2px" }}>-</span>
                    {Gettime(polls.endTimestamp)}
                    <span style={{ color: "blue" }}>
                      {Date.now() < polls.startTimestamp ||
                      (Date.now() > polls.startTimestamp &&
                        Date.now() < polls.endTimestamp) ? (
                        <span>|Ends</span>
                      ) : (
                        <span>|Ended</span>
                      )}
                      <Widget
                        src={`silkking.near/widget/timeAgo`}
                        props={{
                          reduced: true,
                          timeInFuture: polls.endTimestamp,
                        }}
                      />
                    </span>
                  </p>
                </h5>
              </div>
            ))
          ) : (
            <h4 style={{ color: "white" }}>No sort_polls found...</h4>
          )}
        </scrolldiv>
      </div>
    )}
    {state.questionbar_view == true && (
      <div
        className=""
        style={{
          backgroundColor: sidebgcolor,
          width: `${state.showPollbar == false ? "30%" : "80%"}`,
          display: "inline-block",
          float: "right",
          borderTopRightRadius: "10px",
        }}
      >
        <h3
          style={{
            color: "white",
            textAlign: "center",
            textShadow: "2px 2px 4px #000000",
            height: "30px",
            Maxheight: "30px",
            boxShadow: boxShadowTitle,
          }}
        >
          QUESTIONS
        </h3>
        <scrolldiv
          style={{
            height: `${bgQuestionheight}`,
            maxHeight: `${bgQuestionheight}`,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {state.showPollbar == true && (
            <button
              onClick={() => {
                State.update({
                  showPollbar: false,
                });
              }}
              style={{
                position: "relative",
                border: "2px solid transparent",
                fontWeight: "500",
                fontSize: "0.8rem",
                padding: "0.1rem 0.2rem",
                backgroundColor: bgcolor,
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                color: "white",
                float: "right",
                marginRight: "2%",
              }}
            >
              View_Des.
            </button>
          )}
          <p
            style={{
              color: "black",
              marginLeft: "2%",
              marginTop: "20px",
              marginBottom: 0,
              width: "96%",
              backgroundColor: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              textAlign: "center",
              boxShadow: boxShadow,
            }}
          >
            Title:
            <span>
              {sort_polls[state.showPoll].value[state.showPollcontent].title}
            </span>
          </p>
          {sort_polls[state.showPoll].value[state.showPollcontent].questions
            .length > 0 ? (
            sort_polls[state.showPoll].value[
              state.showPollcontent
            ].questions.map((questions, index) => (
              <div
                key={index}
                style={{
                  padding: "1px 2px",
                  marginLeft: "2%",
                  backgroundColor: accountbgcolor,
                  borderColor: "black",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  borderTopLeftRadius: `${index >= 1 && "10px"}`,
                  borderTopRightRadius: `${index >= 1 && "10px"}`,
                  width: "96%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "white",
                    boxShadow: boxShadow,
                  }}
                ></div>
                <div className="d-flex">
                  <div style={{ width: "12%" }}>
                    <p
                      style={{
                        backgroundColor: bgcolor,
                        width: "1.5rem",
                        color: "white",
                        padding: "0px 5px",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        marginLeft: "2px",
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    >
                      {index + 1}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "88%",
                      marginTop: "-3px",
                      fontSize: "1rem",
                      display: "inline-block",
                    }}
                  >
                    {questions.question}
                  </div>
                </div>
                <div style={{ fontSize: "0.8rem" }}>
                  <p
                    style={{
                      color: "white",
                      backgroundColor: `${contentbgcolor}`,
                      paddingLeft: "2%",
                      margin: 0,
                      fontSize: "0.9rem",
                    }}
                  >
                    Write your answer :
                  </p>
                  {questions.questionType == "0" && (
                    <div style={{ marginLeft: "2%" }}>
                      <div className="d-flex">
                        <divinputsytle>
                          <input
                            className="form-check-input"
                            type="radio"
                          ></input>
                        </divinputsytle>
                        <divlabelstyle>
                          <label>Yes:</label>
                        </divlabelstyle>
                      </div>
                      <div className="d-flex">
                        <divinputsytle>
                          <input
                            className="form-check-input"
                            type="radio"
                          ></input>
                        </divinputsytle>
                        <divlabelstyle>
                          <label>No:</label>
                        </divlabelstyle>
                      </div>
                    </div>
                  )}
                  {questions.questionType == "1" && (
                    <div style={{ marginLeft: "2%" }}>
                      {questions.choicesOptions.length > 0 ? (
                        questions.choicesOptions.map((select, index) => (
                          <div key={index} className="d-flex">
                            <divinputsytle>
                              <input
                                className="form-check-input"
                                type="radio"
                              ></input>
                            </divinputsytle>
                            <divlabelstyle>
                              <label>{select}:</label>
                            </divlabelstyle>
                          </div>
                        ))
                      ) : (
                        <h4 style={{ color: "white" }}>
                          No sort_polls found...
                        </h4>
                      )}
                    </div>
                  )}
                  {questions.questionType == "2" && (
                    <div style={{ marginLeft: "2%" }}>
                      {questions.choicesOptions.length > 0 ? (
                        questions.choicesOptions.map((select, index) => (
                          <div key={index} className="d-flex">
                            <divinputsytle>
                              <input
                                className="form-check-input"
                                type="checkbox"
                              ></input>
                            </divinputsytle>
                            <divlabelstyle>
                              <label>{select}:</label>
                            </divlabelstyle>
                          </div>
                        ))
                      ) : (
                        <h4 style={{ color: "white" }}>
                          No sort_polls found...
                        </h4>
                      )}
                    </div>
                  )}
                  {questions.questionType == "3" && (
                    <div style={{ marginLeft: "2%" }}>
                      <textarea
                        rows="2"
                        style={{ width: "98%", color: "black" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h4 style={{ color: "white" }}>No sort_polls found...</h4>
          )}
          <button
            style={{
              padding: "0rem 1rem",
              marginRight: "2%",
              backgroundColor: bgcolor,
              float: "right",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              marginTop: "-5px",
              borderStyle: "none",
            }}
          >
            vote
          </button>
        </scrolldiv>
      </div>
    )}
  </div>
);

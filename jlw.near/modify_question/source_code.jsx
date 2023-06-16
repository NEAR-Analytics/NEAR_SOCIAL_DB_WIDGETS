State.init({
  questionbar_view: 1,
  ques_id: [],
  ques_content: [],
});

const widgetOwner = "easypoll.near";
const contentbgcolor = "#40494f";
const bgcolor = "#373a3b";
const sidebgcolor = "#091b24";

let polls = Social.index("poll_question", "question-v3.1.0");
if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}
let pot = [1, 3, 5, 2, 7, 9, 4];
polls.sort((a, b) => a.value.startTimestamp - b.value.startTimestamp);
console.log(polls);
return (
  <div
    className="pt-4"
    style={{
      borderRadius: "0.375rem",
      backgroundColor: `${bgcolor}`,
      padding: "20px 20px",
      margin: "0 auto",
    }}
  >
    <div
      className=""
      style={{
        backgroundColor: `${sidebgcolor}`,
        width: "20%",
        display: "inline-block",
        float: "left",
      }}
    >
      klfjkladsjklfjklsdajfklsad
    </div>
    <div
      className=""
      style={{
        backgroundColor: `${contentbgcolor}`,
        width: `${state.questionbar_view == 1 ? "50%" : "80%"}`,
        display: "inline-block",
      }}
    >
      flksdjklfjdaskjfklasd
    </div>
    {state.questionbar_view == 1 && (
      <div
        className=""
        style={{
          backgroundColor: `${sidebgcolor}`,
          width: "30%",
          display: "inline-block",
          float: "right",
        }}
      >
        klfjkladsjklfjklsdajfklsad
      </div>
    )}
  </div>
);

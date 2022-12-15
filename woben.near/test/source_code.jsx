const data = {
  genie: {
    questions: {
      "michaelpeter.near--32976423897": {
        content: "What is a blockchain?",
      },
    },
    answer: {},
  },
  index: {
    genie: {
      asked: "michaelpeter.near--32976423897",
    },
  },
};

const questions = Social.index("genie", "asked");
console.log(questions);

return (
  <CommitButton className="btn-primary" data={data}>
    "Save Data"
  </CommitButton>
);

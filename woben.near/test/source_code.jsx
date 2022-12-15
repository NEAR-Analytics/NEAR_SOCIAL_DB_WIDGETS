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
      key: "asked",
      value: "michaelpeter.near--32976423897",
    },
  },
};

const questions = Social.index("genie", "asked");
console.log("indexed questions are" + questions);

return (
  <CommitButton className="btn-primary" data={data}>
    Save Data
  </CommitButton>
);

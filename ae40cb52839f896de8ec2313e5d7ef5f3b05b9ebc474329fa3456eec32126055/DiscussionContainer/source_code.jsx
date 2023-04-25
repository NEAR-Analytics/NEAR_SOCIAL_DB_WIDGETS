if (props.tab !== "discussion") return <></>;

return (
  <Widget
    src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions"
    props={{
      identifier: "uuid-5",
      parentComponent:
        "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DiscussionContainer",
      parentParams: { tab: "discussion" },
      notifyAccountId: "gagdiez.near",
      highlightComment: props.highlightComment,
    }}
  />
);

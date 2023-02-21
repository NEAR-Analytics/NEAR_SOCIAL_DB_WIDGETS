const { tosName, targetComponent, targetProps } = props;
const acceptanceKey = `${context.accountId}/${tosName}`;

// find all instances of the user agreeing to some version of the desired TOS
const agreementsForUser = Social.index("tosAccept", acceptanceKey);

return (
  <div>
    {agreementsForUser.map((a) => (
      <span key={a}>{JSON.stringify(a)}</span>
    ))}
    <Widget src="michaelpeter.near/widget/TosContentDraft" />
    <CommitButton
      data={{
        tosAccept: {
          genie: JSON.stringify({
            key: acceptanceKey,
            value: 1, // TODO blockheight of tos version
          }),
        },
      }}
    >
      Agree
    </CommitButton>
  </div>
);

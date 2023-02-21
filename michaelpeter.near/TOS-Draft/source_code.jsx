const { tosName, targetComponent, targetProps } = props;
const acceptanceKey = `${context.accountId}/${tosName}`;

// find all instances of the user agreeing to some version of the desired TOS
const agreementsForUser = Social.index("tosAccept", acceptanceKey);

const modal = styled.div`
  
`;
return (
  <div>
    {agreementsForUser.map((a) => (
      <span key={a}>{JSON.stringify(a)}</span>
    ))}
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Widget src="michaelpeter.near/widget/TosContentDraft" />
          </div>
          <div class="modal-footer">
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
              Agreed
            </CommitButton>
          </div>
        </div>
      </div>
    </div>
  </div>
);

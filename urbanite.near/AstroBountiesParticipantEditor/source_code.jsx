const myAccountId = props.accountId ?? context.accountId;
if (!myAccountId) {
  return "Please sign in with NEAR wallet ";
}

const bountyId = props.bountyId;
if (!bountyId) {
  return "Please provide a bounty id";
}

const data =
  Social.keys(`*/astrosocial/bounties/${bountyId}/participated`, "final") || {};

const allParticipants = Object.keys(data);

const participated = !!data[myAccountId];

const sanitizedBountyId = props.bountyId.replaceAll(".", "");
return (
  <div>
    <div>
      <a
        class="card-link"
        data-bs-toggle="collapse"
        href={`#collapseAstroParticipantEditor-${sanitizedBountyId}`}
        role="button"
        aria-expanded="false"
        aria-controls={`collapseAstroParticipantEditor-${sanitizedBountyId}`}
      >
        <i class={commentBtnClass}> </i> Participants ({allParticipants.length})
      </a>
    </div>

    <div
      class="collapse"
      id={`collapseAstroParticipantEditor-${sanitizedBountyId}`}
    >
      <div>
        <ul>
          {allParticipants.map((participant) => (
            <li className="py-2">
              <Widget
                src="urbanite.near/widget/ProfileLine"
                props={{
                  accountId: participant,
                  hideAccountId: true,
                  tooltip: true,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <CommitButton
        style={{ backgroundColor: "thistle", borderColor: "white" }}
        data={{
          astrosocial: {
            bounties: {
              [bountyId]: {
                participated: !participated ? true : null,
              },
            },
          },
        }}
      >
        {participated ? "I want to leave :(" : "I want to participate!"}
      </CommitButton>
    </div>
  </div>
);

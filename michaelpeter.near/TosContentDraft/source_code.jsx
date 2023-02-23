//options: default, terms, privacy, community
State.init({ show: "default", terms: null, privacy: null, community: null });

const termsCidPath =
  "bafybeieqhkr6kxqc5v3fmuieuiaeh6qb57pk6nyy575n7yglfdmx6ophla/terms.md";
const privacyCidPath =
  "bafybeib6csg3j4mudfyhcb7akpfmxtlzqluqp4jmt5va5iumjucrqwhhkq/privacy.md";
const communityCidPath = "TODO";

asyncFetch(`https://ipfs.near.social/ipfs/${termsCidPath}`).then((res) => {
  State.update({ terms: res.body });
});
asyncFetch(`https://ipfs.near.social/ipfs/${privacyCidPath}`).then((res) => {
  State.update({ privacy: res.body });
});
// asyncFetch(`https://ipfs.near.social/ipfs/${termsCidPath}`).then((res) => {
//   State.update({ terms: res.body });
// });

const DocBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  border: solid 1px lightgrey;
  border-radius: 0.75rem;
  padding: 1rem;
  &:hover {
    color: var(--bs-green);
    border-color: var(--bs-green);
  }
`;

const DocTitle = styled.div`
display: flex;
flex-direction: row;
column-gap: 0.5rem;
font-weight: bold;
align-items: center;
`;

const DocSummary = styled.span`
color: grey
`;

const Arrow = styled.i`
  color: var(--bs-green);
  font-size: 1.25rem;
`;

// const DocFullDisplay = styled.div`
//   display: flex;
//   flex
// `;

const DocContent = styled.div`
  overflow-y: scroll;
`;

return (
  <div className="d-flex flex-column gap-3 justify-content-center">
    {state.show === "default" && (
      <>
        <h1>Terms, Privacy, and Community Guidelines</h1>
        <p>
          To continue using alpha.near.org, please read and agree to the
          following terms and policies:
        </p>
        <DocBox
          onClick={() => {
            State.update({ show: "terms" });
          }}
        >
          <DocTitle>
            Terms of Service
            <Arrow className="bi bi-arrow-right" />
          </DocTitle>
          <DocSummary>Summary</DocSummary>
        </DocBox>
        <DocBox>
          <DocTitle>
            Privacy Policy
            <Arrow className="bi bi-arrow-right" />
          </DocTitle>
          <DocSummary>Summary</DocSummary>
        </DocBox>
        <DocBox>
          <DocTitle>
            Community Guidelines
            <Arrow className="bi bi-arrow-right" />
          </DocTitle>
          <DocSummary>Summary</DocSummary>
        </DocBox>
      </>
    )}
    {state.show === "terms" && (
      <>
        <button
          onClick={() => {
            State.update({ show: "default" });
          }}
          className="btn btn-outline-success"
          style={{ width: "6rem" }}
        >
          <i className="bi bi-arrow-left" />
          Back
        </button>
        <DocContent>
          <Markdown text={state.terms} />
        </DocContent>
      </>
    )}
  </div>
);

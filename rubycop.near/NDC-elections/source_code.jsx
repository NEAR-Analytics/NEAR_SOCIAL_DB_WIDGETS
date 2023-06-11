const {
  id,
  typ,
  title,
  ref_link,
  start,
  end,
  quorum,
  voters_num,
  seats,
  candidates,
  result,
  voters,
  votes,
  contractName,
  ndcOrganization,
} = props;

const _bookmarked = Social.index(ndcOrganization, typ);

State.init({
  availableVotes: votes.available,
  selected: null,
  bookmarked: _bookmarked ? _bookmarked[_bookmarked.length - 1].value : [],
  selectedCandidates: [],
});

const H4 = styled.h4`
  margin-bottom: 0;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

const Container = styled.div`
  font-family: Avenir;
  font-size: 16px;
`;

const StyledLink = styled.a`
  color: inherit;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NominationLink = styled.a`
  font-size: 12px;
  line-height: 24px;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #ffffff 0%, #ffffff 100%)"
      : "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: ${(props) =>
    props.selected ? "1px solid #ffffff" : "1px solid #9333EA"};
  padding: 0 10px;
  border-radius: 5px;
`;

const CandidateItem = styled.div`
  padding: 0 25px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 8px;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
      : "#F8F8F9"};
  color: ${(props) => (props.selected ? "white" : "inherit")};

  &:hover {
    cursor: pointer;
  }
`;

const VoterItem = styled.div`
font-size: 14px;
  padding: 0 25px;
  height: 48px;
  border-bottom: 1px solid #D0D6D9;

  &:last-child {
    border: 0;
  }
`;

const VotersContainer = styled.div`
  padding: 5px 0;
`;

const W50 = styled.div`
  width: 50px;
`;

const PrimaryButton = styled.button`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border: 0;
`;

const CastVotesSection = styled.div`
  background: #FDFEFF;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  h3, h4 {
    margin: 0 3px;
  }

  h3 {
    font-weight: 900;
  }

  .text-secondary {
    margin-left: 10px;
  }
`;

const Link = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
    <span>
      <i class="bi bi-arrow-up-right" />
    </span>
  </>
);

const handleSelectCandidate = (accountId) => {
  const selectedItems = state.selectedCandidates.includes(accountId)
    ? state.selectedCandidates.filter((el) => el !== accountId)
    : [...state.selectedCandidates, accountId];

  const availableVotes = votes.total - selectedItems.length;
  if (availableVotes < 0) return;

  State.update({
    selectedCandidates: selectedItems,
    availableVotes,
  });
};

const handleBookmarkCandidate = (accountId) => {
  let selectedItems = state.bookmarked.includes(accountId)
    ? state.bookmarked.filter((el) => el !== accountId)
    : [...state.bookmarked, accountId];

  selectedItems = [...new Set(selectedItems)];

  if (selectedItems.length === 0) State.update({ selectedCandidates: result });
  State.update({ bookmarked: selectedItems });
};

const handleVote = () => {
  Near.call([
    {
      contractName: contractName,
      methodName: "vote",
      args: { prop_id: id, vote: state.selectedCandidates },
      gas: "70000000000000",
      deposit: 0.002,
    },
  ]);
};

const VotersList = ({ voters }) => (
  <VotersContainer>
    {voters.map((voter) => (
      <VoterItem className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <W50 />
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: voter.accountId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "24px", height: "24px", marginRight: 4 },
            }}
          />
          <Link
            src={`https://wallet.near.org/profile/${voter.accountId}`}
            title={voter.accountId}
          />
        </div>
        <div className="d-flex align-items-center">
          <Link src={voter.txn_url} title={voter.txn_url} />
        </div>
      </VoterItem>
    ))}
  </VotersContainer>
);

const CandidateList = ({ accountId, votes }) => {
  return (
    <div>
      <CandidateItem
        className="d-flex align-items-center justify-content-between"
        onClick={(e) => {
          if (e.target.id === "input" || e.target.id === "bookmark") return;

          State.update({
            selected: state.selected === accountId ? null : accountId,
          });
        }}
        selected={state.selected === accountId}
      >
        <div className="d-flex">
          <W50>
            <i
              id="bookmark"
              className={`bi ${
                state.bookmarked.includes(accountId)
                  ? "bi-bookmark-fill"
                  : "bi-bookmark"
              }`}
            />
          </W50>
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "24px", height: "24px", marginRight: 4 },
            }}
          />
          <Link
            src={`https://wallet.near.org/profile/${accountId}`}
            title={accountId}
          />
        </div>
        <div className="d-flex">
          <NominationLink
            href={ref_link}
            selected={state.selected === accountId}
          >
            Nomination
            <span className="ml-2 text-secondary">
              <i class="bi bi-arrow-up-right" />
            </span>
          </NominationLink>
        </div>
        <div>{votes}</div>

        <input
          id="input"
          onClick={() => handleSelectCandidate(accountId)}
          class="form-check-input"
          type="checkbox"
          checked={state.selectedCandidates.includes(accountId)}
        />
      </CandidateItem>
      {state.selected === accountId && (
        <VotersList
          voters={voters.filter((v) => v.candidateId === accountId)}
        />
      )}
    </div>
  );
};

return (
  <Container>
    <h1>{title}</h1>
    {result.map(([accountId, votes], index) => (
      <CandidateList accountId={accountId} votes={votes} key={index} />
    ))}
    <CastVotesSection className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-end">
        <H3>{state.availableVotes}</H3>
        <span>/</span>
        <H4>{votes.total}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <PrimaryButton
        disabled={!state.selectedCandidates.length}
        onClick={handleVote}
      >
        Cast {state.selectedCandidates.length || ""} Votes
      </PrimaryButton>
    </CastVotesSection>
  </Container>
);

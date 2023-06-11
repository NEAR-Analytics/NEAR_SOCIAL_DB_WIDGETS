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
  candidates: result,
  filter: {
    bookmark: false,
    candidate: false,
    votes: false,
  },
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
  padding: 0 20px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
      : "#F8F8F9"};
  border-color: ${(props) => (props.selected ? "#4F46E5" : "#F8F8F9")};
  color: ${(props) => (props.selected ? "white" : "inherit")};

  &:hover {
    cursor: pointer;
    border: 1px solid #4F46E5;
    background: ${(props) =>
      props.selected
        ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
        : "linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)"};
  }
`;

const VoterItem = styled.div`
font-size: 14px;
  padding: 0 20px;
  height: 48px;
  border-bottom: 1px solid #D0D6D9;

  &:last-child {
    border: 0;
  }
`;

const VotersContainer = styled.div`
  padding: 5px 0;
`;

const Bookmark = styled.div`
  width: 100px;

  #bookmark.bi-bookmark-fill {
    color: ${(props) => (props.selected ? "#fff" : "#4F46E5")};
  }
`;

const AccountLink = styled.div`
  width: 200px;
`;

const Votes = styled.div`
  width: 100px;
  text-align:center;
`;

const ActionSelect = styled.div`
  width: 50px;
`;

const FilterRow = styled.div`
  padding: 15px 20px;
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

const SecondaryButton = styled.button`
  padding: 4px 10px;
  border: 1px solid #FFD50D;
  background: transparent;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 10px;
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
    availableVotes: availableVotes,
  });
};

const selectedBookmarks = (accountId) => {
  let selectedItems = state.bookmarked.includes(accountId)
    ? state.bookmarked.filter((el) => el !== accountId)
    : [...state.bookmarked, accountId];

  return [...new Set(selectedItems)];
};

const handleBookmarkCandidate = (accountId) => {
  let selectedItems = selectedBookmarks(accountId);

  Social.set(
    {
      index: {
        [ndcOrganization]: JSON.stringify({
          key: typ,
          value: selectedBookmarks(accountId),
        }),
      },
    },
    {
      force: true,
      onCommit: () => {
        if (selectedItems.length === 0)
          State.update({ selectedCandidates: result });
        State.update({ bookmarked: selectedItems });
      },
    }
  );
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

const filterBy = (option) => {
  if (!state.filter.bookmark && option.bookmark)
    State.update({
      candidates: state.candidates.filter(([accountId, _votes], _index) =>
        state.bookmarked.includes(accountId)
      ),
      filter: { bookmark: true },
    });
  else if (option.candidate)
    State.update({
      candidates: state.candidates.sort((a, b) =>
        state.filter.candidate ? a[1] - b[1] : b[1] - a[1]
      ),
      filter: { candidate: !state.filter.candidate },
    });
  else if (option.votes) {
    console.log(state.filter.votes);
    State.update({
      candidates: state.candidates.sort((a, b) =>
        state.filter.votes ? a[1] - b[1] : b[1] - a[1]
      ),
      filter: { votes: !state.filter.votes },
    });
  } else
    State.update({
      candidates: result,
      filter: { bookmark: false },
    });
};

const VotersList = ({ voters }) => (
  <VotersContainer>
    {voters.map((voter) => (
      <VoterItem className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <Bookmark />
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
          <Link
            src={`https://explorer.mainnet.near.org/transactions/${voter.txn_url}`}
            title={voter.txn_url}
          />
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
          <Bookmark selected={state.selected === accountId}>
            <i
              id="bookmark"
              onClick={() => handleBookmarkCandidate(accountId)}
              className={`bi ${
                state.bookmarked.includes(accountId)
                  ? "bi-bookmark-fill"
                  : "bi-bookmark"
              }`}
            />
          </Bookmark>
          <AccountLink className="d-flex">
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
          </AccountLink>
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
          <Votes>{votes}</Votes>
          <ActionSelect>
            <input
              id="input"
              onClick={() => handleSelectCandidate(accountId)}
              className="form-check-input"
              type="checkbox"
              checked={state.selectedCandidates.includes(accountId)}
            />
          </ActionSelect>
        </div>
      </CandidateItem>
      {state.selected === accountId && (
        <VotersList
          voters={voters.filter((v) => v.candidateId === accountId)}
        />
      )}
    </div>
  );
};

const Filters = () => {
  return (
    <FilterRow className="d-flex align-items-center justify-content-between">
      <div className="d-flex">
        <Bookmark
          role="button"
          className="text-secondary"
          onClick={() => filterBy({ bookmark: true })}
        >
          <small>Bookmark</small>
          <i className="bi bi-funnel" />
        </Bookmark>
        <AccountLink
          role="button"
          className="text-secondary"
          onClick={() => filterBy({ candidate: true })}
        >
          <small>Candidate</small>
          <i
            className={`bi ${
              state.filter.candidate ? "bi-arrow-down" : "bi-arrow-up"
            }`}
          />
        </AccountLink>
      </div>
      <div className="d-flex">
        <Votes
          role="button"
          className="text-secondary"
          onClick={() => filterBy({ votes: true })}
        >
          <small>Votes</small>
          <i
            className={`bi ${
              state.filter.votes ? "bi-arrow-down" : "bi-arrow-up"
            }`}
          />
        </Votes>
        <ActionSelect />
      </div>
    </FilterRow>
  );
};

return (
  <Container>
    <h1>{title}</h1>
    <Filters />
    {state.candidates.map(([accountId, votes], index) => (
      <CandidateList accountId={accountId} votes={votes} key={index} />
    ))}
    <CastVotesSection className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-end">
        <H3>{state.availableVotes}</H3>
        <span>/</span>
        <H4>{votes.total}</H4>
        <span className="text-secondary">votes left</span>
        {state.selectedCandidates.length > 0 && (
          <SecondaryButton
            onClick={() =>
              State.update({
                selectedCandidates: [],
                availableVotes: votes.total,
              })
            }
          >
            Reset Selection
          </SecondaryButton>
        )}
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

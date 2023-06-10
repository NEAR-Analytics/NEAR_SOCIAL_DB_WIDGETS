// SAMPLE DATA
//
// {
//   "contractName": "elections-v1.gwg.testnet",
//   "id": 3,
//   "typ": "HouseOfMerit",
//   "ref_link": "example.com",
//   "start": 1686255580,
//   "end": 1886653747,
//   "quorum": 100,
//   "voters_num": 150,
//   "seats": 10,
//   "candidates": [
//     "zomland.near",
//     "rubycop.near",
//     "candidate1.near"
//   ],
//   "result": [
//     150,
//     10,
//     200
//   ],
//   "voters": [
//     {
//       "accountId": "rubycop.near",
//       "candidateId": "zomland.near",
//       "txn_url": "eerfserge"
//     },
//     {
//       "accountId": "voter1.near",
//       "candidateId": "zomland.near",
//       "txn_url": "wewfdsferferf"
//     },
//     {
//       "accountId": "voter1",
//       "candidateId": "candidate1.near",
//       "txn_url": "wfefegre"
//     }
//   ],
//   "votes": {
//     "available": 10,
//     "total": 10
//   }
// }

const {
  id,
  typ,
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
} = props;

State.init({
  availableVotes: votes.available,
  selected: null,
  selectedVoters: [],
});
console.log("v ", votes.available);
const getUser = (accountId) => Social.getr(`${accountId}/profile`);

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

const Cell = styled.div`
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

const SelectCandidate = styled.div`
  width: 100px;
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

const VotersList = ({ voters }) => {
  return (
    <VotersContainer>
      {voters.map((voter) => (
        <VoterItem className="d-flex align-items-center justify-content-between">
          <Cell className="d-flex">
            <SelectCandidate />
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
          </Cell>
          <Cell className="d-flex align-items-center">
            <Link src={voter.txn_url} title={voter.txn_url} />
          </Cell>
        </VoterItem>
      ))}
    </VotersContainer>
  );
};

const handleSelectCandidate = (accountId, e) => {
  const selectedItems = state.selectedVoters.includes(accountId)
    ? state.selectedVoters.filter((el) => el !== accountId)
    : [...state.selectedVoters, accountId];
  State.update({
    selectedVoters: selectedItems,
    availableVotes: votes.total - selectedItems.length,
  });
};

const handleVote = () => {
  Near.call([
    {
      contractName: contractName,
      methodName: "vote",
      args: { prop_id: id, vote: state.selectedVoters },
      gas: "70000000000000",
      deposit: 0.002,
    },
  ]);
};

const ListItem = ({ accountId, index }) => {
  return (
    <div>
      <CandidateItem
        className="d-flex align-items-center justify-content-between"
        onClick={(e) => {
          e.target.checked === undefined &&
            State.update({ selected: state.selected === index ? null : index });
        }}
        selected={state.selected === index}
      >
        <Cell className="d-flex">
          <SelectCandidate>
            <input
              onClick={(e) => handleSelectCandidate(accountId, e)}
              class="form-check-input"
              type="checkbox"
              checked={state.selectedVoters.includes(accountId)}
            />
          </SelectCandidate>
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
        </Cell>
        <Cell className="d-flex">
          <NominationLink href={ref_link} selected={state.selected === index}>
            Nomination
            <span className="ml-2 text-secondary">
              <i class="bi bi-arrow-up-right" />
            </span>
          </NominationLink>
        </Cell>
        <Cell>{result[index]}</Cell>
        <i
          className={`bi ${
            state.selected === index ? "bi-bookmark-fill" : "bi-bookmark"
          }`}
        />
      </CandidateItem>
      {state.selected === index && (
        <VotersList
          voters={voters.filter((v) => v.candidateId === accountId)}
        />
      )}
    </div>
  );
};
console.log(state.availableVotes);
return (
  <Container>
    <h1>{typ}</h1>
    {candidates.map((accountId, index) => (
      <ListItem accountId={accountId} index={index} />
    ))}
    <CastVotesSection className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-end">
        <H3>{state.availableVotes}</H3>
        <span>/</span>
        <H4>{votes.total}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <PrimaryButton
        disabled={!state.selectedVoters.length}
        onClick={handleVote}
      >
        Cast {state.selectedVoters.length || ""} Votes
      </PrimaryButton>
    </CastVotesSection>
  </Container>
);

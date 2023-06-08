const {
  typ,
  ref_link,
  start,
  end,
  quorum,
  voters_num,
  seats,
  candidates,
  result,
} = props;

State.init({
  selected: null,
});

const getUser = (accountId) => Social.getr(`${accountId}/profile`);

const H4 = styled.h4`
  margin-bottom: 0;
`;

const Container = styled.div`
  font-family: Avenir;
  font-size: 16px;
`;

const Cell = styled.div`
`;

const ProfileLink = styled.a`
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

const Item = styled.div`
  padding: 0 15px;
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

const ListItem = ({ accountId, index }) => {
  return (
    <Item
      className="d-flex align-items-center justify-content-between gx-5"
      onClick={() =>
        State.update({ selected: state.selected === index ? null : index })
      }
      selected={state.selected === index}
    >
      <Cell className="d-flex align-items-center">
        <H4>
          <b>
            <i class="bi bi-arrow-up-short text-lg-left text-success"> </i>
          </b>
        </H4>
        {100}
        <H4>
          <b>
            <i class="bi bi-arrow-down-short text-lg-left text-danger"> </i>
          </b>
        </H4>
      </Cell>
      <Cell className="d-flex">
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            imageClassName: "rounded-circle w-100 h-100",
            style: { width: "24px", height: "24px", marginRight: 4 },
          }}
        />
        <ProfileLink href={`https://wallet.near.org/profile/${accountId}`}>
          {accountId}
        </ProfileLink>
        <span className="ml-2">
          <i class="bi bi-arrow-up-right" />
        </span>
      </Cell>
      <Cell className="d-flex">
        <NominationLink href={ref_link} selected={state.selected === index}>
          Nomination
          <span className="ml-2 text-secondary">
            <i class="bi bi-arrow-up-right" />
          </span>
        </NominationLink>
      </Cell>

      <Cell>
        <span>
          {index} ({voters_num})
        </span>
        <i
          className={`bi ${
            state.selected === index ? "bi-eye-fill" : "bi-eye"
          }`}
        />
      </Cell>
      <Cell>
        <i
          onClick={() => {}}
          className={`bi ${
            state.selected === index ? "bi-bookmark-fill" : "bi-bookmark"
          }`}
        />
      </Cell>
    </Item>
  );
};

return (
  <Container>
    <h1>{typ}</h1>
    {candidates.map((accountId, index) => (
      <ListItem accountId={accountId} index={index} />
    ))}
  </Container>
);

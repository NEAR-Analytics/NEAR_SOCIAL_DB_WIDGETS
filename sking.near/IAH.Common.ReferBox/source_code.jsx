const accountId = props.accountId ?? context.accountId;
const NFT_CONTRACT = props.NFT_CONTRACT;

const user_score = Near.view(
  NFT_CONTRACT,
  "referral_count_for_user",
  {
    account_id: accountId,
  },
  undefined,
  false
);

const user_rank = Near.view(
  NFT_CONTRACT,
  "referral_rank_for_user",
  {
    account_id: accountId,
  },
  undefined,
  false
);

const Wrapper = styled.div`
  border: 2px solid #08cc86;
  color: #08cc86;
  display: flex;
  flex-direction: column;
  padding: 28px;
  margin: 0 10px auto;
  width: 100%;
  max-width: 500px;
  border-radius: 18px;
  flex: 1;
`;

const Hr = styled.hr`
  border: 1px solid #08cc86;
  margin: 10px;
  margin-top: 0;
  opacity: 1;
`;

return (
  <Wrapper>
    <p className="text-center mb-3">
      Click "Invite Friends" button to invite your BOS friends to complete their
      human verification.
    </p>
    <h4 className="text-center mb-3">Or</h4>
    <p className="text-center mb-3">
      Send them the link below:
    </p>
    <div className="text-center mb-3">
      <a
        href={
          "https://near.org/sking.near/widget/IAH.Signup?referrer=" +
          accountId
        }
        target="_blank"
        rel="noreferrer"
      >
        https://near.org/sking.near/widget/IAH.Signup?referrer={accountId}
      </a>
    </div>
    <Hr />
    <h4 className="text-center mb-3">Your referral score: {user_score}</h4>
    <h4 className="text-center mb-3">Your referral rank: {user_rank}</h4>
  </Wrapper>
);

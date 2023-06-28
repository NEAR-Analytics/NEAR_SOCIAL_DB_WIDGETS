const accountId = context.accountId;
const daoId = props.daoId ?? "meta.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const followEdge = Social.keys(
  `${context.accountId}/graph/follow/${daoId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${daoId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = followEdge === null || inverseEdge === null;
const isFollowing = Object.keys(followEdge || {}).length > 0;
const isInverse = Object.keys(inverseEdge || {}).length > 0;

const type = follow ? "unfollow" : "follow";

const follow_args = JSON.stringify({
  data: {
    [daoId]: {
      graph: {
        follow: {
          [accountId]: "",
        },
      },
      index: {
        graph: {
          key: follow,
          value: {
            type: follow,
            accountId: [accountId],
          },
        },
        notify: {
          key: [accountId],
          value: {
            type: follow,
          },
        },
      },
    },
  },
});

const proposal_args = Buffer.from(follow_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "connection request",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "219000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const Wrapper = styled.div`
  .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <CommitButton disabled={loading} className="join-button" data={data}>
      {isFollowing && <i className="bi-16 bi bi-check"></i>}
      {isFollowing ? "Connected" : isInverse ? "Connect" : "Connect"}
    </CommitButton>
  </Wrapper>
);

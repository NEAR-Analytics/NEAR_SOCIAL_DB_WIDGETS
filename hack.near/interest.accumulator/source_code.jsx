const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "meta.sputnik-dao.near";

let slices = Social.getr(`${daoId}/accumulator`);

if (slices === null) {
  return "";
}

State.init({
  label: "placeholder",
  value: 100,
});

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const slice_args = JSON.stringify({
  data: {
    [state.daoId]: {
      accumulator: state.slice,
    },
  },
});

const proposal_args = Buffer.from(slice_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "propose new slice for the interest accumulator",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "300000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "300000000000000",
    },
  ]);
};

let Style = styled.div`

  .barTextH{
    transition: fill 0.2s;

  }
.barTextH:hover{
    fill: #ad610a;

  }
  .bar {
    transition: fill 0.2s;
  }

  .bar:hover {
    fill: #ffa726;
  }

  .bar-chart {
    display: flex;
    align-items: center;
    justify-content: center;
  }

    svg {
      width: 80%;
    }

    rect {
      shape-rendering: crispEdges;
      fill: #61dafb;
      stroke: #333;
      stroke-width: 1;
    }


    `;

const onChangeLabel = (label) => {
  State.update({
    label,
  });
};

const onChangeValue = (value) => {
  State.update({
    value,
  });
};

const values = [50, 50];
const labels = ["yea", "no"];

return (
  <div>
    <h3>Add Your Slice</h3>
    <h5>Label: What?</h5>
    <input type="text" onChange={(e) => onChangeLabel(e.target.value)}></input>
    <br />
    <h5>Value: How much?</h5>
    <input type="text" onChange={(e) => onChangeValue(e.target.value)}></input>
    <p>{state.slice}</p>
    <div className="mb-2">
      <button className="btn btn-outline-success m-1" onClick={handleProposal}>
        Propose Changes
      </button>
    </div>
    <Widget src="y3k.near/widget/pieChartSVG" props={{ labels, values }} />
  </div>
);

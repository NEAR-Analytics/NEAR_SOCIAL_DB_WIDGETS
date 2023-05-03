const daoId = props.daoId ?? "multi.sputnik-dao.near";

State.init({
  daoId,
});

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 10,
});

console.log(proposals);

const onChangeDAO = (daoId) => {
  State.update({
    daoId,
  });
};

return (
  <>
    <div>
      <h3>DAO Proposals</h3>

      <div>
        {proposals.map((proposal, i) => (
          <Widget
            key={i}
            src="hack.near/widget/DAO.View"
            props={{ daoId, id: i }}
          />
        ))}
      </div>
    </div>
  </>
);

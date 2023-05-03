const daoId = props.daoId ?? "multi.sputnik-dao.near";

State.init({
  daoId,
});

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 10,
});

const onChangeDAO = (daoId) => {
  State.update({
    daoId,
  });
};

return (
  <>
    <div>
      <h3>DAO Proposals</h3>
      <div className="mb-2">
        Sputnik Contract ID:
        <input type="text" onChange={(e) => onChangeDAO(e.target.value)} />
      </div>

      <hr />

      <div>
        {proposals.map((proposal, i) => (
          <Widget
            key={i}
            src="hack.near/widget/DAO.Proposal"
            props={{ daoId: state.daoId, id: i }}
          />
        ))}
      </div>
    </div>
  </>
);

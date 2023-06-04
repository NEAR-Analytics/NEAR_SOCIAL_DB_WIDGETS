const daos = Near.view("sputnik-dao.near", "get_dao_list");

State.init({
  name: props.name ?? "",
});

const matchingDaos = daos.filter((dao) => dao.indexOf(state.name) !== -1);

const total_daos = matchingDaos.length;

const onChangeName = (name) => {
  State.update({
    name,
  });
};

return (
  <div className="m-1">
    <h2 className="mb-2">Every DAO</h2>
    <h5 className="mb-3">{total_daos} Total</h5>
    <h4 className="mb-2">Search by Name</h4>
    <input
      placeholder="<example>.sputnik-dao.near"
      type="text"
      value={state.name}
      onChange={(e) => onChangeName(e.target.value)}
    ></input>
    <div className="mt-3">
      {matchingDaos.map((dao, j) => (
        <div className="d-flex m-2">
          <a key={j} href={`/#/hack.near/widget/DAO.Profile?daoId=${dao}`}>
            {dao}
          </a>
        </div>
      ))}
    </div>
  </div>
);

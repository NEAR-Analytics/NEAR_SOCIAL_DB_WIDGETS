const daos = Near.view("sputnik-dao.near", "get_dao_list");

if (daos === null) {
  return "Loading...";
}

State.init({
  name: props.name ?? "",
});

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const filteredDaos = daos.filter((dao) => dao.indexOf(state.name) !== -1);

const total_daos = daos.length;

const filtered_daos = filteredDaos.length;

return (
  <div className="m-1">
    <h2 className="mb-2">Every DAO</h2>
    {!state.name ? (
      <h5 className="mb-3">Total: {total_daos}</h5>
    ) : (
      <h5 className="mb-3">Filtered: {filtered_daos}</h5>
    )}
    <h4 className="mb-2">Search by Name</h4>
    <input
      placeholder="<example>.sputnik-dao.near"
      type="text"
      value={state.name}
      onChange={(e) => onChangeName(e.target.value)}
    ></input>
    <div className="mt-3">
      {filteredDaos.map((dao, j) => (
        <div className="d-flex m-2">
          <a key={j} href={`/#/hack.near/widget/DAO.Profile?daoId=${dao}`}>
            {dao}
          </a>
        </div>
      ))}
    </div>
  </div>
);

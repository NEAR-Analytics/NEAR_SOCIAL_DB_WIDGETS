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
    <Widget
      src="ndcplug.near/widget/common.NEARBrandHeader"
      props={{ topText: "DAO", bottomText: "Social" }}
    />
    <h2 className="mb-2">Search All DAOs on NEAR</h2>
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
          <Widget
            src="ndcplug.near/widget/DAOProfileCard"
            props={{ accountId: dao }}
          />
        </div>
      ))}
    </div>
  </div>
);

// add filter by DAOs with profiles

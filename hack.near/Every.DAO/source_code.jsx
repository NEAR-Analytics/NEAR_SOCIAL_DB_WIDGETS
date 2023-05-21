const accountId = props.accountId ?? context.accountId;

const total_daos = Near.view("sputnik-dao.near", "get_number_daos");

const daos = Near.view("sputnik-dao.near", "get_dao_list");

return (
  <>
    <div>
      <h3>Every DAO</h3>
      <h5>{total_daos} total</h5>
      <div>
        {daos.map((dao, j) => (
          <a key={j} href={`/#/hack.near/widget/DAO.Profile?daoId=${dao}`}>
            <h4>{dao}</h4>
          </a>
        ))}
      </div>
    </div>
  </>
);

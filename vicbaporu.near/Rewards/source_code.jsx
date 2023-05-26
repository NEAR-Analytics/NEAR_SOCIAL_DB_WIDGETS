const nftContract = props.nftContract;
const contractName = props.contract;

const mintedNfts = Near.view(nftContract, "get_minted_tokens", "{}");
const userInvestments = Near.view(contractName, "get_all_investors", "{}");

const balance = Near.view(contractName, "get_investor_balance", {
  wallet: "vicl9404.testnet",
});

const monthlyRevenue = 0.012;

const getNft = (investment) => {
  console.log("invesment", investment);

  const params = {
    token_id: investment.id.toString(),
    metadata: {
      title: `Milestone Point - ${investment.id}`,
      description:
        "Tu llave a un futuro descentralizado, bloques adquiridos: " +
        investment.quantity,
      media:
        "https://res.cloudinary.com/dgcxcqu6p/image/upload/v1685079723/image_b2kktg.jpg",
    },
    receiver_id: investment.wallet,
  };

  const result = Near.call(
    nftContract,
    "nft_mint",
    params,
    300000000000000,
    50000000000000000000000
  );
};

return (
  <>
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th>Proyecto</th>
          <th>Tipo de pago</th>
          <th>Estatus</th>
          <th>Bloques adquiridos</th>
          <th>Pago mensual estimado</th>
        </tr>
      </thead>
      <tbody>
        {userInvestments.map((investment) => {
          return (
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Milestone</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">NEAR</p>
              </td>
              <td>
                <span class="btn btn-warning btn-sm rounded-pill d-inline">
                  Pendiente
                </span>
              </td>
              <td>{investment.quantity}</td>
              <td>
                $ {investment.quantity * balance.blockCost * monthlyRevenue}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

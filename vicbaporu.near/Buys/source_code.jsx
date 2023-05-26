const nftContract = props.nftContract;
const contractName = props.contract;

const mintedNfts = Near.view(nftContract, "get_minted_tokens", "{}");
const userInvestments = Near.view(contractName, "get_all_investors", "{}");

const getNft = (investment) => {
  console.log("invesment", investment);

  let media = "";

  if (investment.quantity <= 5) {
    media =
      "https://res.cloudinary.com/dgcxcqu6p/image/upload/v1685126252/5_iisdn0.jpg";
  } else if (investment.quantity > 5 && investment.quantity <= 10) {
    media =
      "https://res.cloudinary.com/dgcxcqu6p/image/upload/v1685126252/10_qztoia.jpg";
  } else {
    media =
      "https://res.cloudinary.com/dgcxcqu6p/image/upload/v1685079723/image_b2kktg.jpg";
  }

  const params = {
    token_id: investment.id.toString(),
    metadata: {
      title: `Milestone Point - ${investment.id}`,
      description:
        "Tu llave a un futuro descentralizado, bloques adquiridos: " +
        investment.quantity,
      media,
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
          <th>Hash</th>
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
                <span class="btn btn-primary btn-sm rounded-pill d-inline">
                  Completado
                </span>
              </td>
              <td>{investment.quantity}</td>
              {mintedNfts ? (
                <td>
                  {mintedNfts.filter(
                    (minted) => investment.id.toString() === minted.toString()
                  ).length === 0 && (
                    <button
                      type="button"
                      class="btn btn-primary btn-sm btn-rounded"
                      onClick={() => getNft(investment)}
                    >
                      Obtener NFT
                    </button>
                  )}
                </td>
              ) : (
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={() => getNft(investment)}
                >
                  <span class="text-primary hover:text-white">Obtener NFT</span>
                </button>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

// const contractName = "dev-1685112918903-63411538737150";

State.init({
  blocks: 0,
});

const invest = () => {
  const amount = state.blocks * props.project.block_cost;
  const demoFactor = 1000000;
  // This is just to test the ammounts
  const testAmount = amount / demoFactor;
  const nearValue = 28;

  const newAmount = parseFloat(testAmount) / parseFloat(nearValue);
  const amountYoctos = 1000000000000000000000000 * newAmount;

  Near.call(
    props.contract,
    "set_new_investor",
    {
      quantity: state.blocks,
      wallet: "vicl9403.testnet",
    },
    300000000000000,
    amountYoctos.toString()
  );
};
return (
  <div>
    <div class="bg-light">
      <div class="container-fluid py-5">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4 shadow">
            <div class="card text-black border-0 bg-transparent">
              <i class="fab fa-apple fa-lg pt-2 pb-1 px-3"></i>
              <img
                src={props.project.image}
                class="card-img-top"
                alt="Apple Computer"
              />
              <div class="card-body mt-4">
                <div class="text-center">
                  <h5 class="card-title">{props.project.tldr}</h5>
                </div>
                <div>
                  <div class="mt-4 d-flex justify-content-between">
                    <span>Precio de cada bloque</span>
                    <span>${props.project.block_cost}</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between total font-weight-bold mt-4">
                  <span>Costo total del proyecto</span>
                  <span>${props.project.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-light card-body px-0 py-0">
      <div class="row">
        <div class="col-md-8 py-2">
          <div class="mx-4 my-4 text-center">
            <p class="h3 mb-3">
              <strong>Micro Inversión Descentralizada</strong>
            </p>
            <p class="text-muted">
              Comienza a desarrollar tus ingresos pasivos mediante inversiones
              inmobiliarias descentralizadas. Combinamos la tecnología
              blockchain que está revolucionando el mundo, con el mercado
              inmboliario para desarrollar un producto financiero cripto en el
              mundo real. Micro-Inversiones, Anónimas, Descentralizadas. El
              poder le pertenece a la comunidad, no al gobierno.
            </p>
            <p class="text-uppercase text-primary mb-0 new-section">
              {" "}
              Beneficios
              <span class="line-pricing"></span>
            </p>

            <div class="row">
              <div class="col-md-6">
                <ol class="list-unstyled mb-0 pt-0 pb-0">
                  <p class="my-3 fw-bold text-muted text-center"></p>
                  <li class="mb-3">
                    <i class="fas fa-check text-success me-3"></i>
                    <small>Ubicación privilegiada</small>
                  </li>
                  <li class="mb-3">
                    <i class="fas fa-check text-success me-3"></i>
                    <small>Rendimientos mensuales</small>
                  </li>
                </ol>
              </div>
              <div class="col-md-6">
                <ol class="list-unstyled mb-0 pt-0 pb-0">
                  <p class="my-3 fw-bold text-muted text-center"></p>
                  <li class="mb-3">
                    <i class="fas fa-check text-success me-3"></i>
                    <small>Descentralizado</small>
                  </li>
                  <li class="mb-3">
                    <i class="fas fa-check text-success me-3"></i>
                    <small>Anónimo & fuera del fisco</small>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class=" mt-5 pt-4 me-4">
            <p class="h5">Invierte una vez, sé dueño para siempre.</p>
            <p class="h2 fw-bold text-black">
              $32,000 <small class="text-muted">MXN</small>
            </p>
            <p class="text-decoration-underline text-black-50 ">
              Descubre más de Milestone
            </p>
            <div class="form-group">
              <label for="usr">¿Cuántos bloques quieres comprar?:</label>
              <input
                type="number"
                class="form-control"
                id="usr"
                onChange={(e) => State.update({ blocks: e.target.value })}
              />
              <h4 class="mt-4">
                Cantidad a invertir ${state.blocks * props.project.block_cost}
              </h4>
            </div>
            <button
              class="btn btn-dark d-block mb-2 mt-3 text-capitalize"
              onClick={invest}
            >
              Invierte ahora
            </button>
            <a
              href={props.project.brochure}
              target="_blank"
              class="fw-bold mt-3"
            >
              Descargar Brochure <span class="text-muted">(1MB)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

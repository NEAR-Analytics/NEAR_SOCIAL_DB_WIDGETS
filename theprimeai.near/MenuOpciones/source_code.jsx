const contract = "theprimeai.near";
const messages = Near.view(contract, "get_topics", {
  from_index: 0,
  limit: 10,
}).reverse();

console.log(messages);
// Use and manipulate state
State.init({ new_message: "" });

const onInputChange = ({ target }) => {
  State.update({ new_message: target.value });
};

const onBtnClick = () => {
  if (!state.new_message) {
    return;
  }

  Near.call(contract, "add_topic", {
    topic: state.new_message,
  });
};

const notLoggedInWarning = (
  <p class="text-center py-2">Inicia sesion para poder enviar tu mensaje</p>
);

// Render
return (
  <>
    <div class="img-fluid  text-center">
      <div class="col-lg-12">
        <img
          class="float-center"
          src="https://ipfs.near.social/ipfs/bafkreiha52l7x24ynagm37a2kcw62g6h76upfwhred65dvokrjujp6x7ty"
          width="600"
        />
      </div>
    </div>
    <div class="container border border-info p-3">
      <h3 class="text-center"></h3>
      <h4 class="text-center">SELECCIONA ALGUNA ACCIÓN</h4>
      {context.accountId ? messageForm : notLoggedInWarning}
      <div class="border border-black p-3">
        <h3>Lista de tareas</h3>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>DESCRIPCIÓN</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SUBIR TÓPICO</td>
              <td>
                {" "}
                <button
                  class="btn btn-primary mt-2 bg-white"
                  onClick={onBtnClick}
                >
                  <a href="#/theprimeai.near/widget/Registro">IR</a>
                </button>
              </td>
            </tr>
            <tr>
              <td>IR A VOTAR</td>
              <td>
                {" "}
                <button
                  class="btn btn-primary mt-2 bg-white"
                  onClick={onBtnClick}
                >
                  <a href="#/theprimeai.near/widget/votacion">IR</a>
                </button>
              </td>
            </tr>
            <tr>
              <td>COBRAR RECOMPENSAS</td>
              <td>
                {" "}
                <button
                  class="btn btn-primary mt-2 bg-white"
                  onClick={onBtnClick}
                >
                  <a href="#/theprimeai.near/widget/incentivos">IR</a>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
);

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

  Near.call(contract, "add_message", {
    text: state.new_message,
  });

  Near.call(contract, "vote_topic", {
    topicToUpdate: state.new_message,
  });
};

// Define components
const messageEnviar = (
  <>
    <div class="border border-black p-3">
      <button class="btn btn-primary m-0 p-1" onClick={onBtnClick}>
        enviar
      </button>
    </div>
  </>
);

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
      <div class="border border-black p-3">
        <h3>Lista de tópicos</h3>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Topic</th>
              <th>Seleccionar</th>
              <th>Selección</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((data, key) => {
              return (
                <>
                  <tr>
                    <td>{data.creator}</td>
                    <td>{data.topic}</td>
                    <td>
                      {" "}
                      <select name="select" onChange={onInputChange}>
                        <option value="">Escoge</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td>
                      {context.accountId ? messageEnviar : notLoggedInWarning}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    <div class="border border-black p-3">
      <h3>RESULTADOS</h3>
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th>Topic</th>
            <th>VOTO POSITIVO</th>
            <th>VOTO NEGATIVO</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, key) => {
            return (
              <>
                <tr>
                  <td>{data.topic}</td>
                  <td>5</td>
                  <td>1</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>{" "}
    <button class="btn btn-primary mt-2 bg-white" onClick={onBtnClick}>
      <a href="#/theprimeai.near/widget/MenuOpciones">
        REGRESAR AL MENÚ PRINCIPAL
      </a>
    </button>
  </>
);

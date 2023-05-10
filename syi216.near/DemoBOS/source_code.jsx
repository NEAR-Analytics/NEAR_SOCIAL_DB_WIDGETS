const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();

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

  Near.call(contract, "addMessage", {
    text: state.new_message,
  });
};

// Define components
const messageForm = (
  <>
    <div class="border border-black p-3">
      <label>Mensaje</label>
      <input placeholder="Escribe aqui tu mensaje" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Enviar mensaje
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
    <div class="container border border-info p-3">
      <h3 class="text-center">BOS Demo</h3>
      {context.accountId ? messageForm : notLoggedInWarning}
      <div class="border border-black p-3">
        <h3>Mensages:</h3>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((data, key) => {
              return (
                <>
                  <tr>
                    <td>{data.sender}</td>
                    <td>{data.text}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
// Esta es una modificacion

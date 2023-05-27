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
    <div class="container border border-info p-3">
      <h3 class="text-center">The PRIME AI</h3>
      <h4 class="text-center">INCENTIVOS</h4>
      {context.accountId ? messageForm : notLoggedInWarning}
      <div class="border border-black p-3">
        <h3>Lista de tópicos de participación</h3>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Topic</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((data, key) => {
              return (
                <>
                  <tr>
                    <td>{data.creator}</td>
                    <td>{data.topic}</td>
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

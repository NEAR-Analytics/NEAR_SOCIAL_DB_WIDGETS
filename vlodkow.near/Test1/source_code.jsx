let user_account = context.accountId;

State.init({ greeting: "have a great day!!!" });
const onChange = ({ target }) => {
  State.update({ greeting: target.value });
};

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello World! {user_account}</h1>
      <hr />
      {user_account && (
        <>
          <p>{state.greeting}</p>
          <input onChange={onChange} />
        </>
      )}
    </div>
  </>
);

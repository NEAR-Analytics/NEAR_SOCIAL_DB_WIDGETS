let user_account = context.accountId;

State.init({ greeting: "have a great day!!!" });
const onChange = ({ target }) => {
  State.update({ greeting: target.value });
};

return (
  <>
    <div class="container border border-info p-2 text-center">
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

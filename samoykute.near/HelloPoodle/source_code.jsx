let greeting = "Have a great day";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello Poodle {profile.name}</h1>
      <h1>Hello Poodle {props.name2}</h1>

      <p> {greeting} </p>
    </div>
  </>
);

let greeting = "Have a great day";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

const name = profile.name || "";
const tags = Object.keys(profile.tags ?? {});

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>
        Hello Poodle {name}, {tags}
      </h1>
      <h1>Hello Poodle {props.name2}</h1>

      <p> {greeting} </p>
    </div>
  </>
);

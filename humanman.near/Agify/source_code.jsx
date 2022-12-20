const accountId = context.accountId;
const api = "https://api.agify.io/?name=";
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

function parseName(accountId) {
  const name = accountId.split(/.near/)[0];
  console.log(name);
  return name;
}
const nameParam = parseName(accountId);
const res = fetch(`${api}${nameParam}`);
const age = res.body.age;

const styles = {
  h1: {
    color: "gray",
    "text-align": "center",
    "font-weight": "bold",
  },
  h2: {
    color: "green",
    "text-align": "center",
    "font-weight": "bold",
  },
  p: {
    "text-align": "center",
  },
  sm: {
    "text-align": "center",
  },
  span: {
    "text-decoration": "underline",
  },
};

if (context.loading) {
  return "Loading";
}

return (
  <div>
    <h1 style={styles.h1}>Agify</h1>
    <p style={styles.p}>
      This widget guesses your age based on your account name
    </p>
    <br />
    <h2 style={styles.h2}>
      your age, {nameParam}, is: <span style={styles.span}>{age}!</span>
    </h2>
    <br />
    <br />
    <p style={styles.p}>
      <small style={styles.sm}>powered by agify api</small>
    </p>
  </div>
);

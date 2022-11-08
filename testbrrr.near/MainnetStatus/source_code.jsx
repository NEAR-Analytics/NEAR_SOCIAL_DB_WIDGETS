if (!data) {
  return "Loading";
}
const res = fetch("https://searchcaster.xyz/api/search?text=test");
const body = res.body;
const casts = body.casts;

const allCasts = [];

for (let i = 0; i < casts.length; ++i) {
  allCasts.push(
    <div className="mb-2">
      <p> {{ casts }} </p>
    </div>
  );
}

return <div className="container row">{allCasts}</div>;

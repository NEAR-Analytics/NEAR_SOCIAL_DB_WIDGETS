import PokeItem from "/social-widgets/michaelpeter.near/PokeItem";

function PokeActivity() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Poke Activity</h2>
      {Array.from(Array(20).keys()).map((a) => (
        <PokeItem key={a} />
      ))}
    </div>
  );
}

import DummyImage from "/social-widgets/michaelpeter.near/DummyImage";

export default function PokeItem() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <DummyImage dimension={10} />
      <p className="text-2xl">👈</p>
      <DummyImage dimension={10} />
      <p className="text-slate-400">2 hours ago</p>
    </div>
  );
}

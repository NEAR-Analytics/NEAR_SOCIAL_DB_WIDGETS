import DummyImage from "/social-widgets/michaelpeter.near/DummyImage";

function FollowItem() {
  return (
    <div className="flex flex-row gap-1 items-center">
      <DummyImage dimension={10} />
      <p>A Near Enthusiast</p>
      <p className="text-slate-400">followed</p>
      <DummyImage dimension={10} />
      <p>Web3 Newcomer</p>
      <p className="text-slate-400">1 hour ago</p>
    </div>
  );
}

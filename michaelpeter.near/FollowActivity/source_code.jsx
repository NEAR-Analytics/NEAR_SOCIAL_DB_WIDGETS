import FollowItem from "/social-widgets/michaelpeter.near/FollowItem";

function FollowActivity() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Follow Activity</h2>
      {Array.from(Array(20).keys()).map((a) => (
        <FollowItem key={a} />
      ))}
    </div>
  );
}

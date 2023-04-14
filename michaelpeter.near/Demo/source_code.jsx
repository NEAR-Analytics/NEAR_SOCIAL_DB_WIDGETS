import ProfileHeader from "/social-widgets/michaelpeter.near/ProfileHeader";
import Applications from "/social-widgets/michaelpeter.near/Applications";
import People from "/social-widgets/michaelpeter.near/People";
import LinkOuts from "/social-widgets/michaelpeter.near/LinkOuts";
import FollowActivity from "/social-widgets/michaelpeter.near/FollowActivity";
import PokeActivity from "/social-widgets/michaelpeter.near/PokeActivity";

export default function Demo() {
  return (
    <div className="flex flex-col p-10 gap-4">
      <ProfileHeader />
      <Applications />
      <People />
      <LinkOuts />
      <div className="flex flex-row justify-between">
        <FollowActivity />
        <PokeActivity />
      </div>
    </div>
  );
}

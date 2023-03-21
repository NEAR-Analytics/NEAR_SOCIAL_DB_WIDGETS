let linkAvt =
  "https://ipfs.near.social/ipfs/bafkreih6pjlzjpx4j23gz3l2dbi5eogk5r6ndfbbakkgwoi4hzf3zqpwo4";

let linkProfile = "/#/mob.near/widget/ProfilePage?accountId=dev368.near";
let linkTwitter = "https://twitter.com/zens68";

return (
  <div>
    <h1> Hello! </h1>
    <div>
      <img src={linkAvt} width="200" height="200"></img>
    </div>

    <a href={linkProfile} style={{ color: "red" }}>
      I am Dev368
    </a>
    <div></div>
    <a href={linkTwitter}>My Twitter</a>
  </div>
);

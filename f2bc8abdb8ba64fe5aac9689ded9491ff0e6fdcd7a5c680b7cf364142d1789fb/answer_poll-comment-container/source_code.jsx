// console.log("props: ", props);
const comment = props.comment;
// const answerTimeStamp = props.answerTimeStamp;
// const accountId = props.accountId;

// const profile = Social.getr(`${accountId}/profile`);

// const timeAgo = (diffSec) =>
//   diffSec < 60000
//     ? `${(diffSec / 1000) | 0} seconds ago`
//     : diffSec < 3600000
//     ? `${(diffSec / 60000) | 0} minutes ago`
//     : diffSec < 86400000
//     ? `${(diffSec / 3600000) | 0} hours ago`
//     : `${(diffSec / 86400000) | 0} days ago`;

// const profileLink = (c) => (
//   <a
//     className="text-decoration-none link-dark"
//     href={`#/mob.near/widget/ProfilePage?accountId=${userMakingQuestion}`}
//   >
//     {c}
//   </a>
// );

return (
  <div
    style={{
      width: "100%",
      backgroundColor: "#F0F4FF5C",
      borderRadius: "8px",
      maxHeight: "max-content",
    }}
  >
    <p className="m-3 p-1">{comment}</p>
  </div>
);

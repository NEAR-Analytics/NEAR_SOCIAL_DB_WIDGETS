const badgeName = props.badge_name;
const size = props.size || "10rem";
const fontSize = props.fontSize || "0.8em";
if (!badgeName) return "Provide a badge_name";

const badgesQuery = Social.getr(`*/badge/${badgeName}/*`, "final");
console.log(badgesQuery);
if (!badgesQuery) return "Loading...";
if (Object.keys(badgesQuery).length == 0) return "Badge does not exist";
let badgeInfo = Object.values(badgesQuery)[0].badge[badgeName].info;
const BadgeCard = styled.div`
  width: ${size}
`;

const BadgeImg = styled.img`
  objectFit: "cover",
  objectPosition: "center",
  height: ${size},
  width: ${size},
  max-height: ${size},
  float: left;
`;
const BadgeCardOverlay = styled.div`
 word-break: break-all !important;
 font-size: ${fontSize};
`;
return (
  <BadgeCard className="card bg-dark text-white text-center overflow-hidden rounded-circle border-dark">
    <BadgeImg
      class="card-img-top img-thumbnail img-responsive"
      src={badgeInfo.image.url}
      alt="badge"
      title={badgeInfo.description}
    />
    <BadgeCardOverlay class="card-img-overlay">
      <p className="text-uppercase p-2">{badgeInfo.name}</p>
    </BadgeCardOverlay>
  </BadgeCard>
);

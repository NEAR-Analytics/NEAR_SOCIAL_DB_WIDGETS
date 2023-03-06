const badgeName = props.badge_name;
const showFull = props.full_card || false;
const size = props.size || "10rem";
if (!badgeName) return "Provide a badge_name";

const badgesQuery = Social.getr(`*/badge/${badgeName}/*`, "final");
if (!badgesQuery) return "Loading...";
if (Object.keys(badgesQuery).length == 0) return "Badge does not exist";
let badgeInfo = Object.values(badgesQuery)[0].badge[badgeName].info;
const BadgeCard = styled.div`
  width: ${size};
`;

const BadgeImg = styled.img`
  objectFit: "cover";
  objectPosition: "center";
  height: ${size};
  width: ${size};
`;
const BadgeCardBody = styled.div`
 word-break: break-all !important;
 font-size: calc(.1*${size})
`;

if (!showFull)
  return (
    <BadgeCard>
      <div class="ratio ratio-1x1 rounded-circle overflow-hidden">
        <BadgeImg
          src={badgeInfo.image.url}
          alt="badge"
          title={badgeInfo.description}
        />
      </div>
    </BadgeCard>
  );
return (
  <BadgeCard className="card text-center">
    <div class="ratio ratio-1x1 rounded-circle overflow-hidden">
      <BadgeImg
        class="card-img-top img-thumbnail img-responsive"
        src={badgeInfo.image.url}
        alt="badge"
        title={badgeInfo.description}
      />
    </div>

    <BadgeCardBody class="card-body">
      <p className="text-uppercase card-title">{badgeInfo.name}</p>
      <p className="card-text text-muted">{badgeInfo.description}</p>
    </BadgeCardBody>
  </BadgeCard>
);

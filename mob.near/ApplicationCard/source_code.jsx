const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = Social.get([
  `${widgetPath}/metadata/name`,
  `${widgetPath}/metadata/image/**`,
])[accountId].widget[widgetName].metadata;

const name = metadata.name ?? widgetName;
const image = metadata.image;

const Card = styled.div`
transition: box-shadow .3s;
&:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}
`;

return (
  <Card
    className="card position-relative m-2 border-0"
    style={{ borderRadius: "1em", maxWidth: "12em" }}
  >
    <div className="pt-3 pb-1 g-1">
      <div className="m-auto text-center mb-2">
        <div
          className="d-inline-block"
          style={{ width: "10em", height: "10em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100 shadow",
              style: { objectFit: "cover", borderRadius: "2em" },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: widgetName,
            }}
          />
        </div>
      </div>
      <div
        className="px-3 d-flex text-center align-items-center justify-content-center overflow-hidden"
        style={{ height: "4rem" }}
      >
        <a className="stretched-link link-dark" href={`#/${widgetPath}`}>
          <h5 className="card-title">{name}</h5>
        </a>
      </div>
    </div>
  </Card>
);

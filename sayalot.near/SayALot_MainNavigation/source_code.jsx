const currentPill = props.currentNavPill ?? "";
const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
];
const authorForWidget = "sayalot.near";
const pills = [];

const Button = styled.button`
  margin: 0px 1rem;
  padding: 0;
  border: 0;
  background-color: white;
  
  a {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;

    border: 2px solid transparent;
    font-weight: 500;
    padding: 0.3rem 0.5rem;
    background-color: #010A2D;
    border-radius: 12px;
    color: white;
    text-decoration: none;   
  }

  a:hover {
    color: #010A2D;
    background-color: white;
  }
`;

const accountId = props.accountId ?? context.accountId;

return (
  <div
    className="navbar navbar-expand-md border-bottom mb-3"
    style={{ backgroundColor: "white" }}
  >
    <div className="container-fluid">
      <a
        className="navbar-brand text-decoration-none"
        href={`#/${authorForWidget}/widget/SayALot`}
      >
        <div className="d-inline-block" style={{ width: "5em", height: "5em" }}>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: metadata.image,
              className: "w-100 h-100",
              style: {
                objectFit: "cover",
              },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreighocpt6opkkikgf6bnpfw3sg2c5bj37smrdbzg7k3duadkvfx6ti",
              alt: widgetName,
            }}
          />
        </div>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {pills.map(({ id, title, widgetName }, i) => (
            <li className="nav-item">
              <a
                href={`#/${authorForWidget}/widget/${widgetName}`}
                className={`nav-link ${
                  id === currentPill
                    ? "active text-decoration-underline"
                    : "text-decoration-none"
                } `}
              >
                {title}
              </a>
            </li>
          ))}
          {accountId &&
            writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
              <div className="d-block d-md-none">
                <a
                  className="btn btn-outline-dark"
                  href={`#/${authorForWidget}/widget/SayALot_CreateArticle`}
                >
                  + Create Article
                </a>
              </div>
            )}
        </ul>
      </div>
      {accountId &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
          <Button>
            <a href={`#/${authorForWidget}/widget/SayALot_CreateArticle`}>
              + Create Article
            </a>
          </Button>
        )}
      <div className="d-none d-md-block">
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId, tooltip: true }}
        />
      </div>
    </div>
  </div>
);

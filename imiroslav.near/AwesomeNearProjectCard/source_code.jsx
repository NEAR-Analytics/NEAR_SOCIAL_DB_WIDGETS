const css = fetch(
  "https://gateway.pinata.cloud/ipfs/QmTQKDx6jGLkigj9yAWZow1d1dEYrqUeSvKgHtcmnBEVYK?_gl=1*1uz9sye*_ga*MjRlZDQxNzQtOGRlNy00ZGZjLTlhNWEtMWEyNjU5OGUzMGMw*_ga_5RMPXG14TE*MTY3OTI5NjkzNy4xLjEuMTY3OTI5NzQ3MC41NC4wLjA."
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}`,
  });
}

const Theme = state.theme;

const isBuilding = props.status === "BUILDING";

return (
  <Theme>
    <div className="near-item">
      <div className="near-item-test">
        <div className="tile">
          <div className="tile-icon">
            <img src={props.logo} alt={props.title} loading="lazy" />
          </div>
          <div className="tile-content">
            <h2 className="tile-title">{props.title}</h2>
            <div className="tile-tags">
              {isBuilding ? (
                <span>"COMMING SOON"</span>
              ) : (
                <>
                  {props.categories.map((category, i) => (
                    <span key={i} title={category}>
                      {category}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-subtitle">{props.oneliner}</h3>
        </div>
      </div>
      <div className="near-item-footer">
        <div className="tile-social">
          {props.website && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-website"></use>
            </svg>
          )}
          {props.twitter && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-twitter"></use>
            </svg>
          )}
          {props.facebook && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-facebook"></use>
            </svg>
          )}
          {props.medium && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-medium"></use>
            </svg>
          )}
          {props.telegram && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-telegram"></use>
            </svg>
          )}
          {props.github && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-github"></use>
            </svg>
          )}
          {props.linkedIn && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-linkedin"></use>
            </svg>
          )}
          {props.astroDAO && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-astrodao"></use>
            </svg>
          )}
          {props.discord && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-discord"></use>
            </svg>
          )}
        </div>
        <div className="tile-series">
          {props.series.map((serie, i) => (
            <div key={i} className={`label-series ${serie.toLowerCase()}`}>
              <svg className="icon icon-series" height="20" width="20">
                <use xlinkHref={`#icon-${serie.toLowerCase()}`}></use>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Theme>
);

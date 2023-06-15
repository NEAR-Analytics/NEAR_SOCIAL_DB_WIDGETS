const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const postType = props.postType ?? "post";
const externalLink = `https://social.near.page/${
  postType === "post" ? "p" : "c"
}/${accountId}/${blockHeight}`;

const clickPrompt =
  props.clickPrompt ?? `Check out this project on the #BOS!\n${externalLink}`;

const twitterUrl = new URL("https://twitter.com/intent/tweet");
twitterUrl.searchParams.set("text", clickPrompt);

const mailtoUrl = new URL("mailto:");
mailtoUrl.searchParams.set("subject", `Check out this project on the #BOS!`);
mailtoUrl.searchParams.set(
  "body",
  `Take a look.
${externalLink}
`
);

const project = JSON.parse(
  Social.get(`${accountId}/project/nyc`, blockHeight) ?? "null"
);

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #11181C;

  a {
    color: inherit;
    transition: color .15s ease;
    &:hover {
      color: #30A46C;
      text-decoration: none;

      & + i {
        visibility: visible;
      }
    }

    & + i {
      transition: visibility .1s ease-out;
      visibility: hidden;
      color: #30A46C;
    }
  }
`;
const H6 = styled.h6`
  font-size: 14px;
  font-weight: 500;
  color: #687076;
`;
const Trancate = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TopicName = styled.span`
  color: #006ADC;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
`;
const CardWrapper = styled.div`
  z-index: 100;
  padding: 6px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 275px;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 12px;
`;
const Item = styled.div`
  padding: 0;
  .btn {
    width: 100%;
    text-align: left;
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    &.report-btn, &.hide-btn {
      i {
        color: #7E868C;
      }
    }
    span {
      font-weight: 500;
    }
  }
`;
const Button = styled.button`
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  padding-left: 0.5em;
  &:hover {
    color: DeepSkyBlue;
    background: rgba(0, 191, 255, 0.1);
  }
`;

return (
  <div class="row">
    <div class="col-1 d-sm-block d-none">
      <Widget
        src="dev-support.near/widget/ProfileImage"
        props={{
          accountId,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </div>
    <div class="col-sm-1 col-2">
      <Widget
        src="nycdao.near/widget/project.vouch"
        props={{ accountId, blockHeight }}
      />
    </div>
    <div class="col-10">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <H2>{project.title}</H2>
            </div>
            <div class="col-auto">
              <div class="dropdown ms-auto">
                {blockHeight !== "now" && (
                  <span>
                    <Button
                      className="btn me-1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      title="Share"
                    >
                      <i className="bi fs-4 bi-share" />
                    </Button>
                    <ul className="dropdown-menu">
                      <li>
                        <Widget
                          src="mob.near/widget/CopyButton"
                          props={{
                            text: externalLink,
                            className: "btn btn-outline-dark dropdown-item",
                            label: `Copy Link`,
                          }}
                        />
                      </li>
                      <li className="dropdown-item">
                        <a
                          className="link-dark text-decoration-none"
                          href={mailtoUrl.toString()}
                          target="_blank"
                        >
                          <i className="bi bi-envelope-at" /> Email
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          className="link-dark text-decoration-none"
                          href={twitterUrl.toString()}
                          target="_blank"
                        >
                          <i className="bi bi-twitter" />
                          Tweet
                        </a>
                      </li>
                    </ul>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

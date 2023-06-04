const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const items = props.items;

if (!items) {
  return (
    <>
      <h5 className="text-danger">Error:</h5>
      <ul>
        <li>Items passed wrongly</li>
      </ul>
    </>
  );
}

const renderOptions = () => {
  return (
    <>
      {console.log(items)}
      {items.map((item) => {
        if (item.type == "copyLink") {
          return (
            <li
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                clipboard.writeText(item.link);
              }}
            >
              {item.iconBeforeText && <i className={item.iconBeforeText}></i>}
              <span>{item.text}</span>
              {item.iconAfterText && <i className={item.iconAfterText}></i>}
            </li>
          );
        } else if (item.type == "markdownSource") {
          return (
            <li className="dropdown-item">
              <a className="link-dark text-decoration-none" href={item.link}>
                {item.iconBeforeText && <i className={item.iconBeforeText}></i>}
                <span>{item.text}</span>
                {item.iconAfterText && <i className={item.iconAfterText}></i>}
              </a>
            </li>
          );
        } else if (item.type == "hideAccount") {
          return (
            <li>
              <Widget
                src="mob.near/widget/MainPage.Common.HideAccount"
                props={{ accountId: item.accountId }}
              />
            </li>
          );
        } else if (item.type == "flagItem") {
          return (
            <li>
              <Widget
                src="mob.near/widget/MainPage.Common.FlagContent"
                props={{
                  item: item.flagItem,
                  label: `Flag ${item.postType} for moderation`,
                }}
              />
            </li>
          );
        } else {
          return <li className="text-danger">Item not recognized</li>;
        }
      })}
    </>
  );
};

return (
  <span className="col flex-grow-0">
    <a
      href="javascript:void"
      className="link-secondary ms-2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="fs-6 bi bi-three-dots" />
    </a>
    <ul className="dropdown-menu">{renderOptions()}</ul>
  </span>
);

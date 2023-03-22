const navItems = props.navItems;
if (!navItems) return "Must define nav items";
const ownerId = "hack.near";

return (
  <div className="d-flex flex-column">
    <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
      <span>Components</span>
    </h4>
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/Common.Component.Library?tab=home`}
      onClick={() => props.onSelect({ tab: "home", id: "" })}
    >
      <i className="bi-house" />
      <span>Home</span>
    </a>
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/Common.Component.Library?tab=search`}
      onClick={() => props.onSelect({ tab: "search", id: "" })}
    >
      <i className="bi-search" />
      <span>Search</span>
    </a>
    <hr className="border-2" />
    {navItems.map((item) => {
      console.log(item);
      return (
        <a
          className={`nav-link mt-2 rounded-3${
            item.id === props.tab ? "general" : ""
          }`}
          href={`https://near.social/#/${ownerId}/widget/Common.DAO.Library?tab=${item.id}`}
          onClick={() => props.onSelect({ tab: item.id })}
        >
          {" "}
          <i className={item.icon} /> <span>{item.name}</span>{" "}
        </a>
      );
    })}
  </div>
);

const ownerId = "contribut3.near";

State.init({
  selected: props.tab ?? "dashboard",
});

const navItem = ({ text, icon, id }) => (
  <a
    className={`nav-link mb-2 ${id === state.selected ? "bg-secondary" : ""}`}
    href={`https://near.social/#/${ownerId}/widget/Index?tab=${id}`}
  >
    <i className={icon} />
    <span>{text}</span>
  </a>
);

return (
  <div className="d-flex flex-column">
    <a className="">
      <h4>
        <i className="bi-triangle" />
        Web3 Combinator
      </h4>
    </a>
    {navItem({
      text: "Dashboard",
      icon: "bi-house",
      id: "dashboard",
    })}
    {navItem({ text: "Profile", link: "#", icon: "bi-person", id: "profile" })}
    {navItem({
      text: "My projects",
      icon: "bi-boxes",
      id: "projects",
    })}
    {navItem({
      text: "My organizations",
      icon: "bi-diagram-2",
      id: "orgs",
    })}
    {navItem({
      text: "My invites",
      icon: "bi-envelope",
      id: "invites",
    })}
    {navItem({
      text: "My contributions",
      icon: "bi-ui-checks-grid",
      id: "contributions",
    })}
    <hr className="border-2" />
    {navItem({
      text: "About this app",
      icon: "bi-info-square",
      id: "about",
    })}
  </div>
);

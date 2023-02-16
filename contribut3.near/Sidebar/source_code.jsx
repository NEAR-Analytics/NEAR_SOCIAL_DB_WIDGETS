const ownerId = "contribut3.near";

State.init({
  selected: props.tab ?? "dashboard",
});

const navItem = ({ text, icon, link, id }) => (
  <a
    className={`nav-link mb-2 ${id === state.selected ? "bg-secondary" : ""}`}
    href={link}
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
      link: "#",
      icon: "bi-house",
      id: "dashboard",
    })}
    {navItem({ text: "Profile", link: "#", icon: "bi-person", id: "profile" })}
    {navItem({
      text: "My projects",
      link: "#",
      icon: "bi-boxes",
      id: "projects",
    })}
    {navItem({
      text: "My organizations",
      link: "#",
      icon: "bi-diagram-2",
      id: "orgs",
    })}
    {navItem({
      text: "My invites",
      link: "#",
      icon: "bi-envelope",
      id: "invites",
    })}
    {navItem({
      text: "My contributions",
      link: "#",
      icon: "bi-ui-checks-grid",
      id: "contributions",
    })}
    <hr className="border-2" />
    {navItem({
      text: "About this app",
      link: "#",
      icon: "bi-info-square",
      id: "about",
    })}
  </div>
);

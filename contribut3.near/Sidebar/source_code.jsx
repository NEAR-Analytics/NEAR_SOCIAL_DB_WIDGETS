const ownerId = "contribut3.near";

const navItem = ({ text, icon, link }) => (
  <a className="nav-link" href={link}>
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
    {navItem({ text: "Dashboard", link: "#", icon: "bi-house" })}
    {navItem({ text: "Profile", link: "#", icon: "bi-person" })}
    {navItem({ text: "My projects", link: "#", icon: "bi-boxes" })}
    {navItem({ text: "My organizations", link: "#", icon: "bi-diagram-2" })}
    {navItem({ text: "My invites", link: "#", icon: "bi-envelope" })}
    {navItem({
      text: "My contributions",
      link: "#",
      icon: "bi-ui-checks-grid",
    })}
    <hr className="border-2" />
    {navItem({ text: "About this app", link: "#", icon: "bi-info-square" })}
  </div>
);

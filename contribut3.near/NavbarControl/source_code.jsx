const formName = props.formName;
const icon = props.icon;
const text = props.text;

if (!formName || !icon || !text) {
  return "Cannot render navbar control without form name, icon or text!";
}

return (
  <li className="nav-item">
    <a>
      <i className={icon} />
      {text}
    </a>
  </li>
);

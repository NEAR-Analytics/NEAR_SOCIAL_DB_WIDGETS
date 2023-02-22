const links = props.links;

const linksList = [];

if ("github" in links) {
  linksList.push(
    <li>
      <a href={`https://github.com/${links["github"]}`} target="_blank">
        <i className="bi-github" />
      </a>
    </li>
  );
}

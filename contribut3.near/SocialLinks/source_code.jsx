const links = props.links;

const linksList = [];

if ("github" in links) {
  linksList.push(
    <li>
      <a href={`https://github.com/${links["github"]}`}>
        <i className="bi-github" />
      </a>
    </li>
  );
}

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

// if ("discord" in links) {
//   linksList.push(
//     <li>
//       <a href={`https://discord.com/u/${links["discord"]}`} target="_blank">
//         <i className="bi-discord" />
//       </a>
//     </li>
//   );
// }

if ("reddit" in links) {
  linksList.push(
    <li>
      <a href={`https://reddit.com/u/${links["reddit"]}`} target="_blank">
        <i className="bi-reddit" />
      </a>
    </li>
  );
}

if ("twitter" in links) {
  linksList.push(
    <li>
      <a href={`https://twitter.com/${links["twitter"]}`} target="_blank">
        <i className="bi-twitter" />
      </a>
    </li>
  );
}

if ("youtube" in links) {
  linksList.push(
    <li>
      <a href={`https://youtube.com/${links["youtube"]}`} target="_blank">
        <i className="bi-youtube" />
      </a>
    </li>
  );
}

return (
  <ul className="d-flex flex-row justify-content-between align-items-center">
    {linksList}
  </ul>
);

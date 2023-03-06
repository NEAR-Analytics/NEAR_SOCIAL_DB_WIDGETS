const links = props.links;

const supportedLinks = [
  { name: "github", url: "https://github.com/", icon: "bi-github" },
  { name: "discord", url: "https://discord.com/", icon: "bi-discord" },
  { name: "reddit", url: "https://reddit.com/u/", icon: "bi-reddit" },
  { name: "twitter", url: "https://twitter.com/", icon: "bi-twitter" },
  { name: "youtube", url: "https://youtube.com/", icon: "bi-youtube" },
  { name: "website", url: "https://", icon: "bi-globe2" },
];

const SocialItem = styled.li`
  padding: 0.5em;
`;

const linksList = supportedLinks
  .filter(({ name }) => name in links)
  .map(({ name, url, icon }) => (
    <SocialItem>
      <a href={`${url}${links[name]}`} target="_blank">
        {icon}
      </a>
    </SocialItem>
  ));

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: between;
  align-items: center;
`;

return <List>{linksList}</List>;

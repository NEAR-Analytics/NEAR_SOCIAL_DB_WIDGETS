const ipfsImages = {
  arrows: "bafkreifdzknpkboed3jmm4rgtbg3mqaocziagtjbznfp6o3hvgd5ix6brm",
  logoAurora: "bafkreieoq7wpdctcx42uywfdaoi4k3uq6rgodbjjz6mhz3qesrmaben2ju",
  logoProximity: "bafkreiazqis67kprs5ofbdruktmtvtun4g4bb2nbrqpwxzocuz77io6vyy",
  logoHumanGuild: "bafkreia2q267cf7apo6r3o3uw35lpbrp43jb3c5udfgquee2clbkdbks4e",
  logoCypherpunkGuild:
    "bafkreie25aa7gfb5u3p7bouxc6xknismfgtdtlt3yi7pqau3nqtksvvnsm",
  logoMintBase: "bafkreia3zulk3xrmwc6grqcpxavzug6odwgkwzd5magctxvq4jvalbnkcy",
  logoOctopus: "bafkreibzcnifufde5ft6hx3qkwzxhzq66avfbholirvrmaf5jbojwqggey",
  logoMetaWeb: "bafkreigalzrrkjyq755e45ryvrpragroneda3373assctbrnwjmgb4fzwe",
  logoOWC: "bafkreiarz2ffdpkuaoz6g7tvbp66lyoqqgwpvxtq3u4won46sjtuds6hqa",
  logoStealthCapital:
    "bafkreiac7dkdapj6bhiyusqs576is3b36ypbz6dimhugnrrhhv63i7pe6m",
  logoLyric: "bafkreicjhngar5ybinywhql3msk6tqi5cckngaf2zywjeuw65umkoqtq34",
  logoCreativeDao:
    "bafkreictzvvz2irr7tr7fhkdne2i7xpr4mf7x5b5i2vhgoqdswb73lbyyu",
  logoDevDao: "bafkreibvh3qys5z7qbekqqhmgump4iy32nw5wfvcyegejfs4gckrbqp7pq",
  logoMarketingDao:
    "bafkreifnwvfi7x5bzzxrjjvp7xbfqd3xpojtlohcgzrowtvyygogrt2emq",
  flagKenia: "bafkreib4flzpg3emzmsyw2dro5hcnsnqqfrfk7gd2dvvsjks2xcvo5rbxa",
  flagIndia: "bafkreicboijkmrugyrd26jhjvanxc7cnqxbvnhopdho76cyxer54b67ydy",
  flagBalcans: "bafkreicz6eqbngpv44endjeddfudaaooyw63iuzgmlog4stzrnpdkje4vi",
  flagVietnam: "bafkreigva6zkgxxi23qrgymhfx5vacxqp4uujpuuf53zfc7zmu7mi5yjqm",
  flagSouthKorea: "bafkreifirmndyjemruy56lgitls4c2tpee5rkx6t26u7lyuatyuywmevki",
  longImage: "bafkreic7dun4novdzgca54pwisa6otg3yut45jbnfyof2bop4xsnl22bo4",
};

const fundingCards = [
  {
    key: "ecosystem_grants",
    iconClassName: "ph ph-circles-three-plus",
    iconColor: "violet7",
    content: "Ecosystem Grants",
  },
  {
    key: "accelerators_and_incubators",
    iconClassName: "ph ph-trend-up",
    iconColor: "violet8",
    content: "Accelerators & Incubators",
  },
  {
    key: "community_led_dao",
    iconClassName: "ph ph-users-four",
    iconColor: "red7",
    content: "Community-led DAOs",
  },
  {
    key: "regional_hubs",
    iconClassName: "ph ph-planet",
    iconColor: "cyan7",
    content: "Regional hubs",
  },
];
const ecosystemGrantCards = [
  {
    ipfsImage: ipfsImages.logoAurora,
    title: "Aurora",
    content: "Aimed at projects looking to build on the Aurora EVM",
    href: "https://aurora.dev/grants",
  },
  {
    ipfsImage: ipfsImages.logoProximity,
    title: "Proximity Labs",
    content: "Aimed at supporting projects focused on DeFi",
    href: "https://www.proximity.dev",
  },
  {
    ipfsImage: ipfsImages.logoMintBase,
    title: "Mintbase",
    content: "Aimed at supporting projects building in NFTs",
    href: "https://github.com/mintbase/Grants-Program#1-application",
  },
  {
    ipfsImage: ipfsImages.logoHumanGuild,
    title: "Human Guild",
    content: "Aimed at supporting projects building in Gaming",
    href: "https://humanguild.io/",
  },
  {
    ipfsImage: ipfsImages.logoCypherpunkGuild,
    title: "Cypherpunk Guild",
    content: "Aimed at supporting projects building in Privacy",
    href: "https://cypherpunkguild.medium.com/cypherpunk-guild-grant-program-d0ed5769b6b9",
  },
];
const acceleratorsCards = [
  {
    ipfsImage: ipfsImages.logoMetaWeb,
    title: "MetaWeb",
    content: "Venture capital and Incubator",
    href: "https://www.metaweb.vc",
  },
  {
    ipfsImage: ipfsImages.logoOWC,
    title: "OWC",
    content: "Web3 accelerator",
    href: "https://www.openwebcollective.com",
  },
  {
    ipfsImage: ipfsImages.logoStealthCapital,
    title: "Stealth Capital",
    content: "An investment fund",
    href: "https://www.stealthcap.io/contact",
  },
  {
    ipfsImage: ipfsImages.logoLyric,
    title: "Lyric Ventures",
    content: "An incubator focused on B2B projects",
    href: "https://lyrik.ventures",
  },
  {
    ipfsImage: ipfsImages.logoOctopus,
    title: "Octopus Accelerator",
    content: "Web3 accelerator for projects building appchains",
    href: "https://accelerator.oct.network",
  },
];
const communityDaoCards = [
  {
    ipfsImage: ipfsImages.logoMarketingDao,
    title: "Marketing DAO",
    content: "Funding for more marketing-focused projects, guilds and DAOs",
    href: "https://gov.near.org/c/marketing/marketingdao/91?_gl=1*1fhalxr*_ga*OTkzODQ3NDEwLjE2NzI4MjM3NjE.*_ga_9GWCXQJ62J*MTY3MjkxMDg2My40LjAuMTY3MjkxMDg2My4wLjAuMA..",
  },
  {
    ipfsImage: ipfsImages.logoCreativeDao,
    title: "Creative DAO",
    content: "Funding for creative projects, guilds and DAOs",
    href: "https://gov.near.org/c/creatives/creatives-dao/61?_gl=1*1fhalxr*_ga*OTkzODQ3NDEwLjE2NzI4MjM3NjE.*_ga_9GWCXQJ62J*MTY3MjkxMDg2My40LjAuMTY3MjkxMDg2My4wLjAuMA..",
  },
  {
    ipfsImage: ipfsImages.logoDevDao,
    title: "Developer Governance",
    content: "Funding for development-focused projects, guilds and DAOs",
    href: "https://www.neardevgov.org",
  },
];
const regionalHubCards = [
  {
    ipfsImage: ipfsImages.flagKenia,
    title: "Kenya",
    href: "https://sankore2.com",
  },
  {
    ipfsImage: ipfsImages.flagIndia,
    title: "India",
    href: "https://nearindiahub.com",
  },
  {
    ipfsImage: ipfsImages.flagBalcans,
    title: "Balkans",
    href: "https://nearbalkans.org",
  },
  {
    ipfsImage: ipfsImages.flagVietnam,
    title: "Vietnam",
    href: "https://nearvietnamhub.org",
  },
  {
    ipfsImage: ipfsImages.flagSouthKorea,
    title: "South Korea",
    href: null,
  },
];

const fundingHugeCards = [
  {
    key: "ecosystem_grants_huge_card",
    id: "ecosystem_grants",
    iconClassName: "ph ph-circles-three-plus",
    iconColor: "violet7",
    title: "Ecosystem Grants",
    content: "For projects and start-ups building in web 3.0",
    cards: ecosystemGrantCards,
  },
  {
    key: "accelerators_and_incubators_huge_card",
    id: "accelerators",
    iconClassName: "ph ph-trend-up",
    iconColor: "violet8",
    title: "Accelerators and Incubators",
    content:
      "For projects and start-ups looking to join an incubator or accelerator",
    cards: acceleratorsCards,
  },
  {
    key: "community_led_dao_huge_card",
    id: "daos",
    iconClassName: "ph ph-users-four",
    iconColor: "red7",
    title: "Community-led DAOs",
    content:
      "Decentralized communities that support the growth of the ecosystem",
    cards: communityDaoCards,
  },
  {
    key: "regional_hubs_huge_card",
    id: "regionalhubs",
    iconClassName: "ph ph-planet",
    iconColor: "cyan7",
    title: "Regional hubs",
    content:
      "If a project is based in the following regions they should apply via their respective Regional Hub.",
    cards: regionalHubCards,
  },
];

return (
  <Widget
    src="dima_sheleg.near/widget/NearOrg.Ecosystem.GetFunding"
    props={{ ipfsImages, fundingCards, fundingHugeCards }}
  />
);

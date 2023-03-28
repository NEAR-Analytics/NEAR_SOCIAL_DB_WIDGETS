const user = "humanman.near";

const props = {
  bdBasics: [
    {
      title: "Product Market Fit",
      link: "https://forwardpartners.com/growth-playbooks/how-to-achieve-product-market-fit",
      description:
        "No-nonsense guide to the product-market fit meaning, why it’s critical, and how to get it.",
      img: "",
      tags: ["business fundamentals", "essentials"],
    },
    {
      title: "Essential Startup Advice",
      link: "https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice",
      description:
        "Y Combinator's collection of tips they consider the most important, most transformative advice for startups",
      img: "",
      tags: ["business fundamentals", "essentials"],
    },
    {
      title: "How to Plan an MVP",
      link: "https://www.ycombinator.com/library/6f-how-to-plan-an-mvp",
      description:
        "Y Combinator Managing Director Michael Seibel shares his approach to building an MVP and getting your first users",
      img: "",
      tags: ["business fundamentals", "mvp"],
    },
    {
      title: "Startup Ecosystem Canvas",
      link: "https://fi.co/canvas_template",
      description:
        "Template for plotting out your local ecosystem to help newcomers",
      img: "",
      tags: ["business fundamentals", "mvp"],
    },
    {
      title: "Designing a Better Pitch Deck",
      link: "https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck",
      description: "Here’s how to make a solid Demo Day slide deck.",
      img: "",
      tags: ["business fundamentals", "pitching"],
    },
  ],
  legalHR: [
    {
      title: "Legal Checklist",
      link: "https://wiki.near.org/governance/legal-checklist",
      description: "Overview of the regulatory best practices",
      img: "",
      tags: ["legal", "wiki"],
    },
    {
      title: "Dapp Legal Structure",
      link: "https://legalnodes.com/article/legal-structure-decentralized-apps",
      description: "Article about the legal structure of decentralized apps",
      img: "",
      tags: ["legal"],
    },
    {
      title: "NEAR Careers Portal",
      link: "https://careers.near.org/jobs",
      description:
        "Discover open roles available within the NEAR Ecosystem, and you can also post open roles within your team as well",
      img: "",
      tags: ["hr", "recruitment"],
    },
    {
      title: "SAFE Template",
      link: "https://www.ycombinator.com/library/6z-fundraising-templates-safe-financing-documents",
      description:
        "SAFE (simple agreement for future equity) for early-stage fundraising",
      img: "",
      tags: ["business fundamentals", "fundraising"],
    },
  ],
  growth: [
    {
      title: "Growth & Marketing Toolkit",
      link: "https://docs.google.com/presentation/d/1Abjnbw6qNSC7hu3vAqWqo9hn5pOArakIfU9ZRR0SQTI/edit?usp=sharing",
      description:
        "In-depth overview of best practices and proven strategies for growth & marketing your project in the Web3/crypto space",
      img: "",
      tags: ["growth&marketing", "ecosystem"],
    },
    {
      title: "NEAR Builders",
      link: "https://docs.nearbuilders.com/community-groups/",
      description:
        "Community groups focused on building and growing the NEAR ecosystem",
      img: "",
      tags: ["growth&marketing", "community"],
    },
    {
      title: "NEAR Workshops",
      link: "https://nearworkshops.com/watch",
      description:
        "Free live educational content series tailored to teaching developers the latest tooling, SDKs, and APIs across NEAR",
      img: "",
      tags: ["growth&marketing", "community"],
    },
    {
      title: "Ecosystem Calendar",
      link: "https://nearweek.com/calendar",
      description:
        "Wider visibility into upcoming events, launches, Twitter Spaces, campaigns, etc... Make sure to submit yours!",
      img: "",
      tags: ["growth&marketing", "events"],
    },
    {
      title: "MarketingDAO",
      link: "https://docs.google.com/document/d/1i1PbFQKlwyWzjGZMoeUIM3gy3ghWKH3Yo4iOi-D8N_U/view",
      description:
        "Facilitates the allocation of Community funds for marketing activities under $10,000",
      img: "",
      tags: ["growth&marketing", "DAO", "fundraising"],
    },
  ],
  technical: [
    {
      title: "Blockchain Operating System (BOS)",
      link: "https://alpha.near.org",
      description:
        "The gateway to Web3. Build and use Web3 components for any chain or protocol",
      img: "",
      tags: ["technical", "dev-tools", "bos"],
    },
    {
      title: "NEAR Docs",
      link: "https://docs.near.org",
      description: "Your entry point to using NEAR's tech stack",
      img: "",
      tags: ["technical", "dev-tools"],
    },
    {
      title: "NEAR GPT-3 Docs Chat",
      link: "https://neardocs.online/",
      description:
        "Leverage the power of GPT-3 to get answers to your technical questions about NEAR",
      img: "",
      tags: ["technical", "dev-tools", "chat-gpt"],
    },
    {
      title: "Pagoda",
      link: "https://www.pagoda.co/",
      description:
        "The first-ever Web3 startup platform, and main core protocol contributor of NEAR Protocol",
      img: "",
      tags: ["technical", "dev-tools"],
    },
    {
      title: "Croncat",
      link: "https://cron.cat/",
      description: "Decentralized Scheduling for Blockchain Transactions",
      img: "",
      tags: ["technical", "dev-tools"],
    },
    {
      title: "Kurtosis",
      link: "https://www.kurtosistech.com/",
      description:
        "Local development and testing environments for developers in the NEAR ecosystem",
      img: "",
      tags: ["technical", "dev-tools"],
    },
    {
      title: "Calimero",
      link: "https://www.calimero.network/",
      description:
        "Allowing deployment of a customisable, easy to use private shard with built-in privacy features",
      img: "",
      tags: ["technical", "dev-tools"],
    },
    {
      title: "IPFS",
      link: "https://ipfs.tech/",
      description:
        "A peer-to-peer hypermedia protocol to make the web faster, safer, and more open",
      img: "",
      tags: ["technical", "storage"],
    },
    {
      title: "The Graph",
      link: "https://thegraph.com/",
      description:
        "Developer tools to process blockchain events and make the resulting data easily available",
      img: "",
      tags: ["technical", "explorers&indexers"],
    },
    {
      title: "NEAR Wallet Selector",
      link: "https://github.com/near/wallet-selector",
      description:
        "Provides an abstraction over various wallets within the NEAR ecosystem",
      img: "",
      tags: ["technical", "wallets"],
    },
    {
      title: "Seda (formerly Flux)",
      link: "https://www.seda.xyz/",
      description: "Serving as the trust-less data layer for Web3",
      img: "",
      tags: ["technical", "oracles"],
    },
    {
      title: "MetaBUILD",
      link: "https://near.org/metabuild/",
      description:
        "The NEAR MetaBUILD hackathons will feature exciting themes focused on solving real-world problems.",
      img: "",
      tags: ["technical", "hackathons"],
    },
    {
      title: "Aurora EVM",
      link: "https://aurora.dev/",
      description: "Aurora is an EVM solution built on the NEAR Protocol",
      img: "",
      tags: ["technical", "interoperability"],
    },
    {
      title: "Octopus Network",
      link: "https://oct.network/",
      description:
        "Multichain interoperable crypto-network for launching and running Web3 substrate-based, EVM compatible Appchains",
      img: "",
      tags: ["technical", "interoperability"],
    },
    {
      title: "Keypom",
      link: "hhttps://keypom.xyz/",
      description: "Onboarding toolkit for builders and dApp creators",
      img: "",
      tags: ["technical", "onboarding"],
    },
  ],
};

// TODO: Add sorting functionality

return (
  <div>
    <div style={{ textAlign: "center", marginBottom: "50px" }}>
      <h1>Resources for Founders</h1>
      <h4>
        Welcome! Below you will find a curated list of resources to best help
        you where you need it most
      </h4>
    </div>
    <br />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Business Fundamentals</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.bdBasics }}
    />
    <hr />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Growth & Marketing</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.growth }}
    />
    <hr />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Recruiting & Legal</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.legalHR }}
    />
    <hr />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Technical</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.technical }}
    />
    <hr />
    <br />
  </div>
);

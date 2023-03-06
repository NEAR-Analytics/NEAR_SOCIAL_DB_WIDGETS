return (
  <div>
    <h1>👋 Howdy, our team Hacked on alot of different Widgets</h1>
    <h2>👥 NEAR widgets</h2>
    <p>
      OnbooardDAO is the movement to onboard the next BILLION HUMANS to the open
      internet.
    </p>
    <ul>
      <li>
        <a
          href="https://alpha.near.org/#/calebjacob.near/widget/ComponentDetailsPage?src=onboarder.near/widget/BattlesOfTheBOS"
          target="_blank"
          rel="noopener noreferrer"
        >
          Battle of the BOS (OG POST FEED)
        </a>
        <ul>
          <li>
            {" "}
            In this project we highlighted the BOSSES in the Blockchain
            Operating system, to follow key decision makers since the launch of
            the socialDB.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://near.social/#/onboarder.near/widget/DAOSocialSearch"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAO NEAR Social Search
        </a>
        <ul>
          <li>
            {" "}
            In this project we gave a search of DAO's who have created a NEAR
            SocialProfile as a DAO to necourage more usrs to build more DAO
            tooling to interact with the BOS.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://near.social/#/onboarder.near/widget/AddMemberToRole"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAO Add Member to Proposal
        </a>
        <ul>
          <li>
            {" "}
            Considering AstroDAO is being deprecated, we are building out all
            functionality of DAO's on NEAR. With this tools, anyone can submit a
            proposal to add a member to a DAO. We will be adding this to the
            profile page with a drop down so you can invite new members to join
            specific DAOs and subgroup as our tooling evolves. Aka FRIEND into
            DAO.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://near.social/#/onboarder.near/widget/DonateNEARtoAddress"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate NEAR to Address
        </a>
        <ul>
          <li>
            {" "}
            In NEAR Social there existed no donate to custom address and custom
            amount. In the future we will integrate for tipping into profile &
            DAOs.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://near.social/#/hack.near/widget/DAOs"
          target="_blank"
          rel="noopener noreferrer"
        >
          All DAOs
        </a>
        <ul>
          <li>
            {" "}
            This widget indexes all the DAOs created by the SputnikDAO contracts
            for DAO Discovery in BOS.
          </li>
        </ul>
      </li>
    </ul>
    <h2>🌈 EVM widgets</h2>
    <ul>
      <li>
        <a
          href="https://bos.gg/#/onboarder.near/widget/polygon-erc20-sender"
          target="_blank"
          rel="noopener noreferrer"
        >
          Polygon Token Sender
        </a>
        <ul>
          <li>
            {" "}
            We allow users to directly send support / trusted ERC-20 tokens on
            Polygon Mainnet. In the future we will support NFTs and
            autodetection of assets as well as the gas token (in this case
            polygon).
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://bos.gg/#/onboarder.near/widget/PolygonTokenList"
          target="_blank"
          rel="noopener noreferrer"
        >
          Polygon Token List
        </a>
        <ul>
          <li>
            {" "}
            This is trust Polygon tokens for other dApps to use. In the future
            we will return props to dynamically be used as a library for token
            import lists. Future applications include price feeds once we find
            an open multichain oracle API.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://near.social/#/onboarder.near/widget/Lido-Testnet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lido on Testnet
        </a>
        <ul>
          <li>
            {" "}
            We added support to switch for Lido on testnet for developers as
            current Proximity example only included mainnet. In the future we
            will switch to other staking protocols like Rocket Pool.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://bos.gg/#/onboarder.near/widget/Aurora-Token-Sender"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aurora All Supported Token Sender
        </a>
        <ul>
          <li>
            {" "}
            We could only find Aurora trusted tokens on a website with no way to
            streamline this information for dApps. We have scraped this
            information and in the future we will be integrated onto Aurora
            widgets as they Onboard to BOS.
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://bos.gg/#/westpalm.near/widget/polygon-erc721-minter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Polygon NFT Minter
        </a>
        <ul>
          <li>
            {" "}
            This is still a work in progress, but meant to be a Polygon NFT
            Minter to mint NFTs to other adresses directly from BOS. We will
            added multichain support and multiple contracts (pulling from
            GenaDrop, open source projects on EVMs + NEAR).
          </li>
        </ul>
      </li>
    </ul>
    <h2>🚀 Improvements to the Blockchain Operating System</h2>
    <ul>
      <li>
        <a
          href="https://near.social/#/onboarder.near/widget/BOSDirectory"
          target="_blank"
          rel="noopener noreferrer"
        >
          BOS Directory
        </a>
        <ul>
          <li>
            {" "}
            Considering their has been the proliferation of NEAR Social's
            Viewers and other front ends indexing the Blockchain Operating
            System to support their own unqiue user experiences, chain &
            dependency support, we became the first BOS Directory on BOS. In the
            future we plan to pull directly from Github forks and have community
            contributions.
          </li>
        </ul>
      </li>
    </ul>
    <Widget
      src="onboarder.near/widget/onboard-widget-landing-page"
      props={{}}
    />
    ;
  </div>
);

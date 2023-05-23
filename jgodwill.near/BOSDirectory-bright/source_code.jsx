const social = {
  data: [
    {
      key: 1,
      name: "NEAR Social",
      url: "https://near.social",
      image:
        "https://ipfs.near.social/ipfs/bafybeiewpf55q4ubml3cnbqdu62kamwyph2z4qqaiupz5md7ydlh4ghwwq",
      description:
        "Social Data Protocol On NEAR. The first gateway. Built in social features like custom domains, reports, link previews + more!",
    },
    {
      key: 2,
      name: "NEAR",
      url: "https://near.org",
      image:
        "https://ipfs.near.social/ipfs/bafkreifv5wmqng43g3la2mgwenyhcuzp6g5grnp4ucrwqaciz2ibpqfdgi",
      description:
        "A new category that enables visionaries, builders, and believers to deliver on the promise of the Open Web. Built in EVM, FastAuth w/ Metatransactions",
    },
    {
      key: 5,
      name: "NEARPad",
      url: "https://nearpad.dev/",
      image:
        "https://ipfs.near.social/ipfs/bafkreieqikc5u2kxsoeucpticpfeguuge45upykvzayl6rjwgee5e3yr3i",
      description:
        "A gateway dedicated to developers. Siwtch between testnet, built in tutorials, easily estimate storage costs, and collaborate live",
    },
    {
      key: 4,
      name: "NEAR Atlas",
      url: "https://nearatlas.com/",
      image:
        "https://ipfs.near.social/ipfs/bafkreia6etmuxr3xhhpoeqimcl2oyg5ovcsa25e4j4242hy44lk2q73udi",
      description:
        "A viewer for NEAR Analytics powered by the Flipside Crypto API built by the NEAR Foundation",
    },
    {
      key: 7,
      name: "Welldone Gateway",
      url: "https://welldone-gateway.vercel.app/",
      image:
        " https://ipfs.near.social/ipfs/bafkreiapxpmwjsfjy23nvdlnlrza5xp3trvdhk5am3tnpnjnpl6pbctuia",
      description:
        "Welldone Gateway uses the Welldone Wallet to Swap on Sui, Aptos, NEAR and ETH (currently on testnet)",
    },
    {
      key: 3,
      name: "Cantopia",
      url: "https://bos-viewer.pages.dev/",
      image:
        "https://ipfs.near.social/ipfs/bafkreifqzppapwceuwvecotf4uczonrc7gtvjqlmlxpy2hdo4hau3m6svm",
      description:
        "An example viewer of the Canto's blockchain, CantoSwap viewer",
    },
    {
      key: 6,
      name: "Genadrop Gateway",
      url: "https://bos.genadrop.io/",
      image:
        "https://ipfs.near.social/ipfs/bafkreidx4rvihxc5ycpvlyaod7dscotlb6bmoffimjl7s2zvarhmxtymma",
      description: "A gateway dedicated to NFTs across different chains",
    },
    {
      key: 8,
      name: "Everything",
      url: "https://everything.dev/#/",
      image:
        "https://ipfs.near.social/ipfs/bafybeibfjlibj5bubf4sbwcis3wpmbmwhnpicsncniuzhe4ywpwp5muxqy",
      description: "Everything +  Data Visualizations for social.near",
    },
    {
      key: 0,
      name: "Bos.gg",
      url: "https://bos.gg",
      image:
        "https://ipfs.near.social/ipfs/bafybeihm3hnhgoov3cpq3dbmbsjnigrljohbbrk6ri2nvwn3vuew755f6e",
      description: "Decentralized front ends for evm chains",
    },
    {
      key: 9,
      name: "Harmonic Guild",
      url: "https://gateway.harmonicguild.io/",
      image:
        "https://ipfs.near.social/ipfs/bafkreidjmhh4yvjgn7htpymtt3lqhlaoi3ksabixsicojzwichply4oxdy",
      description: "A NEAR gateway for music + NFTs",
    },
  ],
};

const Cards = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 4rem;
`;

const Card = styled.div`
  width: 25%;
  min-width: 250px;
  display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   align-items:center;
  //  background-color:#09011a;
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.1);
  box-shadow: 5.65714px 5.65714px 11.3143px rgba(28,27,28,.04);
   padding: 8px;
  //  color: #fff;
   margin: 0 auto;
   max-width: 400px;
   flex:1;
   &:hover img{
     transform:scale(1.05);
   }
   & img{
    width: 100%;
    height: 100%;
    object-fit:cover;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
   }
`;

const Hero = styled.div`
  height: fit-content;
  display: flex;
  align-items:center;
  justify-content: center;
  align-content:center;
  // background-color:#09011a;
  // color: white;
`;

const CardHeading = styled.h5`
  font-size: 1.25rem;
  font-weght: 500;
  color:#09011a;
`;

const Text = styled.div`
  opacity: .6;
`;

const ImageCard = styled.div`
  height:200px;
  width: 100%;
  border-radius: inherit;
  overflow:hidden;
  margin-bottom: .5rem;
  &>img{
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  }
  &>img:hover{
    transform:scale(1.05);
  }
`;

return (
  <div className="row">
    <Hero className="container-fluid">
      <Widget src="jgodwill.near/widget/GatewayDirectoryHero" />
    </Hero>
    <Cards>
      {social.data.map((item) => (
        <Card key={item.key}>
          <ImageCard>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt="..." />
            </a>
          </ImageCard>
          <div class="card-body p-2 mt-3">
            <CardHeading>{item.name}</CardHeading>
            <Text class="ps-2  pb-3 text-secondary">{item.description}</Text>
          </div>
        </Card>
      ))}
    </Cards>
  </div>
);

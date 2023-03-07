const social = {
  data: [
    {
      key: 0,
      name: "Bos.gg",
      url: "https://bos.gg",
      image:
        "https://ipfs.near.social/ipfs/bafybeihm3hnhgoov3cpq3dbmbsjnigrljohbbrk6ri2nvwn3vuew755f6e",
      description: "Decentralized front ends for evm chains",
    },
    {
      key: 1,
      name: "NEAR Social",
      url: "https://near.social",
      image:
        "https://ipfs.near.social/ipfs/bafybeiewpf55q4ubml3cnbqdu62kamwyph2z4qqaiupz5md7ydlh4ghwwq",
      description: "Social Data Protocol On NEAR",
    },
    {
      key: 2,
      name: "NEAR Discovery",
      url: "https://alpha.near.org",
      image:
        "https://ipfs.near.social/ipfs/bafkreifv5wmqng43g3la2mgwenyhcuzp6g5grnp4ucrwqaciz2ibpqfdgi",
      description:
        "A new category that enables visionaries, builders, and believers to deliver on the promise of the Open Web.",
    },
    {
      key: 3,
      name: "Cantopia",
      url: "https://bos-viewer.pages.dev/",
      image:
        "https://ipfs.near.social/ipfs/bafkreifqzppapwceuwvecotf4uczonrc7gtvjqlmlxpy2hdo4hau3m6svm",
      description:
        "An example viewer of the Canto's blockchain, CantoSwap viewer by Matt L",
    },
  ],
};

return (
  <div className="row">
    <h1 className="align-text">🔎 BOS Viewer Directory</h1>
    {social.data.map((item) => (
      <div key={item.key} className="card rounded-3 col-lg-3 margin-1">
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <img src={item.image} class="card-img-top" alt="..."></img>
        </a>
        <div class="card-body">
          <h2 class="card-title">{item.name}</h2>
          <p class="card-text">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

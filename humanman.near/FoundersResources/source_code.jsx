const user = "humanman.near";

const props = {
  growth: [
    {
      title: "Hello",
      description: "crypsom lorem ethereum bitcoin accelerator",
      link: "https://google.com",
      img: "https://cryptobootcampassets.s3.amazonaws.com/mod-em-4.3.3.png",
    },
  ],
  technical: [
    {
      title: "Hello",
      description: "crypsom lorem ethereum bitcoin accelerator",
      link: "https://google.com",
      img: "https://cryptobootcampassets.s3.amazonaws.com/mod-em-4.3.3.png",
    },
  ],
  hr: [
    {
      title: "Hello",
      description: "crypsom lorem ethereum bitcoin accelerator",
      link: "https://google.com",
      img: "https://cryptobootcampassets.s3.amazonaws.com/mod-em-4.3.3.png",
    },
  ],
  legal: [
    {
      title: "Hello",
      description: "crypsom lorem ethereum bitcoin accelerator",
      link: "https://google.com",
      img: "https://cryptobootcampassets.s3.amazonaws.com/mod-em-4.3.3.png",
    },
  ],
  bdBasics: [
    {
      title: "Hello",
      description: "crypsom lorem ethereum bitcoin accelerator",
      link: "https://google.com",
      img: "https://cryptobootcampassets.s3.amazonaws.com/mod-em-4.3.3.png",
    },
  ],
};

return (
  <div>
    <h1>Resources for Founders</h1>
    <br />
    <h2>Growth & Marketing</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.growth }}
    />
    <hr />
    <br />
    <h2>Business Fundamentals</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.bdBasics }}
    />
    <hr />
    <br />
    <h2>Human Resources & Recruiting</h2>
    <Widget src={`${user}/widget/CardGallery`} props={{ cardData: props.hr }} />
    <hr />
    <br />
    <h2>Legal Resources</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.legal }}
    />
    <hr />
    <br />
    <h2>Technical Resources</h2>
    <Widget
      src={`${user}/widget/CardGallery`}
      props={{ cardData: props.technical }}
    />
    <hr />
    // <br />
  </div>
);

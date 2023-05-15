const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;

  .image {
    display: block;
    height: 8em;
    margin: 1em;
  }

  .attribution {
    display: block;
    height: 2em;
    margin: 0.3em;
  }
}`;

return (
  <Badge>
    <a href="https://i-am-human.app">
      <Widget
        src="mob.near/widget/Image"
        props={{
          className: "image",
          image: {
            ipfs_cid: "QmR4U2XnTSCCUhQRcC1Hh5SRwMndtAGYuVzphc2QuiRJrJ",
          },
          alt: "I am human.",
        }}
      />
    </a>
  </Badge>
);

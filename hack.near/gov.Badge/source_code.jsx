const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  width: 100%;

  .image {
    display: block;
    height: 8em;
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

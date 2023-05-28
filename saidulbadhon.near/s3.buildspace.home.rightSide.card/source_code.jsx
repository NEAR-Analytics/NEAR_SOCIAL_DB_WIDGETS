const theme = props.theme;
const card = props.card;

const Card = styled.div`

  // height: "100%",
  height: 350px;
  width: 100%;
  max-width: 250px;
  border-radius: 24px;
  overflow: hidden;

  position: relative;
  border: 1px rgba(256, 256, 256, .25) solid;

  display: flex;
  filter: brightness(0.8);

  transition: all .2s ease-in-out;

  &:hover {
    filter: brightness(1);
  }
`;

return (
  <a href={`/s3/users/?name=${card.name}`}>
    <Card key={index}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={
          card.imageUrl
            ? `https://ipfs.near.social/ipfs/${card.imageUrl}`
            : "https://i.pinimg.com/originals/6b/f6/2c/6bf62c6c123cdcd33d2d693782a46b34.jpg"
        }
        alt={card.name}
      />

      <div
        style={{
          color: "#FFF",
          position: "absolute",
          left: "50%",
          width: "calc(100% - 48px)",
          transform: "translateX(-50%)",
          zIndex: 100,
          bottom: 24,
          borderRadius: 16,
          display: "flex",
          justifyContent: "center",
          aligncards: "center",

          backdropFilter: "blur(10px)",
          border: `1px rgba(256, 256, 256, .25) solid`,

          padding: "8px 16px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            padding: 0,
            margin: 0,
            fontWeight: 600,
          }}
        >
          {item.message || card.name}
        </p>
      </div>
    </Card>
  </a>
);

const theme = props.theme;
const card = props.card;

const Card = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px rgba(256, 256, 256, .25) solid;
  display: flex;
  flex-direction: column;
  filter: brightness(0.8);
  height: 416px;
  transition: all .2s ease-in-out;

  &:hover {
    filter: brightness(1);
  }
`;
const PTag = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

return (
  <a
    href={`/s3/${card.name}`}
    style={{ textTransform: "none", textDecoration: "none" }}
  >
    <Card>
      <img
        style={{
          width: "100%",
          height: "100%",
          minHeight: 250,
          maxHeight: 250,
          objectFit: "cover",
          aspectRatio: 1 / 1,
          backgroundColor: theme.textColor2,
        }}
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

          bottom: 24,
          borderRadius: 16,

          display: "flex",
          justifyContent: "center",
          aligncards: "center",
          flexDirection: "column",
          gap: 8,
          padding: "16px 16px 8px 16px",
        }}
      >
        <h5
          style={{
            textAlign: "center",
            padding: 0,
            margin: 0,
            fontWeight: 700,
          }}
        >
          {card.name}
        </h5>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{
              textAlign: "center",
              padding: 0,
              margin: 0,
              fontWeight: 400,

              fontSize: "12px",

              backgroundColor: theme.textColor3 + 66,
              color: theme.textColor,
              padding: "4px 12px",
              borderRadius: 4,
            }}
          >
            #{card.house}
          </p>
        </div>

        <PTag
          style={{
            textAlign: "center",
            padding: 0,
            margin: 0,
            fontWeight: 500,
            color: theme.textColor2,
          }}
        >
          {card.message}
        </PTag>
      </div>
    </Card>
  </a>
);

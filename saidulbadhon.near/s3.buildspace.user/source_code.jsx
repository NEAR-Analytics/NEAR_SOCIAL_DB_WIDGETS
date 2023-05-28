const theme = props.theme;

// State.init({
//   showBrowser: false,
// });
const res = fetch(`http://localhost:8000/api/v1/buildspace/${props.name}`);

// if (!res.body?.list1)
//   return (
//     <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
//   );

// const handleBrowseButton = () => {
//   State.update({
//     showBrowser: !state.showBrowser,
//   });

const card = res.body;

console.log("XD:", res.body);
// };

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  min-height: 100vh;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: 1250px;
  padding-inline: 16px;

  @media screen and (max-width: 800px)  {
    // grid-template-columns: 1fr;
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
  <ContainerWrapper>
    <ContentWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",

          gap: 16,
        }}
      >
        <img
          style={{
            width: 350,
            maxWidth: "100%",
            objectFit: "cover",
            aspectRatio: 1 / 1,
            backgroundColor: theme.textColor2,
            borderRadius: 8,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              padding: 0,
              margin: 0,
              fontWeight: 700,
              color: theme.textColor,
            }}
          >
            {card.name}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              backgroundColor: theme.textColor3 + 66,
              padding: "4px 12px",
              borderRadius: 4,
            }}
          >
            <p
              style={{
                textAlign: "center",
                padding: 0,
                margin: 0,
                fontWeight: 400,

                fontSize: "14px",
                color: theme.textColor2,
              }}
            >
              House:
            </p>
            <p
              style={{
                textAlign: "center",
                padding: 0,
                margin: 0,
                fontWeight: 400,
                fontSize: "14px",
                color: theme.textColor,
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
      </div>
    </ContentWrapper>
  </ContainerWrapper>
);

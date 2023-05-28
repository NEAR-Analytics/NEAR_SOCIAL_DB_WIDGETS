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
  align-items: flex-start;
  background-color: #000;
  min-height: 100vh;
  height: 100%;
  padding-top: 16px
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: 1250px;
  padding-inline: 16px;
  gap: 16px;

  @media screen and (max-width: 800px)  {
    // grid-template-columns: 1fr;
  }
`;
const PTag = styled.p`
  color: ${theme.textColor2};
  padding: 0px;
  margin: 0px;
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

      <div
        style={{
          maxWidth: 450,
          backgroundColor: theme.ui,
          padding: 16,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            width={200}
            src="https://nearpad-images.s3.amazonaws.com/buildspace.png"
            alt="logoo"
          />

          <PTag>May 26, 2023</PTag>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <PTag>dear {card.name},</PTag>

          <PTag>
            you've made it to the end of s3. tysm for coming irl to celebrate.
            you're one of the 450 that made it to the very end. you should be
            extremely proud of this achievement.
          </PTag>

          <PTag>
            working on your own ideas is a difficult road - take a moment to
            reflect on how far you've come in just six weeks.
          </PTag>

          <PTag>
            good luck. we're extremely excited for whatever is next for you.
            keep building and stfol.
          </PTag>

          <PTag>
            love,
            <br />
            buildspace team
          </PTag>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            height={50}
            src="https://nearpad-images.s3.amazonaws.com/buildspace/signature2.png"
            alt="signature2"
          />
          <img
            style={{ marginTop: 50 }}
            height={75}
            src="https://nearpad-images.s3.amazonaws.com/buildspace/signature1.png"
            alt="signature1"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: "#6f0208",
            }}
          />
          <div
            style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: "#27304f",
            }}
          />
          <div
            style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: "#8f7020",
            }}
          />
          <div
            style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: "#31542d",
            }}
          />
        </div>
      </div>
    </ContentWrapper>
  </ContainerWrapper>
);

const theme = props.theme;
const res = fetch(`http://localhost:8000/api/v1/buildspace/name/${props.name}`);

if (!res.body)
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
  );

const card = res.body;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  background-color: ${
    (card.house === "erevald" && "#10fc5522") ||
    (card.house === "alterok" && "#5499ff22") ||
    (card.house === "gaudmire" && "#f5e03a22") ||
    (card.house === "spectreseek" && "#eb413b22")
  };
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: 1250px;
  padding: 16px;
  gap: 16px;
  justify-content: center;

  @media screen and (max-width: 800px)  {
  flex-direction: column;
  }
`;
const PTag = styled.p`
  color: ${theme.textColor2};
  padding: 0px;
  margin: 0px;
`;

return (
  <div className="s3BuildspaceHome">
    <ContainerWrapper>
      <ContentWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            maxWidth: 350,
            paddingBottom: 8,
            gap: 16,
            border: "1px rgba(256, 256, 256, .25) solid",
            borderRadius: 4,
          }}
        >
          <img
            style={{
              width: "100%",
              maxWidth: 350,
              objectFit: "cover",
              aspectRatio: 1 / 1,
              backgroundColor: theme.textColor2,
              borderRadius: 4,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
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

            <div>
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
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <PTag
                style={{
                  textAlign: "center",
                  fontWeight: 500,
                  color: theme.textColor2,
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                Session: {card.session}
              </PTag>
              <div
                style={{
                  backgroundColor: theme.textColor3 + 66,
                  width: 1,
                  height: 22,
                }}
              />
              <PTag
                style={{
                  textAlign: "center",
                  fontWeight: 500,
                  color: theme.textColor2,
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                Year: {card.year}
              </PTag>
            </div>

            <PTag
              style={{
                textAlign: "center",
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

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <div
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                backgroundColor: "#eb413b",
              }}
            />
            <div
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                backgroundColor: "#5499ff",
              }}
            />
            <div
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                backgroundColor: "#f5e03a",
              }}
            />
            <div
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                backgroundColor: "#10fc55",
              }}
            />
          </div>
        </div>
      </ContentWrapper>
    </ContainerWrapper>
  </div>
);

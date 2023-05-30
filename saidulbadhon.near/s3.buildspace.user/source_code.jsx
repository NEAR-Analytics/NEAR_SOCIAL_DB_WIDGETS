const theme = props.theme;
const res = fetch(
  `https://t4zr86bzl5.execute-api.us-east-1.amazonaws.com/production/api/v1/buildspace/name/${props.name}`
);

if (!res.body)
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
  );

const card = res.body;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:100vh;

  background-color: ${
    (card.house === "erevald" && "#10fc5522") ||
    (card.house === "alterok" && "#5499ff22") ||
    (card.house === "gaudmire" && "#f5e03a22") ||
    (card.house === "spectreseek" && "#eb413b22")
  };

  background-image: url("https://nearpad-images.s3.amazonaws.com/buildspace/${
    card.house
  }.jpg");
    background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1250px;
  padding: 16px;
  // gap: 16px;
  justify-content: center;
  flex-direction: row;

  @media screen and (max-width: 800px)  {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const UserCardWrapper = styled.div`
  @media screen and (max-width: 800px)  {
    display:flex;
    justify-content: center;
    align-items: center;
  }
`;

const PTag = styled.p`
  color: ${theme.textColor2};
  padding: 0px;
  margin: 0px;
`;

return (
  <div style={{ backgroundColor: "#000" }}>
    <ContainerWrapper>
      <ContentWrapper>
        <UserCardWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              maxWidth: "450px",
              //   gap: "16px",
              border: "1px rgba(256, 256, 256, .15) solid",
              borderRadius: "4px",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,

              backdropFilter: "blur(10px)",
            }}
          >
            <img
              style={{
                width: "100%",
                maxWidth: 450,
                minHeight: 350,
                objectFit: "cover",
                aspectRatio: 1 / 1,
                backgroundColor: theme.textColor2,
                borderRadius: 4,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
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
                width: "100%",
                height: "100%",
                paddingTop: 16,
                paddingBottom: 8,

                backgroundColor:
                  (card.house === "erevald" && "#10fc5511") ||
                  (card.house === "alterok" && "#5499ff11") ||
                  (card.house === "gaudmire" && "#f5e03a11") ||
                  (card.house === "spectreseek" && "#eb413b11"),
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

              {/*<div style={{ display: "flex", justifyContent: "center" }}>
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
              </div>*/}

              <div
                style={{ display: "flex", gap: 8, justifyContent: "center" }}
              >
                <PTag
                  style={{
                    textAlign: "center",
                    fontWeight: 500,
                    color: theme.textColor,
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  #{card.house}, {card.session} and {card.year}
                </PTag>
                {/*<PTag
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
                </PTag>*/}
              </div>

              <PTag
                style={{
                  textAlign: "center",
                  fontWeight: 400,
                  color: theme.textColor,
                }}
              >
                {card.message}
              </PTag>
            </div>
          </div>
        </UserCardWrapper>

        <div
          style={{
            maxWidth: 450,
            backgroundColor: theme.ui,
            padding: 16,
            borderRadius: 4,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "relative",
            border: "1px rgba(256, 256, 256, .15) solid",
            borderLeft: "none",
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

          <div
            style={
              {
                // display: "flex",
                //  justifyContent: "space-between"
                // gridTemplateColumns: "1fr 1fr",
              }
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                height={50}
                src="https://nearpad-images.s3.amazonaws.com/buildspace/signature2.png"
                alt="signature2"
              />
              <img
                // style={{ marginTop: 50 }}
                height={75}
                src="https://nearpad-images.s3.amazonaws.com/buildspace/signature1.png"
                alt="signature1"
              />
            </div>

            <div style={{ display: "flex", gap: 50 }}>
              <img
                height={50}
                src="https://nearpad-images.s3.amazonaws.com/buildspace/signature4.png"
                alt="signature2"
              />
              <img
                // style={{ marginTop: 50, marginLeft: 25 }}
                height={75}
                src="https://nearpad-images.s3.amazonaws.com/buildspace/signature3.png"
                alt="signature1"
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
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

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;
    justify-content: center;
`;
const MainContainer = styled.div`
    padding: 30px;
    height: auto;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const TopImageContainer = styled.div`
  padding: 1em;
  background: #ffffff;
    width: 50%;
  border: 2px solid #cacdd5;
  box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
  border-radius: 0.7em;
  &>img {
    width: 100%;
    height: 548px;
  }
`;

const HeaderText = styled.h1`
  font-size: 1.5rem;
`;

const PriceArea = styled.div`
  display: flex;
  align-items: center;
  color: #0d99ff;
  &>*{
  margin: 0px;
  padding: 0px;
  }
  &>h6{
    font-weight: 700;
    font-size: 1.2rem;
  }
  &>span{
  font-size: 1.2rem;
  margin: 0px;
  }
`;

const PriceBucket = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

`;

const RightSection = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Description = styled.div`
     width: 100%;
    border-radius: 1em;
    background: #ffffff;
    border: 2px solid #eeeff2;
    padding: 1em;
    margin-top: 40px;
    box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
    &>h6{
        font-weight: 600;
        font-size: 1.5rem;
    }
    
`;

const AttributeContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Attribute = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.5em;
    border-radius: 0.5em;
    width: 206px;
    background: #fafafb;
    margin-bottom: 20px;
    border: 1px solid #86ccff;
    border-radius: 10.6849px;
    &>*span {
        padding: 0;
        color: #b2b7c2;
    }
`;

const TransactionTable = styled.div`
     width: 100%;
  max-width: 70%;
  background: #ffffff;
  border: 2px solid #eeeff2;
  box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
  border-radius: 16px;
  margin-bottom: 40px;
`;

const TableHeader = styled.div`
    width: 100%;
  padding: 0.5em;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: flex-start;
  gap: 1em;
  background: #f5f6f7;
  border-radius: 14px 14px 0px 0px;
  &>h1 {
    font-size: 24px;
  }
`;

const TableBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5em;
    justify-content: space-between;
    border-bottom: 1px solid #dde1e6;
`;

const RowType = styled.div`
     display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  font-size: 0.75rem;
  padding: 0.25em 1em;
  border-radius: 0.7em;
  border: 1px solid #a4a9b6;
`;

const RowBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    padding-left: 7px;
    width: 100%;
    justify-content: space-between;
    p {
        margin: 0;
        border-bottom: 1px solid #e5e8eb;
        font-size: 12px;
        min-width: 100px;
        text-align: center;
    }
    span {
        font-size: 12px;
    }
`;

const tokenId = props.tokenId;

return (
  <Root>
    <MainContainer>
      <TopSection>
        <TopImageContainer>
          <HeaderText>Third Eye</HeaderText>
          <img
            src={props.nft.image}
            alt="NFT"
            width="100%"
            height="100%"
            className="rounded-3"
          />
          <div style={{ display: "flex", marginTop: "10px" }}>
            <p
              style={{
                marginBottom: "0.5em",
                fontSize: "0.85rem",
                color: "#0d99ff",
              }}
            >
              Created by
            </p>
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              3728328327832
            </span>
          </div>
        </TopImageContainer>
        <RightSection>
          <PriceBucket>
            <div>
              <p style={{ color: "#b2b7c2", marginBottom: 0 }}>CURRENT PRICE</p>
              <PriceArea>
                <h6>
                  {`${(200000000000000000 / 1000000000000000000000000).toFixed(
                    2
                  )}N`}
                </h6>
                <span>{` ($${(
                  (400000000000000000000000 / 1000000000000000000000000) *
                  1.56
                ).toFixed(2)})`}</span>
              </PriceArea>
            </div>
            <div>
              <button>Not Listed</button>
            </div>
          </PriceBucket>
          <Description>
            <h6>Description</h6>
            <span>Ai generated sunset cliffs</span>
          </Description>
          <Description>
            <h6>Attributes</h6>
            <AttributeContainer>
              <Attribute>
                <div>
                  <span style={{ color: "#b2b7c2" }}>File Type</span>
                  <p style={{ marginTop: "10px" }}>PNG</p>
                </div>
                <div>
                  <span style={{ color: "#b2b7c2" }}>Rarity</span>
                  <p style={{ marginTop: "10px" }}>1%</p>
                </div>
              </Attribute>
              <Attribute>
                <div>
                  <span style={{ color: "#b2b7c2" }}>File Type</span>
                  <p style={{ marginTop: "10px" }}>PNG</p>
                </div>
                <div>
                  <span style={{ color: "#b2b7c2" }}>Rarity</span>
                  <p style={{ marginTop: "10px" }}>1%</p>
                </div>
              </Attribute>
            </AttributeContainer>
          </Description>
          <Description>
            <h6>Details</h6>
            <div></div>
          </Description>
        </RightSection>
      </TopSection>
    </MainContainer>
    <TransactionTable>
      <TableHeader>
        <h1>Transaction History</h1>
      </TableHeader>
      <TableBody>
        <RowType>Minting</RowType>
        <RowBody>
          <span>From</span>
          <p>---</p>
          <span>To</span>
          <p>waze.near</p>
          <p>10 months ago</p>
        </RowBody>
      </TableBody>
      <TableBody>
        <RowType>Listing</RowType>
        <RowBody>
          <span>From</span>
          <p>---</p>
          <span>To</span>
          <p>waze.near</p>
          <p>10 months ago</p>
        </RowBody>
      </TableBody>
    </TransactionTable>
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </Root>
);

const data = props.data;
const Card = styled.div` height: 300px; background-color: red; padding: 12px; margin: 8px; box-shadow: 5px 5px 5px blue; `;
const Icon = styled.div` height: 24px; width: 24px; `;
const Body = styled.div` margin-left: 12px; display: flex; flex-direction: row; gap: 8px; justify-content: space-between; `;
const Content = styled.div` display: flex; flex-direction: column; gap: 4px; `;
return (
  <Card>
    {" "}
    <div className="d-flex flex-row h-100">
      <Body>
        <img
          src={`https://ipfs.near.social/ipfs/bafybeia5jestpcujijyscwe55r2bfg2rgidbpaztrsxuyxekyb2smp3che`}
          alt={"image"}
          style={{ width: "200px", height: "200px" }}
        />
        <Content>
          <span>
            <strong>Brand:</strong>
            <h1>{data["brand"]}</h1>
          </span>
          <span>
            <strong>Color:</strong>
            <p>{data["color"]}</p>
          </span>
          <p>{data["material"]}</p>
          <span>
            {data["width"]} x {data["length"]}
          </span>
        </Content>{" "}
      </Body>{" "}
    </div>{" "}
  </Card>
);

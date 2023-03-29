const data = props.data;
const Card = styled.div` height: 60px; background-color: purple; padding: 36px; margin: 8px; border-radius: 22px; box-shadow: 5px 5px 5px gray; border: solid gray; `;
const Icon = styled.div` height: 24px; width: 24px; `;
const Body = styled.div` margin-left: 12px; display: flex; flex-direction: column; justify-content: space-between; `;
const Content = styled.div` display: flex; flex-direction: column; gap: 4px; `;
return (
  <Card>
    {" "}
    <div className="d-flex flex-row h-100">
      {" "}
      <Icon>
        {" "}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17 12C17 14.76 14.76 17 12 17V7C14.76 7 17 9.24 17 12Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 7V17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 22V17"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 7V2"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>{" "}
      </Icon>{" "}
      <Body>
        {" "}
        <Content>
          <p>{data["caption"]}</p> <p>{data["author"]}</p> <p>{data["img"]}</p>{" "}
          <Markdown text={data["text"]} />
        </Content>{" "}
      </Body>{" "}
    </div>{" "}
  </Card>
);

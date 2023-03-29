const data = props.data;
const Card = styled.img`height: 300px; background-color: white; margin: 8px; border-radius: 22px; box-shadow: 5px 5px 5px gray; `;
return <Card src={data.url} alt={"image"} />;

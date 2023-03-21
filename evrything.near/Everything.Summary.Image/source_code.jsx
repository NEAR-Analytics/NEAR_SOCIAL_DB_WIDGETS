const data = props.data;
const Card = styled.img`height: 300px; width: 300px; background-color: white; padding: 12px; margin: 8px; border-radius: 22px; box-shadow: 5px 5px 5px gray; border: solid gray; `;
return (
  <Card src={`https://ipfs.near.social/ipfs/${data.img.cid}`} alt={"image"} />
);

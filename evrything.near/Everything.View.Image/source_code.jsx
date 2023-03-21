const data = props.data;
const Card = styled.img`height: 300px; width: 300px; background-color: white; margin: 8px; border-radius: 22px; box-shadow: 5px 5px 5px gray; `;
return (
  <Card src={`https://ipfs.near.social/ipfs/${data.img.cid}`} alt={"image"} />
);

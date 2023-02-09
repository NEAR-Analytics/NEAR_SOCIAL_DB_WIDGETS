State.init({
  message: "",
});

const Wrapper = styled.div`
  border: 1px solid;
  position: relative;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  pointer-events: none;
  position: absolute;
  top: 24px;
  left: 24px;

  img {
    object-fit: cover;
    border-radius: 40px;
    width: 100%;
  }
`;

const Textarea = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;
  
  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 130px;
    font: inherit;
    padding: 24px 24px 24px 88px;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }
  
  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

const Button = styled.button`
  background: #0091FF;
  border-radius: 6px;
  color: #fff;
  height: 40px;
  padding: 0 35px;
  font-weight: 600;
  font-size: 14px;
  border: none;
`;

const Actions = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
`;

return (
  <Wrapper>
    <Avatar>
      <img src="https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreibhm4kokjpetrr7ztaixyanzbn5djvj4h4ryjshsfh2hgpi3v7uqu" />
    </Avatar>

    <Textarea data-value={state.message}>
      <textarea
        placeholder="What's happening?"
        onInput={(event) => State.update({ message: event.target.value })}
      ></textarea>
    </Textarea>

    <Actions>
      <Button type="button">Post</Button>
    </Actions>
  </Wrapper>
);

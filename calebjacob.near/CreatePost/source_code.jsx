State.init({
  message: "",
});

const Wrapper = styled.div`
  padding: 24px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  pointer-events: none;

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
  padding: 16px;
  margin: 0;
  align-items: stretch;
  border: 1px solid;
  
  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    font: inherit;
    padding: 0;
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
  </Wrapper>
);

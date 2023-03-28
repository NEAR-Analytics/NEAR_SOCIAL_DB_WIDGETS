const Wrapper = styled.div`
/* reset */
button {
  all: unset;
}

.Toggle {
  background-color: white;
  color: var(--mauve11);
  height: 35px;
  width: 35px;
  border-radius: 4px;
  display: flex;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px var(--blackA7);
}
.Toggle:hover {
  background-color: var(--violet3);
}
.Toggle[data-state='on'] {
  background-color: var(--violet6);
  color: var(--violet12);
}
.Toggle:focus {
  box-shadow: 0 0 0 2px black;
}
`;

return (
  <Wrapper>
    <Toggle.Root className="Toggle" aria-label="Toggle italic">
      X
    </Toggle.Root>
  </Wrapper>
);

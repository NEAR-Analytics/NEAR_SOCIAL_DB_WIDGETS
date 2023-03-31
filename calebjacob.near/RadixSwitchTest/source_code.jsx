const Wrapper = styled.div`/* reset */
button {
  all: unset;
}

.SwitchRoot {
  width: 42px;
  height: 25px;
  background-color: var(--blackA9);
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px var(--blackA7);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.SwitchRoot:focus {
  box-shadow: 0 0 0 2px black;
}
.SwitchRoot[data-state='checked'] {
  background-color: black;
}

.SwitchThumb {
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
}
.SwitchThumb[data-state='checked'] {
  transform: translateX(19px);
}

.Label {
  color: black;
  font-size: 15px;
  line-height: 1;

  i {
    margin-right: 8px;
  }
}
`;

return (
  <Wrapper>
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        className="Label"
        htmlFor="airplane-mode"
        style={{ paddingRight: 15 }}
      >
        <i className="ph ph-airplane"></i>
        Airplane mode
      </label>
      <Switch.Root className="SwitchRoot" id="airplane-mode">
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </div>
  </Wrapper>
);

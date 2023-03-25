const Wrapper = styled.div`
    display: flex;
    align-items: center;

    /* reset */
    button {
      all: unset;
    }

    .CheckboxRoot {
      background-color: white;
      width: 25px;
      height: 25px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px var(--blackA7);
    }
    .CheckboxRoot:hover {
      background-color: var(--violet3);
    }
    .CheckboxRoot:focus {
      box-shadow: 0 0 0 2px black;
    }

    .CheckboxIndicator {
      color: var(--violet11);
    }

    .Label {
      color: white;
      padding-left: 15px;
      font-size: 15px;
      line-height: 1;
    }
`;

return (
  <Wrapper>
    <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
      <Checkbox.Indicator className="CheckboxIndicator">
        <i className="bi bi-check-lg"></i>
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label className="Label" htmlFor="c1">
      Accept terms and conditions.
    </label>
  </Wrapper>
);

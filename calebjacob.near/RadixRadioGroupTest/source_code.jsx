const Wrapper = styled.div`
/* reset */
button {
  all: unset;
}

.RadioGroupRoot {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.RadioGroupItem {
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0 2px 10px var(--blackA7);
}
.RadioGroupItem:hover {
  background-color: var(--violet3);
}
.RadioGroupItem:focus {
  box-shadow: 0 0 0 2px black;
}

.RadioGroupIndicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.RadioGroupIndicator::after {
  content: '';
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--violet11);
}

.Label {
  color: black;
  font-size: 15px;
  line-height: 1;
  padding-left: 15px;
}
`;

return (
  <Wrapper>
    <RadioGroup.Root
      className="RadioGroupRoot"
      defaultValue="default"
      aria-label="View density"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r1">
          Default
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioGroup.Item className="RadioGroupItem" value="compact" id="r3">
          <RadioGroup.Indicator className="RadioGroupIndicator" />
        </RadioGroup.Item>
        <label className="Label" htmlFor="r3">
          Compact
        </label>
      </div>
    </RadioGroup.Root>
  </Wrapper>
);

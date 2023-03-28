const Wrapper = styled.div`
background: #ccc;

.SliderRoot {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 200px;
  height: 20px;
}

.SliderTrack {
  background-color: var(--blackA10);
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
}

.SliderRange {
  position: absolute;
  background-color: white;
  border-radius: 9999px;
  height: 100%;
}

.SliderThumb {
  display: block;
  width: 20px;
  height: 20px;
  background-color: white;
  box-shadow: 0 2px 10px var(--blackA7);
  border-radius: 10px;
}
.SliderThumb:hover {
  background-color: var(--violet3);
}
.SliderThumb:focus {
  outline: none;
  box-shadow: 0 0 0 5px var(--blackA8);
}
`;

return (
  <Wrapper>
    {" "}
    <Slider.Root
      className="SliderRoot"
      defaultValue={[50]}
      max={100}
      step={1}
      aria-label="Volume"
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" />
    </Slider.Root>
  </Wrapper>
);

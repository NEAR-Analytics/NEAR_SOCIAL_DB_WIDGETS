const selected = props.selected;
const setSelected = props.setSelected;
const options = props.options || [];
const accountId = props.accountId;

const Container = styled.div`
  width: 100%;
  display:flex;
  flex-direction: flex-row;
  justify-content: center;
`;

const Controller = styled.div`
  min-width: 416px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 216px;
  padding: 24px 0px;
  border-bottom: 2px solid #404040;
  margin-bottom: 80px;
`;

const Everything = styled.div`
  font-size: 40px;
  line-height: 56px;
`;

const Select = styled.select`
  font-size: 40px;
  line-height: 56px;
  width: 100%;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  &:focus {
    outline: none;
  }
`;

const Types = styled.div`
  max-width: 535px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin: 32px 0 80px 0;
`;

const Button = styled.div`
  height: 40px;
  border-radius: 100px;
  padding: 10px 24px;
  background: #F2F2F233;
  font-size: 14px;
  line-height: 19.6px;
  font-weight: 500;
`;

const Circle = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F2F233;
  font-size: 14px;
  line-height: 19.6px;
`;

return (
  <>
    <Container>
      <Controller>
        <Select
          type="text"
          value={selected}
          onChange={(event) => {
            setSelected(event.target.value);
          }}
        >
          {options.map((it) => {
            return (
              <option value={`${accountId}/type/${it[0]}`} key={it[0]}>
                {it[0].toLowerCase()}
              </option>
            );
          })}
        </Select>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3333 27.9998C22.3289 27.9998 28 22.3288 28 15.3332C28 8.33756 22.3289 2.6665 15.3333 2.6665C8.33769 2.6665 2.66663 8.33756 2.66663 15.3332C2.66663 22.3288 8.33769 27.9998 15.3333 27.9998Z"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M29.3333 29.3332L26.6666 26.6665"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Controller>
    </Container>
    {/** 
    <Container>
      <Types>
        <Button>events</Button>
        <Button>places</Button>
        <Button>recipes</Button>
        <Button>ideas</Button>
        <Button>media</Button>
        <Circle>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99996 18.3332C14.5833 18.3332 18.3333 14.5832 18.3333 9.99984C18.3333 5.4165 14.5833 1.6665 9.99996 1.6665C5.41663 1.6665 1.66663 5.4165 1.66663 9.99984C1.66663 14.5832 5.41663 18.3332 9.99996 18.3332Z"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.3304 10.0002H13.3379"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.9962 10.0002H10.0037"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66209 10.0002H6.66957"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Circle>
      </Types>
    </Container>
    */}
  </>
);

const label = props.label ?? "Label";
const noLabel = props.noLabel ?? false;
const placeholder = props.placeholder ?? "Select an option";
const value = props.value ?? "";
const options = props.options ?? [];
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
const error = props.error ?? "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;

  .typeahead {
    width: 100%;

    & > div {
      padding: 0.5em 0.75em;
      background: #ffffff;
      border: 1px solid #d0d5dd;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 4px;
      color: #101828;

      &:first-child {
        height: 2.5em !important;
      }

      & > input {
        position: absolute;
        inset: 0px;
        border: none;
        background: transparent;
      }
    }

    .rbt-token {
      background: #f2f4f7;
      border: 1px solid #d0d5dd;
      border-radius: 3px;
      font-style: normal;
      font-weight: 500;
      font-size: 0.95em;
      line-height: 1.25em;
      text-align: center;
      color: #344054;

      & > button {
        font-size: 1.25em;
        color: #98a2b3;
      }
    }
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

return (
  <Container>
    {noLabel ? <></> : <Label>{label}</Label>}
    <Typeahead
      id
      placeholder={placeholder}
      labelKey="text"
      onChange={onChange}
      options={options}
      selected={value}
      onBlur={validate}
      className="typeahead"
      positionFixed
    />
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);

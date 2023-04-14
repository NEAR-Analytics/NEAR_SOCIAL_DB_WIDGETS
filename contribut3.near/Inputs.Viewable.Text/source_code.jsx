const ownerId = "contribut3.near";
const id = props.id ?? "text";
const label = props.label ?? "Input";
const value = props.value ?? "";
const link = props.link ?? "";
const isLink = link !== "";
const onSave = props.onSave ?? (() => { });

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  flex-wrap: wrap;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

// return (
//   <Widget
//     src={`${ownerId}/widget/Inputs.Viewable`}
//     props={{
//       id,
//       label,
//       value,
// edit: (update, v) => (
//   <LabelArea>
//     <Input
//       id
//       type={isLink ? "url" : "text"}
//       value={v}
//       onChange={(e) => update(e.target.value)}
//     />
//     <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
//   </LabelArea>
// ),
//       view: isLink ? <a href={link}>{value}</a> : value,
//     }}
//   />
// );

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({ big }) => (big ? ".625em" : ".25em")};
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: ${({ big }) => (big ? "1em" : ".95em")};
  line-height: ${({ big }) => (big ? "1.4em" : "1em")};
  color: #11181c;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const EditButton = styled.button`
  font-weight: 400;
  font-size: 0.9em;
  line-height: 1em;
  color: #006adc;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: absolute;
  inset: auto auto auto 0;

  &.hidden {
    transform: scaleX(0);
  }

  &.left {
    transform-origin: left;
  }

  &.right {
    transform-origin: right;
  }
`;

const EditButtonContainer = styled.div`
  position: relative;
  width: min-content;
  height: 1em;
`;

const noLabel = false;
State.init({
  edit: false,
  value,
})

return (
  <div>
    <Row>
      {noLabel ? (
        view
      ) : (
        <Label htmlFor={id} big={false}>
          {label}
        </Label>
      )}
      <EditButtonContainer>
        <EditButton
          onClick={() => State.update({ edit: false })}
          className={`right ${state.edit ? "" : "hidden"}`}
        >
          Cancel
        </EditButton>
        <EditButton
          onClick={() => State.update({ edit: true })}
          className={`left ${state.edit ? "hidden" : ""}`}
        >
          Edit
        </EditButton>
      </EditButtonContainer>
    </Row>

    <LabelArea>
      <Input
        id
        type={isLink ? "url" : "text"}
        value={state.value}
        onChange={(e) => State.update({ value: e.target.value })}
      />
      <SaveButton onClick={() => onSave(state.value)}>Save</SaveButton>
    </LabelArea>
  </div>
);

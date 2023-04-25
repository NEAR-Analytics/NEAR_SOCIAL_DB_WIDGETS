const label = props.label ?? "File";
const id = props.id ?? "file";
const fileAccept = props.fileAccept ?? ["images/*", "video/*", ".pdf"];
const noLabel = props.noLabel ?? false;
const value = props.value ?? "---";
const [cid, filename, size, uploaded] = value.split("-");
const onChange = props.onChange ?? (() => { });
const validate = props.validate ?? (() => { });
const error = props.error ?? "";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
  padding: .5em;
  background: #FFFFFF;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
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

const Input = styled.div`
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
  color: #101828;
  width: 100%;
`;

const FileDetails = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: .5em 1em .75em;
  gap: .75em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 8px;
`;

const Small = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: .75em;
  line-height: 1em;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #7e868c;
`;

State.init({
  uploading: false,
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

return (
  <Container>
    <Label>{label}</Label>
    {cid ?
      <FileDetails>
        <a href={ipfsUrl(state.cid)} download>{state.filename}</a>

      </FileDetails>
      : <></>}
    <Files
      multiple={false}
      accepts={["image/*", "video/*", ".pdf"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={(files) => {
        if (!files || !files.length) return;

        const [body] = files;

        State.update({ uploading: true, cid: null });
        asyncFetch(
          "https://ipfs.near.social/add",
          {
            method: "POST",
            headers: { Accept: "application/json" },
            body,
          }
        ).then(
          ({ body: { cid } }) => {
            State.update({ cid, filename: body.name, uploading: false });
            // props.update(cid);
          }
        );
      }}
    >
      {state.uploading
        ? "Uploading"
        : state.cid
          ? "Replace"
          : buttonText}
    </Files>
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);

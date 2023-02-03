const description = props.description ?? "";
const update = props.update;
const text = props.text ?? "Description:";

if (!update) {
  return "Cannot render description input widget without update function!";
}

return (
  <div className="col-lg-12  mb-2">
    <label htmlFor="description">{text}</label>
    <textarea
      id="description"
      value={description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => update(event.target.value)}
    />
  </div>
);

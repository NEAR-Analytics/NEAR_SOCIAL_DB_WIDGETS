let description = props.description || "";

return (
  <div className="text-truncate my-2">
    {description.length > 100 ? description.substring(0, 90) : description}
    {description.length > 100 ? (
      <b className="text-primary">Read more</b>
    ) : (
      <></>
    )}
  </div>
);

let description = props.description || "";

if (description.length > 100) {
  description = description.substring(0, 90) + "Read more";
}

return (
  <div className="text-truncate my-2">
    {description.length > 100 ? description.substring(0, 90) : description}
  </div>
);

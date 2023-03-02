const description = props.description || "";
const lengthCutoff = 90;

return (
  <div
    className="text-truncate my-2 w-100"
    style={{ textOverflow: "'Read more'" }}
  >
    {description}
    {/* {description.length > lengthCutoff */}
    {/*   ? description.substring(0, lengthCutoff - 10) */}
    {/*   : description} */}
    {/* {description.length > lengthCutoff ? ( */}
    {/*   <b className="text-primary">Read more</b> */}
    {/* ) : ( */}
    {/*   <></> */}
    {/* )} */}
  </div>
);

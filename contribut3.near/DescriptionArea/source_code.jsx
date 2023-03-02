const description = props.description || "";
const lengthCutoff = 100;

State.init({
  showAll: description <= lengthCutoff,
});

return (
  <div className="d-flex flex-row justify-content-start align-items-center">
    <Markdown
      // className="text-truncate my-2 w-100"
      // style={{ textOverflow: "ellipsis" }}
      text={
        state.showAll ? description : description.substring(0, lengthCutoff)
      }
    />
    {state.showAll ? (
      <></>
    ) : (
      <a onClick={() => State.update({ showAll: true })}>Read more</a>
    )}
  </div>
);
//     {/* {description.length > lengthCutoff */ }
// {/*   ? description.substring(0, lengthCutoff - 10) */ }
// {/*   : description} */ }
// {/* {description.length > lengthCutoff ? ( */ }
// {/*   <b className="text-primary">Read more</b> */ }
// {/* ) : ( */ }
// {/*   <></> */ }
// {/* )} */ }
// );

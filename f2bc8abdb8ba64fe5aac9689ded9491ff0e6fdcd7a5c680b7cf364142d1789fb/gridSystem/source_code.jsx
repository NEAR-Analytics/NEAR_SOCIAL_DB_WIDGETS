const colCount = props.colCount;
const brakePoint = props.brakePoint;
const array = props.array;

const Item = props.itemElement;
//const itemElement = ()=> {
//    const { title, artist } = props
//
//    return (
//      <div>
//          <h3>{title}</h3>
//          <p>Artist: {artist}</p>
//      </div>
//    )
//}

const itemProps = props.itemProps;
//{title, artist}

return (
  <Widget
    src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/gridSystemSecondStep"
    props={(colCount, brakePoint)}
  >
    {array.length > 0 ? (
      array.map((item) => <Item key={item.id} itemProps />)
    ) : (
      <p>No elements found</p>
    )}
  </Widget>
);

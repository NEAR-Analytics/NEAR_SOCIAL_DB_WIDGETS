// propagates props to child widget SimpleCard to create card gallery
const user = "humanman.near";

// const Card = styled.button`
//   display: flex;
//   flex-direction: column;
//   background-color: white;
//   justify-content: center;
//   align-items: center;
//   width: 300px;
//   height: 300px;
//   border: 1px solid rgba(0, 0, 0, 0.15);
//   border-radius: 8px;
//   color: black;
//   cursor: pointer;

//   &:hover {
//     background-color: #e9ecef;
//   }
// `;

const Gallery = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

return (
  <Gallery>
    {props.cardData.map(({ img, link, title, description }) => {
      return (
        <Widget
          src={`${user}/widget/SimpleCard`}
          props={{ img, link, title, description }}
        />
      );
      //   return (
      //     <Card>
      //       <img style={{ maxWidth: "80%", margin: "auto" }} src={img} />
      //       <a href={link}>
      //         <h4>{title}</h4>
      //         <hr />
      //         <p style={{ textAlign: "center" }}>{description}</p>
      //       </a>
      //     </Card>
      //   );
    })}
  </Gallery>
);

// return (
//   <div>
//     {props.cardData.map((data) => {
//       <Widget src={`${user}/widget/SimpleCard`} props={data} />;
//     })}
//   </div>
// );

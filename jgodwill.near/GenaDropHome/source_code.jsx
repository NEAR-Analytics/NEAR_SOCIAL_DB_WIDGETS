const MainHeading = styled.h1`
  font-weight: 700;
  font-size: 8.1875rem;
  line-height: 1em;
  text-align: center;
  color: #2d3748;
  white-space: nowrap;
   @media (max-width: 992px) {
    font-size: 5vw;
  }
`;
const SubHeading = styled.h3`
font-size: 2.5rem;
font-weight: 500;
text-align: center;
color: #2d3748;
//  @media (max-width: 992px) {
//     text-align:center;
//   }
`;

return (
  <div>
    <MainHeading>Create. Mint. Sell.</MainHeading>
    <SubHeading>
      {"Create content + Art that you own in < 5 minutes"}
    </SubHeading>
  </div>
);

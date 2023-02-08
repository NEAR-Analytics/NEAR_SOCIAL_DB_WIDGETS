const Card = styled.div`
    border-radius: 12px;
    background: #fff;
    border: 1px solid #ECEEF0;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
`;

const CardBody = styled.div`
    padding: 16px;
`;

const CardFooter = styled.div`
    padding: 16px;
    border-top: 1px solid #ECEEF0;
`;

const Title = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: #101828;
  margin: 0;
  font-weight: 600;
`;

return (
  <Card>
    <CardBody>
      <Title>Real Time Message</Title>
    </CardBody>

    <CardFooter>
      <Title>Real Time Message</Title>
    </CardFooter>
  </Card>
);

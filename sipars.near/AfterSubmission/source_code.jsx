const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center;
  height: 80vh;
  background-color: #1c1f2a;
`

const Heading = styled.h3`
  text-align: center;
  color: #8f73ff;
  margin-top: -300px;
`

const SubHeading = styled.h4`
  color: #e3e6ec;
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`

const FinishedIcon = styled.svg`
  width: 80px;
  height: 80px;
  fill: #8f73ff;
  margin-bottom: 100px;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const HorizontalLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e3e6ec;
  margin-bottom: 10px;
`

const FooterText = styled.p`
  font-size: 14px;
  color: #e3e6ec;
`

const appStatus = props.status

if (appStatus === 'pending') {
  return (
    <Container>
      <FinishedIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="4" cy="12" r="2" fill="#8f73ff" />
        <circle cx="12" cy="12" r="2" fill="#8f73ff" />
        <circle cx="20" cy="12" r="2" fill="#8f73ff" />
      </FinishedIcon>
      <Heading>Thank you for submitting the application!</Heading>
      <SubHeading>Your application is pending review.</SubHeading>
      <Footer>
        <HorizontalLine />
        <FooterText>With Love from TBC &#x2665;</FooterText>
      </Footer>
    </Container>
  )
} else if (appStatus === 'rejected') {
  return (
    <Container>
      <FinishedIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="#8f73ff"
          d="M18.364 5.636a.999.999 0 0 0-1.414 0L12 10.586 7.05 5.636a.999.999 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a.999.999 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.999.999 0 1 0 1.414-1.414L13.414 12l4.95-4.95a.999.999 0 0 0 0-1.414z"
        />
      </FinishedIcon>
      <Heading>Your application was rejected!</Heading>
      <SubHeading>
        Please verify the data and contact the concerned authority.
      </SubHeading>
      <Footer>
        <HorizontalLine />
        <FooterText>With Love from TBC &#x2665;</FooterText>
      </Footer>
    </Container>
  )
} else {
  return (
    <Container>
      <FinishedIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#8f73ff" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="#fff"
          fontSize="18"
          dy=".3em"
        >
          ?
        </text>
      </FinishedIcon>
      <Heading>Ops! We cannot find your application!</Heading>
      <SubHeading>
        Please verify the data and contact the concerned authority.
      </SubHeading>
      <Footer>
        <HorizontalLine />
        <FooterText>With Love from TBC &#x2665;</FooterText>
      </Footer>
    </Container>
  )
}

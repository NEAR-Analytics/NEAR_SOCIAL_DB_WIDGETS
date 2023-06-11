const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  height: 70vh;
  background-color: #1c1f2a;
`

const Heading = styled.h1`
  text-align: center;
  color: #8f73ff;
`

const Heading3 = styled.h3`
  text-align: center;
  color: #8f73ff;
  font-size: 22px;
  margin-top: 20px;
`

const SubHeading = styled.h4`
  color: #e3e6ec;
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
`

const QRCode = styled.img`
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

State.init({ base64Image: '' })

const fetchCred = () => {
  return asyncFetch('https://4783-62-168-58-186.eu.ngrok.io/api/qr', {
    body: JSON.stringify(props.cred),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'no-cors',
  })
}
fetchCred()
  .then((res) => res.buffer())
  .then((buffer) => {
    // Convert buffer to Base64
    State.Update({ base64Image: buffer.toString('base64') })

    // Display the image in HTML
    // console.log(
    //   '<div><img src="data:image/png;base64,' + base64Image + '"/></div>',
    // )
  })
  .catch((err) => console.error(err))

// const authority = props.authority
const authority = 'TUM Blockchain Club'

return (
  <Container>
    <Heading3> Your are certified for</Heading3>
    <Heading>{authority}</Heading>
    <SubHeading>Find your QR code below.</SubHeading>
    <QRCode
      src={`data:image/png;base64,${state.base64Image}`}
      alt="new"
      style={{ maxWidth: '300px', maxHeight: '300px' }}
    />

    <Footer>
      <HorizontalLine />
      <FooterText>With Love from TBC &#x2665;</FooterText>
    </Footer>
  </Container>
)

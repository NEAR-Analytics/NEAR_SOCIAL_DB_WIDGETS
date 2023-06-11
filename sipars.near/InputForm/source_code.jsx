const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80vh;
  background-color: #1c1f2a;
`

const Heading = styled.h1`
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  color: #8f73ff;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const Label = styled.label`
  color: #e3e6ec;
  margin-bottom: 0.5rem;
  font-weight: bold;
  min-width: 100px;
`

const SubmitButton = styled.button`
  background-color: #8f73ff;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #b290ff;
  }
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
  margin-top: 50px;
`

const FooterText = styled.p`
  font-size: 14px;
  color: #e3e6ec;
`

State.init({ fullName, matriculationNumber, email })

const onFullNameChange = ({ target }) => {
  State.update({ fullName: target.value })
}
const onMatriculationNumberChange = ({ target }) => {
  State.update({ matriculationNumber: target.value })
}
const onEmailChange = ({ target }) => {
  State.update({ email: target.value })
}

const onBtnClick = () => {
  const retVal = {
    fullName: state.fullName,
    matriculationNumber: state.matriculationNumber,
    email: state.email,
    // address: props.state.currentAccountId,
  }
  props.addPendingApplication(retVal)
}

return (
  <Container>
    <FormContainer onSubmit={handleSubmit}>
      <Heading>Please fill in the details</Heading>
      <FormGroup>
        <Label htmlFor="fullName">Name</Label>
        <input onChange={onFullNameChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="matriculationNumber">Matriculation Number</Label>
        <input onChange={onMatriculationNumberChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <input onChange={onEmailChange} />
      </FormGroup>
      <br />
      <SubmitButton type="submit" onClick={onBtnClick}>
        Submit
      </SubmitButton>
    </FormContainer>
    <Footer>
      <HorizontalLine />
      <FooterText>With Love from TBC &#x2665;</FooterText>
    </Footer>
  </Container>
)

const Heading = styled.h1`
  margin-top: 30px;
  text-align: center;
  color: #8f73ff;
`
const SubHeading = styled.h2`
  color: #e3e6ec;
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80vh;
  background-color: #1c1f2a;
`

const ButtonContainer = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e3e6ec;
  border-radius: 10px;
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

State.init({
  currentAccountId: '',
  //   userComponentToRender: null,
  isAdmin: false,
})

const getEVMAccountId = () => {
  if (ethers !== undefined) {
    return Ethers.send('eth_requestAccounts', [])[0] ?? ''
  }
  return ''
}

const fetchCred = (application) => {
  return asyncFetch('https://4783-62-168-58-186.eu.ngrok.io/api/issue', {
    body: JSON.stringify({
      did: application.address,
      name: application.fullName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'no-cors',
  })
}
let userComponentToRender = null
// Update on Action from AdminPage
const updatePendingApplications = (action, application) => {
  application = { ...application, address: state.currentAccountId }
  const pendingApplications = Storage.privateGet('pendingApplications')
  const updatedApplications = pendingApplications.filter(
    (item) => item.address !== application.address,
  )
  Storage.privateSet('pendingApplications', updatedApplications)
  if (action === 'accept') {
    const updatedAccepted = Storage.privateGet('acceptedApplications') || []
    updatedAccepted.push(application)
    Storage.privateSet('acceptedApplications', updatedAccepted)
    fetchCred(application)
      .then((res) => {
        console.log('Resulting Credential: ', res)
        Storage.privateSet(application.address, res)
      })
      .catch((err) => {
        console.error('An error occurred while creating credential: ', err)
      })
  } else if (action === 'reject') {
    const updatedRejected = Storage.privateGet('rejectedApplications') || []
    updatedRejected.push(application)
    Storage.privateSet('rejectedApplications', updatedRejected)
    Storage.privateSet(application.address, 'rejected')
  }
}

// Add a new pending application
const addPendingApplication = (application) => {
  console.log('inside pending add')
  const pendingApplications = Storage.privateGet('pendingApplications') || []
  pendingApplications.push({ ...application, address: state.currentAccountId })
  Storage.privateSet('pendingApplications', pendingApplications)
  Storage.privateSet(state.currentAccountId, 'pending')
  userComponentToRender: <Widget
    src="sipars.near/widget/AfterSubmission"
    props={{ status: 'pending' }}
  />
}

console.log('pending storage: ', Storage.privateGet('pendingApplications'))
console.log('accepted storage: ', Storage.privateGet('acceptedApplications'))
console.log('rejected storage: ', Storage.privateGet('rejectedApplications'))

if (state.currentAccountId.length === 0)
  state.currentAccountId = getEVMAccountId()
//   State.update({ currentAccountId: getEVMAccountId() });

if (state.currentAccountId !== '') {
  // Storage.privateSet('pendingApplications', undefined)
  // Storage.privateSet('acceptedApplications', undefined)
  // Storage.privateSet('rejectedApplications', undefined)
  // Storage.privateSet('0x890bb55136b71898357716b2eb13c6ecfeda04e5', undefined)
  // Storage.privateSet('0xaA8cAf7E17086678876740b6c8087eb632a7578D', undefined)
  const addr = state.currentAccountId
  State.update({
    isAdmin: '0x890bb55136B71898357716b2Eb13c6eCFeda04E5' !== addr,
  })
  const status = Storage.privateGet(state.currentAccountId)
  console.log('statusL ', status)
  if (typeof status === 'undefined') {
    userComponentToRender = (
      <Widget
        src="sipars.near/widget/InputForm"
        props={{ addPendingApplication }}
      />
    )
  } else if (status === 'rejected' || status === 'pending') {
    userComponentToRender = (
      <Widget src="sipars.near/widget/AfterSubmission" props={{ status }} />
    )
  } else {
    const cred = Storage.privateGet(state.currentAccountId)
    userComponentToRender = (
      <Widget
        src="sipars.near/widget/Certification"
        props={{ cred: cred.body.cred }}
      />
    )
  }
}

console.log('currentAccountId: ', state.currentAccountId, state.isAdmin)
return (
  <>
    {console.log(state)}
    {state.currentAccountId !== '' ? (
      state.isAdmin ? (
        <Widget
          src="sipars.near/widget/PendingApplicationsTable"
          props={{
            pendingApplications:
              Storage.privateGet('pendingApplications') || [],
            updatePendingApplications,
          }}
        />
      ) : (
        userComponentToRender
      )
    ) : (
      <LoginContainer>
        <Heading>Welcome to the Login Page</Heading>
        <SubHeading>Please login with your fancy wallet</SubHeading>
        <ButtonContainer>
          <Web3Connect
            className="swap-button-enabled swap-button-text p-2"
            connectLabel="Connect with wallet"
          />
        </ButtonContainer>
        <Footer>
          <HorizontalLine />
          <FooterText>With Love from TBC &#x2665;</FooterText>
        </Footer>
      </LoginContainer>
    )}
  </>
)

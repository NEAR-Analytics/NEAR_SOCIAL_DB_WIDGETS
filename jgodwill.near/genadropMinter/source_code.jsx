let accountId = context.accountId;

// if (!accountId) {
//   return "Please sign in with NEAR wallet";
// }

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  IpfsImageUpload();
  return "Loading";
}

const handleMint = () => {
  // if (!(state.title && state.description && state.image.cid)) {
  //   return;
  // }
  if (!accountId) {
    console.log("Please login");
    State.update({
      showAlert: true,
      toastMessage: "Please log in before continuing",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.title) {
    console.log("Please Enter title");
    State.update({
      showAlert: true,
      toastMessage: "Please enter a title before continuing",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.description) {
    console.log("Please Enter desc");
    State.update({
      showAlert: true,
      toastMessage: "Please enter a description before continuing",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [],
      image: `ipfs://${state.image.cid}`,
    };
    console.log("come", metadata);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      console.log("GO ON SOUN", res);
      const cid = res.body.cid;
      const gas = 200000000000000;
      const deposit = 10000000000000000000000;
      Near.call([
        {
          contractName: "genadrop-contract.nftgen.near",
          methodName: "nft_mint",
          args: {
            token_id: `${Date.now()}`,
            metadata: {
              title: state.title,
              description: state.description,
              media: `https://ipfs.io/ipfs/${state.image.cid}`,
              reference: `ipfs://${cid}`,
            },
            receiver_id: accountId,
          },
          gas: gas,
          deposit: deposit,
        },
      ]);
    });
  }
};

initState({
  title: "",
  description: "",
  showAlert: false,
  toastMessage: "",
});

const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const onChangeDesc = (description) => {
  State.update({
    description,
  });
};

const ImageUploadCard = styled.div`
display:flex;
flex-flow: column nowrap;
align-items: center;
  width:80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 20px 6px rgba(0,0,0,.2);
  margin:30px auto;
  padding:1.5rem;
  text-align: center;
`;
const Main = styled.div`
position:relative;
  font-family: "SF Pro Display",sans-serif;
`;

// const handleDrop = (event) => {
//   event.preventDefault();

//   const file = event.dataTransfer.files[0];
//   const reader = new FileReader();

//   reader.onloadend = () => {
//     this.setState({
//       file: file,
//       previewUrl: reader.result,
//       showPreview: true,
//     });
//   };

//   reader.readAsDataURL(file);
// };

const Heading = styled.p`
  margin: 10px auto 10px auto;
  font-size: 1em;
  color:#0f1d40;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

const Toast = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: red;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  z-index: 100;
`;

const Elipse = styled.div`
background-color:#eff3f9;
height: 100px;
width: 100px;
border-radius: 50%;
`;

const Text = styled.p`
font-size: .9rem;
color: #525c76;
line-height:1.rem;
margin: 3px;
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  height:500px;
`;

const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const TextArea = styled.textarea`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;
return (
  <Main className="container-fluid">
    {!accountId && <p>Please sign in with NEAR wallet</p>}
    <Heading className="text-center fs-2 fw-bold">Mint NFT on genadrop</Heading>
    {!state.image.cid ? (
      <div>
        <Card className="d-flex flex-column align-items-center">
          <ImageCard>
            <img
              src={`https://ipfs.io/ipfs/` + state.image.cid}
              alt="uploaded image"
              width="100%"
              height="100%"
              className="rounded-3"
            />
          </ImageCard>
          <div>
            <IpfsImageUpload
              image={state.image}
              className="btn btn-outline-primary border-0 rounded-3"
            />
          </div>
        </Card>
        <Card>
          <h5>Asset Detials</h5>
          <Card>
            Title:
            <Input
              type="text"
              onChange={(e) => onChangeTitle(e.target.value)}
            />
          </Card>
          <Card>
            Description:
            <TextArea
              type="text"
              onChange={(e) => onChangeDesc(e.target.value)}
            />
          </Card>
        </Card>
        <div className="d-flex justify-content-center mb-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleMint}
          >
            Mint
          </button>
        </div>
      </div>
    ) : (
      <div>
        <Heading>Upload an image to create an NFT on NEAR</Heading>
        <ImageUploadCard className="flex-grow-1">
          <Elipse />
          <IpfsImageUpload
            image={state.image}
            className="btn text-decoration-none link-primary pe-auto"
          />
          <div>
            {
              //   <Heading
              //   onDrop={handleDrop}
              //   onDragOver={(event) => event.preventDefault()}
              // >
              //   Drag and Drop your image file here
              // </Heading>
            }
            <Text>
              We support .jpg, .jpeg, .png, .webp, .gif files and deploy to Near
            </Text>
            <Text>Max file size: 20mb</Text>
          </div>
        </ImageUploadCard>
      </div>
    )}
    {state.showAlert && (
      <Toast>
        <p>{state.toastMessage}</p>
      </Toast>
    )}
  </Main>
);

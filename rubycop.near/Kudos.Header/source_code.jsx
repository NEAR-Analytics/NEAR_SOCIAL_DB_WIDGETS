const widget = {
  button: "rubycop.near/widget/NDC.StyledComponents",
};

const Header = styled.div`
  background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
`;

const PrimaryButton = styled.button`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border: 0;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(128, 128, 128, 0.65);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  background: #F8F8F9;
  margin: 20% auto;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 90%;
  }

  .content {
    margin: 18px 0; 

    h6 {
      margin-bottom: -10px;
    }
  }
`;

const InputField = styled.div`
  margin: 20px 0;
`;

const PrimaryLink = styled.a`
  padding: 4px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

State.init({
  isOpen: false,
  receiverId: "",
  comment: "",
  tags: "",
});

const handleAddKudo = () => {
  console.log(state.receiverId);
  console.log(state.comment);
  console.log(state.tags.replace(/\s/g, "").split(","));
};

const Content = () => (
  <ModalContent>
    <h4>Give a Kudo</h4>
    <div className="content">
      <h6>NEAR account</h6>
      <InputField>
        <input
          className="form-control w-100"
          value={state.receiverId}
          onChange={(e) => State.update({ receiverId: e.target.value })}
        />
      </InputField>
      <h6>Add a Kudo Description</h6>
      <InputField>
        <textarea
          className="form-control w-100"
          rows="5"
          value={state.comment}
          onChange={(e) => State.update({ comment: e.target.value })}
        />
      </InputField>
      <h6>Tags</h6>
      <InputField>
        <input
          placeholder="Enter tags using comma separator"
          className="form-control w-100"
          value={state.tags}
          onChange={(e) => State.update({ tags: e.target.value })}
        />
      </InputField>
    </div>
    <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Cancel",
            className: "secondary",
            onClick: () => State.update({ isOpen: false }),
          },
        }}
      />
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Submit",
            onClick: () => {
              State.update({ isOpen: false });
              handleAddKudo();
            },
          },
        }}
      />
    </div>
  </ModalContent>
);

return (
  <>
    <Header className="d-flex p-3 px-4 align-items-center justify-content-between">
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: {
            url: "https://bafkreicrlj3lgygabo37j6gelyamwvm5qj4vtd3sid62dlbr7s6wi3qjhm.ipfs.nftstorage.link/",
          },
          alt: "kudos",
          style: {
            height: "30px",
            objectFit: "cover",
          },
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
      {isIAmHuman ? (
        <Widget
          src="rubycop.near/widget/NDC.StyledComponents"
          props={{
            Button: {
              text: "Give a Kudo",
              size: "sm",
              icon: (
                <Widget
                  src="mob.near/widget/Image"
                  props={{
                    image: {
                      url: "https://bafkreieynbjyuycbo7naqp5dtiajcsmpiwyt7n2mk35746463nkcjte2yy.ipfs.nftstorage.link/",
                    },
                    alt: "kudos",
                    style: {
                      height: "20px",
                      objectFit: "cover",
                      margin: "0 0 3px 5px",
                    },
                    fallbackUrl:
                      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
                  }}
                />
              ),
              onClick: () => State.update({ isOpen: true }),
            },
          }}
        />
      ) : (
        <PrimaryLink href="https://i-am-human.app/">
          Verify as Human
        </PrimaryLink>
      )}
    </Header>

    {state.isOpen && (
      <Modal isOpen={state.isOpen}>
        <ComponentWrapper>
          <Content />
        </ComponentWrapper>
      </Modal>
    )}
  </>
);

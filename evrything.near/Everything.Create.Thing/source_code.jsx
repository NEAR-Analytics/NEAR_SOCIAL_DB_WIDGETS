const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    line-height: 33.6px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Input = styled.input`
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Button = styled.button`
    padding: 8px 20px;
    max-width: 90px;
`;

const Caption = styled.div`
    font-size: 12px;
    line-height: 15.6px;
    color: #A6A6A6;
`;

const type = Type.get(props.type);
// const type = props.type;

if (!type) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: `provided type: "${props.type}" is not valid.`,
      }}
    />
  );
}

State.init({
  title: "",
  description: "",
  res: null,
  loading: false,
});

const createThing = () => {
  State.update({
    loading: true,
  });
  asyncFetch(type.mutations?.create.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: type.mutations?.create.query,
      variables: {
        type: props.type,
        title: state.title,
      },
    }),
  }).then((res) => {
    State.update({
      res: res,
      loading: false,
    });
    // Catch if there is an error
    // const ideaId = res.body.data?.things?.addIdea.entities[0].id;
    // appendDescription(ideaId);
  });
};

// const appendDescription = (ideaId) => {
//   asyncFetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `
//             mutation AppendDescription($ideaId: ID, $description: String) {
//             ideas(id: {is: $ideaId}) {
//                 appendContentToDescription(value: $description) {
//                     message
//                     }
//                 }
//             }
//         `,
//       variables: {
//         ideaId: ideaId,
//         description: state.description,
//       },
//     }),
//   }).then((res) => {

//   });
// };

const resetThing = () => {
  State.update({
    title: "",
    description: "",
    res: null,
  });
};

return (
  <>
    <Header>
      <Title>{props.type.split("/")[2]}</Title>
    </Header>

    <Form>
      {state.loading ? (
        <>Loading...</>
      ) : (
        <>
          {state.res?.ok ? (
            <>
              {state.res.body.errors ? (
                <Widget
                  src={ERROR_WIDGET}
                  props={{
                    message: JSON.stringify(state.res.body.errors[0].message),
                  }}
                />
              ) : (
                <>Successfully uploaded!</>
              )}
            </>
          ) : (
            <>
              <Input
                placeholder={"title"}
                onChange={({ target }) => State.update({ title: target.value })}
              />

              <TextArea
                onInput={({ target }) =>
                  State.update({ description: target.value })
                }
                placeholder={"description, markdown supported"}
              />
            </>
          )}
        </>
      )}

      <ButtonRow>
        <Button onClick={createThing}>create</Button>
        <Button onClick={resetThing}>reset</Button>
      </ButtonRow>
    </Form>
  </>
);

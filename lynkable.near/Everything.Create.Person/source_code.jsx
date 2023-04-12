const Header = styled.div` width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; `;
const Title = styled.div` font-size: 24px; line-height: 33.6px; `;
const Form = styled.div` display: flex; flex-direction: column; gap: 4px; `;
const Input = styled.input` width: 100%; `;
const TextArea = styled.textarea` width: 100%; `;
const ButtonRow = styled.div` display: flex; flex-direction: row; gap: 4px; `;
const Button = styled.button`
  text-transform: lowercase !important;
`;

const typeStr = "lynkable.near/type/Person";
const type = Type.get(typeStr);
console.log(type);

const initState = type.properties.reduce((p, { name }) => {
  p[name] = "";
  return p;
}, {});

State.init(initState);
state.accountId = context.accountId;

const handleCreatePerson = () => {
  if (state) {
    asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Everything": "simple",
      },
      body: JSON.stringify({
        query:
          "mutation createPerson($name: String, $note: String, $accountId: String, $email: String, $widgetSrc: String) { people { create(name: $name, accountId: $accountId, email: $email, widgetSrc: $widgetSrc) { entities { id } } appendContentToDescription(value: $note) { entities { id   } } } }",
        variables: state,
      }),
    }).then((res) => {
      if (res.body.errors) {
        console.log(res.body.errors);
      } else {
        Social.set(
          {
            thing: {
              main: JSON.stringify({
                thingId: res.body.data.people.create.entities[0].id,
              }),
            },
            index: {
              les: JSON.stringify({
                key: "main",
                value: {
                  type: "lynkable.near/type/Person",
                },
              }),
            },
          },
          {
            force: true,
          }
        );
      }
    });
    return;
  }
};

return (
  <>
    <Header>
      <Title>{typeStr.split("/")[2]}</Title>
    </Header>
    <Form>
      <Input
        placeholder="name"
        onChange={({ target }) => State.update({ name: target.value })}
      />
      <Input
        placeholder="email"
        onChange={({ target }) => State.update({ email: target.value })}
      />
      <TextArea
        placeholder="note"
        onInput={({ target }) => State.update({ note: target.value })}
      />
      <ButtonRow>
        <Button
          onClick={handleCreatePerson}
          disabled={state.name === "" || state.email === ""}
        >
          create
        </Button>
      </ButtonRow>
    </Form>
  </>
);

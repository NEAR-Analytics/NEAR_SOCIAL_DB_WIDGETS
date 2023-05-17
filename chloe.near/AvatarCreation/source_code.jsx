const AvatarCreationWidget = (props) => {
  const [name, setName] = context.useState("");

  const createAvatar = () => {
    return {
      name: name,
      location: "entrance",
      items: [],
    };
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createAvatar}>Create Avatar</button>
    </div>
  );
};

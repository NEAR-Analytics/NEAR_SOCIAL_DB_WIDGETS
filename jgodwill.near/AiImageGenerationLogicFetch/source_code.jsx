initState({
  prompt: "A man in a car",
});
asyncFetch("https://genadrop.onrender.com/api/v1/general/generate-image", {
  method: "POST",
  mode: "cors",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic dXNlcm5hbWViYXNpYzpwYXNzd29yZGJhc2lj",
  },
  body: JSON.stringify({
    prompt: state.prompt,
    n: 1,
    size: "512x512",
  }),
})
  .then((res) => res.body)
  .then((data) => {
    //image url
    console.log(data.content[0].url);
    return data;
  });
// const loadActualData = () => {
//   asyncFetch(
//     "https://gist.githubusercontent.com/Jikugodwill/09f2b3bc64829b975ce847f90bb2af28/raw/a5230d5e3706ab451a75db4e72d443e15339bdb3/projectData.json"
//   )
//     .then((response) => response.body)
//     .then((data) => {
//       data = JSON.parse(data);
//       console.log(typeof data);
//       State.update({ jsonData: data });
//     })
//     .catch((error) => {
//       State.update({ error: error });
//       console.log(error);
//     });
// };

return <div>Hello World</div>;

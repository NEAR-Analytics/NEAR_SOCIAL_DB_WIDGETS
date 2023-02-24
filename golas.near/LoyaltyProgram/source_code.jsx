const StyledMainContent = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;

  h1 {
    margin: 40px 0 0 0;
    background: linear-gradient(#a463b0 0%, #5f8afa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 76px;
    font-weight: 400;
    margin-left: -5px;
  }
  h2 {
    max-width: 300px;
    margin: 0;
    font-weight: 600;
  }
  > p {
    font-size: 18px;
    margin: 30px 0;
    max-width: 415px;
  }
  @media (max-width: 620px) {
    margin-top: 70px;
    margin-bottom: 150px;
  }
  > img {
    pointer-events: none;
    height: 30px;
  }
`;

const StyledInputForm = styled.div`
  position: relative;
  max-width: 520px;
  input {
    font-size: 16px;
    width: 100%;
    outline: none;
    border-radius: 100px;
    border: 0;
    padding: 12px 25px;
    box-shadow: 0px 0px 20px 0px #6b6ef940;
    ::placeholder {
      color: #555555;
    }
    @media (min-width: 751px) {
      padding-right: 244px;
    }
  }
  button {
    height: 100%;
    border: 0;
    border-radius: 100px;
    background-color: black;
    color: white;
    padding: 12px 25px;
    transition: background-color 0.2s;
    font-size: 16px;
    @media (max-width: 750px) {
      width: 100%;
      margin-top: 20px;
    }
    @media (min-width: 751px) {
      position: absolute;
      right: 0;
      top: 0;
    }
    :hover {
      background-color: #282828;
    }
    svg {
      margin-left: 5px;
      path {
        fill: white;
      }
    }
  }
  .form-error {
    position: absolute;
    bottom: -30px;
    left: 0;
    color: #ff3232;
  }
`;

const FORM_ACTION_URL =
  "https://pagoda.us14.list-manage.com/subscribe/post?u=9a67f4eac197159cd85f8f6b6&id=33f73232ed&f_id=00a98ee0f0";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

State.init({ error: false, form: { email: "" } });

const validation = {
  email: (value) => value.length > 0 && EMAIL_REGEX.test(value),
};

const formValidation = () =>
  Object.keys(state.form).every((field) =>
    validation[field](state.form[field])
  );

const handleSubmit = () => {
  console.log("VALIDATION");

  if (!formValidation()) {
    State.update({ error: true });
    return;
  }

  console.log("SUBMITING");

  sendForm(state.form);
};

const sendForm = () => {
  console.log("SENDING");
  // console.log("x", {
  //   // mode: "no-cors",
  //   method: "POST",
  //   // redirect: "follow",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   // credentials: "omit",
  //   body: JSON.stringify({ "mce-EMAIL": state.form.email }),
  // });

  let formData = new FormData();
  formData.append("EMAIL", "marcin+x7@near.org");
  formData.append("b_9a67f4eac197159cd85f8f6b6_33f73232ed", "");
  formData.append("subscribe", "Subscribe");

  asyncFetch(FORM_ACTION_URL, {
    // mode: "no-cors",
    // method: "POST",
    // redirect: "follow",
    // // headers: {
    // //   "Content-Type": "application/json",
    // // },
    // // credentials: "omit",
    // body: JSON.stringify({ EMAIL: state.form.email }),

    mode: "no-cors",
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "omit",
    body: formData,
  }).then((response) => {
    console.log("X1");
    // response.json();
  });

  // const form = <form></form>;
  // form.method = "post";
  // form.action = FORM_ACTION_URL;

  // form.submit();

  // const XHR = new XMLHttpRequest();
  // const FD = new FormData();

  // const urlEncodedDataPairs = [];

  // // Turn the data object into an array of URL-encoded key/value pairs.
  // for (const [name, value] of Object.entries(data)) {
  //   urlEncodedDataPairs.push(
  //     `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  //   );
  // }
  // const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

  // XHR.addEventListener("load", (event) => {
  //   alert("Yeah! Data sent and response loaded.");
  // });

  // XHR.addEventListener("error", (event) => {
  //   alert("Oops! Something went wrong.");
  // });

  // XHR.open("POST", FORM_ACTION_URL);

  // XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // XHR.send(urlEncodedData);
};

const handleEmailInput = ({ target: { id, value } }) =>
  State.update({ error: false, form: { [id]: value } });

const {
  error,
  form: { email },
} = state;

return (
  <StyledMainContent>
    <p>Sign up and join the journey.</p>
    <StyledInputForm>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="Enter email address"
        autoCapitalize="none"
        onChange={handleEmailInput}
      />

      {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input
          type="text"
          name="b_9a67f4eac197159cd85f8f6b6_379472243f"
          tabIndex="-1"
        />
      </div>

      <button onClick={handleSubmit}>Register for Early Access</button>
      {error && (
        <div className="form-error">Please enter a valid email address</div>
      )}
    </StyledInputForm>
    <p>
      Learn more at <a href="https://near.org/blog">NEAR.org/blog</a>
    </p>
  </StyledMainContent>
);

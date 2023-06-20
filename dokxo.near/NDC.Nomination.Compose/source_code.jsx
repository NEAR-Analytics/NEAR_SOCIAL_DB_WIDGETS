const css = fetch(
  "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/Qmf7S21gTQSmcKLPrVckP3f7QUSm4SZLZVWYAGk4tCNAFH?_gl=1*1h86bh5*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4NzMwMDc0OC4xNS4xLjE2ODczMDA4NTAuMTkuMC4w"
).body;
if (!css) return "";

// State
State.init({
  theme,
  img: { uploading: false, cid: null, name: "" },
  name: "",
  profileAccount: "",
  issued1: "",
  issued2: "",
  issued3: "",
  house_intended: "",
  afiliation: [
    {
      company_name: "",
      start_date: "",
      end_date: "",
    },
  ],
  agreement: false,
  tags: "",
  error_msg: "",
});
if (!state.theme) {
  State.update({
    theme: styled.div`
      ${css}
  `,
  });
}
const handleInputs = (_type, _param) => {
  switch (_type) {
    case "name":
      State.update({ name: _param.target.value });
      break;
    case "profileAccount":
      State.update({ profileAccount: _param.target.value });
      break;

    case "issued1":
      State.update({ issued1: _param.target.value });
      break;
    case "issued2":
      State.update({ issued2: _param.target.value });
      break;
    case "issued3":
      State.update({ issued3: _param.target.value });
      break;

    case "house_intended":
      State.update({ house_intended: _param.target.value });
      break;

    case "agreement":
      State.update({ agreement: _param.target.value });
      break;
      agreement;
    case "tags":
      State.update({ tags: _param.target.value });
      break;
    default:
  }
};

const addFields = () => {
  var temp = state.afiliation;
  let object = {
    company_name: "",
    start_date: "",
    end_date: "",
  };

  if (temp.length === 6) {
    return;
  } else {
    temp.push(object);
    State.update({ afiliation: temp });
  }
};

const handleFieldsChange = (event, index, _input) => {
  let data = state.afiliation;

  switch (_input) {
    case "company":
      console.log("updating the company");
      data[index].company_name = event.target.value;
      break;
    case "start":
      console.log("updating the company");
      data[index].start_date = event.target.value;
      break;
    case "end":
      console.log("updating the company");
      data[index].end_date = event.target.value;
      break;
    default:
      break;
  }
  console.log(data[index]);
  console.log(data);
  State.update({ afiliation: data });
};
const removeField = (index) => {
  let data = state.afiliation;
  console.log(data);
  data.splice(index, 1);
  console.log(data);
  State.update({ afiliation: data });
};

const submitButton = () => {};
const validatedInputs = () => {
  const {
    name,
    profileAccount,
    issued1,
    issued2,
    issued3,
    house_intended,
    afiliation,
    agreement,
    tags,
  } = state;
  console.log(state);
  const isEmpty = (str) => str.trim() === "";
  const isFalse = (check) => check === false;
  if (isEmpty(name)) {
    State.update({ error_msg: "Fill the name" });
    console.log("Fill the name");
    return false;
  }
  if (isEmpty(profileAccount)) {
    State.update({ error_msg: "Fill the Profile Account" });
    console.log("Fill the Profile Account");
    return false;
  }
  if (isEmpty(house_intended)) {
    State.update({ error_msg: "Select a house" });
    console.log("Select a house");
    return false;
  }
  if (isFalse(agreement)) {
    State.update({ error_msg: "Accept the declaration" });
    console.log("Accept the declaration");
    return false;
  }
};

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then(async (res) => {
    console.log("body", res.body);
    const _cid = res.body.cid;
    const _name = body.name;
    State.update({ img: { uploading: true, cid: _cid, name: _name } });
    console.log("final ", state.img);
  });

  console.log("final ", state.img);
};

const filesOnChange = (files) => {
  if (files) {
    uploadFileUpdateState(files[0]);
  }
};
const Theme = state.theme;
return (
  <Theme>
    <div
      style={{
        background: "#FFFFFF",
        position: "relative",
        width: "390px",
        height: "full",
      }}
    >
      <div
        style={{
          display: "flex",
          "justify-content": "center",
          "padding-top": "16px",
          "margin-bottom": "15px",
        }}
      >
        <Widget
          src={`syi216.near/widget/NDC.nomination.card`}
          props={{
            name: state.name,
            profileAccount: state.profileAccount,
            issued1: state.issued1,
            issued2: state.issued2,
            issued3: state.issued3,
            house_intended: state.house_intended,
            afiliation: state.afiliation,
            tags: state.tags.split(";"),
          }}
        />
      </div>
      <div name="compose" class="CardStyled">
        <div className="d-flex flex-column ">
          <div className="d-flex flex-column">
            <h1 class="H1styled">Self Nominate</h1>
          </div>
          <div class="CardForm">
            <div class="Formsection" style={{ order: "0" }}>
              <h2 class="H2styled">Profile picture </h2>

              <label class="LabelFile custom-file-upload">
                <Files
                  multiple={false}
                  accepts={["image/*"]}
                  minFileSize={1}
                  clickable
                  onChange={filesOnChange}
                  style={{
                    display: "flex",
                    "justify-content": "center",
                    "padding-top": "16px",
                    "margin-bottom": "15px",
                  }}
                >
                  <img
                    src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmWyPdBc3nqDe2mAp26a4BAvDYiuk1JEfJiyGejff3ZrjL?_gl=1*mwwy4f*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njk2NDYyNi4xNC4xLjE2ODY5NjQ2NDQuNDIuMC4w`}
                  />
                  <p
                    style={{
                      width: "173px",
                      height: "14px",
                      "font-family": "Avenir",
                      "font-style": "normal",
                      "font-weight": "400",
                      "font-size": "12px",
                      "line-height": "120%",
                      display: "flex",
                      "align-items": "center",
                      color: "#828688",
                      flex: "none",
                      order: "1",
                      "flex-grow": "0",
                      "margin-top": "2px",
                      "margin-bottom": "0rem",
                      "margin-left": ".5rem",
                    }}
                  >
                    {state.img.name === ""
                      ? "Click here to upload your image"
                      : state.img.name}
                  </p>
                </Files>
              </label>
            </div>
            <div class="Formsection" style={{ order: "1" }}>
              <h2 class="H2styled">Name </h2>
              <input
                class="InputStyled"
                name="Name"
                id="Name"
                type="text"
                placeholder="Nomination name"
                onChange={(e) => handleInputs("name", e)}
              />
            </div>
            <div class="Formsection" style={{ order: "2" }}>
              <h2 class="H2styled">Profile </h2>
              <input
                class="InputStyled"
                name="Profile"
                id="Profile"
                type="text"
                placeholder="@profile"
                onChange={(e) => handleInputs("profileAccount", e)}
              />
            </div>

            <div class="FormsectionPlatform" style={{ order: "3" }}>
              <div class="FormsectionPlatformtitle">
                {"Platform - Key Issue 1: What’s your view and pledge on XYZ?"}{" "}
              </div>
              <textarea
                class="FormsectionPlatformtextarea"
                name="Profile"
                id="Profile"
                type="text"
                placeholder="Write your platform "
                onChange={(e) => handleInputs("issued1", e)}
              />
            </div>
            <div class="FormsectionPlatform">
              <div class="FormsectionPlatformtitle">
                {"Platform - Key Issue 2: What’s your view and pledge on XYZ?"}{" "}
              </div>
              <textarea
                class="FormsectionPlatformtextarea"
                name="Profile"
                id="Profile"
                type="text"
                placeholder="Write your platform "
                onChange={(e) => handleInputs("issued2", e)}
              />
            </div>
            <div class="FormsectionPlatform">
              <div class="FormsectionPlatformtitle">
                {"Platform - Key Issue 3: What’s your view and pledge on XYZ?"}{" "}
              </div>
              <textarea
                class="FormsectionPlatformtextarea"
                name="Profile"
                id="Profile"
                type="text"
                placeholder="Write your platform "
                onChange={(e) => handleInputs("issued3", e)}
              />
            </div>
            <div class="FormsectionHouse" style={{ order: "4" }}>
              <h2 class="H2styled">{"House"} </h2>
              <select
                class="FormsectionHouseDropdown"
                name="house-intended"
                id="house-intended"
                onChange={(e) => handleInputs("house_intended", e)}
              >
                <option default value="0">
                  Select house
                </option>
                <option value="Council of Advisors">Council of Advisors</option>
                <option value="House Of Merit">House Of Merit</option>
                <option value="Transparency Commission">
                  Transparency Commission
                </option>
              </select>
            </div>
            <div class="FormsectionAffiliation" style={{ order: "5" }}>
              <div class="AffiliationHead" style={{ order: "1" }}>
                <div class="AffiliationTitle">
                  <h2 class="H2styled">{"Afiliations"}</h2>
                  <button
                    onClick={addFields}
                    style={{
                      background: "#00000000",
                      "border-color": "#00000000",
                    }}
                  >
                    <img
                      src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmbNqXEbUqSkGY7quBnyBqU6nKuXimYTnxTNsbYHnhdVXw?_gl=1*aubyn4*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njk0MjQwOC4xMS4xLjE2ODY5NDI0NzMuNTcuMC4w`}
                    />
                  </button>
                </div>
                <hr
                  style={{
                    width: "326px",
                    height: "0px",
                    border: "1px solid rgba(208, 214, 217, 0.4)",
                    flex: "none",
                    order: "1",
                    margin: "0px",
                    "flex-grow": "0",
                  }}
                />
              </div>

              <div
                class="AffiliationBody"
                style={{
                  height: AffiliationBodyheight,
                }}
              >
                {state.afiliation.map((form, index) => {
                  return (
                    <>
                      <div
                        class="Companycont"
                        style={{ order: index, "margin-top": "2px" }}
                      >
                        <div class="CompanyTitle">
                          {"Company Name"}

                          <button
                            onClick={removeField}
                            style={{
                              background: "#00000000",
                              "border-color": "#00000000",
                            }}
                          >
                            <img
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/Qmb1wcWEWHiqYq5UvtuChVB2u4MEyKutL9UU5LcTrULriP?_gl=1*iz6jdo*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njk1MTE5NS4xMi4xLjE2ODY5NTEyMjkuMjYuMC4w`}
                            />
                          </button>
                        </div>
                        <input
                          class="CompanyInput"
                          placeholder="Company Name"
                          onChange={(event) =>
                            handleFieldsChange(event, index, "company")
                          }
                        />
                      </div>
                      <div class="DateCont" style={{ order: index + 1 }}>
                        <div class="DateContItem">
                          <div class="CompanyTitle">{"Start date"}</div>
                          <input
                            class="CompanyInput"
                            style={{ width: "161px" }}
                            placeholder="Company Name"
                            onChange={(event) =>
                              handleFieldsChange(event, index, "start")
                            }
                          />
                        </div>
                        <div class="DateContItem">
                          <div class="CompanyTitle">{"End date"}</div>
                          <input
                            class="CompanyInput"
                            style={{ width: "161px" }}
                            placeholder="Company Name"
                            onChange={(event) =>
                              handleFieldsChange(event, index, "end")
                            }
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div class="FormsectionPlatform" style={{ order: "2" }}>
                <div class="FormsectionPlatformtitle">
                  {"Description of your Role"}{" "}
                </div>
                <textarea
                  class="FormsectionPlatformtextarea"
                  style={{
                    "font-family": "Avenir",
                    "font-style": "normal",
                    "font-weight": "400",
                    "font-size": "10px",
                  }}
                  name="Description"
                  id="Description"
                  type="text"
                  placeholder="Add tags that describe your nomination, separated by comma"
                  onChange={(e) => handleInputs("issued1", e)}
                />
              </div>
              <div class="Formsection" style={{ order: "3" }}>
                <h2 class="H2styled">{"Tags"} </h2>
                <input
                  class="InputStyled"
                  style={{
                    "font-family": "Avenir",
                    "font-style": "normal",
                    "font-weight": "400",
                    "font-size": "10px",
                  }}
                  name="Tags"
                  id="Tags"
                  type="text"
                  placeholder="Add tags that describe your nomination"
                  onChange={(e) => handleInputs("tags", e)}
                />
              </div>
            </div>
          </div>
          <div
            class="Formsection"
            style={{
              order: "7",
              height: "auto",
              "margin-top": "15px",
              "margin-left": "16px",
            }}
          >
            <h2 class="H2Declarationstyled">
              {"Declaration of transparency "}
            </h2>
          </div>
        </div>
      </div>

      <div
        class="Formsection"
        style={{
          order: "7",

          "align-items": " flex-start",
          "margin-left": "16px",
          "margin-right": "auto",
        }}
      >
        <div
          class="FormsectionDecaration"
          style={{
            "margin-top": "10px",
            "margin-left": "16px",
            "margin-right": "auto",
          }}
        >
          <input
            class="InputcheckboxStyled"
            type="checkbox"
            onChange={(e) => handleInputs("agreement", e)}
          />
          <p class="PStyled">
            I agree the <a class="AStyled">{"Declaration of transparency"} </a>
          </p>
        </div>
      </div>
      <div class="Submitcontainer">
        <button class="SubmitBtn" onClick={validatedInputs}>
          {" "}
          Submit{" "}
        </button>
        <button class="CancelBtn"> Cancel </button>
      </div>
    </div>
  </Theme>
);

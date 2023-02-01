const ownerId = "contribut3.near";
const accountId = props.accountId ?? "";
const kind = props.kind ? [{ name: props.kind }] : [];
const startDate = props.startDate ?? "";
const allContributionTypes = (
  Near.view(ownerId, "get_contribution_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const convertType = (contributionType) => {
  if (allContributionTypes.some(({ name }) => name === contributionType.name)) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

initState({
  contributionTypes: [],
  skills: [],
  resume: "",
  lookingForWork: true,
  existing: false,
});

Near.asyncView(
  ownerId,
  "get_contributor",
  { account_id: context.accountId },
  "final",
  true
).then((contributor) => {
  if (contributor) {
    State.update({
      contributionTypes: contributor.contribution_types.map((t) =>
        typeof t === "string" ? { name: t } : { name: t.Other }
      ),
      skills: contributor.skills.map((name) => ({ name })),
      resume: contributor.resume,
      lookingForWork: contributor.looking_for_work,
      existing: true,
    });
  }
});

const contributionTypesInput = (
  <div className="col-lg-12 mb-2">
    <label htmlFor="contribution-types">Contribution types:</label>
    <Typeahead
      id="contribution-types"
      labelKey="name"
      onChange={(contributionTypes) => State.update({ contributionTypes })}
      options={allContributionTypes}
      placeholder="Development, Investment, Legal..."
      selected={state.contributionTypes}
      positionFixed
      multiple
      allowNew
    />
  </div>
);

const skillsInput = (
  <div className="col-lg-12 mb-2">
    <label htmlFor="skills">Skills:</label>
    <Typeahead
      id="skills"
      labelKey="name"
      onChange={(skills) => State.update({ skills })}
      options={[]}
      placeholder="Rust, JavaScript, React..."
      selected={state.skills}
      positionFixed
      multiple
      allowNew
    />
  </div>
);

const resumeInput = (
  <div className="col-lg-12  mb-2">
    <label htmlFor="Resume">Resume:</label>
    <textarea
      id="Resume"
      value={state.resume}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => State.update({ resume: event.target.value })}
    />
  </div>
);

const lookingForWorkInput = !state.existing ? null : (
  <div className="col-lg-6  mb-2">
    <div className="form-check">
      <label htmlFor="looking-for-work" className="form-check-label">
        Looking for work
      </label>
      <input
        id="looking-for-work"
        type="checkbox"
        className="form-check-input"
        checked={state.lookingForWork}
        onChange={(e) => State.update({ lookingForWork: e.target.checked })}
      />
    </div>
  </div>
);

const onSubmit = () => {
  const args = {
    contribution_types: state.contributionTypes.map((t) => convertType(t)),
    skills: state.skills.map(({ name }) => name),
    resume: state.resume,
    looking_for_work: state.lookingForWork,
  };

  if (state.existing) {
    Near.call(ownerId, "edit_contributor", args);
  } else {
    Near.call(ownerId, "register", args, "30000000000000", "1");
  }
};

const header = (
  <div className="card-header" id="header">
    {state.existing ? "Edit profile" : "Register as a contributor"}
  </div>
);

const body = (
  <div className="card-body">
    <div className="row">
      {contributionTypesInput}
      {skillsInput}
      {resumeInput}
      {lookingForWorkInput}
    </div>

    <a className="btn btn-primary mb-2" onClick={onSubmit}>
      Submit
    </a>
  </div>
);

const footer = (
  <div className="card-footer">
    Preview:
    <Widget
      src={`${ownerId}/widget/Contributor`}
      props={{
        isPreview: true,
        accountId: context.accountId,
        contributor: {
          contribution_types: state.contributionTypes.map((t) =>
            convertType(t)
          ),
          skills: state.skills.map(({ name }) => name),
          resume: state.resume,
        },
      }}
    />
  </div>
);

return (
  <div className="card">
    {body}
    {footer}
  </div>
);

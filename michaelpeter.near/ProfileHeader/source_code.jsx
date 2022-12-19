import DummyImage from "/social-widgets/michaelpeter.near/DummyImage";

function ProfileHeader() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl">Welcome to Near Social!</p>
      <div className="flex flexRow gap-2 items-center py-3">
        <DummyImage dimension={16} />
        <div className="flex flex-col justify-center gap-1">
          <div className="flex flex-row gap-1">
            <p className="font-bold">Michael Peter</p>
            <p className="font-light">@michaelpeter.near</p>
          </div>
          <div className="flex flex-row gap-1">
            {["#developer", "#engineer", "#typescript"].map((t) => (
              <div className="rounded border p-1" key={t}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

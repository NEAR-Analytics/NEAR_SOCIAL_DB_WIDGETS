import DummyImage from "/social-widgets/michaelpeter.near/DummyImage";

function SearchAndResults({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">{title}</h2>
      <input
        className="h-8 p-1 rounded border"
        placeholder={`Search ${title}`}
      />
      <div className="flex flex-row gap-1">
        {Array.from(Array(20).keys()).map((a) => (
          <DummyImage key={a} dimension={12} />
        ))}
      </div>
    </div>
  );
}

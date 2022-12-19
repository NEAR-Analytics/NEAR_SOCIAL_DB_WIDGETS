function DummyImage({ dimension }: { dimension: number }) {
  return (
    <div className={`rounded bg-sky-600 w-${dimension} h-${dimension}`}></div>
  );
}

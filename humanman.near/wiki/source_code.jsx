const wiki = useCache(
  () => asyncFetch("https://wiki.near.org").then((res) => res.body),
  { subscribe: true }
);

return <div>{wiki}</div>;

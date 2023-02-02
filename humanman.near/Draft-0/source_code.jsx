const wiki = useCache(
  () =>
    asyncFetch(
      "https://github.com/near/wiki/blob/master/website/README.md"
    ).then((res) => res.body),
  { subscribe: true }
);

// window api unavailable.
// const parser = new window.DOMParser()

return (
  <div>
    {wiki}
    <h1>hello</h1>
  </div>
);

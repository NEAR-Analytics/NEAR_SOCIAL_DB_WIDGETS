const { test } = props;

// const params = new URLSearchParams(window.location.search);
return (
  <div>
    <h1>Location is... {window.location}</h1>
    <h1>Params are... {test}</h1>
  </div>
);

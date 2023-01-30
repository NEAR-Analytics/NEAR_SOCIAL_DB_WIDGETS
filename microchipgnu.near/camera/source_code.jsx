//return <input type="file" accept="image/*;capture=camera" />;

const posts = Array.from(Array(100).keys());

return (
  <div class="bg-black text-white p-2 rounded container-fluid">
    <div class="w-full d-flex justify-content-center py-4">
      <div class="text-center">
        <p>Minsta</p>
        <input type="file" accept="image/*;capture=camera" class="" />
      </div>
    </div>
    <div class="container-fluid d-flex flex-wrap justify-content-center gap-2">
      {posts.map((post) => {
        return (
          <div
            class="col-md-4 col-sm-6 px-1 bg-danger"
            style={{ width: "150px", height: "150px" }}
          ></div>
        );
      })}
    </div>
  </div>
);

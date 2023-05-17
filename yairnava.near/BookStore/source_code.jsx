// Contrato Inteligente a utilizar
const contract = "bookstorebos.near";

// Métodos de consulta para obtener el listado de libros
const books = Near.view(contract, "all_books", {});
const booksbuy = context.accountId
  ? Near.view(contract, "books_for_owner", {
      account_id: context.accountId,
    })
  : [];

// Inicialización del objeto de estado con propiedades
State.init({
  title: "",
  description: "",
  author: "",
  year: "",
  price: "",
  stock: "",
});

// Método para crear un nuevo libro
const createBook = () => {
  if (state.title == "") {
    return console.log("El nombre del libro no debe estar vacio");
  }
  if (state.description == "") {
    return console.log("La descripcion del libro no debe estar vacio");
  }
  if (state.author == "") {
    return console.log("El autor del libro no debe estar vacio");
  }
  if (state.year == "") {
    return console.log("El año del libro no debe estar vacio");
  }
  if (state.price == "") {
    return console.log("El precio del libro no debe estar vacio");
  }
  if (state.stock == "") {
    return console.log("El stock del libro no debe estar vacio");
  }

  Near.call(contract, "create_book", {
    title: state.title,
    description: state.description,
    author: state.author,
    year: parseInt(state.year),
    price: parseInt(state.price),
    stock: parseInt(state.stock),
  });
};

// Método para comprar un libro
const buyBook = (book_id, price) => {
  const amount = price * 1000000000000000000000;
  Near.call(
    contract,
    "buy_book",
    {
      book_id: book_id,
    },
    300000000000000,
    amount
  );
};

// Renderizado de la UI
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">Book Store (BOS + NEAR)</h3>
      <br />
      {context.accountId ? (
        <div class="border border-black p-3">
          <h3>Nuevo Libro</h3>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <input
                  placeholder="Título"
                  onChange={(e) => State.update({ title: e.target.value })}
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Descripción"
                  onChange={(e) =>
                    State.update({ description: e.target.value })
                  }
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Autor"
                  onChange={(e) => State.update({ author: e.target.value })}
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm">
                <input
                  placeholder="Año"
                  onChange={(e) => State.update({ year: e.target.value })}
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Precio"
                  onChange={(e) => State.update({ price: e.target.value })}
                />
              </div>
              <div class="col-sm">
                <input
                  placeholder="Stock"
                  onChange={(e) => State.update({ stock: e.target.value })}
                />
              </div>
            </div>
            <br />
            <button
              class="btn btn-primary mt-2"
              onClick={async () => {
                createBook();
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p class="text-center py-2">
          Debes iniciar sesión para crear y comprar libros
        </p>
      )}
      <br />
      <div class="border border-black p-3">
        <h3>Libros Disponibles</h3>
        <table className="table table-hover table-sm">
          <thead>
            <tr class="p-3 mb-2 bg-primary bg-gradient text-white rounded-5 text-center">
              <th>Nombre</th>
              <th>Autor</th>
              <th>Stock</th>
              <th>Precio Ⓝ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((data, key) => {
              return (
                <>
                  <tr class="text-center">
                    <td>{data.title}</td>
                    <td>{data.author}</td>
                    <td>{data.stock}</td>
                    <td>{data.price}</td>
                    <td>
                      {context.accountId ? (
                        <button
                          class="btn btn-primary"
                          onClick={async () => {
                            buyBook(data.book_id, data.price);
                          }}
                        >
                          Comprar
                        </button>
                      ) : (
                        <span></span>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      {context.accountId ? (
        <div class="border border-black p-3">
          <h3>Libros Comprados</h3>
          <table className="table table-hover table-sm">
            <thead>
              <tr class="p-3 mb-2 bg-primary bg-gradient text-white rounded-5 text-center">
                <th>Nombre</th>
                <th>Autor</th>
              </tr>
            </thead>
            <tbody>
              {booksbuy.map((data, key) => {
                return (
                  <>
                    <tr class="text-center">
                      <td>{data.title}</td>
                      <td>{data.author}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  </>
);

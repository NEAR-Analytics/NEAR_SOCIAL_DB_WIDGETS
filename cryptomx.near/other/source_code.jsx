return (
  <div
    className="container-fluid bg-warning py-4"
    style={{
      backgroundImage:
        'url("https://somoscryptomx.com/wp-content/uploads/2023/05/stakedemy.png")',
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      perspective: "1px",
      overflowX: "hidden",
      overflowY: "auto",
    }}
  >
    <div className="d-flex justify-content-end">
      <img
        src="https://raw.githubusercontent.com/Davitcoin/OpenWeb-CryptoMX/main/logoNegro.png"
        alt="Logo del proyecto"
        style={{ width: "50px" }}
      />
    </div>

    <div className="d-flex justify-content-center">
      <img
        src="https://raw.githubusercontent.com/Davitcoin/OpenWeb-CryptoMX/main/Logotiposta.png"
        alt="Logo del proyecto"
        style={{ width: "450px" }}
      />
    </div>

    <p className="text-danger">Únete y comienza a aprender y ganar</p>
    <div className="mb-3">
      <label
        htmlFor="input_nombre"
        className="form-label text-danger text-opensans"
      >
        Nombre
      </label>
      <input
        type="text"
        className="form-control"
        id="input_nombre"
        placeholder="Escribe aquí tu nombre"
        style={{
          backgroundColor: "transparent",
          border: "1px solid #ced4da",
        }}
      />
    </div>
    <div className="mb-3">
      <label
        htmlFor="input_correo"
        className="form-label text-danger text-opensans"
      >
        Correo
      </label>
      <input
        type="email"
        className="form-control"
        id="input_correo"
        placeholder="Escribe aquí tu correo"
        style={{
          backgroundColor: "transparent",
          border: "1px solid #ced4da",
        }}
      />
    </div>
    <div className="mb-3">
      <label
        htmlFor="input_institución"
        className="form-label text-danger text-opensans"
      >
        Institución
      </label>
      <input
        type="text"
        className="form-control text-dark"
        id="input_institución"
        placeholder="Escribe aquí tu institución"
        style={{
          backgroundColor: "transparent",
          border: "1px solid #ced4da",
        }}
      />
    </div>
    <div className="mb-3">
      <label
        htmlFor="select_perfil"
        className="form-label text-danger text-opensans"
      >
        Elige una opción:
      </label>
      <select
        className="form-select"
        id="select_perfil"
        style={{
          backgroundColor: "transparent",
          border: "1px solid #ced4da",
        }}
      >
        <option value="opcion1">Selecciona tu perfil</option>
        <option value="opcion2">Estudiante</option>
        <option value="opcion3">Programador</option>
        <option value="opcion4">Emprendedor</option>
      </select>
    </div>
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-danger btn-lg btn-transparent"
        style={{
          backgroundColor: "transparent",
          borderColor: "transparent",
          transition: "background-color 0.3s ease",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
          alt="Imagen del botón"
          className="me-2 float-end"
          style={{ width: "20px" }}
        />
        METAMASK
      </button>
    </div>
  </div>
);

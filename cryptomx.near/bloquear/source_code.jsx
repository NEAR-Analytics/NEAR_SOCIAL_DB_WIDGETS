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
    <h1 className="text-center text-danger mb-4">
      Únete y comienza a aprender y ganar
    </h1>
    <h3 className="text-center text-danger mb-4">
      Membresía: 100 Aurora. Pagaderos en stAUR
    </h3>
    <h5 className="text-center text-danger mb-4">Bloquear por 12 meses</h5>

    <div className="row">
      <div className="col d-flex justify-content-end">
        <p style={{ fontSize: "25px", color: "#ff5e58" }}>stAUR</p>
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Ingresa cantidad"
        />
      </div>
      <div className="col">
        <button className="btn btn-primary">Bloquear</button>
      </div>
    </div>
  </div>
);

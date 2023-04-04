return (
  <div onSubmit={handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input
      id="name"
      type="text"
      value={name}
      onChange={(event) => setName(event.target.value)}
      placeholder="Enter your name"
      required
    />
    <br />
    <label htmlFor="email">Email:</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      placeholder="Enter your email"
      required
    />
    <br />
    <label htmlFor="nearAddress">NEAR Address:</label>
    <input
      id="nearAddress"
      type="text"
      value={nearAddress}
      onChange={(event) => setNearAddress(event.target.value)}
      placeholder="Enter your NEAR address"
      required
    />
    <br />
    <button type="submit">Submit</button>
  </div>
);

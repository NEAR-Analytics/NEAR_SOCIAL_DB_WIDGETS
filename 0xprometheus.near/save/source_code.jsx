
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  console.log("accounts:", accounts, state.sender);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    Ethers.provider()
      .getNetwork()
      .then((data) => {
        State.update({
          selectedChain: data.chainId,
        });
      });
  }

  console.log("in between", state.sender);

  State.update({
    selectedChain: "0",
  });
}
     src={chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.url)}
                              alt={chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.name)}
                            />
                          ) : (
                            "Select an option"
                          )}
                          <span>🔻</span>
                        </div>
                        <div
                          className={`select-replica__options ${
                            state.selectIsOpen ? "open" : ""
                          }`}
                        >
                          {chains.map((chain) => (
                            <div
                              key={chain.id}
                              className={`select-replica__option ${
                                selectedOption === chain.name ? "selected" : ""
                              }`}
                              onClick={() => handleChainChange(chain.id)}
                            >
                              <img src={chain.url} alt={chain.name} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </SelectReplicaContainer>
                    {state.link && (
                      <a href={`${state.link}`} target="_blank">
                        View Transaction
                      </a>
                    )}
                  </SelectGroup>
                ) : accountId ? (
                  <SelectGroup>
                    <label htmlFor="chainSelect">Select Chain</label>
                    {/*<SelectTag
                    className="form-select"
                    value={state.selectedChain}
                    onChange={handleChainChange}
                  >
                    <option disabled selected>
                      Select a Chain
                    </option>
                    {chains.map((chain) => (
                      <ChainIcon key={chain.id} value={chain.id}>
                        <span>{chain.name}</span>
                      </ChainIcon>
                    ))}
                  </SelectTag>*/}
                    <SelectReplicaContainer onClick={handleOutsideClick}>
                      <div
                        className={`select-replica__select ${
                          state.selectIsOpen ? "open" : ""
                        }`}
                        onClick={handleSelectClick}
                      >
                        <div className="select-replica__selected">
                          {chains.filter(
                            (chain) =>
                              chain.id === state.selectedChain.toString()
                          ) ? (
                            <img
                              src={chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.url)}
                              alt={chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.name)}
                            />
                          ) : (
                            "Select an option"
                          )}
                          <span>🔻</span>
                        </div>
                        <div
                          className={`select-replica__options ${
                            state.selectIsOpen ? "open" : ""
                          }`}
                        >
                          {chains.map((chain) => (
                            <div
                              key={chain.id}
                              className={`select-replica__option ${
                                selectedOption === chain.name ? "selected" : ""
                              }`}
                              onClick={() => handleChainChange(chain.id)}
                            >
                              <img src={chain.url} alt={chain.name} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </SelectReplicaContainer>
                    <div>
                      <Web3Connect
                        className="btn mt-3"
                        connectLabel="Connect with Ethereum Wallet"
                      />
                    </div>
                  </SelectGroup>
                ) : (
                  <Web3Connect
                    className="btn mt-3"
                    connectLabel="Connect with Wallet"
                  />
                )}
              </Card>
            )}
          </ImageUploadCard>
        </div>
      ) : (
        <>
          <Card className="d-flex flex-column align-items-center w-100">
            <div>
              <IpfsImageUpload
                image={state.image}
                className="btn btn-outline-primary border-0 rounded-3"
              />
            </div>
            <ImageCard>
              <img
                src={`https://ipfs.io/ipfs/` + state.image.cid}
                alt="uploaded image"
                width="100%"
                height="100%"
                className="rounded-3"
              />
            </ImageCard>
          </Card>
          <div>
            <Card>
              {state.sender && Ethers.provider() ? (
                <SelectGroup className="form-group">
                  <label htmlFor="chainSelect">Select Chain</label>
                  {/*<select
                    className="form-select"
                    value={state.selectedChain}
                    onChange={handleChainChange}
                  >
                    {chains.map((chain) => (
                      <ChainIcon key={chain.id} value={chain.id}>
                        {chain.name}
                      </ChainIcon>
                    ))}
                  </select>*/}
                  <SelectReplicaContainer onClick={handleOutsideClick}>
                    <div
                      className={`select-replica__select ${
                        state.selectIsOpen ? "open" : ""
                      }`}
                      onClick={handleSelectClick}
                    >
                      <div className="select-replica__selected">
                        {chains.filter(
                          (chain) => chain.id === state.selectedChain.toString()
                        ) ? (
                          <img
                            src={chains
                              .filter(
                                (chain) =>
                                  chain.id === state.selectedChain.toString()
                              )
                              .map((c) => c.url)}
                            alt={chains
                              .filter(
                                (chain) =>
                                  chain.id === state.selectedChain.toString()
                              )
                              .map((c) => c.name)}
                          />
                        ) : (
                          "Select an option"
                        )}
                        <span>🔻</span>
                      </div>
                      <div
                        className={`select-replica__options ${
                          state.selectIsOpen ? "open" : ""
                        }`}
                      >
                        {chains.map((chain) => (
                          <div
                            key={chain.id}
                            className={`select-replica__option ${
                              selectedOption === chain.name ? "selected" : ""
                            }`}
                            onClick={() => handleChainChange(chain.id)}
                          >
                            <img src={chain.url} alt={chain.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </SelectReplicaContainer>
                  {state.link && (
                    <a href={`${state.link}`} target="_blank">
                      View Transaction
                    </a>
                  )}
                </SelectGroup>
  </>
);

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-gap: .5em;
  gap: .5em;
  margin-bottom: 3em;
  padding: 9em 2em;
  background: linear-gradient(255.93deg,#eff3f9 -39.69%,#eff3f9 5.2%,rgba(205,237,255,.65) 49.41%,#fff 91.12%);
}
`;
const MainHeading = styled.h1`
  font-weight: 700;
  font-size: 10vw;
  line-height: 1em;
  text-align: center;
  color: #2d3748;
  white-space: nowrap;
`;
const SubHeading = styled.h3`
font-size: 2.6vw;
font-weight: 500;
text-align: center;
color: #2d3748;
//  @media (max-width: 992px) {
//     text-align:center;
//   }
`;

const HeaderButtonsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
grid-gap: 2em;
gap: 2em;
margin-top: 1.5em;

`;

const PrimaryButton = styled.div`
padding: .75em 4em;
border-radius: .7em;
color: var(--main-color);
border: 1px solid transparent;
transition: all .3s;
cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
@media screen and (max-width: 540px){
    padding: .5em 2em;    
    }
`;
const SecondaryButton = styled.div`
    padding: .75em 4em;
    border-radius: .7em;
    color: var(--main-color);
    border: 1px solid transparent;
    transition: all .3s;
    cursor: pointer;
    color: #0d99ff;
    background:#fff;
    &:hover{
        color: #fff;
        background: #0d99ff;
    }
    @media screen and (max-width: 540px){
    padding: .5em 2em;    
    }
`;

const OrgsSection = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-gap: 4em;
  gap: 4em;
  padding: 3em 0px;
  &>.right{
    flex: 60% 1;
    max-width: 36em;
    &>.orgs-desc{
    margin-bottom: 2em;
    font-size: 1.5rem;
      @media screen and (max-width: 900px){
        font-size: 1.2rem;
      }
      @media screen and (max-width: 540px){
        font-size: 1rem;
      }
    }
    &>.orgs-link{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      grid-gap: 1em;
      gap: 1em;
      text-decoration: none;
      color: unset;
      cursor: pointer;
    }
      @media screen and (max-width: 900px){
      max-width: 100%;
      text-align: center;
      margin-bottom: 3em;
      }
  }
  &>.left{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 2em;
  gap: 2em;
  & .org {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2.5em;
    background: #fff;
    border: 1px solid transparent;
    border-right-color: transparent;
    border-right-style: solid;
    border-right-width: 1px;
    border-right: 3px solid #e5e8eb;
    box-shadow: -26px -18px 30px -12px rgba(93,134,194,.1),26px 18px 18px rgba(93,134,194,.1);
    position: relative;
    transition: all .3s;
    cursor: pointer;
    width: 13em;
    height: 12.5em;
    &:hover{
      border: 3px solid #e5e8eb;
    }
    @media screen and (max-width: 540px){
      width: 8em;
      height: 7.5em;
      border-radius: .7em;
    }
  }
  & .Orgs_icon {
  position: absolute;
  width: 5em;
  -webkit-animation: Orgs_rotate__2EIfH 12s linear infinite;
  animation: Orgs_rotate__2EIfH 12s linear infinite;
  animation-delay: 0s;
  top: -2em;
  left: -2em;
  z-index: -1;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  @media screen and (max-width: 540px)
  width: 3.5em;
  }
  & .Orgs_logo{
    @media screen and (max-width: 540px){
      width: 4em;
    }
  }
  }
  }
  @media screen and (max-width: 900px){
  flex-direction: column;
  grid-gap: 2em;
  gap: 2em;
  }
  }
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1em;
    @media screen and (max-width: 1200px){
      font-size: 2.5rem;
    }
    @media screen and (max-width: 900px){
      font-size: 2rem;
    }
    @media screen and (max-width: 540px){
      font-size: 1.5rem;
    }
`;

const Accent = styled.span`
color: #0d99ff;
`;

const Text = styled.p`

`;

const FeatureContainer = styled.div``;

return (
  <div>
    <Hero>
      <MainHeading>Create. Mint. Sell.</MainHeading>
      <SubHeading>
        {"Create content + Art that you own in < 5 minutes"}
      </SubHeading>
      <HeaderButtonsContainer>
        <a
          style={{ textDecoration: "none" }}
          href="https://bos.genadrop.io/#/jgodwill.near/widget/genadropMinter"
        >
          <PrimaryButton>Create</PrimaryButton>
        </a>
        <a
          style={{ textDecoration: "none" }}
          href="https://bos.genadrop.io/#/jgodwill.near/widget/genadropExplore"
        >
          <SecondaryButton>Explore</SecondaryButton>
        </a>
      </HeaderButtonsContainer>
    </Hero>
    <OrgsSection>
      <div className="right">
        <H1>
          <span>Backed by</span>
          <Accent>Web3's Best Orgs</Accent>
        </H1>
        <div className="orgs-desc">
          From the leading blockchains, creative groups, and DAOs, GenaDrop is
          supported by the industry’s best. Want to learn more about GenaDrop?
        </div>
        <a className="orgs-link" href="#">
          <div>Read Docs</div>
          <img
            className="arrow"
            alt="arrow"
            src="https://docs.genadrop.io/"
            target="_blank"
            rel="noreferrer"
          />
        </a>
      </div>
      <div className="left">
        <a
          className="org"
          href="https://celocommunityfund.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            class="Orgs_logo"
            src="data:image/png;base64,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"
            alt=""
          />
          <img
            class="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-celo-icon.d1fed266.png"
            alt=""
          />
        </a>
        <a
          className="org"
          href="https://near.foundation/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            class="Orgs_logo"
            src="data:image/png;base64,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"
            alt=""
          />
          <img
            class="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-near-icon.df006c52.png"
            alt=""
          />
        </a>
        <a
          className="org"
          href="https://www.minorityprogrammers.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            class="Orgs_logo"
            src="https://www.genadrop.com/static/media/logo-mp.73b4202c.png"
            alt="MPA"
          />
          <img
            class="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-polygon-icon.e75cb119.png"
            alt=""
          />
        </a>
        <a
          className="org"
          href="https://www.algorand.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            class="Orgs_logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAsCAYAAACpFWBjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA+xSURBVHgB7ZwJdJTVFccfISwhYQlLCFvYF2UJi4YqSymoLYL2AAesAcsiIGCJUMEFa8GtFDhCARUBKbJZSatQQEQxJiwGQfYlrCEhgZCFBEISEpJM0t8d5pu++ZgkE4iKMPecd2a+973lvvf+975773szSrnJTVB5Vbb0BOlBUgdJvXr1SomNjc1Ubrp3qEGDBr35KCAVGsnPz+9F5aZ7hwoLC8t5eXntVxoIJNWoUWOTctO9Q3Xr1n1BmbSBpIoVK6YLSJSb7n4aPHhw9fLlyycoEwiM9Nhjj7VTbrr7qXr16u8obeHLlSvnAARsh3eUm+54ui213bp16w4xMTHbc3Nzq9uyCuvXrx+WkJDwiFGmatWqe9auXdtTr/f4449fN74vWLCgkv4uJCTkunJTmdGMGTM8g4KC7N7hnj17LOTlq7IkFvlLpUl/lSpVdk+fPr0h3y1afgG2QoKRatWqtdqo//DDD/v5+Pic8fT0TJBUoUKF7cpNZUqVKlV6Up//2rVrL1VlSR07dnxUORqIlvshecd2EaGc2AseHh7X77vvPrt2ECCw+FlamdPKTWVNTyttDRDedc4KeahbIAxA76ioqHeVtrX4+vquIS9KvoO8r53VQ2MsP378uFvq70C6JSAcPXp0JHZBe+MZryEdyZ5hPFerVi1C3UCgnXifWadOnZnKTXcklRoI3bp1q5qUlPSKnsdW8HZycvJZ45l9KRlwOBh9aINFGJbnlJvuSCo1EI4cOfKmxWJpYDyz4DFYoQv1MnFxcVMoU1nPI8p4Qv3MFBoaWrFHjx51Jk2aVEOsaeUmO5VqMrp27Xr/3r17x2tZhWiDt3SXD/ex28WLF581101NTe3Dxz/VLVCfPn3u379/v/TbCYCJu5lMvOJg+/btl0VHR4/JysoyQFd49erVN/hM1+tjw/4uPj4+ZNiwYe2oVx0XSmybJMB5sEuXLi+HhYWd1cu3atUq8Nq1awOM5xYtWnxPX/sA0hN5eXntsIEOJSYmrtDr0E4bNN7YgoKCjvDoQ9YFwu6RwcHBSzdu3Pg87flQV9y4jEuXLr1la/eVnJwcK+/wZfH29v6A50eZq0E8B5AKSCcxsJfs2rUrsqj5IXrrQZlHcNuDMchbyDN8nCbi+/X58+c9aFOVKeHq/Us5WqBhixcvrqCXYTBblROPoXLlygnmcHNJXoPEGDBC32Nwuc7axOW8RsrT8sRtbaS3UbNmzXlMZp4qIvJJ/+ks2Isssn4SO1QvA7gPUC5NObG80SweuGTzxCNy1j5tJ/Gu0NkYAWKszjtzt1c597by6HMx36spE4mGY12+EdA4qVuAxo5XLngNLhOIEwnR4wOWZs2addfLIEl9lZMzByMNGDCglV6+OCDIwqBtQotqq4hkBwILVJG2F7hYrwDeh2usDS2uvD6ZLN68UvJYFBBK5LFhw4Yf6fPXpk2bWvR/sjT93xYQevXq5cOkHtEbRFLfN5WpDXJPK5PEmuo8r9cpDgiNGjUS/1cHVQFaZZe/v/8MJuRlBrRBOQLTAQgBAQGDTZrAgsH6Zb169V5DwmdI8Es5aoYrAwcOrGfr3ikQROoYUzw8vCeF+Bxu4qGAdvdhLL8Prx/B40FVSiAgwVfJ/5a0kXbM7wt69uxp99aYzyWm+c6k/1DG+DZ9L2ELO6/KEgicF4wwdXi5Q4cOfnoZIoYhylGd5cgeaGLCYV8tDgiouy16XdTvkmeeecZbr9+4ceM/8ZGvnACBvjbp9ZmcRXpdNEBtto2v9TKM4SXb65uAQHvbmzRp8vScOXPsPCCNDmCC5w9GjRpV1XjPgZwXfItKL1AuAAHwHCNQ18t4j01Tjza/Ms2D2ECKufADNNlKA1DLli0f0ceIxmgC35GqLIAACBrSSYbeGBPocOFEQAH60pTjpE6YPHlyTaVJDGiNZ3uoZdQrCggzZ870RRoStUFmysCd8UfM4qIyAUG2FciujeDtjMkGMPpvrvNHn0YgbKhpLN+y1Th4Qe3ataur2wWA4oizI3fxUGj3sioZCHn008YJjx11XhjLF5LPIjtEDP38/KYr51Q2kcWMjIypNivYSixcDKp5lV4Ga3k2ASZfe6MeHieQuE/nzZuXxj4fZeRjOTf84YcfSjyWxor3x+r10dqLW7VqVbJykWJjY+vAs5fxjAaLGjJkiMVcLjIyMppFyjKekchGztoD+IcBgoPpjUXeDB4ranUjbCevt0x4C1lOeJTtxX5IxPzXxnOrkJaWFmjk0W9+dnb2t+o2qFgggLouuGZjtCxB3kuHDx+2L8oDDzzQKTMzc6hehlPJabg7oiEk2LRabxPA/EaVQJ07d85gcPrEe6F1vJWLhDp16QTTLMGAx+WTTxakkqmtbPUTEPNSgeCdB0JVScuTsH6uug0qFgjEA97VJQvV/t2FCxf+YzyLuj1x4sTrTII9HsHCf8N5wjqtzjfqhlqyEsjtqUqgWbNmXUCKTxnP+N+NiWa+YC6H2mwHUH3N+RMmTLiMpF/R6ncXFW0u9yB0/fp1+56OhMcpFwlhiBZJNJ4ZVzf1E1LTpk3tATr49gSYvdSPQXT0pNL2TxbmavPmzR2kmbOD4bplLmFlXMoH9TJTpkzxlhiC+v8+nDJ06FCrP1ycsUjbE5WjgZoNyD4UY4rgTXexQZCCOKWcew3YDqv0d3ghn4rPbbSPZmsGXw7GHgblaNtrBxsBI+wf5vkJDw/3ZCzH9L7ZQqboZSTGwhYyyQaYEm0EZYqBaGSfY7Td/s2bN1caMWKEv9KMUOYiFeO8rV5p7Nix1en/c3U7xiILdFg5WsSLzBNBmRN6GQb2kbO2WBSHewvEJH4l+cUBgT3Zh2DMPqVuduOKSXYgYKP0MRu5PCcyMWEScRPPRzla7ClBQUGGIVsiEIRwUV8184BLtxEDexxzMYlJX28CQZkBwdm8iruOAM2D35HwMAnBOWzmr1RAQDKmKQ1tdHCFMK2/XoYBv6Z3wIIm9evXz7eI9v6sl4XJtyXfhfsIAWY30pxMUTuHyCITNcnJQjgFEBowSOvXJSAQdvZlMbe50P6PAgTspqaML6E0/bsMBPzU+iyOg8oFWX/TyyBRTZGuS6YOXi2qTVTWQ0oDFgtk3d9cuZgifjuS9xwSG066JOXldJMJ2Y66H0W/KaoIIAgB2HEC5KImBrfvOPGIUaZuXQKCUP/+/WszP+GqiIgq85SjfiQg2CgAYThW1PjM4fWigHDToRNBk4dwv76zF/D0TBk3btybqGp7GdRPd4zIrcazxOs5kFq0fv16Z32o3r17R2HUrcRoMwZQyP5ZZcWKFWLhb8zPz7eeV8B0HIdGDnWnTp0qQJGgzGIBxbp167y7d++ePXv27Ay8FZH6Yu84XL58+UMOrf598uTJZznseRIQSTxCIoSx1F2De7z+3LlzGXodNFYiRuSn2ngPnj7t/PLUpk2bLmEs90Y79MONnozh1om6VdjWUkkbkNpVGNRj8JascQjex+P6Wetip2yEj9rGnMDfVWd9IJwSarca9hKLkXuH2uu4QYMG9di3b98QvInnmONmrI0nQhMD0JaKfXblypWBRmGeDzFm9YshwNMbSXwaV3QIRuoACeCYywgwAI89qCMGpW4QuukuIJD7odJUGl7CX8xlkJQxytHgOzNx4sRKyk13DxHM6q8cDdYcFn4NdsFvMeyewE6R42UHyx+j1P0biruNMMKqYMhJ2NQla5j9+Dh+cxVVSpKbShs2bCh1vTuFhH9c+crqbqa+ffvWcSWWgLF6Wn5sY66PVpkih1J6wsI/b3vdCCNwIXXFQLOQv4s25BfdcpLagLIXMBrtN6pCQkICpD4Bs1Xw9CtbW9OM93ILSvIkfmB8NxKabBsaLERuDun80c86eY/R+Ed5xlD/zMyvpLZt236MtpuJxZ9InSBb2SbUW43HkC2HX3hH2/DOOsu7nTt3VpV6lJ+l9SVjStDH9IsicZVwH19g8mPUzVoghQl+y5khKcTh2AwpR8Tvexb9C1vawEL5sNVYXS4mZ7cEfmxunoU6cgEngJSHR2N3tQhRN5Hy0gafEk6WGEYuCzRM3tevX//3Nr5eM77D3wkW6ys8lTRbX5uN9tjeAo0YB4u4S/IItP1d2heXVt1wFffJc6dOnV4HYMYFmG48i4sfq25EM7dR3npDSW6KS9SVOatmK2uhjRBblwG259u7ofRz0/LlyyvL5CGRA0H+EBYsaO7cuV7F1TGAYAuX28nf31/uHchChRqXWBGwXwsYWLSjSHBr5QIQ1I04QaYEo5wBQb5LXQEqiy1RwAJiFsGShzaZI88s5B4+Lbif9iNo8ibZ6tsP83QgAFyJ68jdhL8a7+FhsLTHu/9qQJA4Qj7zIO7j3QGEWyEDCEj/AT632FIwk/UZnwWcnDocibOo4SLlAEQCYCUCwXaGYqH9i+Qb4eabgCBEW3JOI3cyFk6ePNmLuhflrALtFCRBH4Bhj4eUBATeWw/ypk2bVk/nn/bSGcPZLVu2yD0QOdfJhrd8CbXbrhEWCYRb+oHLL404kAlg8QMloZ7r8mw9mUxPT2+sl2PSfMU7QWozmbx89nRvY18PCwuznlISsLEfN7OYoeLWEhDzT01NfaM4HmjPGt9AjaevXLlydE5Ojj98EOc62VJuJnGs/BwxkHrKBSI4ZeV/7969xo+PrRdgCCRVhN/rBK2sp6JyHQ+ATSbf+9SpU5+oYtb7ngACdsRIomn1JBG5nMfEf8LC5MbHx8/lNLPb+PHjm7FdLCQi2IF3O1HTZ5jEAyxWD1T6sJEjRzY7e/as9Rgc6d2vtw0AZgKulXIUbO4XifTH0AuUNgDQB3K1DPf3Y9q13vGAnwEs0mqOsAN573vs2LE/uDAc+2HTjh07FqFROj311FPtli1bNh9AVmbhN5n4W8jY3uRrDXWvUlE2ghAqUiTY4XyAhTtJONp6Aim/E1A3X46NDg4OloM169aAuraeQciNaTTDBnXz1qAfjl2hzHCipV2lXxbzi442kss9chEHbXFQbJaStgZxrWnrc1Mfcrl3e2hoqJdhIwDACK2+9UZ3UVtDWf+r2h1F8uNsJPUcExxJHN/hqhvqNUIuryL5lyhzWH4uziRNOXToUKq8p/zZwMDAjajaZMpGYQOsYTInRkZGpmH85bKFZFE/Aok7ExERYREXkYlPZ/vZgScRSxOpfN9GCsfm+BhXdkZ0dHQYhm5rFj2WskvRAPsToYSEhERc1xg0RrL0C0gkUJZAO9tpP0n4AcwFAlQkfjdbQhJaZC3vd7O9JImWov8F8DSd85us0aNHW7Zu3Sq3ycJTUlIOSf358+dvYxtKoe0DtHlIuclNbnKTm9zkJje5QP8DCRH+dm/QsUYAAAAASUVORK5CYII="
            alt="Algorand"
          />
          <img
            class="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-algo-icon.2b812f73.png"
            alt=""
          />
        </a>
      </div>
    </OrgsSection>
    <FeatureContainer>
      <H1 className="text-center">
        The All in One <Accent>No Code Solution</Accent> for your NFT Needs
      </H1>
    </FeatureContainer>
  </div>
);

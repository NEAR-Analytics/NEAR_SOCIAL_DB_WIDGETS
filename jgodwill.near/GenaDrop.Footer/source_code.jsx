const FooterWrapper = styled.div`
background: #0082e0;
& *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: "SF Pro Display",sans-serif;
  color: #fff;
  line-height: 1.5em;
}
  & .footer_top{
  background: #0082e0;
  padding: 2em;
}
& .footer_top, & .footer_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
& .footer_wrapper {
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 900px){
    flex-direction: column;
    grid-gap: 1em;
    gap: 1em;
    align-items: flex-start;
  }
}
& .footer_socialIcons, & .footer_topLeft{
  display: flex;
  justify-content: center;
  grid-gap: 1em;
  gap: 1em;
}

& .footer_topLeft{
  width: auto;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  }
}

& a {
  text-decoration: none;
  color: unset;
  cursor: pointer;
}

& .footer_socialIcons{
  align-items: center;
}

& .footer_socialIcons .footer_icon{
  transition: all .3s;
  border-radius: .25em;
  background: #62bdff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5em;
  height: 3rem;
  width: 3rem;
  &:hover{
    cursor: pointer;
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    background: #0d99ff;
  }
}

& .footer_icon img {
  width: 2rem;
  @media screen and (max-width: 900px){
  width: 1.4em;
  }
}

& .footer_topRight {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 4em;
  gap: 4em;
  @media screen and (max-width: 1200px){
  grid-gap: 2em;
  gap: 2em;
  }
}

& .footer_links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  grid-gap: 1em;
  gap: 1em;
}

& .footer_links .footer_title {
  font-weight: 700;
  color: #fff;
}

& .footer_bottom {
  width: 100%;
  background: #0082e0);
  padding: 1em;
  border-top: .5px solid hsla(0,0%,100%,.1);
  @media screen and (max-width: 900px){
    padding: 2em 1em;
  }
}

& .footer_orgs, & .footer_termsAndPolicy {
  display: flex;
  align-items: center;
  grid-gap: .5em;
  gap: .5em;
}

& .footer_termsAndPolicy {
  justify-content: flex-start;
  flex-wrap: wrap;
  font-size: .85rem;
  margin-top: .5em;
}

& .footer_orgs a img {
  max-height: 22px;
}
`;

return (
  <div>
    <FooterWrapper>
      <div className="footer_container">
        <div className="footer_top">
          <div className="footer_wrapper">
            <div className="footer_topLeft">
              <a href="https://bos.genadrop.io/">
                <img
                  src="https://www.genadrop.com/static/media/genadrop-logo-light.49d7ff0c.svg"
                  alt=""
                />
              </a>
              <div className="footer_socialIcons">
                <a
                  className="footer_icon"
                  href="https://www.genadrop.com/links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/icon-links.2346e662.svg"
                    alt="Minority Programmers Linktree"
                  />
                </a>
                <a
                  className="footer_icon"
                  href="https://discord.gg/4vdtmQqz6d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/icon-discord.25ea2ba7.svg"
                    alt="Minority Programmers Discord"
                  />
                </a>
                <a
                  className="footer_icon"
                  href="https://twitter.com/genadrop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/icon-twitter.6988fc91.svg"
                    alt="Minority Programmers Twitter"
                  />
                </a>
                <a
                  className="footer_icon"
                  href="https://t.me/+4BDhz2QLaa05NzEx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/telegram.7a8e67e2.svg"
                    alt="Minority Programmers Telegram"
                  />
                </a>
                <a
                  className="footer_icon"
                  href="https://linkedin.com/company/genadrop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/icon-linkedin.d3d020a3.svg"
                    alt="Minority Programmers Linkedin"
                  />
                </a>
                <a
                  className="footer_icon"
                  href="https://youtube.com/c/minorityprogrammers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/icon-youtube.06181a68.svg"
                    alt="Minority Programmers Youtube"
                  />
                </a>
                <a
                  className="footer_icon"
                  href="https://www.instagram.com/genadrop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.genadrop.com/static/media/ig-logo.33b2d649.svg"
                    alt="Minority Programmers Instagram"
                  />
                </a>
              </div>
            </div>
            <div className="footer_topRight">
              <div className="footer_links">
                <div className="footer_title">App</div>
                <a href="/create">Create</a>
                <a href="/marketplace">Marketplace</a>
              </div>
              <div className="footer_links">
                <div className="footer_title">Quick Links</div>
                <a href="https://twitter.com/genadrop">Twitter</a>
                <a href="https://t.me/+4BDhz2QLaa05NzEx">Telegram</a>
              </div>
              <div className="footer_links">
                <div className="footer_title">Support</div>
                <a href="https://www.genadrop.com/docs">Docs</a>
                <a href="https://linktr.ee/MinorityProgrammers">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="footer_wrapper">
            <div>
              <div>This Project is in Public Beta</div>
              <div className="footer_termsAndPolicy">
                2022 Genadrop |
                <a
                  href="https://docs.google.com/document/d/16tRGt3sCIauMNDCwq5A99zYUxwU8S5bpGhI0eaJzwAw/edit?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy |
                </a>
                <a
                  href="https://docs.google.com/document/d/1Ofbw5j9l3MnOFSa2cALcnJJI6iQz86SdiNmQAp1f6AE/edit?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Use |
                </a>
                <div className="footer_orgs">
                  Powered by
                  <a
                    href="https://www.pinata.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-pinata.82742150.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.algorand.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-algorand.00f44532.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://celo.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-celo.65cda9b7.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://polygon.technology/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-polygon.be02dcd1.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.avax.network/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-avalanche.15996dd1.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://near.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-near.40954533.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://aurora.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/footer-icon-aurora.90725a23.svg"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://arbitrum.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.genadrop.com/static/media/arbitrum.c20bd781.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <a
              className="footer_build__3KiP8"
              href="https://www.minorityprogrammers.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with ❤️ by the Minority Programmers Association
            </a>
          </div>
        </div>
      </div>
    </FooterWrapper>
  </div>
);

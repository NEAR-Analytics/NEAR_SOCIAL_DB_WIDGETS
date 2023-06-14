const Wrapper = styled.div`
    background: radial-gradient(
      circle,
      rgba(239, 219, 245, 1) 30%,
      rgba(210, 202, 250, 1) 80%
    );

  padding: 40px 24px;
  border-radius:15px ;
  margin-top:40px ;
  margin-right:10px ;
  margin-left:10px ;

  box-shadow: 0 0px 20px rgba(210, 202, 250, 20);

  @media (max-width: 1000px) {
    padding: 112px 24px;
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Logo = styled.div`
  height: 32px;
  svg {
    height: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 72px;
  max-width: 1040px;
  margin: 0 auto;
`;

const Icons = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  a {
    display: block;
    transition: all 200ms;

    &:hover,
    &:focus {
      opacity: 0.7;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    gap: 24px;
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ul {
    display: grid;
    list-style: none;
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  a {
    font-family: "FK Grotesk", sans-serif;
    font-size: 13px;
    line-height: 1.2;
    font-weight: 400;
    color: #000;

    &:hover,
    &:focus,
    &:active {
      color: #000;
      text-decoration: underline;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

return (
  <Wrapper>
    <Container>
      <Logo
        style={{
          "font-size": "25px",
          "font-weight": "bold",
          "background-image": "linear-gradient(270deg, #ff0420, #d9029d)",
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "font-family": "Rubik, sans-serif",
        }}
      >
        Flipside Crypto
      </Logo>

      <LinkGrid>
        <div>
          <Text size="16px" weight="400" style={{ "font-weight": "bold" }}>
            For Analysts
          </Text>
          <ul>
            <li>
              <a href="https://earn.flipsidecrypto.xyz/earn" target="_blank">
                Bounties
              </a>
            </li>
            <li>
              <a
                href="https://science.flipsidecrypto.xyz/research/"
                target="_blank"
              >
                Tools & Apps
              </a>
            </li>
            <li>
              <a
                href="https://flipsidecrypto.xyz/account/api-keys"
                target="_blank"
              >
                API
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
            For Partners
          </Text>
          <ul>
            <li>
              <a href="https://data.flipsidecrypto.com/" target="_blank">
                Enterprise Data
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
            Company
          </Text>
          <ul>
            <li>
              <a href="https://flipsidecrypto.breezy.hr/" target="_blank">
                Careers
              </a>
            </li>
            <li>
              <a href="https://flipsidecrypto.xyz/terms" target="_blank">
                Terms & Privacy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
            Newsletters & Research
          </Text>
          <ul>
            <li>
              <a
                href="https://data.flipsidecrypto.com/analyst-emails"
                target="_blank"
              >
                Analyst Tips
              </a>
            </li>
            <li>
              <a href="https://flipsidecrypto.beehiiv.com/" target="_blank">
                Crypto Research Newsletter
              </a>
            </li>
            <li>
              <a href="https://medium.com/flipside-governance" target="_blank">
                Governance Blog
              </a>
            </li>
          </ul>
        </div>
        <Icons>
          <a
            href="https://discord.com/invite/ZmU3jQuu6W"
            target="_blank"
            title="Official Discord server"
          >
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <path
                d="M22.044 2.12625C22.044 2.12625 22.044 2.12625 21.9998 2.12625C20.3188 1.36632 18.5494 0.859702 16.7357 0.564174C16.6914 0.521956 16.6472 0.564174 16.6472 0.564174C16.3818 0.986356 16.1606 1.45076 15.9837 1.87294C13.993 1.57741 12.0024 1.57741 10.0118 1.87294C9.83486 1.45076 9.61368 0.986356 9.34827 0.564174C9.34827 0.564174 9.30403 0.521956 9.2598 0.564174C7.44612 0.859702 5.67668 1.36632 3.99571 2.12625C3.95147 2.12625 3.95147 2.12625 3.95147 2.12625C0.589536 6.93913 -0.339421 11.6254 0.10294 16.2694C0.10294 16.2694 0.10294 16.3116 0.147176 16.3116C2.09356 17.7048 4.30536 18.7602 6.64987 19.4357C6.64987 19.478 6.69411 19.4357 6.73834 19.4357C7.22494 18.7602 7.6673 18.0848 8.06542 17.367C8.06542 17.3248 8.06542 17.2826 8.02119 17.2404C7.31341 16.9871 6.60563 16.6915 5.98633 16.3116C5.94209 16.3116 5.89786 16.2271 5.98633 16.1849C6.11904 16.1005 6.25175 16.0161 6.38445 15.8894C6.38445 15.8894 6.42869 15.8894 6.47293 15.8894C10.7196 17.747 15.3201 17.747 19.5226 15.8894C19.5668 15.8894 19.5668 15.8894 19.611 15.8894C19.7437 16.0161 19.8764 16.1005 20.0091 16.1849C20.0534 16.2271 20.0534 16.3116 20.0091 16.3116C19.3456 16.6915 18.6821 16.9871 17.9743 17.2404C17.9301 17.2826 17.9301 17.3248 17.9301 17.367C18.3282 18.0848 18.7705 18.7602 19.2571 19.4357C19.3014 19.4357 19.3014 19.478 19.3456 19.4357C21.6901 18.7602 23.9019 17.7048 25.8483 16.3116C25.8925 16.3116 25.8925 16.2694 25.8925 16.2694C26.4234 10.9076 24.9636 6.26364 22.044 2.12625ZM8.68473 13.4407C7.40188 13.4407 6.34022 12.3009 6.34022 10.9499C6.34022 9.55666 7.40188 8.45899 8.68473 8.45899C10.0118 8.45899 11.0292 9.55666 11.0292 10.9499C11.0292 12.3009 9.96757 13.4407 8.68473 13.4407ZM17.3108 13.4407C16.0279 13.4407 15.0105 12.3009 15.0105 10.9499C15.0105 9.55666 16.0279 8.45899 17.3108 8.45899C18.6378 8.45899 19.6995 9.55666 19.6553 10.9499C19.6553 12.3009 18.6378 13.4407 17.3108 13.4407Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://medium.com/flipside-governance"
            target="_blank"
            title="Flipside Governance Forum"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.8709 0.772705C5.43425 0.772705 0 5.73476 0 11.8496C0 12 0 23.2273 0 23.2273H11.8709C18.3604 23.2273 23.6364 18.1148 23.6364 12C23.6364 5.93525 18.3604 0.772705 11.8709 0.772705ZM11.8182 18.4156C10.763 18.4156 9.81331 18.2151 8.9164 17.8141L4.64286 18.8165L5.85633 15.0574C5.32873 14.1552 5.06494 13.1528 5.06494 12C5.06494 8.49146 8.07224 5.58439 11.8182 5.58439C15.5114 5.58439 18.5714 8.49146 18.5714 12C18.5714 15.5586 15.5114 18.4156 11.8182 18.4156Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://twitter.com/flipsidecrypto"
            target="_blank"
            title="Official Twitter account"
          >
            <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
              <path
                d="M23.9906 6.34576C25.0082 5.53415 25.924 4.56022 26.6364 3.42396C25.7205 3.85682 24.652 4.18147 23.5835 4.28968C24.7029 3.58629 25.517 2.50414 25.924 1.15146C24.9064 1.80074 23.7362 2.28771 22.5659 2.55825C21.5483 1.42199 20.1745 0.772705 18.6481 0.772705C15.697 0.772705 13.3056 3.31575 13.3056 6.45398C13.3056 6.88683 13.3565 7.31969 13.4583 7.75255C9.03167 7.48202 5.06298 5.20951 2.41719 1.80074C1.95926 2.61235 1.70486 3.58629 1.70486 4.66843C1.70486 6.6163 2.62071 8.34773 4.09625 9.37577C3.23128 9.32166 2.36631 9.10524 1.65398 8.67238V8.72648C1.65398 11.486 3.48568 13.7585 5.92795 14.2995C5.52091 14.4078 5.0121 14.516 4.55418 14.516C4.19801 14.516 3.89273 14.4619 3.53656 14.4078C4.19801 16.6803 6.18236 18.3035 8.52286 18.3576C6.69116 19.8726 4.40153 20.7924 1.90838 20.7924C1.45046 20.7924 1.04341 20.7383 0.636368 20.6842C2.97688 22.3074 5.77531 23.2273 8.82815 23.2273C18.6481 23.2273 23.9906 14.6242 23.9906 7.10326C23.9906 6.83273 23.9906 6.6163 23.9906 6.34576Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://github.com/FlipsideCrypto"
            target="_blank"
            title="Official Github organization"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M8.49926 19.2153C8.49926 19.1177 8.40395 19.0201 8.26099 19.0201C8.11802 19.0201 8.02272 19.1177 8.02272 19.2153C8.02272 19.3129 8.11802 19.4105 8.26099 19.3617C8.40395 19.3617 8.49926 19.3129 8.49926 19.2153ZM7.02198 18.9713C7.02198 19.0689 7.11729 19.2153 7.26025 19.2153C7.35556 19.2641 7.49852 19.2153 7.54618 19.1177C7.54618 19.0201 7.49852 18.9225 7.35556 18.8736C7.2126 18.8248 7.06964 18.8736 7.02198 18.9713ZM9.16641 18.9225C9.02345 18.9225 8.92814 19.0201 8.92814 19.1665C8.92814 19.2641 9.0711 19.3129 9.21407 19.2641C9.35703 19.2153 9.45234 19.1665 9.40468 19.0689C9.40468 18.9713 9.26172 18.8736 9.16641 18.9225ZM12.2639 0.181763C5.68767 0.181763 0.636353 5.35497 0.636353 12.0899C0.636353 17.5071 3.92448 22.1435 8.68987 23.8028C9.30937 23.9004 9.49999 23.51 9.49999 23.2172C9.49999 22.8756 9.49999 21.2162 9.49999 20.1914C9.49999 20.1914 6.16421 20.9234 5.4494 18.7272C5.4494 18.7272 4.92521 17.3119 4.16275 16.9703C4.16275 16.9703 3.0667 16.1894 4.2104 16.1894C4.2104 16.1894 5.40175 16.287 6.0689 17.4583C7.11729 19.3617 8.83283 18.8248 9.54764 18.4832C9.64295 17.7024 9.92888 17.1655 10.3101 16.8239C7.64149 16.5311 4.92521 16.1406 4.92521 11.4555C4.92521 10.089 5.30644 9.4545 6.0689 8.57603C5.92594 8.2344 5.54471 6.9655 6.21187 5.25737C7.16495 4.96454 9.49999 6.57507 9.49999 6.57507C10.4531 6.28225 11.4538 6.18464 12.4545 6.18464C13.5029 6.18464 14.5037 6.28225 15.4567 6.57507C15.4567 6.57507 17.7441 4.91574 18.7449 5.25737C19.412 6.9655 18.9831 8.2344 18.8878 8.57603C19.6503 9.4545 20.1268 10.089 20.1268 11.4555C20.1268 16.1406 17.3152 16.5311 14.6466 16.8239C15.0755 17.2143 15.4567 17.9464 15.4567 19.1177C15.4567 20.7282 15.4091 22.778 15.4091 23.1684C15.4091 23.51 15.6474 23.9004 16.2669 23.754C21.0322 22.1435 24.2727 17.5071 24.2727 12.0899C24.2727 5.35497 18.8878 0.181763 12.2639 0.181763ZM5.25879 17.0191C5.16348 17.0679 5.21113 17.2143 5.25879 17.3119C5.35409 17.3607 5.4494 17.4095 5.54471 17.3607C5.59236 17.3119 5.59236 17.1655 5.49706 17.0679C5.40175 17.0191 5.30644 16.9703 5.25879 17.0191ZM4.73459 16.6287C4.68694 16.7263 4.73459 16.7751 4.8299 16.8239C4.92521 16.8727 5.02052 16.8727 5.06817 16.7751C5.06817 16.7263 5.02052 16.6775 4.92521 16.6287C4.8299 16.5799 4.78225 16.5799 4.73459 16.6287ZM6.25952 18.3856C6.21187 18.4344 6.21187 18.5808 6.35483 18.6784C6.45014 18.776 6.5931 18.8248 6.64075 18.7272C6.68841 18.6784 6.68841 18.532 6.5931 18.4344C6.49779 18.3368 6.35483 18.288 6.25952 18.3856ZM5.73533 17.6536C5.64002 17.7024 5.64002 17.8488 5.73533 17.9464C5.83063 18.044 5.92594 18.0928 6.02125 18.044C6.0689 17.9952 6.0689 17.8488 6.02125 17.7512C5.92594 17.6536 5.83063 17.6047 5.73533 17.6536Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://www.youtube.com/channel/UCoOEX-R356jLWrQLHSJNVwg"
            target="_blank"
            title="Official YouTube channel"
          >
            <svg width="27" height="18" viewBox="0 0 27 18" fill="none">
              <path
                d="M26.3387 2.9524C26.0535 1.84445 25.1504 0.967318 24.0571 0.69033C22.0133 0.136353 13.9328 0.136353 13.9328 0.136353C13.9328 0.136353 5.80485 0.136353 3.76098 0.69033C2.66774 0.967318 1.76463 1.84445 1.47944 2.9524C0.909058 4.89132 0.909058 9.04615 0.909058 9.04615C0.909058 9.04615 0.909058 13.1548 1.47944 15.1399C1.76463 16.2479 2.66774 17.0788 3.76098 17.3558C5.80485 17.8636 13.9328 17.8636 13.9328 17.8636C13.9328 17.8636 22.0133 17.8636 24.0571 17.3558C25.1504 17.0788 26.0535 16.2479 26.3387 15.1399C26.9091 13.1548 26.9091 9.04615 26.9091 9.04615C26.9091 9.04615 26.9091 4.89132 26.3387 2.9524ZM11.271 12.7855V5.30681L18.0206 9.04615L11.271 12.7855Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://www.reddit.com/domain/flipsidecrypto.com/"
            target="_blank"
            title="Official Subreddit"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.9091 12C24.9091 18.627 19.5361 24 12.9091 24C6.28206 24 0.909058 18.627 0.909058 12C0.909058 5.373 6.28206 0 12.9091 0C19.5361 0 24.9091 5.373 24.9091 12ZM20.5971 11.058C20.7911 11.335 20.9011 11.662 20.9131 12C20.9183 12.3307 20.8298 12.6561 20.6578 12.9385C20.4857 13.221 20.2373 13.4489 19.9411 13.596C19.9551 13.772 19.9551 13.948 19.9411 14.124C19.9411 16.812 16.8091 18.996 12.9451 18.996C9.08106 18.996 5.94906 16.812 5.94906 14.124C5.93555 13.9483 5.93555 13.7717 5.94906 13.596C5.72023 13.4889 5.51731 13.3335 5.35425 13.1405C5.19118 12.9475 5.07184 12.7215 5.00443 12.478C4.93702 12.2345 4.92313 11.9793 4.96373 11.7299C5.00432 11.4805 5.09843 11.2429 5.23959 11.0333C5.38075 10.8238 5.56561 10.6473 5.78147 10.516C5.99732 10.3847 6.23905 10.3016 6.49004 10.2726C6.74103 10.2436 6.99532 10.2693 7.23544 10.3479C7.47556 10.4265 7.69581 10.5562 7.88106 10.728C9.26378 9.79023 10.8905 9.27718 12.5611 9.252L13.4491 5.088C13.459 5.03979 13.4785 4.99405 13.5063 4.95341C13.534 4.91277 13.5696 4.87805 13.6109 4.85127C13.6522 4.82448 13.6984 4.80615 13.7468 4.79735C13.7953 4.78855 13.845 4.78945 13.8931 4.8L16.8331 5.388C16.9766 5.14132 17.2034 4.9539 17.4727 4.85937C17.742 4.76484 18.0362 4.7694 18.3025 4.87222C18.5687 4.97505 18.7896 5.1694 18.9255 5.42041C19.0614 5.67141 19.1033 5.96262 19.0438 6.24177C18.9843 6.52092 18.8273 6.76972 18.6009 6.94352C18.3745 7.11732 18.0936 7.20473 17.8085 7.19006C17.5235 7.1754 17.253 7.05962 17.0456 6.8635C16.8383 6.66739 16.7076 6.40378 16.6771 6.12L14.1091 5.58L13.3291 9.324C14.9793 9.3594 16.584 9.87206 17.9491 10.8C18.1313 10.6248 18.3493 10.4911 18.5881 10.4082C18.8269 10.3252 19.0808 10.295 19.3324 10.3195C19.5841 10.344 19.8274 10.4227 20.0457 10.5502C20.264 10.6777 20.4521 10.8509 20.5971 11.058ZM9.11506 12.533C9.02747 12.6641 8.96655 12.8111 8.93578 12.9657C8.90501 13.1203 8.90499 13.2794 8.93573 13.4341C8.9978 13.7463 9.18137 14.0211 9.44606 14.198C9.71074 14.3749 10.0349 14.4394 10.3471 14.3773C10.5017 14.3466 10.6488 14.2857 10.7798 14.1981C10.9109 14.1106 11.0235 13.9981 11.1111 13.867C11.288 13.6023 11.3525 13.2782 11.2904 12.9659C11.2283 12.6537 11.0447 12.3789 10.7801 12.202C10.5154 12.0251 10.1913 11.9606 9.87901 12.0227C9.56676 12.0847 9.29196 12.2683 9.11506 12.533ZM12.9211 17.424C13.9861 17.468 15.0341 17.19 15.8851 16.548C15.9487 16.4859 15.9851 16.4011 15.9862 16.3122C15.9874 16.2234 15.9531 16.1377 15.8911 16.074C15.8603 16.0425 15.8237 16.0173 15.7832 16C15.7428 15.9826 15.6993 15.9734 15.6553 15.9728C15.5664 15.9717 15.4807 16.0059 15.4171 16.068C14.6888 16.5904 13.804 16.8487 12.9091 16.8C12.0152 16.8399 11.1345 16.5732 10.4131 16.044C10.3509 15.993 10.272 15.9669 10.1916 15.9708C10.1113 15.9748 10.0353 16.0085 9.9784 16.0653C9.92153 16.1222 9.88784 16.1982 9.8839 16.2786C9.87995 16.3589 9.90603 16.4378 9.95706 16.5C10.8084 17.1416 11.8559 17.4681 12.9211 17.424ZM15.0021 14.246C15.2001 14.378 15.4201 14.496 15.6571 14.496C15.8198 14.4979 15.9813 14.4666 16.1315 14.4041C16.2818 14.3416 16.4178 14.2492 16.5312 14.1324C16.6446 14.0156 16.733 13.877 16.7911 13.725C16.8492 13.5729 16.8757 13.4106 16.8691 13.248C16.869 13.0407 16.8152 12.837 16.713 12.6567C16.6108 12.4763 16.4636 12.3256 16.2858 12.219C16.108 12.1125 15.9056 12.0539 15.6984 12.0488C15.4912 12.0437 15.2862 12.0924 15.1034 12.1902C14.9205 12.2879 14.7662 12.4313 14.6553 12.6064C14.5444 12.7815 14.4807 12.9824 14.4705 13.1894C14.4603 13.3964 14.5039 13.6026 14.5971 13.7877C14.6902 13.9729 14.8297 14.1308 15.0021 14.246Z"
                fill="#262626"
              />
            </svg>
          </a>
        </Icons>
      </LinkGrid>
    </Container>
  </Wrapper>
);
const Container = styled.div`
  position: relative;
  background: #66a0ff;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 64px;
  padding: 48px;
  width: 100%;
  max-width: 1300px;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;

  & > h4 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
  }

  & > p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #ffffff;

    & > br {
      margin-bottom: 16px;
    }
  }

  & > a {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 9px 28px;
    gap: 8px;
    border: 2px solid #ffffff;
    border-radius: 50px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;

    &:hover,
    &:focus,
    &:active {
      color: #ffffff;
      text-decoration: none;
    }
  }
`;

const GraphicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;

  & > img {
    width: 100%;
  }
`;

const DismissButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AwesomeNEARToHorizon = (
  <svg
    width="427"
    height="31"
    viewBox="0 0 427 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3468_120723)">
      <path
        d="M0 8.25428C0 3.69557 3.63235 0 8.11309 0H117.133C121.614 0 125.246 3.69557 125.246 8.25428V22.6993C125.246 27.258 121.614 30.9536 117.133 30.9536H8.11309C3.63235 30.9536 0 27.258 0 22.6993V8.25428Z"
        fill="white"
      />
      <path
        d="M86.5767 15.476C86.5767 16.66 86.383 17.7583 85.9951 18.771C85.6072 19.7763 85.0616 20.6475 84.3593 21.3847C83.6565 22.1219 82.8112 22.6989 81.823 23.1159C80.8352 23.5255 79.7409 23.7303 78.5407 23.7303C77.3405 23.7303 76.2421 23.5255 75.2468 23.1159C74.259 22.6989 73.4102 22.1219 72.6998 21.3847C71.9975 20.6475 71.4519 19.7763 71.064 18.771C70.6761 17.7583 70.4824 16.66 70.4824 15.476C70.4824 14.292 70.6761 13.1974 71.064 12.1921C71.4519 11.1794 71.9975 10.3045 72.6998 9.5673C73.4102 8.83009 74.259 8.25673 75.2468 7.84716C76.2421 7.43022 77.3405 7.22169 78.5407 7.22169C79.7409 7.22169 80.8352 7.43022 81.823 7.84716C82.8112 8.26416 83.6565 8.84129 84.3593 9.57844C85.0616 10.3082 85.6072 11.1794 85.9951 12.1921C86.383 13.1974 86.5767 14.292 86.5767 15.476ZM83.547 15.476C83.547 14.5899 83.4298 13.7968 83.1956 13.0969C82.9684 12.3894 82.6393 11.79 82.2073 11.2986C81.7758 10.8071 81.2484 10.4311 80.6263 10.1704C80.0117 9.9098 79.3165 9.77954 78.5407 9.77954C77.7649 9.77954 77.0656 9.9098 76.4435 10.1704C75.8218 10.4311 75.2909 10.8071 74.8518 11.2986C74.4198 11.79 74.0871 12.3894 73.8529 13.0969C73.6186 13.7968 73.5014 14.5899 73.5014 15.476C73.5014 16.3621 73.6186 17.1589 73.8529 17.8663C74.0871 18.5662 74.4198 19.1619 74.8518 19.6534C75.2909 20.1374 75.8218 20.5097 76.4435 20.7703C77.0656 21.031 77.7649 21.1613 78.5407 21.1613C79.3165 21.1613 80.0117 21.031 80.6263 20.7703C81.2484 20.5097 81.7758 20.1374 82.2073 19.6534C82.6393 19.1619 82.9684 18.5662 83.1956 17.8663C83.4298 17.1589 83.547 16.3621 83.547 15.476Z"
        fill="#66A0FF"
      />
      <path
        d="M96.8357 16.8235C96.962 17.0656 97.0776 17.3191 97.1815 17.5839C97.2931 17.8412 97.4011 18.1022 97.5051 18.367C97.609 18.0946 97.717 17.826 97.8286 17.5612C97.9401 17.2964 98.0593 17.0429 98.1855 16.8008L102.96 7.70973C103.019 7.59623 103.079 7.50543 103.139 7.43733C103.206 7.36924 103.276 7.32007 103.351 7.28979C103.432 7.25951 103.521 7.24062 103.618 7.23304C103.715 7.22546 103.83 7.22169 103.964 7.22169H106.229V23.6333H103.585V13.0327C103.585 12.836 103.588 12.6204 103.596 12.3858C103.611 12.1512 103.629 11.9129 103.652 11.6708L98.7768 20.9775C98.6652 21.1893 98.5202 21.3558 98.3417 21.4768C98.1632 21.5903 97.9548 21.6471 97.717 21.6471H97.3043C97.0664 21.6471 96.858 21.5903 96.6796 21.4768C96.5011 21.3558 96.356 21.1893 96.2445 20.9775L91.3026 11.6367C91.3325 11.8864 91.3508 12.1323 91.3584 12.3744C91.3731 12.609 91.3807 12.8284 91.3807 13.0327V23.6333H88.7368V7.22169H91.0014C91.1353 7.22169 91.2504 7.22546 91.3472 7.23304C91.4441 7.24062 91.5293 7.25951 91.6038 7.28979C91.6854 7.32007 91.76 7.36924 91.8269 7.43733C91.8938 7.50543 91.9572 7.59623 92.0165 7.70973L96.8357 16.8235Z"
        fill="#66A0FF"
      />
      <path
        d="M19.7755 7.22169H22.2967C22.557 7.22169 22.7727 7.28602 22.9437 7.41464C23.1222 7.53572 23.2412 7.70214 23.3007 7.91402L26.0449 17.7315C26.1119 17.9736 26.1713 18.2384 26.2234 18.5259C26.2829 18.8059 26.3387 19.1048 26.3908 19.4226C26.4502 19.1048 26.5135 18.8059 26.5804 18.5259C26.6548 18.2384 26.7329 17.9736 26.8147 17.7315L29.9828 7.91402C30.0423 7.74001 30.1576 7.58111 30.3286 7.43733C30.5071 7.29356 30.7228 7.22169 30.9757 7.22169H31.857C32.1172 7.22169 32.3329 7.28602 32.504 7.41464C32.675 7.53572 32.794 7.70214 32.8609 7.91402L36.0068 17.7315C36.1704 18.2157 36.3117 18.7529 36.4307 19.3431C36.4828 19.048 36.5348 18.7643 36.5869 18.4919C36.6464 18.2195 36.7059 17.966 36.7654 17.7315L39.5096 7.91402C39.5617 7.72484 39.677 7.56218 39.8554 7.42599C40.0339 7.28979 40.2496 7.22169 40.5025 7.22169H42.8563L37.8475 23.6333H35.1367L31.6115 12.4198C31.5669 12.276 31.5186 12.121 31.4665 11.9545C31.4219 11.788 31.3773 11.6102 31.3326 11.4211C31.288 11.6102 31.2397 11.788 31.1876 11.9545C31.143 12.121 31.0984 12.276 31.0538 12.4198L27.4951 23.6333H24.7844L19.7755 7.22169Z"
        fill="#66A0FF"
      />
      <path
        d="M54.9909 7.22169H44.9239C44.8438 7.22169 44.767 7.25409 44.7103 7.31172C44.6537 7.36929 44.6219 7.44745 44.6219 7.52896C44.6225 8.12327 44.8549 8.69307 45.2682 9.11311C45.6815 9.53315 46.2418 9.76907 46.826 9.76907H54.993C55.0528 9.76907 55.1101 9.74492 55.1527 9.7019C55.1948 9.65892 55.2186 9.60058 55.2186 9.5398V7.45101C55.2186 7.42067 55.2125 7.3907 55.2014 7.36274C55.1897 7.33472 55.173 7.30934 55.1517 7.28804C55.1304 7.26673 55.1055 7.24986 55.0776 7.23851C55.0503 7.22711 55.0208 7.22138 54.9909 7.22169ZM54.9909 21.1829H47.4682C47.4085 21.1829 47.3511 21.1587 47.3089 21.1157C47.2666 21.0727 47.2429 21.0144 47.2429 20.9536V16.8127C47.2429 16.7519 47.2666 16.6936 47.3089 16.6506C47.3511 16.6076 47.4085 16.5834 47.4682 16.5834H54.4118C54.4717 16.5834 54.529 16.5593 54.5711 16.5163C54.6132 16.4733 54.637 16.415 54.637 16.3541V14.2677C54.637 14.2068 54.6132 14.1485 54.5711 14.1055C54.529 14.0625 54.4717 14.0383 54.4118 14.0383H44.9599C44.8703 14.0383 44.7843 14.0746 44.7209 14.1391C44.6575 14.2036 44.6219 14.2911 44.6219 14.3823V23.3863C44.6219 23.4775 44.6575 23.565 44.7209 23.6295C44.7843 23.694 44.8703 23.7303 44.9599 23.7303H54.9909C55.0508 23.7303 55.1081 23.7061 55.1501 23.6631C55.1922 23.6201 55.2161 23.5618 55.2161 23.501V21.4122C55.2161 21.3514 55.1922 21.293 55.1501 21.2501C55.1081 21.207 55.0508 21.1829 54.9909 21.1829Z"
        fill="#66A0FF"
      />
      <path
        d="M118.882 7.22169H108.815C108.735 7.22169 108.658 7.25409 108.601 7.31172C108.544 7.36929 108.512 7.44745 108.512 7.52896C108.513 8.12327 108.746 8.69307 109.159 9.11311C109.572 9.53315 110.133 9.76907 110.717 9.76907H118.884C118.943 9.76907 119.001 9.74492 119.043 9.7019C119.085 9.65892 119.109 9.60058 119.109 9.5398V7.45101C119.109 7.42067 119.103 7.3907 119.092 7.36274C119.08 7.33472 119.064 7.30934 119.042 7.28804C119.021 7.26673 118.996 7.24986 118.968 7.23851C118.941 7.22711 118.911 7.22138 118.882 7.22169ZM118.882 21.1829H111.359C111.299 21.1829 111.242 21.1587 111.199 21.1157C111.157 21.0727 111.134 21.0144 111.134 20.9536V16.8127C111.134 16.7519 111.157 16.6936 111.199 16.6506C111.242 16.6076 111.299 16.5834 111.359 16.5834H118.302C118.362 16.5834 118.42 16.5593 118.462 16.5163C118.504 16.4733 118.528 16.415 118.528 16.3541V14.2677C118.528 14.2068 118.504 14.1485 118.462 14.1055C118.42 14.0625 118.362 14.0383 118.302 14.0383H108.851C108.761 14.0383 108.675 14.0746 108.611 14.1391C108.548 14.2036 108.512 14.2911 108.512 14.3823V23.3863C108.512 23.4775 108.548 23.565 108.611 23.6295C108.675 23.694 108.761 23.7303 108.851 23.7303H118.882C118.941 23.7303 118.999 23.7061 119.041 23.6631C119.083 23.6201 119.107 23.5618 119.107 23.501V21.4122C119.107 21.3514 119.083 21.293 119.041 21.2501C118.999 21.207 118.941 21.1829 118.882 21.1829Z"
        fill="#66A0FF"
      />
      <path
        d="M8.6067 23.7303H6.30928C6.27277 23.7302 6.23682 23.721 6.20452 23.7036C6.17227 23.6863 6.14463 23.6611 6.124 23.6304C6.10341 23.5998 6.09043 23.5645 6.08622 23.5276C6.08201 23.4907 6.08668 23.4533 6.09981 23.4186L12.1812 7.45086C12.2044 7.38436 12.247 7.32668 12.3034 7.28572C12.3598 7.24471 12.4273 7.22237 12.4966 7.2217H15.3684C15.4377 7.22237 15.5051 7.24471 15.5616 7.28572C15.6179 7.32668 15.6606 7.38436 15.6837 7.45086L21.7651 23.4186C21.7784 23.4534 21.783 23.491 21.7787 23.5281C21.7744 23.5652 21.7612 23.6007 21.7403 23.6314C21.7194 23.6621 21.6915 23.6872 21.6589 23.7044C21.6263 23.7217 21.5901 23.7305 21.5534 23.7303H19.2492C19.2036 23.73 19.1591 23.7155 19.1217 23.6889C19.0843 23.6623 19.0557 23.6248 19.0397 23.5813L14.1386 10.4391C14.1223 10.3956 14.0935 10.3582 14.0559 10.3318C14.0183 10.3053 13.9737 10.2912 13.928 10.2912C13.8822 10.2912 13.8376 10.3053 13.8 10.3318C13.7624 10.3582 13.7336 10.3956 13.7173 10.4391L8.81617 23.5836C8.79985 23.6267 8.77109 23.6637 8.73372 23.6899C8.69635 23.716 8.65209 23.7301 8.6067 23.7303Z"
        fill="#66A0FF"
      />
      <path
        d="M60.9997 16.4823C58.6657 16.0332 57.2986 14.4281 57.2986 11.9684C57.2986 9.147 59.1073 7.22169 62.3013 7.22169H68.0601C68.1417 7.22169 68.2193 7.25455 68.2771 7.31306C68.3344 7.37151 68.3669 7.45085 68.3669 7.53355C68.3669 8.06347 68.16 8.57173 67.7914 8.94642C67.4232 9.32112 66.9238 9.53165 66.403 9.53165H62.5447C60.6092 9.53165 59.6833 10.5359 59.6833 11.9913C59.6833 13.4467 60.5869 14.4717 62.5447 14.4717L65.1191 14.4697C67.4531 14.9188 68.8202 16.5239 68.8202 18.9835C68.8202 21.8049 67.0115 23.7303 63.8175 23.7303H58.0587C57.9771 23.7303 57.8995 23.6974 57.8417 23.6389C57.7844 23.5804 57.7519 23.5011 57.7519 23.4184C57.7519 22.8885 57.9588 22.3802 58.3274 22.0055C58.6956 21.6308 59.195 21.4203 59.7158 21.4203H63.5741C65.5095 21.4203 66.4355 20.4161 66.4355 18.9607C66.4355 17.5052 65.5319 16.4802 63.5741 16.4802L60.9997 16.4823Z"
        fill="#66A0FF"
      />
      <path
        d="M154.925 7.22267H144.864C144.784 7.22267 144.707 7.25501 144.65 7.31264C144.593 7.37021 144.562 7.44832 144.562 7.52973C144.563 8.12373 144.795 8.69322 145.208 9.113C145.621 9.53284 146.181 9.76865 146.765 9.76865H154.928C154.987 9.76865 155.045 9.74451 155.087 9.70153C155.129 9.65856 155.153 9.60026 155.153 9.53949V7.45183C155.153 7.42154 155.147 7.39157 155.135 7.36361C155.124 7.33565 155.107 7.31032 155.086 7.28896C155.065 7.26765 155.04 7.25084 155.012 7.23949C154.984 7.22809 154.955 7.22236 154.925 7.22267ZM154.925 21.1761H147.407C147.347 21.1761 147.29 21.152 147.247 21.109C147.205 21.066 147.182 21.0077 147.182 20.947V16.8084C147.182 16.7476 147.205 16.6893 147.247 16.6463C147.29 16.6034 147.347 16.5792 147.407 16.5792H154.346C154.406 16.5792 154.463 16.5551 154.506 16.5121C154.548 16.4691 154.572 16.4108 154.572 16.35V14.2647C154.572 14.2039 154.548 14.1456 154.506 14.1027C154.463 14.0597 154.406 14.0355 154.346 14.0355H144.9C144.81 14.0355 144.724 14.0718 144.661 14.1363C144.598 14.2007 144.562 14.2881 144.562 14.3793V23.3783C144.562 23.4695 144.598 23.5569 144.661 23.6214C144.724 23.6858 144.81 23.7221 144.9 23.7221H154.925C154.985 23.7221 155.042 23.6979 155.084 23.6549C155.127 23.612 155.15 23.5537 155.15 23.4929V21.4053C155.15 21.3445 155.127 21.2862 155.084 21.2432C155.042 21.2003 154.985 21.1761 154.925 21.1761Z"
        fill="white"
      />
      <path
        d="M186.296 23.3508L181.738 17.4294C184.31 16.9344 185.817 15.1653 185.817 12.4543C185.817 9.34468 183.823 7.22266 180.303 7.22266H173.956C173.866 7.22266 173.78 7.25887 173.717 7.32336C173.654 7.38779 173.618 7.47524 173.618 7.5664C173.618 8.15044 173.846 8.71059 174.252 9.12362C174.658 9.53659 175.208 9.76859 175.782 9.76859H180.035C182.168 9.76859 183.188 10.8754 183.188 12.4796C183.188 14.0837 182.193 15.2134 180.035 15.2134H173.956C173.866 15.2134 173.78 15.2496 173.717 15.3141C173.654 15.3786 173.618 15.466 173.618 15.5572V23.4929C173.618 23.5537 173.642 23.612 173.684 23.6549C173.726 23.6979 173.783 23.722 173.843 23.722H176.01C176.07 23.722 176.127 23.6979 176.169 23.6549C176.211 23.612 176.235 23.5537 176.235 23.4929V17.5691H178.738L182.695 22.8238C182.905 23.1031 183.176 23.3295 183.486 23.4853C183.796 23.641 184.137 23.7221 184.483 23.722H186.118C186.161 23.7223 186.203 23.7103 186.239 23.6876C186.275 23.6648 186.304 23.6321 186.322 23.5933C186.341 23.5545 186.348 23.5112 186.344 23.4683C186.339 23.4254 186.323 23.3847 186.296 23.3508Z"
        fill="white"
      />
      <path
        d="M159.022 23.7312H156.724C156.688 23.7311 156.652 23.722 156.62 23.7046C156.587 23.6872 156.56 23.6621 156.539 23.6314C156.518 23.6008 156.506 23.5654 156.501 23.5285C156.497 23.4916 156.501 23.4542 156.515 23.4196L162.596 7.45182C162.619 7.38532 162.662 7.32764 162.718 7.28668C162.775 7.24566 162.842 7.22333 162.911 7.22266H165.783C165.853 7.22333 165.92 7.24566 165.977 7.28668C166.033 7.32764 166.075 7.38532 166.099 7.45182L172.18 23.4196C172.193 23.4544 172.198 23.492 172.194 23.5291C172.189 23.5662 172.176 23.6016 172.155 23.6324C172.134 23.6631 172.106 23.6882 172.074 23.7054C172.041 23.7226 172.005 23.7315 171.969 23.7312H169.664C169.618 23.7309 169.574 23.7165 169.537 23.6899C169.499 23.6633 169.471 23.6258 169.455 23.5823L164.554 10.44C164.537 10.3966 164.509 10.3591 164.471 10.3327C164.433 10.3063 164.388 10.2922 164.343 10.2922C164.297 10.2922 164.252 10.3063 164.215 10.3327C164.177 10.3591 164.149 10.3966 164.132 10.44L159.231 23.5846C159.215 23.6276 159.186 23.6647 159.149 23.6908C159.111 23.717 159.067 23.7311 159.022 23.7312Z"
        fill="white"
      />
      <path
        d="M142.371 7.45183V23.4929C142.371 23.5537 142.347 23.612 142.305 23.6549C142.262 23.6979 142.205 23.7221 142.146 23.7221H140.492C140.116 23.7218 139.747 23.6258 139.416 23.4429C139.086 23.26 138.806 22.9959 138.602 22.6748L131.158 10.9694L131.413 16.8152V23.4929C131.413 23.5537 131.389 23.612 131.346 23.6549C131.304 23.6979 131.247 23.7221 131.187 23.7221H129.021C128.961 23.7221 128.903 23.6979 128.861 23.6549C128.819 23.612 128.795 23.5537 128.795 23.4929V7.45183C128.795 7.39106 128.819 7.33276 128.861 7.28979C128.903 7.24681 128.961 7.22267 129.021 7.22267H130.651C131.028 7.22231 131.398 7.31775 131.728 7.50032C132.058 7.68284 132.339 7.94662 132.543 8.26766L139.976 19.9547L139.751 14.1341V7.45183C139.751 7.39106 139.775 7.33276 139.817 7.28979C139.859 7.24681 139.916 7.22267 139.976 7.22267H142.143C142.173 7.22236 142.202 7.22809 142.23 7.23949C142.258 7.25084 142.282 7.26765 142.304 7.28896C142.325 7.31032 142.342 7.33565 142.353 7.36361C142.365 7.39157 142.371 7.42154 142.371 7.45183Z"
        fill="white"
      />
    </g>
    <path
      d="M228.092 15.4648L218.092 9.69134V21.2383L228.092 15.4648ZM206.829 16.4648H219.092V14.4648H206.829V16.4648Z"
      fill="white"
    />
    <path
      d="M290.294 4.67871V14.192H302.072V4.67871H304.88V26.2192H302.072V16.6155H290.294V26.2192H287.501V4.67871H290.294Z"
      fill="white"
    />
    <path
      d="M320.122 4.25977C326.636 4.25977 331.077 8.29838 331.077 15.4484C331.077 22.5984 326.636 26.637 320.122 26.637C313.607 26.637 309.167 22.5984 309.167 15.4484C309.167 8.29838 313.607 4.25977 320.122 4.25977ZM320.122 24.2738C325.02 24.2738 328.223 21.0728 328.223 15.4484C328.223 9.82394 325.019 6.62301 320.122 6.62301C315.225 6.62301 312.021 9.82394 312.021 15.4484C312.021 21.0728 315.225 24.2738 320.122 24.2738Z"
      fill="white"
    />
    <path
      d="M352.331 10.7074C352.331 14.5669 349.448 16.736 345.893 16.736H342.109L352.178 25.7706V26.2192H349.02L338.447 16.6758H338.142V26.2192H335.381V4.67871H345.649C349.357 4.67871 352.332 6.84782 352.332 10.7065L352.331 10.7074ZM345.252 14.5217C347.8 14.5217 349.615 13.2204 349.615 10.7668C349.615 8.31311 347.8 6.99763 345.252 6.99763H338.141V14.5217H345.252Z"
      fill="white"
    />
    <path d="M359.258 4.67871V26.2192H356.45V4.67871H359.258Z" fill="white" />
    <path
      d="M380.253 4.67871V6.66788L367.161 23.9002H380.573V26.2192H363.561V24.23L376.651 6.99763H364.034V4.67871H380.253Z"
      fill="white"
    />
    <path
      d="M393.71 4.25977C400.225 4.25977 404.665 8.29838 404.665 15.4484C404.665 22.5984 400.225 26.637 393.71 26.637C387.196 26.637 382.755 22.5984 382.755 15.4484C382.755 8.29838 387.196 4.25977 393.71 4.25977ZM393.71 24.2738C398.608 24.2738 401.812 21.0728 401.812 15.4484C401.812 9.82394 398.607 6.62301 393.71 6.62301C388.813 6.62301 385.609 9.82394 385.609 15.4484C385.609 21.0728 388.813 24.2738 393.71 24.2738Z"
      fill="white"
    />
    <path
      d="M412.325 4.67871L423.57 22.2249H423.814V4.67871H426.515V26.2192H423.143L411.913 8.673H411.669V26.2192H408.968V4.67871H412.325Z"
      fill="white"
    />
    <path
      d="M269.232 29.8183L261.809 11.6251L264.574 30.2626C264.637 30.6856 265.007 31 265.443 31H268.416C269.038 31 269.462 30.3844 269.232 29.8192V29.8183ZM259.044 30.2617L261.808 11.6242L254.386 29.8174C254.155 30.3827 254.579 30.9982 255.201 30.9982H258.174C258.61 30.9982 258.981 30.6847 259.044 30.2608V30.2617ZM274.281 0H249.337C247.494 0 246 1.46517 246 3.27213V27.727C246 28.0538 246.05 28.3699 246.141 28.6676C246.346 29.3308 247.229 29.4942 247.67 28.9537L261.81 11.6251L275.95 28.9537C276.391 29.4942 277.274 29.3308 277.479 28.6676C277.57 28.3699 277.62 28.0546 277.62 27.727V3.27213C277.62 1.46517 276.126 0 274.283 0H274.281Z"
      fill="white"
    />
    <defs>
      <clipPath id="clip0_3468_120723">
        <rect width="192.686" height="30.9536" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const show = Storage.get("showAwesomeNearBanner");

if (show === null) {
  return <></>;
}

if (show !== undefined && !show) {
  return <></>;
}

return (
  <Container>
    <DismissButton
      onClick={() => {
        Storage.set("showAwesomeNearBanner", false);
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L1 13M1 1L13 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </DismissButton>
    <TextContainer>
      <h4>NEAR Horizon is the new home for the NEAR Ecosystem projects</h4>
      <p>
        AwesomeNEAR is winding down, and NEAR Horizon will be your new stop for
        discovering all the amazing projects building in the NEAR ecosystem.
        <br />
        Not only will your project be easy to find, you will be able to build
        your team, connect with other founders, contributors and backers— all
        through the Horizon app. Join the movement today!
      </p>
      <a href="/nearhorizon.near/widget/Index?tab=createproject">
        Join Horizon now
      </a>
    </TextContainer>
    <GraphicContainer>
      {AwesomeNEARToHorizon}
      <img
        src="https://ipfs.near.social/ipfs/bafkreifzgbilmlylsu3ou3h36uqbbwdbsw34vye6vna5idxwv7xfpaiuk4"
        alt="Project Logos"
      />
    </GraphicContainer>
  </Container>
);

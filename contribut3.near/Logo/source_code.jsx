const size = props.size ?? 128;
const ratio = 128 / 111;
const height = size * ratio;

const Logo = styled.svg`
  .cls-1 {
    fill: #231f20;
  }
`;

const full = (
  <svg width="209" height="30" viewBox="0 0 209 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.71131 7.63291C7.01209 7.63291 5.77647 8.03456 4.72666 8.96112L2.87291 10.5671C2.71837 10.691 2.40931 10.7836 2.19347 10.5978C1.977 10.4126 1.94635 10.1655 2.13153 9.91833L3.12003 8.43558C3.27456 8.21911 3.15132 7.94133 2.87291 7.94133H0.494249C0.216473 7.94133 0 8.15781 0 8.43558V22.8927C0 23.1705 0.216473 23.387 0.494249 23.387H2.9655C3.24327 23.387 3.45975 23.1705 3.45975 22.8927V14.7376C3.45975 11.0001 6.57978 10.4132 7.75346 10.4132C10.2554 10.4132 11.1513 12.205 11.1513 13.5639V22.8927C11.1513 23.1705 11.3677 23.387 11.6455 23.387H14.1168C14.3945 23.387 14.611 23.1705 14.611 22.8927V13.2548C14.611 9.79509 12.3562 7.63291 8.71131 7.63291Z" fill="#010101" />
    <path d="M24.6808 7.57227C19.8929 7.57227 16.8348 10.5071 16.8348 14.4918V16.6852C16.8348 20.8864 19.8929 23.7593 24.6808 23.7593C28.9126 23.7593 31.8781 21.5658 32.1872 18.6003C32.2185 18.2912 32.002 18.0754 31.6929 18.0754H29.2836C29.0671 18.0754 28.882 18.1993 28.82 18.4151C28.5109 19.4036 27.0595 20.8864 24.6808 20.8864C22.3022 20.8864 20.0781 19.1565 20.1087 16.6852L20.14 13.9362C20.1706 11.8666 22.3335 10.4458 24.6808 10.4458C26.8124 10.4458 28.882 11.6508 29.0978 13.6278C29.1157 13.8564 28.9586 14.0626 28.7332 14.1061L21.8073 15.4502C21.5295 15.5122 21.313 15.7593 21.313 16.0677V16.0984C21.313 16.3762 21.5908 16.6233 21.9925 16.6233H31.9394C32.2127 16.6233 32.4337 16.4017 32.4337 16.129V14.1833C32.4337 10.5078 29.2523 7.57227 24.6808 7.57227Z" fill="#010101" />
    <path d="M41.917 7.57227C38.0556 7.57227 34.7198 9.82704 34.7198 12.7925C34.7198 13.0397 34.9362 13.2248 35.214 13.2248H37.7159C37.963 13.2248 38.1482 13.0397 38.1795 12.7925C38.4266 11.4337 40.0639 10.4452 41.8244 10.4452C43.9247 10.4452 45.3461 11.7427 45.3461 13.9669V16.6546C45.3461 19.4036 43.3072 20.7938 40.774 20.7938C38.797 20.7938 37.654 20.0524 37.654 18.8474C37.654 17.797 38.2102 16.9011 40.4956 16.3762L43.8008 15.4803C44.1405 15.3877 44.2644 15.1093 44.2025 14.8008C44.1718 14.5537 43.894 14.4298 43.6463 14.4298H40.2178C37.3143 14.4298 34.3794 16.2829 34.3794 19.0013V19.4336C34.3794 22.2139 37.0052 23.6654 40.0013 23.6654C41.9164 23.6654 43.5537 22.924 44.5728 22.0594L46.0869 20.7618C46.334 20.5454 46.5811 20.5454 46.7969 20.7618C46.9821 20.947 46.9202 21.2254 46.7657 21.4413L45.8391 22.8934C45.6846 23.1098 45.8078 23.3876 46.0862 23.3876H48.3103C48.5881 23.3876 48.8046 23.1711 48.8046 22.8934V13.5346C48.8046 9.95156 46.2408 7.5729 41.9158 7.5729L41.917 7.57227Z" fill="#010101" />
    <path d="M62.15 7.94324H58.6903C57.4859 7.94324 56.3116 8.68462 55.4777 9.39534L54.1188 10.569C53.9643 10.6929 53.6858 10.7855 53.5007 10.631C53.2842 10.4764 53.1916 10.1674 53.3774 9.92024L54.3659 8.43749C54.5204 8.22102 54.3972 7.94324 54.1188 7.94324H51.8021C51.5243 7.94324 51.3078 8.15971 51.3078 8.43749V22.8946C51.3078 23.1724 51.5243 23.3889 51.8021 23.3889H54.3353C54.613 23.3889 54.8295 23.1724 54.8295 22.8946V15.4809C54.8295 12.2989 56.1271 10.8781 58.938 10.8781H62.1507C62.4284 10.8781 62.6449 10.6616 62.6449 10.3838V8.43749C62.6449 8.15971 62.4278 7.94324 62.15 7.94324Z" fill="#010101" />
    <path d="M112.4 7.8199V14.673H120.718V7.8199H122.701V23.337H120.718V16.4188H112.4V23.337H110.428V7.8199H112.4Z" fill="#231F20" />
    <path d="M133.442 7.58784C138.043 7.58784 141.179 10.4971 141.179 15.6478C141.179 20.7985 138.043 23.7078 133.442 23.7078C128.841 23.7078 125.705 20.7985 125.705 15.6478C125.705 10.4971 128.841 7.58784 133.442 7.58784ZM133.442 22.0054C136.901 22.0054 139.164 19.6995 139.164 15.6478C139.164 11.5961 136.9 9.29025 133.442 9.29025C129.984 9.29025 127.72 11.5961 127.72 15.6478C127.72 19.6995 129.984 22.0054 133.442 22.0054Z" fill="#231F20" />
    <path d="M156.213 12.1628C156.213 14.9431 154.177 16.5057 151.666 16.5057H148.994L156.106 23.0139V23.337H153.875L146.408 16.4623H146.192V23.337H144.242V7.8199H151.494C154.113 7.8199 156.213 9.38248 156.213 12.1622V12.1628ZM151.214 14.9105C153.013 14.9105 154.295 13.9731 154.295 12.2056C154.295 10.438 153.013 9.49039 151.214 9.49039H146.192V14.9105H151.214Z" fill="#231F20" />
    <path d="M161.106 7.8199V23.337H159.123V7.8199H161.106Z" fill="#231F20" />
    <path d="M175.932 7.8199V9.25285L166.687 21.6666H176.158V23.337H164.144V21.9041L173.389 9.49039H164.478V7.8199H175.932Z" fill="#231F20" />
    <path d="M185.437 7.57227C190.038 7.57227 193.174 10.4816 193.174 15.6322C193.174 20.7829 190.038 23.6922 185.437 23.6922C180.836 23.6922 177.7 20.7829 177.7 15.6322C177.7 10.4816 180.836 7.57227 185.437 7.57227ZM185.437 21.9898C188.896 21.9898 191.158 19.6839 191.158 15.6322C191.158 11.5805 188.895 9.27468 185.437 9.27468C181.978 9.27468 179.715 11.5805 179.715 15.6322C179.715 19.6839 181.978 21.9898 185.437 21.9898Z" fill="#231F20" />
    <path d="M198.583 7.8199L206.525 20.4597H206.697V7.8199H208.605V23.337H206.223L198.292 10.6973H198.12V23.337H196.213V7.8199H198.583Z" fill="#231F20" />
    <rect x="73.9902" y="0.00195312" width="29.0189" height="29.0189" rx="6" fill="url(#paint0_linear_1624_47472)" />
    <path d="M82.7839 29.021C78.3871 29.4606 74.8696 28.5813 74.4299 26.3829L88.4742 7.96094L82.7839 29.021Z" fill="white" />
    <path d="M102.13 26.8225C100.601 28.8808 98.6124 29.4606 94.2156 29.021C94.1271 28.7425 93.8943 27.6343 93.7843 27.2086L88.4774 7.96094L102.13 26.8225Z" fill="white" />
    <defs>
      <linearGradient id="paint0_linear_1624_47472" x1="88.5366" y1="29.0209" x2="99.0957" y2="-11.4062" gradientUnits="userSpaceOnUse">
        <stop stop-color="#07B5FF" />
        <stop offset="1" stop-color="#72FFF7" />
      </linearGradient>
    </defs>
  </svg>
);

const iconOnly = (
  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.990234" y="0.00195312" width="29.0189" height="29.0189" rx="6" fill="url(#paint0_linear_1624_47475)" />
    <path d="M9.78386 29.021C5.38706 29.4606 1.86961 28.5813 1.42993 26.3829L15.4742 7.96094L9.78386 29.021Z" fill="white" />
    <path d="M29.1298 26.8225C27.6008 28.8808 25.6124 29.4606 21.2156 29.021C21.1271 28.7425 20.8943 27.6343 20.7843 27.2086L15.4774 7.96094L29.1298 26.8225Z" fill="white" />
    <defs>
      <linearGradient id="paint0_linear_1624_47475" x1="15.5366" y1="29.0209" x2="26.0957" y2="-11.4062" gradientUnits="userSpaceOnUse">
        <stop stop-color="#07B5FF" />
        <stop offset="1" stop-color="#72FFF7" />
      </linearGradient>
    </defs>
  </svg>
);

return (
  <Logo
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 3375 567"
  >
    <g>
      <g>
        <path
          class="cls-1"
          d="m739.42,157.72c-26.61,0-45.96,6.29-62.4,20.8l-29.03,25.15c-2.42,1.94-7.26,3.39-10.64.48-3.39-2.9-3.87-6.77-.97-10.64l15.48-23.22c2.42-3.39.49-7.74-3.87-7.74h-37.25c-4.35,0-7.74,3.39-7.74,7.74v226.4c0,4.35,3.39,7.74,7.74,7.74h38.7c4.35,0,7.74-3.39,7.74-7.74v-127.71c0-58.53,48.86-67.72,67.24-67.72,39.18,0,53.21,28.06,53.21,49.34v146.09c0,4.35,3.39,7.74,7.74,7.74h38.7c4.35,0,7.74-3.39,7.74-7.74v-150.93c0-54.18-35.32-88.04-92.4-88.04Z"
        />
        <path
          class="cls-1"
          d="m989.5,156.75c-74.98,0-122.87,45.96-122.87,108.36v34.35c0,65.79,47.89,110.78,122.87,110.78,66.27,0,112.71-34.35,117.55-80.79.49-4.84-2.9-8.22-7.74-8.22h-37.73c-3.39,0-6.29,1.94-7.26,5.32-4.84,15.48-27.57,38.7-64.82,38.7s-72.08-27.09-71.6-65.79l.49-43.05c.48-32.41,34.35-54.66,71.11-54.66,33.38,0,65.79,18.87,69.17,49.83h0c.28,3.58-2.18,6.81-5.71,7.49l-108.46,21.05c-4.35.97-7.74,4.84-7.74,9.67v.48c0,4.35,4.35,8.22,10.64,8.22h155.77c4.28,0,7.74-3.47,7.74-7.74v-30.47c0-57.56-49.83-103.52-121.42-103.52Z"
        />
        <path
          class="cls-1"
          d="m1259.42,156.75c-60.47,0-112.71,35.31-112.71,81.75,0,3.87,3.39,6.77,7.74,6.77h39.18c3.87,0,6.77-2.9,7.26-6.77,3.87-21.28,29.51-36.76,57.08-36.76,32.89,0,55.15,20.32,55.15,55.15v42.09c0,43.05-31.93,64.82-71.6,64.82-30.96,0-48.86-11.61-48.86-30.48,0-16.45,8.71-30.48,44.5-38.7l51.76-14.03c5.32-1.45,7.26-5.81,6.29-10.64-.48-3.87-4.83-5.81-8.71-5.81h-53.69c-45.47,0-91.43,29.02-91.43,71.59v6.77c0,43.54,41.12,66.27,88.04,66.27,29.99,0,55.63-11.61,71.59-25.15l23.71-20.32c3.87-3.39,7.74-3.39,11.12,0,2.9,2.9,1.93,7.26-.49,10.64l-14.51,22.74c-2.42,3.39-.49,7.74,3.87,7.74h34.83c4.35,0,7.74-3.39,7.74-7.74v-146.58c0-56.11-40.15-93.36-107.88-93.36Z"
        />
        <path
          class="cls-1"
          d="m1576.26,162.56h-54.18c-18.86,0-37.25,11.61-50.31,22.74l-21.28,18.38c-2.42,1.94-6.78,3.39-9.68.97-3.39-2.42-4.84-7.26-1.93-11.13l15.48-23.22c2.42-3.39.49-7.74-3.87-7.74h-36.28c-4.35,0-7.74,3.39-7.74,7.74v226.4c0,4.35,3.39,7.74,7.74,7.74h39.67c4.35,0,7.74-3.39,7.74-7.74v-116.1c0-49.83,20.32-72.08,64.34-72.08h50.31c4.35,0,7.74-3.39,7.74-7.74v-30.48c0-4.35-3.39-7.74-7.74-7.74Z"
        />
      </g>
      <path
        class="cls-1"
        d="m457.61,108c-13,0-25.07,6.74-31.88,17.82l-73.37,108.93c-2.39,3.59-1.42,8.43,2.17,10.82,2.91,1.94,6.76,1.7,9.41-.58l72.22-62.64c1.2-1.08,3.05-.97,4.13.23.49.55.75,1.26.75,1.99v196.12c0,1.62-1.31,2.92-2.93,2.92-.87,0-1.69-.38-2.24-1.05L217.56,121.24c-7.11-8.39-17.55-13.23-28.54-13.24h-7.63c-20.65,0-37.39,16.74-37.39,37.39v276.22c0,20.65,16.74,37.39,37.39,37.39,13,0,25.07-6.74,31.88-17.82l73.37-108.93c2.39-3.59,1.42-8.43-2.17-10.82-2.91-1.94-6.76-1.7-9.41.58l-72.22,62.64c-1.2,1.08-3.05.97-4.13-.23-.49-.55-.75-1.26-.74-1.99v-196.17c0-1.62,1.31-2.92,2.93-2.92.86,0,1.69.38,2.24,1.05l218.28,261.37c7.11,8.39,17.55,13.23,28.54,13.24h7.63c20.65.01,37.4-16.72,37.42-37.37V145.39c0-20.65-16.74-37.39-37.39-37.39Z"
      />
    </g>
    <g>
      <path
        class="cls-1"
        d="m1723.39,162v107.32h130.27v-107.32h31.05v243h-31.05v-108.34h-130.27v108.34h-30.88v-243h30.88Z"
      />
      <path
        class="cls-1"
        d="m2053.29,157.28c72.05,0,121.16,45.56,121.16,126.22s-49.11,126.22-121.16,126.22-121.16-45.56-121.16-126.22,49.11-126.22,121.16-126.22Zm0,225.78c54.17,0,89.6-36.11,89.6-99.56s-35.44-99.56-89.6-99.56-89.6,36.11-89.6,99.56,35.44,99.56,89.6,99.56Z"
      />
      <path
        class="cls-1"
        d="m2409.52,230.01c0,43.54-31.89,68.01-71.21,68.01h-41.85l111.37,101.92v5.06h-34.93l-116.94-107.66h-3.38v107.66h-30.54v-243h113.57c41.01,0,73.91,24.47,73.91,68Zm-78.3,43.03c28.18,0,48.26-14.68,48.26-42.36s-20.08-42.52-48.26-42.52h-78.64v84.88h78.64Z"
      />
      <path class="cls-1" d="m2486.13,162v243h-31.05v-243h31.05Z" />
      <path
        class="cls-1"
        d="m2718.32,162v22.44l-144.79,194.4h148.33v26.16h-188.15v-22.44l144.78-194.4h-139.55v-26.16h179.38Z"
      />
      <path
        class="cls-1"
        d="m2867.16,157.28c72.05,0,121.16,45.56,121.16,126.22s-49.11,126.22-121.16,126.22-121.16-45.56-121.16-126.22,49.11-126.22,121.16-126.22Zm0,225.78c54.17,0,89.6-36.11,89.6-99.56s-35.44-99.56-89.6-99.56-89.6,36.11-89.6,99.56,35.44,99.56,89.6,99.56Z"
      />
      <path
        class="cls-1"
        d="m3073.03,162l124.37,197.94h2.7v-197.94h29.87v243h-37.29l-124.2-197.94h-2.7v197.94h-29.87v-243h37.12Z"
      />
    </g>
  </Logo>
);

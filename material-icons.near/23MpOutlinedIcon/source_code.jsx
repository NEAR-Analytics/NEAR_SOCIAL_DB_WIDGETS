const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M7.5,14h1v3H10v-3h1v4.5h1.5v-5c0-0.55-0.45-1-1-1H7c-0.55,0-1,0.45-1,1v5h1.5V14z"/><path d="M13.5,12.5v6H15V17h2c0.55,0,1-0.45,1-1v-2.5c0-0.55-0.45-1-1-1H13.5z M16.5,15.5H15V14h1.5V15.5z"/><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/><path d="M11,10H8V9h2c0.55,0,1-0.45,1-1V6.5c0-0.55-0.45-1-1-1H6.5V7h3v1h-2c-0.55,0-1,0.45-1,1v2.5H11V10z"/><path d="M17.5,10.5v-4c0-0.55-0.45-1-1-1H13V7h3v1h-2v1h2v1h-3v1.5h3.5C17.05,11.5,17.5,11.05,17.5,10.5z"/></g></g></svg>;
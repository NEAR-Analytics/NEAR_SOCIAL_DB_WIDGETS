const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M18,13h1v2h-5V9h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1h-6c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h5c1.1,0,2-0.9,2-2v-3 c0-0.55-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1v0C17,12.55,17.45,13,18,13z"/><path d="M4,13h4v2H4c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h4c1.1,0,2-0.9,2-2v-2c0-1.1-0.9-2-2-2H5V9h4c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4C3.45,7,3,7.45,3,8v4C3,12.55,3.45,13,4,13z"/></g></g></svg>;
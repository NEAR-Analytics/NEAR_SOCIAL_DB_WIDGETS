const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M8,12.5h1.5V14H8V12.5z M8,10h1.5v1.5H8V10z M21,3H3v18h18V3z M11,10v4c0,0.55-0.45,1-1,1H7.5c-0.55,0-1-0.45-1-1v-4 c0-0.55,0.45-1,1-1H10C10.55,9,11,9.45,11,10z M18,15h-1.75l-1.75-2.25V15H13V9h1.5v2.25L16.25,9H18l-2.25,3L18,15z"/></g></svg>;
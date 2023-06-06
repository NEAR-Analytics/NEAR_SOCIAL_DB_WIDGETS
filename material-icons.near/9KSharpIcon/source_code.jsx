const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M8,10h1.5v1.5H8V10z M21,3H3v18h18V3z M11,9v6H6.5v-1.5h3v-1h-3V9H11z M18,15h-1.75l-1.75-2.25V15H13V9h1.5v2.25L16.25,9 H18l-2.25,3L18,15z"/></g></svg>;
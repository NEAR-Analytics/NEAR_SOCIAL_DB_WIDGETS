const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M21,3H3v18h18V3z M8,12.5v1h3V15H6.5v-3.5h3v-1h-3V9H11v3.5H8z M18,15h-1.75l-1.75-2.25V15H13V9h1.5v2.25L16.25,9H18 l-2.25,3L18,15z"/></g></svg>;
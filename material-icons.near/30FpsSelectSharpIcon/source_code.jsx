const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M4,4v2h5v2H5v2h4v2H4v2h7V4H4z M13,4h7v10h-7V4z M18,6h-3v6h3V6z M5,22H3v-5h2V22z M9,22H7v-5h2V22z M13,22h-2v-5h2V22z M21,22h-6v-5h6V22z"/></g></g></svg>;
const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M3,3v18h18V3H3z M12,8h3V7h-3V5.5h4.5V9h-3v1h3v1.5H12V8z M7,5.5h3v6H8.5V7H7V5.5z M12.5,18.5H11V14h-1v3H8.5v-3h-1v4.5H6 v-6h6.5V18.5z M18,17h-3v1.5h-1.5v-6H18V17z"/><rect height="1.5" width="1.5" x="15" y="14"/></g></g></svg>;
const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><rect height="1.5" width="1.5" x="15" y="14"/><path d="M3,3v18h18V3H3z M12,5.5h1.5v3H15v-3h1.5v3h1V10h-1v1.5H15V10h-3V5.5z M7,5.5h3v6H8.5V7H7V5.5z M12.5,18.5H11V14h-1v3H8.5 v-3h-1v4.5H6v-6h6.5V18.5z M18,17h-3v1.5h-1.5v-6H18V17z"/></g></g></svg>;
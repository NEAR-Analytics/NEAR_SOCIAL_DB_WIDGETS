const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><path d="M0,0h24v24H0V0z" fill={fill ?? "currentColor"}/></g><g><g><path d="M3,7v2h5v2H4v2h4v2H3v2h7V7H3z M21,11v6h-9V7h9v2h-7v6h5v-2h-2.5v-2H21z"/></g></g></svg>;
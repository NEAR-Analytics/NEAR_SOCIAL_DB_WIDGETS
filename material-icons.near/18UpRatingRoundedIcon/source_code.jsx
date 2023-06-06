const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><rect height="1.5" width="1.5" x="13" y="12.5"/><rect height="1.5" width="1.5" x="13" y="10"/><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M9.25,15L9.25,15 c-0.41,0-0.75-0.34-0.75-0.75V10.5H7.75C7.34,10.5,7,10.16,7,9.75v0C7,9.34,7.34,9,7.75,9H9c0.55,0,1,0.45,1,1v4.25 C10,14.66,9.66,15,9.25,15z M16,14c0,0.55-0.45,1-1,1h-2.5c-0.55,0-1-0.45-1-1v-4c0-0.55,0.45-1,1-1H15c0.55,0,1,0.45,1,1V14z"/></g></g></svg>;
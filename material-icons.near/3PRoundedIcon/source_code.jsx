const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M20,2H4.01c-1.1,0-2,0.9-2,2L2,19.58c0,0.89,1.08,1.34,1.71,0.71L6,18h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M12,6 c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,6,12,6z M16,14H8v-0.57c0-0.81,0.48-1.53,1.22-1.85C10.07,11.21,11.01,11,12,11 c0.99,0,1.93,0.21,2.78,0.58C15.52,11.9,16,12.62,16,13.43V14z"/></g></svg>;
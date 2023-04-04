if (!props.type) return "Type is required to render notification";

const alertProps = {
  info: { alertType: "alert-info", icon: "bi-info-circle" },
  warning: { alertType: "alert-warning", icon: "bi-exclamation-triangle" },
  danger: { alertType: "alert-danger", icon: "bi-exclamation-triangle" },
  success: { alertType: "alert-success", icon: "bi-check-circle" },
}[props.type];
return (
  <div
    class={`alert d-flex justify-content-between ${alertProps.alertType}`}
    role="alert"
  >
    <i class={`bi ${alertProps.icon}`}></i>
    <div>{props.message}</div>
  </div>
);

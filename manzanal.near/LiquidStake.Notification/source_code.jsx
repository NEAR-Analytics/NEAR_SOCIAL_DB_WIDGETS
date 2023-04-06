if (!props.type) return "Type is required to render notification";

const alertProps = {
  info: { alertType: "alert-info", icon: "bi-info-circle" },
  warning: { alertType: "alert-warning", icon: "bi-exclamation-triangle" },
  danger: { alertType: "alert-danger", icon: "bi-exclamation-triangle" },
  success: { alertType: "alert-success", icon: "bi-check-circle" },
}[props.type];

const Button = styled.button`
box-sizing: border-box;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
background: #FFFFFF;
border: 2px solid #0C2246;
border-radius: 1000px;
`;
return (
  <div
    class={`${
      props.fontSize ? props.fontSize : "fs-4"
    } alert d-flex justify-content-between ${alertProps.alertType}`}
    role="alert"
  >
    <i class={`bi ${alertProps.icon}`}></i>
    <div>{props.message}</div>
    {props.button && <Button {...props.button} />}
  </div>
);

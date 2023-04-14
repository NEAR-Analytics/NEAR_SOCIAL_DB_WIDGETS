const ownerId = "contribut3.near";

const createNewButton = ({ id, text, icon, kind }) => (
  <li>
    <a
      className="dropdown-item"
      href={`/#/${ownerId}/widget/Index?tab=create&content=${id}${kind ? "&kind=" + kind : ""
        }`}
      onClick={() => props.update({ tab: "create", content: id, kind })}
    >
      <i className={icon} />
      <span>{text}</span>
    </a>
  </li>
);

return (
  <div className="dropdown">
    <a
      className="btn btn-info dropdown-toggle"
      style={{ backgroundColor: "#7f56d9", borderColor: "#7f56d9" }}
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Create new...
    </a>
    <ul className="dropdown-menu">
      {createNewButton({
        id: "request",
        text: "Contribution request",
        icon: "bi-ui-checks-grid",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {createNewButton({
        id: "entity",
        text: "Project",
        icon: "bi-boxes",
        kind: "Project",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {createNewButton({
        id: "entity",
        text: "Organization",
        icon: "bi-diagram-2",
        kind: "Organization",
      })}
    </ul>
  </div>
);
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_721_25679)">
<path d="M3.74984 18.3333V14.1667M3.74984 5.83334V1.66667M1.6665 3.75001H5.83317M1.6665 16.25H5.83317M10.8332 2.5L9.38802 6.25739C9.15301 6.86842 9.03551 7.17393 8.85278 7.43091C8.69083 7.65867 8.49184 7.85766 8.26408 8.01961C8.00709 8.20234 7.70158 8.31985 7.09055 8.55486L3.33317 10L7.09056 11.4452C7.70158 11.6802 8.00709 11.7977 8.26408 11.9804C8.49184 12.1423 8.69083 12.3413 8.85278 12.5691C9.03551 12.8261 9.15301 13.1316 9.38802 13.7426L10.8332 17.5L12.2783 13.7426C12.5133 13.1316 12.6308 12.8261 12.8136 12.5691C12.9755 12.3413 13.1745 12.1423 13.4023 11.9804C13.6592 11.7977 13.9648 11.6802 14.5758 11.4452L18.3332 10L14.5758 8.55486C13.9648 8.31985 13.6592 8.20234 13.4023 8.01961C13.1745 7.85766 12.9755 7.65867 12.8136 7.43091C12.6308 7.17393 12.5133 6.86842 12.2783 6.25739L10.8332 2.5Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_721_25679">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

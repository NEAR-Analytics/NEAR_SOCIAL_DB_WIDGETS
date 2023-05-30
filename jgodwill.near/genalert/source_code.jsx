const Toast = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  align-conten: center;
  top: 90px;
  right: 25px;
  background-color: red;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  z-index: 10000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  &>p{
    margin:0px;
    padding: 0px;
  }
`;

return (
  <>
    <Toast>
      <p>
        {props.toastMessage || "Make sure all required fields are popuplated!"}
      </p>
    </Toast>
  </>
);

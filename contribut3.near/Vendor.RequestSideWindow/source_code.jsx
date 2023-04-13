const ownerId = "contribut3.near";
const accountId = props.accountId;

const personPlus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5.25L14.25 7.5M14.25 7.5L16.5 5.25M14.25 7.5V3M12 15.75V14.85C12 13.5899 12 12.9598 11.7548 12.4785C11.539 12.0552 11.1948 11.711 10.7715 11.4952C10.2902 11.25 9.66012 11.25 8.4 11.25H5.1C3.83988 11.25 3.20982 11.25 2.72852 11.4952C2.30516 11.711 1.96095 12.0552 1.74524 12.4785C1.5 12.9598 1.5 13.5899 1.5 14.85V15.75M9.375 5.625C9.375 7.07475 8.19975 8.25 6.75 8.25C5.30025 8.25 4.125 7.07475 4.125 5.625C4.125 4.17525 5.30025 3 6.75 3C8.19975 3 9.375 4.17525 9.375 5.625Z"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseButton = styled.button`
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Request a contribution",
      description: "Request a contribution from this vendor",
      trigger: <>{personPlus}Request contribution</>,
      children: (
        <Container>
          <Widget src={`${ownerId}/widget/Vendor.RequestForm`} />
          <Footer>
            <Dialog.Close asChild>
              <CloseButton>Close</CloseButton>
            </Dialog.Close>
            <Widget
              src={`${ownerId}/widget/Buttons.Green`}
              props={{
                text: (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.87464 10.1251L15.7496 2.25013M7.97033 10.3712L9.94141 15.4397C10.1151 15.8862 10.2019 16.1094 10.327 16.1746C10.4354 16.2311 10.5646 16.2312 10.6731 16.1748C10.7983 16.1098 10.8854 15.8866 11.0596 15.4403L16.0023 2.77453C16.1595 2.37164 16.2381 2.1702 16.1951 2.04148C16.1578 1.92969 16.0701 1.84197 15.9583 1.80462C15.8296 1.76162 15.6281 1.84023 15.2252 1.99746L2.55943 6.94021C2.11313 7.11438 1.88997 7.20146 1.82494 7.32664C1.76857 7.43516 1.76864 7.56434 1.82515 7.67279C1.89033 7.7979 2.11358 7.88472 2.56009 8.05836L7.62859 10.0294C7.71923 10.0647 7.76455 10.0823 7.80271 10.1095C7.83653 10.1337 7.86611 10.1632 7.89024 10.1971C7.91746 10.2352 7.93508 10.2805 7.97033 10.3712Z"
                        stroke="#11181C"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Send request
                  </>
                ),
                onClick: () => {
                  console.log("Send request");
                },
              }}
            />
          </Footer>
        </Container>
      ),
    }}
  />
);

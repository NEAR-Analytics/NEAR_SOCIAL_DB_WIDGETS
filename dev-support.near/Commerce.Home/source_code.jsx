const product = {
  title: "A simple product",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo. Fusce euismod magna et sapien varius, ut ultrices lacus aliquet.",
  link: "#",
  price: "1",
  img: "https://docs.near.org/assets/images/protocol-b73c2a3ace3307226ee7eb2149ee432f.png"
}

const products = [product, product, product, product]

return <>
  <div class="row">
    {products.map(product => (
      <>
        <div class="col-6">
          <Widget
            src="dev-support.near/widget/Commerce.Product.Preview"
            props={{ ...product }}
          />
        </div>
      </>
    ))}
  </div>
</>
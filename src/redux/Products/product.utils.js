export const existingProductItem = ({ prevProductItems, nextProductItems }) => {
  return prevProductItems.find(
    (productItem) => productItem.documentId === nextProductItems.documentId
  );
};
export const handleFilterProducts = ({ prevProductItems, size }) => {
  let product = [];
  if (size === "") {
    product = [...prevProductItems];
  } else {
    product = prevProductItems.filter(
      (el) => el.productSizes.indexOf(size) >= 0
    );
  }
  return [...product];
};

export const handleFilterProductByPrice = ({ prevProductItems, price }) => {
  console.log({ prevProductItems, price });
  let product = [];
  if (price === "") {
    product = [...prevProductItems];
  } else {
    product = prevProductItems.sort((a, b) =>
      price === "Lowest"
        ? Number(a.productPrice) > Number(b.productPrice)
          ? 1
          : -1
        : Number(a.productPrice) > Number(b.productPrice)
        ? -1
        : 1
    );
  }
  console.log(product);
  return [...product];
};

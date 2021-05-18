export const existingCartItem = ({ prevCartItems, nextCartItems }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.documentId === nextCartItems.documentId
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItems }) => {
  const quantityIncrement = 1;
  const cartItemExisting = existingCartItem({ prevCartItems, nextCartItems });

  if (cartItemExisting) {
    return prevCartItems.map((cartItem) =>
      cartItem.documentId === nextCartItems.documentId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }

  const newCartItem = [
    ...prevCartItems,
    {
      ...nextCartItems,
      quantity: quantityIncrement,
      size: "L",
    },
  ];
  localStorage.setItem("cartItems", JSON.stringify(newCartItem));
  return newCartItem;
};

export const handleAddToCartFromDetail = ({ prevCartItems, nextCartItems }) => {
  const cartItemExisting = existingCartItem({ prevCartItems, nextCartItems });
  if (cartItemExisting) {
    return prevCartItems.map((cartItem) =>
      cartItem.documentId === nextCartItems.documentId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + nextCartItems.quantity,
          }
        : cartItem
    );
  }
  return [
    ...prevCartItems,
    {
      ...nextCartItems.product,
      quantity: nextCartItems.quantity,
      size: nextCartItems.size,
    },
  ];
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  const newCartItem = prevCartItems.filter(
    (item) => item.documentId !== cartItemToRemove.documentId
  );
  localStorage.setItem("cartItems", JSON.stringify(newCartItem));
  return newCartItem;
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.documentId === cartItemToReduce.documentId
  );
  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      (cartItem) => cartItem.documentId !== existingCartItem.documentId
    );
  }

  const newCartItem = prevCartItems.map((cartItem) =>
    cartItem.documentId === existingCartItem.documentId
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
  localStorage.setItem("cartItems", JSON.stringify(newCartItem));
  return newCartItem;
};

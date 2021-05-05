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

  return [
    ...prevCartItems,
    {
      ...nextCartItems,
      quantity: quantityIncrement,
    },
  ];
};

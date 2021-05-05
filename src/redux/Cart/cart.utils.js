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

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter(
    (item) => item.documentId !== cartItemToRemove.documentId
  );
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

  return prevCartItems.map((cartItem) =>
    cartItem.documentId === existingCartItem.documentId
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};

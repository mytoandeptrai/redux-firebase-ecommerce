export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true;

  return false;
};

export default function formatCurrency(number) {
  return "$" + Number(number.toFixed(1).toLocaleString()) + " ";
}

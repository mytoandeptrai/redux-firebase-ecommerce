import contactTypes from "./contact.types";
export const saveContactStart = (contact) => ({
  type: contactTypes.SAVE_CONTACT_START,
  payload: contact,
});

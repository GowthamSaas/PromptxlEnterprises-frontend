import api from "./api";

export const aiModifierAPI = {
  modify(data) {
    return api.post("/ai-modifier/modify", data);
  },
};
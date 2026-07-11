import api from "./api";

export const aiChatAPI = {
  sendMessage(data) {
    return api.post("/ai-chat/send", data);
  },

  getSessions() {
    return api.get("/ai-chat/sessions");
  },

  getHistory(sessionId) {
    return api.get(`/ai-chat/history/${sessionId}`);
  },

  deleteSession(sessionId) {
    return api.delete(`/ai-chat/${sessionId}`);
  },
};
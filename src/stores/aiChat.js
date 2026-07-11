import { defineStore } from "pinia";

import { aiChatAPI } from "../services/aiChat";

export const useAIChatStore = defineStore("aiChat", {
  state: () => ({
    loading: false,

    sessionId: null,

    sessions: [],

    messages: [],

    error: null,
  }),

  actions: {
    async sendMessage(payload) {

  this.loading = true;
  this.error = null;

  try {

    const { data } =
      await aiChatAPI.sendMessage(payload);

    this.sessionId = data.session_id;

    this.messages.push({

      role: "user",

      message: payload.prompt,

    });

    this.messages.push({

      role: "assistant",

      message: data.message,

    });

    return data;

  }
  catch (error) {

    this.error =
      error.response?.data?.detail ||
      error.message;

    throw error;

  }
  finally {

    this.loading = false;

  }

},

    async loadSessions() {
      try {
        const { data } =await aiChatAPI.getSessions();

this.sessions = data;
      } catch (error) {
        console.error(error);
      }
    },

    async loadHistory(sessionId) {

  try {

    const { data } =
      await aiChatAPI.getHistory(
        sessionId
      );

    this.messages = data;

    this.sessionId = sessionId;

  }
  catch (error) {

    console.error(error);

  }

},

    async deleteSession(sessionId) {
      try {
        await aiChatAPI.deleteSession(
          sessionId
        );

        this.sessions = this.sessions.filter(
          (item) => item.id !== sessionId
        );

        if (this.sessionId === sessionId) {
          this.sessionId = null;
          this.messages = [];
        }
      } catch (error) {
        console.error(error);
      }
    },

    clearChat() {
      this.sessionId = null;
      this.messages = [];
      this.error = null;
    },
  },
});
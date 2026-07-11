import { defineStore } from "pinia";

import { aiModifierAPI } from "../services/aiModifier";

export const useAIModifierStore = defineStore("aiModifier", {
  state: () => ({
    loading: false,

    success: false,

    message: "",

    modifiedFiles: [],

    error: null,
  }),

  actions: {
    async modifyProject(payload) {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const response = await aiModifierAPI.modify(payload);

        this.success = response.data.success;

        this.message = response.data.message;

        this.modifiedFiles =
          response.data.modified_files || [];

        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.detail ||
          error.message;

        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearModifier() {
      this.success = false;
      this.message = "";
      this.modifiedFiles = [];
      this.error = null;
    },
  },
});
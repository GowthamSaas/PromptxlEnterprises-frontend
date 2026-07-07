import { defineStore } from "pinia";
import { generateAPI } from "../services/generate";

export const useGenerateStore = defineStore("generate", {
  state: () => ({
    loading: false,
    error: null,

    response: null,

    projectId: null,
    projectName: null,

    provider: null,
    model: null,

    success: false,
  }),

  actions: {
    async generate(payload) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await generateAPI.generate(payload);

        this.success = data.success;

        this.projectId = data.project_id;
        this.projectName = data.project_name;

        this.provider = data.provider;
        this.model = data.model;

        this.response = data.response;

        return data;

      } catch (error) {

        this.error =
          error.response?.data?.detail ||
          "Failed to generate application.";

        throw error;

      } finally {

        this.loading = false;

      }
    },

    reset() {

      this.loading = false;
      this.error = null;

      this.response = null;

      this.projectId = null;
      this.projectName = null;

      this.provider = null;
      this.model = null;

      this.success = false;

    },
  },
});
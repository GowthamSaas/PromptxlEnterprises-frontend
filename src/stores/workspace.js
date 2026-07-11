import { defineStore } from "pinia";

export const useWorkspaceStore = defineStore(
  "workspace",
  {
    state: () => ({

      currentMode: "generate",

    }),

    actions: {

      setMode(mode) {

        this.currentMode = mode;

      },

    },

  }
);
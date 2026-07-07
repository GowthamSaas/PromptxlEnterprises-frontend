import { defineStore } from "pinia";
import { projectFilesAPI } from "../services/projectFiles";

export const useProjectFilesStore = defineStore(
  "projectFiles",
  {
    state: () => ({

  currentProjectId: null,

  tree: [],

  files: [],

  currentFile: null,

  loading: false,

  error: null,

}),

    actions: {

  // Explorer Tree
  async fetchTree(projectId) {

    this.loading = true;
    this.error = null;

    try {

      const response =
        await projectFilesAPI.getProjectTree(
          projectId
        );

      this.tree = response.data;
      this.currentProjectId = projectId;

      return response.data;

    } catch (error) {

      this.error =
        error.response?.data?.detail ||
        "Failed to fetch project tree.";

      throw error;

    } finally {

      this.loading = false;

    }

  },

  // 👇 ADD HERE (New Action)
  findFirstFile(nodes = this.tree) {

    for (const node of nodes) {

      if (node.type === "file") {
        return node;
      }

      if (node.children?.length) {

        const found = this.findFirstFile(
          node.children
        );

        if (found) {
          return found;
        }

      }

    }

    return null;

  },
      

      // All Files
      async fetchFiles(projectId) {
        this.loading = true;
        this.error = null;

        try {

          const response =
            await projectFilesAPI.getProjectFiles(
              projectId
            );

          this.files = response.data;

          return response.data;

        } catch (error) {

          this.error =
            error.response?.data?.detail ||
            "Failed to fetch project files.";

          throw error;

        } finally {

          this.loading = false;

        }
      },

      // Open File
      async openFile(fileId) {

  this.loading = true;
  this.error = null;

  try {

    const response =
      await projectFilesAPI.getProjectFile(fileId);

    this.currentFile = response.data;

    return response.data;

  } catch (error) {

    this.error =
      error.response?.data?.detail ||
      "Failed to open file.";

    throw error;

  } finally {

    this.loading = false;

  }
},

      // Save File
      // Save File
async saveFile(fileId, content) {

  this.loading = true;

  this.error = null;

  try {

    const response =
      await projectFilesAPI.updateProjectFile(
        fileId,
        content
      );

    this.currentFile = response.data;

    // ✅ Update file list also
    const index = this.files.findIndex(
      file => file.id === fileId
    );

    if (index !== -1) {
      this.files[index] = response.data;
    }

    return response.data;

  } catch (error) {

    this.error =
      error.response?.data?.detail ||
      "Failed to save file.";

    throw error;

  } finally {

    this.loading = false;

  }
},

      // Create File
      async createFile(data) {

        const response =
          await projectFilesAPI.createProjectFile(
            data
          );

        return response.data;
      },

      // Rename File
      async renameFile(fileId, fileName) {

        const response =
          await projectFilesAPI.renameProjectFile(
            fileId,
            fileName
          );

        return response.data;
      },

      // Delete File
      async deleteFile(fileId) {

        await projectFilesAPI.deleteProjectFile(
          fileId
        );
      },

      clear() {

  this.currentProjectId = null;

  this.tree = [];

  this.files = [];

  this.currentFile = null;

  this.error = null;

},
    },
  }
);
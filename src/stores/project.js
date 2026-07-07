import { defineStore } from "pinia";
import { projectAPI } from "../services/project";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    currentProject: null,
    loading: false,
    error: null,
  }),

  getters: {
    projectCount: (state) => state.projects.length,
  },

  actions: {
    // Get all projects
    async fetchProjects() {
      this.loading = true;
      this.error = null;

      try {
        const response = await projectAPI.getProjects();
        this.projects = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.detail ||
          "Failed to fetch projects.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get project by ID
    async fetchProject(projectId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await projectAPI.getProject(projectId);
        this.currentProject = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.detail ||
          "Failed to fetch project.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Create project
    async createProject(data) {
      this.loading = true;
      this.error = null;

      try {
        const response = await projectAPI.createProject(data);

        this.projects.unshift(response.data);

        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.detail ||
          "Failed to create project.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Update project
    async updateProject(projectId, data) {
      this.loading = true;
      this.error = null;

      try {
        const response = await projectAPI.updateProject(
          projectId,
          data
        );

        this.currentProject = response.data;

        const index = this.projects.findIndex(
          (project) => project.id === projectId
        );

        if (index !== -1) {
          this.projects[index] = response.data;
        }

        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.detail ||
          "Failed to update project.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Delete project
    async deleteProject(projectId) {
      this.loading = true;
      this.error = null;

      try {
        await projectAPI.deleteProject(projectId);

        this.projects = this.projects.filter(
          (project) => project.id !== projectId
        );

        if (
          this.currentProject &&
          this.currentProject.id === projectId
        ) {
          this.currentProject = null;
        }
      } catch (error) {
        this.error =
          error.response?.data?.detail ||
          "Failed to delete project.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Export project
    // Export project
async exportProject(projectId) {
  try {
    const response = await projectAPI.exportProject(projectId);

    const project = this.projects.find(
      (p) => p.id === projectId
    );

    let filename = project
      ? `${project.name}.zip`
      : `project-${projectId}.zip`;

    console.log("Project:", project);
    console.log("Filename:", filename);
    console.log("Headers:", response.headers);
    console.log(
      "Content-Disposition:",
      response.headers["content-disposition"]
    );

    const url = URL.createObjectURL(response.data);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);

    this.error =
      error.response?.data?.detail ||
      "Failed to export project.";

    throw error;
  }
}
  },
});
import api from "./api";

export const projectAPI = {
  // Get all projects
  getProjects() {
    return api.get("/projects");
  },

  // Get project by ID
  getProject(projectId) {
    return api.get(`/projects/${projectId}`);
  },

  // Create project
  createProject(data) {
    return api.post("/projects", data);
  },

  // Update project
  updateProject(projectId, data) {
    return api.put(`/projects/${projectId}`, data);
  },

  // Delete project
  deleteProject(projectId) {
    return api.delete(`/projects/${projectId}`);
  },

  // Export project (ZIP)
  exportProject(projectId) {
    return api.get(`/projects/${projectId}/export`, {
      responseType: "blob",
    });
  },
};
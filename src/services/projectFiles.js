import api from "./api";

export const projectFilesAPI = {
  // Explorer Tree
  getProjectTree(projectId) {
    return api.get(`/project-files/project/${projectId}/tree`);
  },

  // Get all files
  getProjectFiles(projectId) {
    return api.get(`/project-files/project/${projectId}`);
  },

  // Open file
  getProjectFile(fileId) {
    return api.get(`/project-files/${fileId}`);
  },

  // Save file
  updateProjectFile(fileId, content) {
    return api.put(`/project-files/${fileId}`, {
      content,
    });
  },

  // Create file
  createProjectFile(data) {
    return api.post("/project-files", data);
  },

  // Rename file
  renameProjectFile(fileId, fileName) {
    return api.put(`/project-files/${fileId}/rename`, {
      file_name: fileName,
    });
  },

  // Delete file
  deleteProjectFile(fileId) {
    return api.delete(`/project-files/${fileId}`);
  },
};
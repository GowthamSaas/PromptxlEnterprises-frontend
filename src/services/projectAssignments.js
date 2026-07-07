import api from "./api";

export const projectAssignmentsAPI = {
  // Assign project to a user
  assignProject(data) {
    return api.post("/project-assignments", data);
  },

  // Get all projects assigned to a user
  getUserAssignments(userId) {
    return api.get(`/project-assignments/user/${userId}`);
  },

  // Get all users assigned to a project
  getProjectAssignments(projectId) {
    return api.get(`/project-assignments/project/${projectId}`);
  },

  // Remove project assignment
  removeAssignment(userId, projectId) {
    return api.delete(
      `/project-assignments/${userId}/${projectId}`
    );
  },
  // Get all projects assigned to the current user
   getMyProjects() {
    return api.get("/project-assignments/my-projects");
  },
};
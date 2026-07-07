import { defineStore } from "pinia";
import { projectAssignmentsAPI } from "../services/projectAssignments";

export const useProjectAssignmentsStore = defineStore(
  "projectAssignments",
  {
    state: () => ({
      assignments: [],
      myProjects: [],
      loading: false,
      error: null,
    }),

    actions: {
      // Get all projects assigned to a user
      async fetchUserAssignments(userId) {
        this.loading = true;
        this.error = null;

        try {
          const response =
            await projectAssignmentsAPI.getUserAssignments(
              userId
            );

          this.assignments = response.data;

          return response.data;
        } catch (error) {
          this.error =
            error.response?.data?.detail ||
            "Failed to fetch user assignments.";

          throw error;
        } finally {
          this.loading = false;
        }
      },

      // Get all users assigned to a project
      async fetchProjectAssignments(projectId) {
        this.loading = true;
        this.error = null;

        try {
          const response =
            await projectAssignmentsAPI.getProjectAssignments(
              projectId
            );

          this.assignments = response.data;

          return response.data;
        } catch (error) {
          this.error =
            error.response?.data?.detail ||
            "Failed to fetch project assignments.";

          throw error;
        } finally {
          this.loading = false;
        }
      },

      // Assign project to a user
      async assignProject(data) {
        this.loading = true;
        this.error = null;

        try {
          const response =
            await projectAssignmentsAPI.assignProject(
              data
            );

          this.assignments.push(response.data);

          return response.data;
        } catch (error) {
          this.error =
            error.response?.data?.detail ||
            "Failed to assign project.";

          throw error;
        } finally {
          this.loading = false;
        }
      },


      // Get projects assigned to current logged-in user
      async fetchMyProjects() {
        this.loading = true;
        this.error = null;

      try {
      const response =
        await projectAssignmentsAPI.getMyProjects();

      this.myProjects = response.data;

    return response.data;
  } catch (error) {
    this.error =
      error.response?.data?.detail ||
      "Failed to fetch my projects.";

    throw error;
  } finally {
    this.loading = false;
  }
},

      // Remove assignment
      async removeAssignment(
        userId,
        projectId
      ) {
        this.loading = true;
        this.error = null;

        try {
          await projectAssignmentsAPI.removeAssignment(
            userId,
            projectId
          );

          this.assignments =
            this.assignments.filter(
              (assignment) =>
                !(
                  assignment.user_id === userId &&
                  assignment.project_id === projectId
                )
            );
        } catch (error) {
          this.error =
            error.response?.data?.detail ||
            "Failed to remove assignment.";

          throw error;
        } finally {
          this.loading = false;
        }
      },
    },
  }
);
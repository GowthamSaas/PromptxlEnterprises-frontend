<template>
  <Card class="project-card">

    <template #title>

      <div class="card-header">

        <div>

          <h3>

            <span v-if="selectedUser">

              Projects for {{ selectedUser.full_name }}

            </span>

            <span v-else>

              Select User

            </span>

          </h3>

          <small>

            Assign or remove projects

          </small>

        </div>

        <Button
          icon="pi pi-refresh"
          severity="secondary"
          text
          rounded
          @click="refreshProjects"
        />

      </div>

    </template>

    <template #content>

      <div
        v-if="!selectedUser"
        class="empty-state"
      >

        <i
          class="pi pi-users"
          style="font-size:3rem;"
        />

        <h3>

          Select User

        </h3>

        <p>

          Choose a user from the left panel.

        </p>

      </div>

      <template v-else>

        <IconField class="w-full mb-3">

          <InputIcon class="pi pi-search" />

          <InputText
            v-model="search"
            placeholder="Search Projects..."
            fluid
          />

        </IconField>

        <div class="project-list">

          <div

            v-for="project in filteredProjects"

            :key="project.id"

            class="project-item"

          >

            <Checkbox

              :inputId="'project-'+project.id"

              :binary="false"

              :value="project.id"

              v-model="assignedProjectIds"

              @change="handleAssignment(project.id)"

            />

            <label
              :for="'project-'+project.id"
              class="project-info"
            >

              <div>

                <strong>

                  {{ project.name }}

                </strong>

                <small>

                  {{ project.description }}

                </small>

              </div>

              <Tag
                :value="project.provider"
                severity="info"
              />

            </label>

          </div>

        </div>

      </template>

    </template>

  </Card>

</template>

<script setup>

import {

ref,

computed,

watch,

onMounted,

} from "vue";

import { useToast } from "primevue/usetoast";

import Card from "primevue/card";

import Button from "primevue/button";

import Checkbox from "primevue/checkbox";

import Tag from "primevue/tag";

import InputText from "primevue/inputtext";

import IconField from "primevue/iconfield";

import InputIcon from "primevue/inputicon";

import {

useProjectStore,

} from "../../stores/project";

import {

useProjectAssignmentsStore,

} from "../../stores/projectAssignments";

const props = defineProps({

selectedUser:Object,

});

const toast = useToast();

const projectStore =

useProjectStore();

const assignmentStore =

useProjectAssignmentsStore();

const search = ref("");

const assignedProjectIds = ref([]);

const originalAssignedIds = ref([]);

watch(
  () => props.selectedUser,
  async (user) => {
    if (!user) {
      assignedProjectIds.value = [];
      originalAssignedIds.value = [];
      return;
    }

    try {
      const assignments =
        await assignmentStore.fetchUserAssignments(
          user.id
        );

      assignedProjectIds.value = assignments.map(
        (item) => item.project_id
      );

      originalAssignedIds.value = [
        ...assignedProjectIds.value,
      ];
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to load assignments.",
        life: 3000,
      });
    }
  },
  {
    immediate: true,
  }
);

const filteredProjects = computed(() => {

  if (!search.value) {
    return projectStore.projects;
  }

  return projectStore.projects.filter(
    (project) =>
      project.name
        ?.toLowerCase()
        .includes(
          search.value.toLowerCase()
        ) ||

      project.description
        ?.toLowerCase()
        .includes(
          search.value.toLowerCase()
        )
  );

});

async function handleAssignment(projectId) {

  if (!props.selectedUser) return;

  const isAssigned =
    assignedProjectIds.value.includes(
      projectId
    );

  const wasAssigned =
    originalAssignedIds.value.includes(
      projectId
    );

  try {

    if (isAssigned && !wasAssigned) {

      await assignmentStore.assignProject({

        user_id:
          props.selectedUser.id,

        project_id: projectId,

      });

      originalAssignedIds.value.push(
        projectId
      );

      toast.add({

        severity: "success",

        summary: "Assigned",

        detail:
          "Project assigned successfully.",

        life: 2500,

      });

    }

    else if (
      !isAssigned &&
      wasAssigned
    ) {

      await assignmentStore.removeAssignment(

        props.selectedUser.id,

        projectId

      );

      originalAssignedIds.value =
        originalAssignedIds.value.filter(

          (id) => id !== projectId

        );

      toast.add({

        severity: "info",

        summary: "Removed",

        detail:
          "Project assignment removed.",

        life: 2500,

      });

    }

  }

  catch (error) {

    if (isAssigned) {

      assignedProjectIds.value =
        assignedProjectIds.value.filter(

          (id) => id !== projectId

        );

    }

    else {

      assignedProjectIds.value.push(
        projectId
      );

    }

    toast.add({

      severity: "error",

      summary: "Error",

      detail:
        error.response?.data?.detail ||

        "Failed to update assignment.",

      life: 3000,

    });

  }

}

function refreshProjects() {

  projectStore.fetchProjects();

}

onMounted(() => {

  projectStore.fetchProjects();

});

</script>

<style scoped>

.project-card{

height:100%;

}

.card-header{

display:flex;

justify-content:space-between;

align-items:center;

}

.project-list{

display:flex;

flex-direction:column;

gap:12px;

max-height:600px;

overflow:auto;

}

.project-item{

display:flex;

align-items:center;

gap:14px;

padding:14px;

border:1px solid var(--surface-border);

border-radius:12px;

transition:.2s;

}

.project-item:hover{

background:var(--surface-hover);

}

.project-info{

display:flex;

justify-content:space-between;

align-items:center;

width:100%;

cursor:pointer;

}

.project-info div{

display:flex;

flex-direction:column;

gap:4px;

}

.empty-state{

height:450px;

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

gap:10px;

color:var(--text-color-secondary);

}

</style>
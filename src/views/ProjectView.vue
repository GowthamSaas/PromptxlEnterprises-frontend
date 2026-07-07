<template>
  <div class="project-view">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h2>My Projects</h2>
        <p>Manage all your AI generated projects.</p>
      </div>
    </div>

    <!-- Search -->
    <ProjectSearch
      v-model="search"
      class="mb-4"
    />
    

    <!-- Grid -->
    <ProjectGrid
      :projects="filteredProjects"
      @open="openProject"
      @edit="openEditDialog"
      @delete="deleteProject"
      @export="exportProject"
      @create="goToCreate"
    />

    <!-- Edit Dialog -->
    <ProjectEditDialog
      :visible="editDialog"
      :project="selectedProject"
      @close="editDialog = false"
      @update="updateProject"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useRouter } from "vue-router";

import { useProjectStore } from "../stores/project";

import ProjectSearch from "../components/project/ProjectSearch.vue";
import ProjectGrid from "../components/project/ProjectGrid.vue";
import ProjectEditDialog from "../components/project/ProjectEditDialog.vue";

const router = useRouter();

const projectStore = useProjectStore();

const search = ref("");

const editDialog = ref(false);

const selectedProject = ref(null);

const filteredProjects = computed(() => {

  if (!search.value) {

    return projectStore.projects;

  }

  return projectStore.projects.filter((project) =>

    project.name.toLowerCase().includes(search.value.toLowerCase()) ||

    (project.description || "")
      .toLowerCase()
      .includes(search.value.toLowerCase())

  );

});

onMounted(async () => {

  await projectStore.fetchProjects();

});

function openProject(project) {

  console.log(project);

  // Explorer page later

}

function openEditDialog(project) {

  selectedProject.value = { ...project };

  editDialog.value = true;

}

async function updateProject(project) {

  await projectStore.updateProject(

    project.id,

    {

      name: project.name,

      description: project.description,

    }

  );

  editDialog.value = false;

}

async function deleteProject(project) {

  if (

    confirm(

      `Delete "${project.name}" ?`

    )

  ) {

    await projectStore.deleteProject(project.id);

  }

}

async function exportProject(project) {

  await projectStore.exportProject(project.id);

}

function goToCreate() {

  router.push("/ai-workspace/create-app");

}




</script>

<style scoped>

.project-view{

    padding:2rem;

}

.page-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:2rem;

}

.page-header h2{

    margin:0;

}

.page-header p{

    margin-top:.5rem;

    color:gray;

}

.mb-4{

    margin-bottom:1.5rem;

}

</style>
<template>
  <div class="management-page">

    <AssignmentHeader />

    <div class="assignment-container">

      <UserList
        v-model="selectedUser"
      />

      <ProjectList
        :selected-user="selectedUser"
      />

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

import AssignmentHeader from "../components/project_assignment/AssignmentHeader.vue";
import UserList from "../components/project_assignment/UserList.vue";
import ProjectList from "../components/project_assignment/ProjectList.vue";

const selectedUser = ref(null);
</script>

<style scoped>

.assignment-container{

    display:grid;

    grid-template-columns:340px 1fr;

    gap:24px;

    height:calc(100vh - 170px);

}

@media(max-width:991px){

.assignment-container{

grid-template-columns:1fr;

height:auto;

}

}

</style>
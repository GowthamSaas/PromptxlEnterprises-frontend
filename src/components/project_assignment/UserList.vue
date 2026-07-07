<template>
  <Card class="user-card">

    <template #title>
      <div class="card-header">

        <div>
          <h3>Users</h3>
          <small>Select a user</small>
        </div>

        <Button
          icon="pi pi-refresh"
          severity="secondary"
          text
          rounded
          @click="refreshUsers"
        />

      </div>
    </template>

    <template #content>

      <IconField class="w-full mb-3">

        <InputIcon class="pi pi-search" />

        <InputText
          v-model="search"
          placeholder="Search users..."
          fluid
        />

      </IconField>

      <Listbox
        :modelValue="modelValue"
        @update:modelValue="updateUser"
        :options="filteredUsers"
        optionLabel="full_name"
        class="user-list"
      >

        <template #option="{ option }">

          <div class="user-item">

            <div class="left">

              <Avatar
                :label="option.full_name.charAt(0)"
                shape="circle"
              />

              <div>

                <div class="name">

                  {{ option.full_name }}

                </div>

                <small>

                  {{ option.email }}

                </small>

              </div>

            </div>

            <Tag
              :value="option.role"
              severity="info"
            />

          </div>

        </template>

      </Listbox>

    </template>

  </Card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import Card from "primevue/card";
import Button from "primevue/button";
import Listbox from "primevue/listbox";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

import { useUsersStore } from "../../stores/users";

const props = defineProps({

  modelValue: Object,

});

const emit = defineEmits([

  "update:modelValue",

]);

const usersStore = useUsersStore();

const search = ref("");

onMounted(() => {

  usersStore.fetchUsers();

});

const filteredUsers = computed(() => {

  return usersStore.users

    .filter(

      (user) =>

        user.role === "user"

    )

    .filter((user) => {

      if (!search.value)

        return true;

      return (

        user.full_name

          ?.toLowerCase()

          .includes(

            search.value.toLowerCase()

          ) ||

        user.email

          ?.toLowerCase()

          .includes(

            search.value.toLowerCase()

          )

      );

    });

});

function updateUser(user) {

  emit(

    "update:modelValue",

    user

  );

}

function refreshUsers() {

  usersStore.fetchUsers();

}
</script>

<style scoped>

.user-card{

    height:100%;

}

.card-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.user-list{

    border:none;

}

.user-item{

    display:flex;

    justify-content:space-between;

    align-items:center;

    width:100%;

}

.left{

    display:flex;

    align-items:center;

    gap:12px;

}

.name{

    font-weight:600;

}

</style>
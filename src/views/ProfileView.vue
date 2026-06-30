<template>
  <div class="profile-page">
    <Toast />
    <Card class="profile-card">
      <template #title>
        <div class="header">
          <Avatar
            icon="pi pi-user"
            size="xlarge"
            shape="circle"
          />

          <div>
            <h2>{{ profile.full_name }}</h2>
            <p>{{ profile.email }}</p>
          </div>
        </div>
      </template>

      <template #content>
        <div v-if="loading" class="loading">
          <ProgressSpinner
            style="width:50px;height:50px"
            strokeWidth="4"
          />
        </div>

        <div v-else class="details">

          <div class="row">
            <span class="label">Full Name</span>
            <span>{{ profile.full_name }}</span>
          </div>

          <Divider />

          <div class="row">
            <span class="label">Email</span>
            <span>{{ profile.email }}</span>
          </div>

          <Divider />

          <div class="row">
            <span class="label">Role</span>

            <Tag
              :value="capitalize(profile.role)"
              severity="info"
            />
          </div>

          <Divider />

          <div class="row">
            <span class="label">Status</span>

            <Tag
              :value="profile.is_active ? 'Active' : 'Inactive'"
              :severity="profile.is_active ? 'success' : 'danger'"
            />
          </div>

          <Divider />

          <div class="row">
            <span class="label">Created</span>
            <span>{{ formatDate(profile.created_at) }}</span>
          </div>

          <div class="buttons">
            <Button
              label="Edit Profile"
              icon="pi pi-pencil"
              outlined
            />

            <Button
            label="Change Password"
            icon="pi pi-lock"
            @click="showPasswordDialog=true"
            />
          </div>

        </div>
      </template>
    </Card>

    <Dialog
    v-model:visible="showPasswordDialog"
    modal
    header="Change Password"
    :style="{ width: '450px' }"
>

    <div class="field">

        <label>Old Password</label>

        <Password
            v-model="passwordForm.old_password"
            toggleMask
            fluid
        />

    </div>

    <br>

    <div class="field">

        <label>New Password</label>

        <Password
            v-model="passwordForm.new_password"
            toggleMask
            fluid
        />

    </div>

    <br>

    <div class="field">

        <label>Confirm Password</label>

        <Password
            v-model="passwordForm.confirm_password"
            toggleMask
            fluid
        />

    </div>

    <template #footer>

        <Button
            label="Cancel"
            severity="secondary"
            @click="showPasswordDialog=false"
        />

        <Button
            label="Update Password"
            icon="pi pi-check"
            :loading="changingPassword"
            @click="changePassword"
        />

    </template>

</Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

import Card from "primevue/card"
import Avatar from "primevue/avatar"
import Button from "primevue/button"
import Tag from "primevue/tag"
import Divider from "primevue/divider"
import ProgressSpinner from "primevue/progressspinner"
import Dialog from "primevue/dialog"
import Password from "primevue/password"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"

import { authAPI } from "../services/api" // path adjust pannunga

const loading = ref(true)

const toast = useToast()

const showPasswordDialog = ref(false)

const passwordForm = ref({
    old_password: "",
    new_password: "",
    confirm_password: ""
})

const changingPassword = ref(false)

const profile = ref({
  full_name: "",
  email: "",
  role: "",
  is_active: false,
  created_at: ""
})

const loadProfile = async () => {
  try {
    const res = await authAPI.me()
    profile.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const capitalize = (text) => {
  if (!text) return ""
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const formatDate = (date) => {
  if (!date) return "-"
  return new Date(date).toLocaleString()
}

const changePassword = async () => {

    if (!passwordForm.value.old_password) {
        toast.add({
            severity: "warn",
            summary: "Warning",
            detail: "Enter old password",
            life: 3000
        })
        return
    }

    if (!passwordForm.value.new_password) {
        toast.add({
            severity: "warn",
            summary: "Warning",
            detail: "Enter new password",
            life: 3000
        })
        return
    }

    if (
        passwordForm.value.new_password !==
        passwordForm.value.confirm_password
    ) {

        toast.add({
            severity: "error",
            summary: "Error",
            detail: "Passwords do not match",
            life: 3000
        })

        return
    }

    try {

        changingPassword.value = true

        await authAPI.changePassword({
            old_password: passwordForm.value.old_password,
            new_password: passwordForm.value.new_password
        })

        toast.add({
            severity: "success",
            summary: "Success",
            detail: "Password Updated Successfully",
            life: 3000
        })

        showPasswordDialog.value = false

        passwordForm.value = {
            old_password: "",
            new_password: "",
            confirm_password: ""
        }

    }
    catch (err) {

        toast.add({
            severity: "error",
            summary: "Error",
            detail:
                err.response?.data?.detail ||
                "Unable to update password",
            life: 3000
        })

    }
    finally {

        changingPassword.value = false

    }

}

onMounted(loadProfile)
</script>

<style scoped>
.profile-page{
    max-width:900px;
    margin:auto;
}

.profile-card{
    border-radius:16px;
}

.header{
    display:flex;
    align-items:center;
    gap:1rem;
}

.header h2{
    margin:0;
}

.header p{
    margin:.3rem 0 0;
    color:#6b7280;
}

.loading{
    display:flex;
    justify-content:center;
    padding:2rem;
}

.details{
    margin-top:1rem;
}

.row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:.8rem 0;
}

.label{
    font-weight:600;
    color:#64748b;
}

.buttons{
    display:flex;
    gap:1rem;
    margin-top:2rem;
}

.field{
    display:flex;
    flex-direction:column;
    gap:.5rem;
}

.field label{
    font-weight:600;
}
</style>
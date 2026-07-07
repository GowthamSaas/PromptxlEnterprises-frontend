<template>
  <div class="page-header">
    <div class="page-heading">
      <span class="section-label">
        Project Assignment Center
      </span>

      <h1>
        Project Assignments
      </h1>

      <p>
        Assign AI generated projects to users.
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:24px;
}

.page-heading{
    display:flex;
    flex-direction:column;
}

.section-label{
    font-size:.8rem;
    font-weight:600;
    color:#6366f1;
    text-transform:uppercase;
    letter-spacing:.08rem;
}

.page-heading h1{
    margin:.35rem 0;
    font-size:2rem;
    font-weight:700;
    color:#111827;
}

.page-heading p{
    margin:0;
    color:#6b7280;
}
</style>
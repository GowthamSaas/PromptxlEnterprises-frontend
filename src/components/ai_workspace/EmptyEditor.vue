<template>
  <div class="empty-editor">

    <div class="empty-content">

      <i class="pi pi-code empty-icon"></i>

      <h2>No File Selected</h2>

      <p>
        Select a file from the Explorer or generate a new project to start editing.
      </p>

    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>

.empty-editor{

height:100%;

display:flex;

justify-content:center;

align-items:center;

background:#1e1e1e;

}

.empty-content{

display:flex;

flex-direction:column;

align-items:center;

text-align:center;

max-width:420px;

padding:24px;

}

.empty-icon{

font-size:72px;

color:#3b82f6;

margin-bottom:20px;

}

h2{

margin:0;

font-size:24px;

font-weight:600;

color:#f8fafc;

}

p{

margin-top:12px;

font-size:14px;

line-height:1.7;

color:#94a3b8;

}

</style>
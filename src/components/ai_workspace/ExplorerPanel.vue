<template>
  <div class="explorer-panel">

    <!-- Header -->
    <div class="explorer-header">

      <div class="title">
        <i class="pi pi-folder-open"></i>
        <span>Explorer</span>
      </div>

      <div class="header-actions">
        
        <!-- New File Button -->
        <Button
          icon="pi pi-file"
          text
          rounded
          severity="secondary"
          v-tooltip.top="'New File'"
          @click="openCreateDialog"
        />

        <!-- New Folder Button -->
        <Button
          icon="pi pi-folder"
          text
          rounded
          severity="secondary"
          v-tooltip.top="'New Folder'"
          @click="openCreateFolderDialog"
        />

        <!-- Collapse/Refresh -->
        <Button
          icon="pi pi-refresh"
          text
          rounded
          severity="secondary"
          v-tooltip.top="'Refresh'"
          @click="refreshExplorer"
        />

      </div>

    </div>

    <!-- Tree -->
    <div class="tree-container">

      <Tree
        :value="treeNodes"
        selectionMode="single"
        v-model:selectionKeys="selectedKeys"
        @node-select="onNodeSelect"
      >

        <template #default="slotProps">

          <div
            class="tree-node"
            @contextmenu.prevent="onRightClick($event, slotProps.node)"
          >

            <i :class="getIcon(slotProps.node)"></i>

            <span>
              {{ slotProps.node.label }}
            </span>

          </div>

        </template>

      </Tree>

    </div>

    <!-- Dialogs & Context Menu -->
    <FileContextMenu
      ref="contextMenu"
      @new-file="openCreateDialog"
      @new-folder="openCreateFolderDialog"
      @rename="openRenameDialog"
      @delete="openDeleteDialog"
    />

    <CreateFileDialog
      ref="createDialog"
      @create="createFile"
    />

    <RenameFileDialog
      ref="renameDialog"
      @rename="renameFile"
    />

    <DeleteFileDialog
      ref="deleteDialog"
      @delete="deleteFile"
    />

  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import Tree from "primevue/tree";
import Button from "primevue/button";
import FileContextMenu from "./FileContextMenu.vue";
import CreateFileDialog from "./CreateFileDialog.vue";
import RenameFileDialog from "./RenameFileDialog.vue";
import DeleteFileDialog from "./DeleteFileDialog.vue";
import { useProjectFilesStore } from "../../stores/projectFiles";

const projectFilesStore =
  useProjectFilesStore();

const selectedKeys = ref({});
const contextMenu = ref();

const createDialog = ref();

const renameDialog = ref();

const deleteDialog = ref();

const selectedNode = ref(null);

const selectedFolderPath = ref("");

const treeNodes = computed(() => {

  return buildTree(
    projectFilesStore.tree
  );

});

function buildTree(nodes = []) {

  return nodes.map((node) => ({

    key: node.path,

    label: node.name,

    data: node,

    leaf: node.type === "file",

    children:
      node.children &&
      node.children.length
        ? buildTree(node.children)
        : [],

  }));

}

function getIcon(node) {

  const data = node.data;

  if (data.type === "folder") {

    return "pi pi-folder";

  }

  switch (data.language) {

    case "vue":
      return "pi pi-code";

    case "javascript":
      return "pi pi-file-edit";

    case "css":
      return "pi pi-palette";

    case "html":
      return "pi pi-globe";

    case "json":
      return "pi pi-database";

    default:
      return "pi pi-file";

  }

}

async function onNodeSelect(event) {

  if (event.node.data.type !== "file") {
    return;
  }

  await projectFilesStore.openFile(
    event.node.data.id
  );



  // Next Step
  // await projectFilesStore.openFile(
  //    event.node.data.id
  // );

}

async function refreshExplorer() {

  try {

    const projectId =
      projectFilesStore.currentProjectId;

    if (!projectId) return;

    await projectFilesStore.fetchTree(projectId);

    await projectFilesStore.fetchFiles(projectId);

  } catch (error) {

    console.error(error);

  }

}


async function createFile(data) {

  try {

    const projectId =
      projectFilesStore.currentProjectId;

    if (!projectId) return;

    // Build the full path using selected folder
    const fullPath = selectedFolderPath.value
      ? `${selectedFolderPath.value}/${data.name}`
      : data.name;

    // Only create files, not folders (backend limitation)
    if (data.isFolder) {
      // For folders, just refresh the tree (backend would need separate endpoint)
      await refreshExplorer();
      return;
    }

    const newFile = await projectFilesStore.createFile({

      project_id: projectId,

      file_name: data.name,

      file_path: fullPath,

      language: data.language,

      content: "",

    });

    await refreshExplorer();

    // Automatically open the newly created file
    if (newFile && newFile.id) {
      await projectFilesStore.openFile(newFile.id);
    }

  } catch (error) {

    console.error(error);

  }

}

async function renameFile(data) {

  try {

    await projectFilesStore.renameFile(
      data.id,
      data.fileName
    );

    await refreshExplorer();

  } catch (error) {

    console.error(error);

  }

}

async function deleteFile(fileId) {

  try {

    await projectFilesStore.deleteFile(
      fileId
    );

    projectFilesStore.currentFile = null;

    await refreshExplorer();

  } catch (error) {

    console.error(error);

  }

}

function onRightClick(event, node) {

  selectedNode.value = node.data;

  // Store the selected folder path for creating new items
  if (node.data.type === "folder") {
    selectedFolderPath.value = node.data.file_path || node.data.path || "";
  } else {
    // For files, get the parent folder path
    const filePath = node.data.file_path || node.data.path || "";
    const lastSlash = Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\"));
    selectedFolderPath.value = lastSlash > 0 ? filePath.substring(0, lastSlash) : "";
  }

  // Pass the node type to context menu (file, folder, or root)
  const nodeType = node.data.type || "folder";

  contextMenu.value.show(event, nodeType);

}

function openCreateDialog() {

  createDialog.value.open(false);

}

function openCreateFolderDialog() {

  createDialog.value.open(true);

}

function openRenameDialog() {

  if (!selectedNode.value) return;

  renameDialog.value.open(selectedNode.value);

}

function openDeleteDialog() {

  if (!selectedNode.value) return;

  deleteDialog.value.open(selectedNode.value);

}
</script>

<style scoped>

.explorer-panel{

height:100%;

display:flex;

flex-direction:column;

background:var(--surface-card);

border-right:1px solid var(--surface-border);

}

.explorer-header{

height:56px;

display:flex;

justify-content:space-between;

align-items:center;

padding:0 16px;

border-bottom:1px solid var(--surface-border);

}

.title{

display:flex;

align-items:center;

gap:10px;

font-weight:600;

}

.header-actions{

display:flex;

align-items:center;

gap:4px;

}

.tree-container{

flex:1;

overflow:auto;

padding:12px;

}

.tree-node{

display:flex;

align-items:center;

gap:10px;

padding:4px 0;

}

.tree-node i{

width:18px;

}

:deep(.p-tree){

border:none;

background:transparent;

}

</style>
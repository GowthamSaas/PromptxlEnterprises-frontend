<template>
  <div class="monaco-wrapper">

    <WorkspaceToolbar />

    <FileBreadcrumb />

    <TabsBar />

    <div class="editor-body">

      <EmptyEditor
        v-if="!currentFile"
      />

      <MonacoEditor
        v-else
        v-model:value="content"
        :language="language"
        theme="vs-dark"
        :options="editorOptions"
        class="editor"
      />

    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, provide, onMounted, onUnmounted } from "vue";

import MonacoEditor from "@guolao/vue-monaco-editor";

import WorkspaceToolbar from "./WorkspaceToolbar.vue";
import FileBreadcrumb from "./FileBreadcrumb.vue";
import TabsBar from "./TabsBar.vue";
import EmptyEditor from "./EmptyEditor.vue";

import { useProjectFilesStore } from "../../stores/projectFiles";

const projectFilesStore = useProjectFilesStore();

const content = ref("");
provide("editorContent", content);

// Keyboard shortcut for Ctrl+S to save
async function handleKeyboardSave(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    if (currentFile.value) {
      await saveFile();
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyboardSave);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyboardSave);
});

async function saveFile() {
  if (!currentFile.value) return;
  try {
    await projectFilesStore.saveFile(
      currentFile.value.id,
      content.value
    );
    console.log("File saved!");
  } catch (error) {
    console.error("Failed to save:", error);
  }
}

const currentFile = computed(() => {
  return projectFilesStore.currentFile;
});

watch(
  currentFile,
  (file) => {

    if (!file) {

      content.value = "";

      return;

    }

    content.value = file.content;

  },
  {
    immediate: true,
  }
);

const language = computed(() => {

  if (!currentFile.value)
    return "plaintext";

  return currentFile.value.language || "plaintext";

});

const editorOptions = {

  automaticLayout: true,

  minimap: {
    enabled: true,
  },

  fontSize: 14,

  tabSize: 2,

  wordWrap: "on",

  scrollBeyondLastLine: false,

  formatOnPaste: true,

  formatOnType: true,

  smoothScrolling: true,

  padding: {
    top: 12,
  },

};
</script>

<style scoped>

.monaco-wrapper{

height:100%;

display:flex;

flex-direction:column;

background:#1e1e1e;

}

.editor-body{

flex:1;

overflow:hidden;

}

.editor{

width:100%;

height:100%;

}

</style>
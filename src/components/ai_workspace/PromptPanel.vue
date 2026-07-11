<template>
  <div class="prompt-panel">

    <!-- Header -->

    <div class="panel-header">

  <div class="header-content">

    <div>

      <h2>AI Assistant</h2>

      <small>

        {{ llmStore.selectedProvider || "No Provider" }}

<span v-if="llmStore.selectedModel">
  • {{ llmStore.selectedModel }}
</span>

      </small>

    </div>

    <Button
      icon="pi pi-cog"
      text
      rounded
      severity="secondary"
      @click="showSettings = true"
    />

  </div>

</div>

<AISettingsDialog
  v-model:visible="showSettings"
/>


    <!-- Chat History -->

    <div class="chat-wrapper">

      <div
        ref="chatContainer"
        class="chat-container"
      >

        <ChatMessage
          v-for="(message,index) in chatMessages"
          :key="index"
          :role="message.role"
          :message="message.message"
        />

        <div
          v-if="!chatMessages.length"
          class="empty-chat"
        >

          <i class="pi pi-sparkles"></i>

          <h3>Welcome</h3>

          <p>

            Generate applications, ask questions or improve your project.

          </p>

        </div>

      </div>

    </div>

    <!-- Mode -->

    <div class="mode-section">

      <label>Mode</label>

      <div class="mode-options">

        <div class="mode-item">

          <RadioButton
            v-model="selectedMode"
            inputId="chat"
            value="chat"
          />

          <label for="chat">

            Ask Question

          </label>

        </div>

        <div class="mode-item">

          <RadioButton
            v-model="selectedMode"
            inputId="modify"
            value="modify"
          />

          <label for="modify">

            Improve Code

          </label>

        </div>

      </div>

    </div>

    <!-- Prompt -->

    <div class="prompt-section">

      <Textarea
        v-model="prompt"
        rows="5"
        autoResize
        fluid
        :placeholder="promptPlaceholder"
      />

    </div>

    <!-- Footer -->

    <div class="panel-footer">

      <Button
        label="Send"
        icon="pi pi-send"
        fluid
        :loading="loading"
        @click="submitPrompt"
      />

    </div>

  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  nextTick,
  watch,
} from "vue";

import { useRoute } from "vue-router";

import Button from "primevue/button";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";

import ChatMessage from "../../components/chat/ChatMessage.vue";
import AISettingsDialog from "./AISettingsDialog.vue";

import { useLLMStore } from "../../stores/llm";
import { useGenerateStore } from "../../stores/generate";
import { useProjectStore } from "../../stores/project";
import { useProjectFilesStore } from "../../stores/projectFiles";
import { useAIChatStore } from "../../stores/aiChat";
import { useAIModifierStore } from "../../stores/aiModifier";

const route = useRoute();

const llmStore = useLLMStore();
const generateStore = useGenerateStore();
const aiChatStore = useAIChatStore();
const aiModifierStore = useAIModifierStore();
const projectStore = useProjectStore();
const projectFilesStore = useProjectFilesStore();

const prompt = ref("");
const showSettings = ref(false);




const selectedMode = ref(null);

const chatContainer = ref(null);


const chatMessages = computed(() => aiChatStore.messages);

const loading = computed(() => {

  if (selectedMode.value === "chat") {
    return aiChatStore.loading;
  }

  if (selectedMode.value === "modify") {
    return aiModifierStore.loading;
  }

  return generateStore.loading;

});

const promptPlaceholder = computed(() => {

  if (selectedMode.value === "chat") {
    return "Ask anything about your project...";
  }

  if (selectedMode.value === "modify") {
    return "Describe the code changes...";
  }

  return "Describe the application you want to generate...";

});

watch(
  () => aiChatStore.messages.length,
  async () => {

    await nextTick();

    if (chatContainer.value) {

      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight;

    }

  }
);



async function generateProject() {

  if (!prompt.value.trim()) return;

  const response =
    await generateStore.generate({

      prompt: prompt.value,

      provider: llmStore.selectedProvider,

model: llmStore.selectedModel,

      application_id: null,

    });

  await projectStore.fetchProject(
    response.project_id
  );

  await projectFilesStore.fetchTree(
    response.project_id
  );

  const firstFile =
    projectFilesStore.findFirstFile();

  if (firstFile) {

    await projectFilesStore.openFile(
      firstFile.id
    );

  }

  prompt.value = "";

}

async function sendChat() {

  if (!prompt.value.trim()) return;

  await aiChatStore.sendMessage({

    prompt: prompt.value,

   provider: llmStore.selectedProvider,

model: llmStore.selectedModel,

    project_id:
      projectStore.currentProject?.id,

    session_id:
      aiChatStore.sessionId,

  });

  prompt.value = "";

}

async function modifyProject() {

  if (!prompt.value.trim()) return;

  await aiModifierStore.modifyProject({

    project_id:
      projectStore.currentProject.id,

    prompt: prompt.value,

    provider: llmStore.selectedProvider,

    model: llmStore.selectedModel,

  });

  await projectFilesStore.fetchTree(
    projectStore.currentProject.id
  );

  const firstFile =
    projectFilesStore.findFirstFile();

  if (firstFile) {

    await projectFilesStore.openFile(
      firstFile.id
    );

  }

  prompt.value = "";

}

async function submitPrompt() {

  /*
  No Mode Selected
  => Generate Project
  */

  if (!selectedMode.value) {

    await generateProject();

    return;

  }

  /*
  Chat
  */

  if (selectedMode.value === "chat") {

    await sendChat();

    return;

  }

  /*
  Modify
  */

  if (selectedMode.value === "modify") {

    await modifyProject();

  }

  if (!llmStore.selectedProvider) {

  alert("Please select an AI Provider.");

  showSettings.value = true;

  return;

}

if (!llmStore.selectedModel) {

  alert("Please select an AI Model.");

  showSettings.value = true;

  return;

}

}

onMounted(async () => {

  await llmStore.fetchProviders();

  const projectId = route.query.id;

  if (!projectId) return;

  await projectStore.fetchProject(
    projectId
  );

  prompt.value =
    projectStore.currentProject.prompt;


  llmStore.selectedProvider =
  projectStore.currentProject.provider;

await llmStore.fetchModels(
  llmStore.selectedProvider
);

llmStore.selectedModel =
  projectStore.currentProject.model;

  

  await aiChatStore.loadSessions();

  if (aiChatStore.sessions.length) {

    await aiChatStore.loadHistory(
      aiChatStore.sessions[0].id
    );

  }

  await projectFilesStore.fetchTree(
    projectId
  );

  const firstFile =
    projectFilesStore.findFirstFile();

  if (firstFile) {

    await projectFilesStore.openFile(
      firstFile.id
    );

  }

});
</script>

<style scoped>

.prompt-panel{
height:100%;
display:flex;
flex-direction:column;
background:#ffffff;
border-right:1px solid var(--surface-border);
overflow:hidden;
min-height:0;
}

/* Header */

.panel-header{
padding:20px 22px;
border-bottom:1px solid var(--surface-border);
background:#fafafa;
flex-shrink:0;
}


.header-content{
display:flex;
justify-content:space-between;
align-items:center;
}

.panel-header h2{
margin:0;
font-size:22px;
font-weight:700;
}

.panel-header small{
display:block;
margin-top:4px;
color:#64748b;
font-size:13px;
}



/* Provider */

.provider-section{
padding:18px;
display:flex;
flex-direction:column;
gap:16px;
border-bottom:1px solid var(--surface-border);
flex-shrink:0;
}

.field{
display:flex;
flex-direction:column;
gap:8px;
}

.field label{
font-size:13px;
font-weight:600;
color:#334155;
}

/* Chat */

.chat-wrapper{
flex:1;
min-height:0;
display:flex;
overflow:hidden;
padding:18px;
}

.chat-container{
flex:1;
min-height:0;
overflow-y:auto;
overflow-x:hidden;
display:flex;
flex-direction:column;
gap:16px;
padding:12px;
border-radius:14px;
background:#f8fafc;
border:1px solid #e2e8f0;
scroll-behavior:smooth;
}

/* Empty */

.empty-chat{

flex:1;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
color:#94a3b8;
padding:40px;

}

.empty-chat i{
font-size:52px;
margin-bottom:16px;
color:#6366f1;

}

.empty-chat h3{
margin:0;
font-size:20px;
font-weight:600;
color:#334155;
}

.empty-chat p{
margin-top:10px;
max-width:260px;
line-height:1.6;
}

/* Mode */

.mode-section{
padding:18px;
border-top:1px solid var(--surface-border);
border-bottom:1px solid var(--surface-border);
flex-shrink:0;
}

.mode-section label{
display:block;
font-size:13px;
font-weight:600;
margin-bottom:12px;
color:#334155;

}

.mode-options{
display:flex;
gap:28px;
align-items:center;
}

.mode-item{
display:flex;
align-items:center;
gap:10px;
font-size:14px;
}

/* Prompt */

.prompt-section{
padding:18px;
flex-shrink:0;
}

:deep(.p-textarea){
border-radius:12px;
}

/* Footer */

.panel-footer{
padding:18px;
border-top:1px solid var(--surface-border);
background:#ffffff;
flex-shrink:0;
}

:deep(.p-button){
height:46px;
font-size:15px;
font-weight:600;
border-radius:12px;
}

/* Scroll */

.chat-container::-webkit-scrollbar{
width:6px;
}

.chat-container::-webkit-scrollbar-thumb{
background:#cbd5e1;
border-radius:10px;
}

.chat-container::-webkit-scrollbar-track{
background:transparent;
}

/* Responsive */

@media (max-width:1200px){
.provider-section{
padding:14px;
}

.chat-wrapper{
padding:14px;
}

.mode-section{
padding:14px;
}

.prompt-section{
padding:14px;
}

.panel-footer{
padding:14px;
}

}

</style>
<template>

  <div
    class="chat-message"
    :class="role"
  >

    <Avatar
      :icon="
        role === 'assistant'
          ? 'pi pi-sparkles'
          : 'pi pi-user'
      "
      shape="circle"
      size="large"
      :class="
        role === 'assistant'
          ? 'assistant-avatar'
          : 'user-avatar'
      "
    />

    <div class="message-wrapper">

      <div class="message-title">

        {{ role === "assistant"
            ? "AI Assistant"
            : "You" }}

      </div>

      <Card class="message-card">

        <template #content>

          <div
  class="message-content markdown-body"
  v-html="renderedMessage"
/>

        </template>

      </Card>

    </div>

  </div>

</template>

<script setup>
import { computed } from "vue";

import Avatar from "primevue/avatar";
import Card from "primevue/card";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const props = defineProps({

  role: String,

  message: String,

});

const md = new MarkdownIt({

  html: true,

  linkify: true,

  breaks: true,

  highlight(str, lang) {

    if (lang && hljs.getLanguage(lang)) {

      return `<pre class="hljs"><code>${
        hljs.highlight(str,{
          language:lang
        }).value
      }</code></pre>`;

    }

    return `<pre class="hljs"><code>${
      md.utils.escapeHtml(str)
    }</code></pre>`;

  },

});

const renderedMessage = computed(() => {

  return md.render(props.message || "");

});
</script>

<style scoped>

.chat-message{

display:flex;

gap:12px;

margin-bottom:20px;

align-items:flex-start;

}

.user{

flex-direction:row-reverse;

}

.message-wrapper{

display:flex;

flex-direction:column;

gap:6px;

flex:1;

}

.message-title{

font-size:13px;

font-weight:600;

color:#64748b;

}

.user .message-title{

text-align:right;

}

.message-card{

border-radius:16px;

border:none;

box-shadow:none;

background:#ffffff;

}

.assistant .message-card{

background:#ffffff;

border:1px solid #e5e7eb;

}

.user .message-card{

background:#4f46e5;

}

.message-content{

font-size:14px;

line-height:1.8;

white-space:pre-wrap;

word-break:break-word;

}

.user .message-content{

color:white;

}

.assistant-avatar{

background:#10b981;

color:white;

}

.user-avatar{

background:#4f46e5;

color:white;

}

.markdown-body{

font-size:14px;

line-height:1.8;

word-break:break-word;

}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3){

margin:14px 0;

font-weight:700;

}

.markdown-body :deep(p){

margin:8px 0;

}

.markdown-body :deep(ul){

padding-left:20px;

margin:10px 0;

}

.markdown-body :deep(ol){

padding-left:20px;

margin:10px 0;

}

.markdown-body :deep(li){

margin:6px 0;

}

.markdown-body :deep(pre){

background:#0f172a;

color:white;

padding:14px;

border-radius:10px;

overflow:auto;

margin:12px 0;

}

.markdown-body :deep(code){

font-family:Consolas, monospace;

font-size:13px;

}

.markdown-body :deep(table){

width:100%;

border-collapse:collapse;

margin:14px 0;

}

.markdown-body :deep(th),
.markdown-body :deep(td){

border:1px solid #d1d5db;

padding:8px;

}

.markdown-body :deep(blockquote){

border-left:4px solid #6366f1;

padding-left:12px;

margin:12px 0;

color:#64748b;

}

</style>
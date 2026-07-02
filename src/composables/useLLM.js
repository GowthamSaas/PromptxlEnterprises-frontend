import { computed, ref } from 'vue'
import { useLLMStore } from '../stores/llm'

export function useLLM() {
  const llmStore = useLLMStore()
  const selectedProvider = ref('openai')

  const providerOptions = computed(() => [
    { label: 'OpenAI', value: 'openai' },
    { label: 'Claude', value: 'claude' },
    { label: 'Gemini', value: 'gemini' }
  ])

  async function connect(payload) {
    return llmStore.connectProvider(payload)
  }

  return { selectedProvider, providerOptions, connect, fetchProviders: llmStore.fetchProviders, fetchModels: llmStore.fetchModels, providers: llmStore.providers, loading: llmStore.loading }
}

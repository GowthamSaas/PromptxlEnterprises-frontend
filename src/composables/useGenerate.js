import { useProjectStore } from '../stores/project'

export function useGenerate() {
  const projectStore = useProjectStore()

  return {
    projects: projectStore.projects,
    loading: projectStore.loading,
    generateProject: projectStore.generateProject
  }
}

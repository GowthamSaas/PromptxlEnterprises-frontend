import { useConnectorStore } from '../stores/connector'

export function useConnector() {
  const connectorStore = useConnectorStore()

  return {
    connectors: connectorStore.connectors,
    loading: connectorStore.loading,
    fetchConnectors: connectorStore.fetchConnectors,
    connectConnector: connectorStore.connectConnector
  }
}

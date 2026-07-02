import api from './api'

export const connectorAPI = {

    list(){

        return api.get('/connectors')

    },

    connect(data){

        return api.post('/connectors/connect',data)

    },

    disconnect(provider){

        return api.post('/connectors/disconnect',{

            provider

        })

    }

}
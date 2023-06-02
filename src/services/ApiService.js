
import axios from 'axios';

const http = axios.create({
    baseURL:'https://be-careCrew.test/api',
}) ;


http.interceptors.request.use(function(response){
    return response
}, function(error){
    return Promise.reject(error)
})

const ApiServices = {
    async login(email, password, onSuccess, onFailed){
        try{
         let data = await http.post('/auth/login', {email: email, password: password}, {headers: {
            'Accept': 'application/json'
         }
        })
         onSuccess(data.data);
        }catch(err){
            onFailed(err.response.data)
        }
    },

    async getAsssistant(perPage, valueSearch, page,onSuccess, onFailed){
        try{
            let token = localStorage.getItem('token')
            let data = await http.get('/admin/assistant?perPage='+perPage+'&valueSearch='+valueSearch +"&page="+page,{headers: {
                Accept : 'appliaction/json',
                Authorization: 'Bearer ' + token
                    }
                }
            )
            onSuccess(data.data)
        }catch(err){
            onFailed(err.response.data)
        }
    },

    async getDetailAssistant(id, onSuccess, onError){
        try{
            let token = localStorage.getItem('token')
            let data = await http.get('/admin/assistant/'+id, {
                headers:{
                    Accept: 'appliaction/json',
                    Authorization: 'Bearer ' + token
                    }
                }
            )
            onSuccess(data.data)
        }catch(err){
            onError(err.response.data)
        }
    },
    
    async getCustomer(perPage, valueSearch, page, onSuccess, onError){
        try{
            let token = localStorage.getItem('token')
            let data = await http.get('/admin/customer?perPage='+perPage+'&valueSearch='+valueSearch+'&page='+page, {
                headers:{
                    Accept: 'appliaction/json',
                    Authorization: 'Bearer ' + token
                }
            })
            onSuccess(data.data)
        }catch(err){
            onError(err.response.data)
        }

    },

    async getDetailCustomer(id, onSuccess, onError){
        try{
            let token = localStorage.getItem('token')
            let data = await http.get('/admin/customer/' + id, {
                headers:{
                    Accept: 'appliaction/json',
                    Authorization: 'Bearer ' + token
                }
            })
            onSuccess(data)
        }catch(err){
            onError(err.response.data)
        }
    },

    async getAllBank(onSuccess, onError){
        try{
            let data = await http.get('/master/bank', {
                headers: {
                    Accept: 'appliaction/json'
                }
            })
            onSuccess(data.data)
        }catch(err){
            onError(err.response.data)
        }
    }

}

export default ApiServices;
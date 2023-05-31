
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
    }
}

export default ApiServices;
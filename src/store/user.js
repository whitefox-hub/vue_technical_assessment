// import axios from 'axios'
import router from '/src/router'

export default {
    namespaced: true,
    state:{
        users:[],
        run:false
    },
    getters:{
        run(state){
            return state.run;
        },
        user (state) {
            return state.users.find(user => user.id === id)
        },
        users(state){
            return state.users;
        }
    },
    mutations:{
        users (state, payload) {
            state.users=payload;
            state.run=true;
        },
        create_user (state, payload) {
            state.users.push(payload.value);
        },
        update_user (state, payload) {
            const user = state.users.findIndex(x => x.id === payload.id)
            state.users[user] = payload;
        },
        delete_user (state, payload) {
            state.users.splice(state.users.indexOf(payload.data),1);
        }
    },
    actions:{
        async getUserList({commit}){
            return await axios.get('/api/user').then(({data})=>{
                console.log('data:', data);
                commit('users', data);
                // router.push({name:'users'});
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        }
    }
}

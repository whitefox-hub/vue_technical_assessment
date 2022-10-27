<template>
    <div class="block-content">
        <div class="table-responsive">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>List of Users</h2>
                    </div>
                    <div class="col-sm-6 d-flex flex-row-reverse">
                        <router-link :to="{name:'create_update', params:{user:'create'}}" class="btn btn-success"><span>Add New User</span></router-link>
                    </div>
                </div>
            </div>

            <table class="table table-striped table-vcenter">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Avatar</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td><img class="img-fluid" :src="user.avatar"></td>
                        <td class="text-center">
                            <div class="btn-group">
                                <router-link :to="{name:'create_update', params:{user:user.id}}" class="btn btn-sm btn-warning" style="width: 60px;">
                                    Edit
                                </router-link>
                                <button type="button" class="btn btn-sm btn-danger" style="width: 60px;" @click="delete_user(user)">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios'

const store = useStore();
const users = computed(() => store.getters["user/users"]);
const run = computed(() => store.getters["user/run"]);

const swal = inject('$swal');

onMounted(() => {
    if(!run.value){
        swal.showLoading();
        getUsers();
    }
});

const getUsers= async () => {
    await axios.get('https://reqres.in/api/users').then(response=>{
        store.commit('user/users', response.data.data);
    }).catch((error)=>{
        console.log('error:', error);
        swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    }).finally(()=>{
        setTimeout(function(){ swal.close() }, 2000);
    });
}

const delete_user = async(user) => {
    try{
      let response = store.commit("user/delete_user", user);
      swal.fire({icon: 'success', title: 'Completed'});
    }catch(e){
        console.log('Error(update):', e);
        swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    }
};
</script>

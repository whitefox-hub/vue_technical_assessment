<template>
<div class="block block-rounded">
  <div class="block-header block-header-default">
    <h3 class="block-title" v-if="user_id=='create'">Create New User</h3>
    <h3 class="block-title" v-else>Edit User</h3>
  </div>
  <div class="block-content">
    <div class="row">
      <div class="col-lg-4">
        <p class="text-muted" v-if="user_id=='create'">
          Please, complete the required fields.
        </p>
        <p class="text-muted" v-else>
          User information can be modified in this view.
        </p>
      </div>
      <div class="col-lg-8 col-xl-5">
        <form class="" @submit.prevent="submitForm">
          <div class="form-floating mb-4">
              <input type="text" class="form-control" v-model.trim="user.first_name" placeholder="First Name" autofocus required>
              <label class="form-label" for="name">First Name</label>
          </div>
          <div class="form-floating mb-4">
              <input type="text" class="form-control" v-model.trim="user.last_name" placeholder="Last Name" required>
              <label class="form-label" for="name">Last Name</label>
          </div>
          <div class="form-floating mb-4">
              <input type="text" class="form-control" v-model.trim="user.email" placeholder="Email" required>
              <label class="form-label" for="name">Email</label>
          </div>
          <div class="form-floating mb-4">
              <input type="text" class="form-control" v-model.trim="user.avatar" placeholder="Avatar" required>
              <label class="form-label" for="name">Avatar</label>
          </div>

          <div class="mb-4 text-center">
              <button type="submit" class="btn btn-lg btn-success" :disabled="user.processing">
                  <i class="fa fa-plus mr-10"></i>{{user_id=='create' ? 'Create user':'Update User'}}
              </button>
          </div>

          <div class="mb-4 text-center">
              <router-link :to="{name:'users'}" style="padding-left:20px">
                  Go Back to: User List
              </router-link>
          </div>
      </form>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex';

const route =useRoute();
const router = useRouter();

const store = useStore();
const swal = inject('$swal');

const processing= ref(false);
const user=ref({id:null, first_name:'', last_name:'', email:'', avatar:''});
const user_id = ref(route.params.user);

const createUpdate = async() => {
  if(user_id.value=='create'){
    try{
      let response = store.commit("user/create_user", user);
      swal.fire({icon: 'success', title: 'Completed'}).then(() => router.push({ path: '/users' }));
    }catch(e){
        console.log('Error(create):',e);
    }
  }else{
    try{
      let response = store.commit("user/update_user", user);
      swal.fire({icon: 'success', title: 'Completed'}).then(() => router.push({ path: '/users' }));
    }catch(e){
        console.log('Error(update):', e);
    }
  }
};

const submitForm = async() => {
  // VALIDATION LOGIC
    createUpdate();
};


onMounted(() => {
  if (user_id.value == 'create') {
    let bid= (store.getters['user/users']).reduce((a,b) => Number(a.id) > Number(b.id) ? a.id : b.id);
    user.value.id=bid+1;
  } else {
    try{
        user.value=(store.getters['user/users']).find(user => user.id==user_id.value);
    }catch(e){
        console.log('Error(onMounted)');
        swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    }
  }
});
</script>

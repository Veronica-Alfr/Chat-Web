<template>
  <h2>Login</h2>
  <form>
    <form @submit.prevent="login">
        <input
          v-model="user.email"
          type="text"
          class="form-control"
          placeholder="Email"
        >
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Password"
        >
        <button type="submit">
          Login
        </button>
      </form>
  </form>
</template>


<script lang="ts" setup>
// import http from '@/services/http.js';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuth } from '@/stores/auth.js'

const user = reactive({
  email:'',
  password:''
});

const router = useRouter();

// const auth = useAuth();
const login = () => {
  localStorage.setItem('email', user.email);

  router.push({ path: '/chat' });
  // try {
  //   const {data} = await http.post('/auth',user);
  //   auth.setToken(data.token);
  //   auth.setUser(data.user);
  // } catch (error) {
  //   console.log(error?.response?.data);
  // }
};

</script>

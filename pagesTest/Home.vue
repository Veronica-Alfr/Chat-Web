<script setup lang="ts">
import Message from "./Message.vue";
import { ref, Ref } from "vue";

// Seleciona o input
const userInput = ref();
// Armazena as mensagens tanto de quem enviou como quem recebe
const messages: Ref<any> = ref([]);
// Obtém o user do localstorage
const user = sessionStorage.getItem("user");

// Inicia o WebSocket
const ws = new WebSocket("ws://localhost:3001");

ws.onopen = () => {
  console.log("Websocket connected");
};

ws.onmessage = (data) => {
  const dataParsed: any = JSON.parse(data.data);
  if (dataParsed.hasOwnProperty("message")) {
    messages.value.push(JSON.parse(dataParsed.message));
  }
};

ws.onclose = (event) => {
  console.log(event);
};

ws.onerror = (err) => console.log(err);
// Fim WebSocket

// Ao pressionar Enter ou clicar no botão, envia para o servidor e o servidor distribui para os usuarios conectados, exceto para quem enviou
function sendMessage() {
  const time = () => `${new Date().getHours()}:${new Date().getMinutes()}`;
  const inputContent = userInput.value;

  try {
    ws.send(JSON.stringify({ content: inputContent, user, time: time() }));
    messages.value.push({ content: inputContent, user, time: time() });
  } catch (err) {
    alert(err);
  }
  userInput.value = "";
}
</script>

<template>
  <Message :message="messages" :currentUser="user" />
  <input
    class="form-control"
    type="text"
    v-model="userInput"
    @keydown="(e) => (e.key == 'Enter' ? sendMessage() : '')"
  />
  <button class="btn btn-primary" type="button" @click="sendMessage">
    Enviar
  </button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<template>
  <!-- colocar a div com os dados das mensagens desse template em um component chamado Message, ao qual irá receber os valores por props (defineProps()) -->
  <section class="chat">
    <div v-for="data, index in allMessages" :key="index">
      <p>{{ data.message }}</p>
      <span>{{ data.email }}</span>
      <span>{{ data.time }}</span>
    </div>

      <form @submit.prevent="sendMessage">
        <input
          type="text"
          class="form-control"
          id="input"
          v-model="text"
          ref="boxChat"
          />

        <button
          id="send"
          class="btn btn-primary fw-semibold"
          type="button"
          @click="sendMessage"
        >
          Enviar
        </button>
      </form>
  </section>
</template>

<script lang="ts" setup>

import type { IBoxChat } from "@/interfaces/IBoxChat.js";
import type { IChat } from "@/interfaces/IChat";
import { ref, onMounted, type Ref } from "vue";

const text: Ref<string> = ref('');
const allMessages: Ref<IChat[]> = ref([]);

const boxChat: Ref<IBoxChat | null> = ref(null);

onMounted(() => {
  console.log('Mounted!');
});

const unauthorized = () => (window.location.href = "http://localhost:5173/");

const createMessage = () => {
  const email = localStorage.getItem('email');
  const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  const message = text.value;

  const messageData: IChat = { email, message, time };

  if (message !== "") allMessages.value.push(messageData);
};

const socket = new WebSocket(`ws://localhost:3000`);

onMounted(() => {
  socket.onopen = () => {
    console.log("Conected");
  };

  socket.onmessage = (messageData) => {
    // const dataParsed: any = JSON.parse(messageData.data);
    // console.log(dataParsed.message);
    // if (dataParsed.hasOwnProperty("message")) {
    //   allMessages.value.push(JSON.parse(dataParsed.message));
    // };

    console.log(messageData);
    const dataParsed = messageData.data; // return Hello From server
    console.log(messageData.currentTarget) // ou .target
    console.log(dataParsed); // return Blob with your size and type = ''

    if (messageData.type === "message") { // dataParsed.hasOwnProperty.call("message")
      createMessage();
    };

    // console.log(messageData);
    // console.log(messageData.type); // that return "message"

    // // const data = JSON.stringify(messageData.data); // ou messageData.message? (não existe) ou  messageData.type
    // const dataParsed = JSON.parse(messageData.data);

    // if (dataParsed.hasOwnProperty.call("message")) {
    //   allMessages.value.push(JSON.parse(dataParsed.message));
    // }
  };

  socket.onclose = event => {
    console.log("Desconectado", event);
    alert(event.reason);
    // if (event.code === 3000 || event.code === 3001) unauthorized();
  };

  socket.onerror = () => {
    console.log("Erro!");
  };
});

const sendMessage = () => {
  createMessage();
  text.value = '';

  const allMessagesStringfy = JSON.stringify(allMessages.value);

  const allMessagesParsed = JSON.parse(allMessagesStringfy);
  console.log(allMessagesParsed);

  socket.send(allMessagesStringfy);
};

</script>

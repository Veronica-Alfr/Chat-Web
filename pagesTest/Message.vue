<script setup lang="ts">
const props = defineProps(["message", "currentUser"]);
</script>

<template>
  <div class="container message my-3" id="messageContainer">
    <ul class="list-unstyled" id="messages">
      <li
        v-for="message in props.message"
        :class="
          message.user !== currentUser
            ? 'text-start bg-secondary text-white rounded p-2 me-auto mb-3'
            : 'text-start bg-primary text-white rounded p-2 ms-auto mb-3'
        "
        style="width: fit-content"
      >
        <div class="header">
          {{ message.user }}
        </div>
        {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.message {
  overflow-y: scroll;
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
}
.header {
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
}
</style>

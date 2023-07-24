<template>
  <div>
    <form @submit.prevent="sendLead" novalidate>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" placeholder="enter your name" v-model="name">
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email">
      </div>

      <div class="mb-3">
        <label for="email-text" class="form-label">Your message</label>
        <textarea class="form-control" id="email-text" rows="5" v-model="message"></textarea>
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="newsletter">
        <label class="form-check-label" for="flexCheckDefault">
          Subscribe to newsletter
        </label>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Send-></button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppContactMe",
  data() {
    return {
      name: '',
      email: '',
      message: '',
      newsletter: true,
    }
  },
  methods: {
    sendLead() {
      axios.post('http://127.0.0.1:8000/api/leads', {
        name: this.name,
        email: this.email,
        message: this.message,
        newsletter: this.newsletter,
      })
          .then();
    }
  }
}
</script>

<style scoped>

</style>
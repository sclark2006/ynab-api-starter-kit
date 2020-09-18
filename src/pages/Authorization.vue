<template>
<div>
  <form v-if="requiresAuthorization">
    <div class="form-group">
      <h2>Welcome to YNAB Legio</h2>
      <p class="lead">If you would like to use this App, please authorize with YNAB!</p>
      <button @click="authorizeWithYNAB(config, $event)" class="btn btn-primary">Authorize This App With YNAB &gt;</button>
    </div>
  </form>
  <div v-else class="row">
    <slot></slot>
  </div>
  
</div>


</template>

<script>
import auth from "../utils/auth.js";
export default {
    props: ["config"],
    computed: {
      requiresAuthorization() {
        return !this.config.token || this.config.token == null;
      }
    },
     methods: {
       authorizeWithYNAB: auth.authorizeWithYNAB,
       
     }
}
</script>
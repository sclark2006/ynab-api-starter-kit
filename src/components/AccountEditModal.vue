<template>
    <modal title="Account Setup" @close="close">
        <form v-if="account">
            <div class="form-group">
                <label for="account-name">Account Name </label>
                <input type="text" v-model="account.name" class="form-control" id="account-name" aria-describedby="account-name-help">
                <!-- <small id="account-name-help" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="form-group" v-if="account.type">
                <label for="account-type">Account Type </label>
                <input type="text" :value="account.type.toUpperCase()" readonly class="form-control" id="account-type" aria-describedby="account-type-help">
                <!-- <small id="account-name-help" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="form-group">
                <label for="account-note">Notes </label>
                <textarea type="text" v-model="account.note" class="form-control" id="account-note" aria-describedby="account-note-help">
                </textarea>
            </div>
            <div class="form-group">
                <label for="account-balance">Balance</label>
                <input type="text" v-model="formattedBalance" class="form-control" id="account-balance" aria-describedby="account-balance-help">
            </div>
        </form>
    </modal>
</template>
<script>
import Modal from './Modal.vue';
import {millisToCurrency} from '../utils/formatting.js';

  export default {
    props: ["account"],
    computed: {
        formattedBalance() {
            return this.millisToCurrency(this.account.balance);
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      millisToCurrency: millisToCurrency,

    },
    components: {
        Modal
    }
  };
</script>

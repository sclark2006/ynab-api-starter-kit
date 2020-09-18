<template>
  <div>
    <h5>Transactions</h5>
    <table class="table">
    <thead>
      <tr>
        <th v-if="!account">Account</th>
        <th>Date</th>
        <th>Payee</th>
        <th>Category</th>
        <th>Memo</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in getTransactions" v-bind:key="transaction.id">
        <td v-if="!account">{{transaction.account_name}}</td>
        <td>{{transaction.date}}</td>
        <td>{{transaction.payee_name}}</td>
        <td>{{transaction.category_name}}</td>
        <td>{{transaction.memo}}</td>
        <td>{{toCurrency(transaction.amount).toFixed(2)}}</td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
// Import utils from YNAB
import {utils} from 'ynab';

export default {
  props: {
    budget:Object,
    viewState:Object
  },
  data() {
    return {
      account : null
    }
  },
  computed: {
    getTransactions() {
        if(!this.budget || this.budget == null)
          return [];

        if(!this.viewState)
          return this.budget.transactions;

        if(!this.account || this.account.id != this.viewState.id)
          this.account = this.budget.accounts.find(x => x.id == this.viewState.id);

        if(this.account)
          return this.budget.transactions.filter(x => x.account_id == this.viewState.id);
        else
          return []; 
        }
        
  },
  methods: {
    // Now we can make this method available to our template
    // So we can format this milliunits in the correct currency format
    toCurrency: utils.convertMilliUnitsToCurrencyAmount
  }

}
</script>

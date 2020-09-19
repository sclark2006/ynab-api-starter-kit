<template>
  <div>
    <h5 v-if="showAll">All Accounts</h5>
    <h5 v-else>{{getAccountName}}</h5>
    <table class="table">
    <thead>
      <tr>
        <th v-if="showAll">Account</th>
        <th>Date</th>
        <th>Payee</th>
        <th>Category</th>
        <th>Memo</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in getTransactions" v-bind:key="transaction.id">
        <td v-if="showAll">{{transaction.account_name}}</td>
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
    getAccountName() {
      if(this.viewState)
        this.account = this.budget.accounts.find(x => x.id == this.viewState.id);
      return this.account.name;
    },
    showAll() {
      return !this.viewState || !this.viewState.id;
    },
    getTransactions() {
        if(!this.budget || this.budget == null)
          return [];

        if( !this.viewState)
          return this.budget.transactions.slice(0,100);
        else 
          return this.budget.transactions.filter(x => x.account_id == this.viewState.id);
        }
        
  },
  methods: {
    // Now we can make this method available to our template
    // So we can format this milliunits in the correct currency format
    toCurrency: utils.convertMilliUnitsToCurrencyAmount
  }

}
</script>

<template>
  <div class="container">
    <h5>Accounts</h5>
    <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Balance</th>
        <th>Cleared Balance</th>
        <th>Uncleared Balance</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account in accounts" v-bind:key="account.id">
        <td>{{account.name}}</td>
        <td>{{convertMilliUnitsToCurrencyAmount(account.balance).toFixed(2)}}</td>
        <td>{{convertMilliUnitsToCurrencyAmount(account.cleared_balance).toFixed(2)}}</td>
        <td>{{convertMilliUnitsToCurrencyAmount(account.uncleared_balance).toFixed(2)}}</td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
// Import utils from YNAB
import {utils} from 'ynab';

export default {
  props: ['accounts'],
  methods: {
    // Now we can make this method available to our template
    // So we can format this milliunits in the correct currency format
    convertMilliUnitsToCurrencyAmount: utils.convertMilliUnitsToCurrencyAmount
  }
}
</script>

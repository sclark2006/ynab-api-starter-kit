<template>
  <div>
    <h5>Exchange Rates</h5>
    <table class="table">
    <thead>
      <tr>
        <th>Entity</th>
        <th>Buying Rate</th>
        <th>Selling Rate</th>
        <th>Last Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rate in ratesData.rates" v-bind:key="rate.id">
        <td>{{rate.entity}}</td>
        <td class="text-right">{{rate.buying_rate}}</td>
        <td class="text-right">{{rate.selling_rate}}</td>
        <td>{{rate.last_updated}}</td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: ["ratesData"]
}
</script>
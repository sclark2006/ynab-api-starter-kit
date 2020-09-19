<template>
  <div>
    <h5>{{currentMonth.month}}</h5>
    <table class="table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Goal</th>
        <th>Budgeted</th>
        <th>Activity</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in visibleCategories" v-bind:key="category.id">
        <td>{{category.name}}</td>
        <td>{{toCurrency(category.goal_target).toFixed(2)}}</td>      
        <td>{{toCurrency(category.budgeted).toFixed(2)}}</td>
        <td>{{toCurrency(category.activity).toFixed(2)}}</td>
        <td>{{toCurrency(category.balance).toFixed(2)}}</td>
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
    budget:Object
  },
  data() {
    return {
    }
  },

  computed: {
    currentMonth() {
      if(!this.budget)
        return {
          categories:[]
        };
      return this.budget.months.find(m => new Date().getUTCMonth() === new Date(m.month).getUTCMonth() );
    },
    visibleCategories() {
      if(!this.currentMonth)
        return [];
      return this.currentMonth.categories.filter(c => !c.deleted && !c.hidden );
    }
  },
  methods: {
    // Now we can make this method available to our template
    // So we can format this milliunits in the correct currency format
    toCurrency: utils.convertMilliUnitsToCurrencyAmount
  }

}
</script>

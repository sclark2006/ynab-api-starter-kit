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
      //return this.currentMonth.categories.filter(c => !c.deleted && !c.hidden );
      return this.categoryGroups();
    },

  },
  methods: {
    categoryGroups() {
      if(!this.budget) return [];
      let result = [];
      this.budget.category_groups.filter(c => !c.deleted && !c.hidden ).forEach(group => {
         var groupCategories = group.categories.filter(c => !c.deleted && !c.hidden );
         var goal_target = groupCategories.map(x => x.goal_target).reduce((a,b) => a + b,0);
         var budgeted = groupCategories.map(x => x.budgeted).reduce((a,b) => a + b,0);
         var activity = groupCategories.map(x => x.activity).reduce((a,b) => a + b,0);
         var balance = groupCategories.map(x => x.balance).reduce((a,b) => a + b,0);
        result.push({ id: group.id, name: group.name, hidden: group.hidden, deleted: group.deleted,
                     goal_target: goal_target, budgeted: budgeted, activity: activity, balance: balance
                    });
        result = result.concat(groupCategories);
      });
      return result;
    },
    toCurrency: utils.convertMilliUnitsToCurrencyAmount
  }

}
</script>

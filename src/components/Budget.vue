<template>
  <div>
    <h4>
      <a href="#" @click="shiftBudgetMonth(-1)"> <font-awesome-icon icon="arrow-circle-left" /> </a>
        <span>{{formattedMonth}}</span>
      <a href="#" @click="shiftBudgetMonth(1)"> <font-awesome-icon icon="arrow-circle-right" /> </a>
    </h4>
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
      <tr v-for="category in categoryGroups" v-bind:key="category.id">
        <td>{{category.name }}</td>
        <td class="currency text-right">{{millisToCurrency(category.goal_target)}}</td>      
        <td class="currency text-right">{{millisToCurrency(category.budgeted)}}</td>
        <td class="currency text-right">{{millisToCurrency(category.activity)}}</td>
        <td class="currency text-right">{{millisToCurrency(category.balance)}}</td>
      </tr>

    </tbody>
    </table>
  </div>
</template>

<script>
import {millisToCurrency} from '../utils/formatting.js';

import moment from 'moment';

export default {
  props: {
    budget:Object
  },
  data() {
    return {
      selectedMonth: {
        month: moment().utc().date(1).format("YYYY-MM-DD"),
        "note": "",
        "income": 0,
        "budgeted": 0,
        "activity": 0,
        "to_be_budgeted": 0,
        "age_of_money": 0,
        categories: []
      },
      groups_and_categories: []
    }
  },
  watch: {
    budget(newBudget) {
      if(newBudget) {
        let groups_and_categories = [];
        newBudget.category_groups.filter(c => !c.deleted && !c.hidden && !hiddenGroups.includes(c.name)  ).forEach(group => {
         var groupCategories = newBudget.categories.filter(c => c.category_group_id == group.id && !c.deleted && !c.hidden);
        groups_and_categories.push({ id: group.id, name: group.name, hidden: group.hidden, deleted: group.deleted,
                     goal_target: goal_target, budgeted: budgeted, activity: activity, balance: balance
                    });

        groups_and_categories = groups_and_categories.concat(groupCategories);
      });
      this.groups_and_categories = groups_and_categories;
      }
    }
  },
  computed: {
    formattedMonth() {
      return moment(this.selectedMonth.month).format("MMM YYYY");
    },
    categoryGroups() {
      if(!this.budget) return this.groups_and_categories;
      let result = [];
      //let hiddenGroups = ["Internal Master Category","Inflows","Deferred Income SubCategory	","Uncategorized"];
      let hiddenGroups = [];
      this.budget.category_groups.filter(c => !c.deleted && !c.hidden && !hiddenGroups.includes(c.name)  ).forEach(group => {
         var groupCategories = this.budget.categories.filter(c => c.category_group_id == group.id && !c.deleted && !c.hidden);
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

  },
  methods: {
    millisToCurrency: millisToCurrency,
    shiftBudgetMonth(value) {
      let monthToFind = moment(this.selectedMonth.month).utc().add(value,'months').format("YYYY-MM-DD");
      let budgetMonth = this.budget.months.find(m => monthToFind === m.month);
      if(budgetMonth) {
        this.selectedMonth = budgetMonth;
      }
    },
    updateCategoryAmounts() {
      //groups_and_categories
    }
    
  }

}
</script>

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
      <template v-for="group in categoryGroups">
        <category-group v-bind:key="group.id" :group="group" :categories="monthCategories"></category-group>
      </template>
      
    </tbody>
    </table>
  </div>
</template>

<script>
import CategoryGroup from './CategoryGroup.vue';
import {millisToCurrency} from '../utils/formatting.js';
import { ref, computed } from 'vue';
import moment from 'moment';
 let hiddenGroups = ["Internal Master Category","Inflows","Deferred Income SubCategory	","Uncategorized"];
    
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
    }
  },
  computed: {
    formattedMonth() {
      return moment(this.selectedMonth.month).format("MMM YYYY");
    },
    categoryGroups() {
      if(!this.budget) return [];
      return this.budget.category_groups.filter(c => !c.deleted && !c.hidden && !hiddenGroups.includes(c.name) ); 
    },
    monthCategories() {
      if(this.selectedMonth.categories.length === 0 && this.budget)
        return this.budget.categories.filter(c => !c.deleted && !c.hidden);
      return this.selectedMonth.categories.filter(c => !c.deleted && !c.hidden);
    }
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
  },
  components: {CategoryGroup}

}
</script>

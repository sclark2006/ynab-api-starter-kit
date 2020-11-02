<template>
<fragment>
    <tr class="category-group">
        <td>
            <span @click="toggleCollapse">
                <font-awesome-icon :icon="chevronIcon" /> 
            </span>
            {{group.name }}
        </td>
        <td  v-if="showGoal"  class="currency text-right">{{goal_target}}</td>      
        <td class="currency text-right">{{budgeted}}</td>
        <td class="currency text-right">{{activity}}</td>
        <td class="currency text-right">{{balance}}</td>
    </tr>
    <tr v-show="!isCollapsed" v-for="category in groupCategories" v-bind:key="category.id">
        <td>{{category.name}}</td>
        <td v-if="showGoal" class="currency text-right">{{toCurrency(category.goal_target)}}</td>      
        <td class="currency text-right">{{toCurrency(category.budgeted)}}</td>
        <td class="currency text-right">{{toCurrency(category.activity)}}</td>
        <td class="currency text-right">{{toCurrency(category.balance)}}</td>
    </tr>
</fragment>
</template>
<script>
import {millisToCurrency, sumToCurrency} from '../utils/formatting.js';

export default {
    props: {
        group: Object,
        categories: Array,
        showGoal: Boolean
    },
    data() { 
        return {
            isCollapsed: false,
        }
    },
    computed: {
        groupCategories() {
            if(!this.group) return [];
            return this.categories;
        },
        chevronIcon() {
            return this.isCollapsed ? "chevron-right":"chevron-down";
        },
        goal_target() {
            return this.sum(this.groupCategories.map(x => x.goal_target));
        },
        budgeted() {
            return this.sum(this.groupCategories.map(x => x.budgeted));
        },
        activity() {
            return this.sum(this.groupCategories.map(x => x.activity));
        },
        balance() {
            return this.sum(this.groupCategories.map(x => x.balance));
        }
    },
    methods: {
        sum: sumToCurrency,
        toCurrency: millisToCurrency,
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed; 
        }
    }
}
</script>
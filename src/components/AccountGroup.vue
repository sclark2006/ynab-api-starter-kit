<template>
    <li class="nav-item">
        <a class="nav-link" type="button"  @click='toggleCollapse'  data-toggle="collapse" aria-expanded="true">
            <div class="row">
                <span class="col-6 text-left">{{upperCaseName}}</span>
                <span class="col-6 currency text-right"> {{groupTotal}}</span>
            </div>
         </a>
         <a v-show="!collapsed" v-for="acc in accounts" v-bind:key="acc.id" class="nav-link" @click='showAccount(acc.id)' 
         data-toggle="pill" href="#account-transactions" role="tab" aria-selected="false">
            <div class="row">
                <span class="col-7 text-left">{{acc.name}}</span>
                <span class="col-5 currency text-right" v-bind:class="{ 'red': acc.balance < 0 }">
                    {{millisToCurrency(acc.balance)}}</span>
            </div>         
         </a>
    </li>
</template>

<script>

import {millisToCurrency, sumToCurrency} from '../utils/formatting.js';

export default {
    props: ["name","accounts","selectView"],
    data() {
        return {
            collapsed: false
        }
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
        showAccount(id) {
            this.selectView('account', id);
        },
        millisToCurrency: millisToCurrency,
        sum: sumToCurrency
    },
    computed: {
        upperCaseName() {
            return this.name.toUpperCase()
        },
        groupTotal() {
            if(!this.accounts || this.accounts.length == 0) return 0.00;
            return this.sum(this.accounts.map(x => x.balance));
        }

    }
}
</script>
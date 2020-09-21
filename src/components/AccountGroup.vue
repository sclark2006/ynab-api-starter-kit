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
                <span class="col-5 currency text-right">{{toCurrency(acc.balance).toFixed(2)}}</span>
            </div>         
         </a>
    </li>
</template>

<script>

import {utils} from 'ynab';

export default {
    props: ["name","accounts","selectView"],
    data() {
        return {
            collapsed: true

        }
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
        showAccount(id) {
            this.selectView('account', id);
        },
        toCurrency: utils.convertMilliUnitsToCurrencyAmount
    },
    computed: {
        upperCaseName() {
            return this.name.toUpperCase()
        },
        groupTotal() {
            if(!this.accounts || this.accounts.length == 0) return 0.00;
            return this.toCurrency(this.accounts.map(x => x.balance).
                    reduce((a,b) => a + b).toFixed(2));
        }

    }
}
</script>
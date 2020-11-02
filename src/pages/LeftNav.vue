<template>
  <div id="sidebar-menu" class="col-12 col-md-3 col-xl-3">
      <ul class="nav flex-column nav-pills" id="content-pills-tab" role="tablist" aria-orientation="vertical">
            <!-- Budget Selector -->
            <li class="nav-item dropdown ">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" 
                    href="#" role="button" aria-haspopup="true" aria-expanded="false">{{budget.name}}</a>
                <div class="dropdown-menu">
                    <a  href="#" v-for="b in allBudgets" v-bind:key="b.id"  
                        @click="selectBudget(b.id, $event)" class="dropdown-item">
                        {{b.name}}
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"   @click="logout" >Logout</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link active" @click="selectView('budget')" id="budget-tab" 
                data-toggle="pill" href="#budget" role="tab" aria-controls="budget" aria-selected="true">Budget</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="selectView('rates')" id="rates-tab" 
                data-toggle="pill" href="#rates" role="tab" aria-controls="rates" aria-selected="false">Exchange Rates</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="selectView('reports')" id="reports-tab" 
                data-toggle="pill" href="#reports" role="tab" aria-controls="reports" aria-selected="false">Reports</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="selectView('allAccounts')" id="all-accounts-tab" 
                data-toggle="pill" href="#all-accounts" role="tab" aria-controls="all-accounts" aria-selected="false">All Accounts</a>
            </li>            
            <account-group v-for="group in accountGroups" v-bind:key="group.name" :name="group.name" :accounts="getAccounts(group)" :selectView="selectView" />
        </ul>
        
  </div>
</template>
<script>
import AccountGroup from '../components/AccountGroup.vue';
const currencies = ['USD'];
export default {
    props: ["budgetData","selectView", "selectBudget","logout"],
    data() {
        return {
            accounts: null,
            menu: [{},],
            accountGroups: [{
                name: "Budget",
                accountFilter: (x) => x.on_budget && !x.closed,
            },
            {
                name: "Budget US$",
                accountFilter: (x) => !x.on_budget  && !x.closed && this.isForeignCurrency(x),
            },
            {
                name: "Tracking",
                accountFilter: (x) => !x.on_budget && !x.closed &&  !this.isForeignCurrency(x),
            },
            {
                name: "Closed",
                accountFilter: (x) => x.closed,
            },
            ]
        }
    },

    methods: {
        isForeignCurrency(account) {
            if(!account.note) return false;
            return currencies.some(x => account.note.includes(x));
        },
        getAccounts(group) {
            return this.budget.accounts.filter(group.accountFilter);
        }
    },
    computed: {
        budget() {
            return this.budgetData.currentBudget || {
                name:"",
                accounts: []
            };
        },
        allBudgets() {
            return this.budgetData.budgets;
        }
    },
    components: {
        AccountGroup

    }
}
</script>
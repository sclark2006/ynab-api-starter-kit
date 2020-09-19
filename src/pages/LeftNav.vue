<template>
  <div id="sidebar-menu" class="col-12 col-md-4 col-xl-2">
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
                <a class="nav-link" @click="selectView('reports')" id="reports-tab" 
                data-toggle="pill" href="#reports" role="tab" aria-controls="reports" aria-selected="false">Reports</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="selectView('allAccounts')" id="all-accounts-tab" 
                data-toggle="pill" href="#all-accounts" role="tab" aria-controls="all-accounts" aria-selected="false">All Accounts</a>
            </li>            
            <account-group name="Budget" :accounts="getBudgetAccounts" :selectView="selectView" />
            <account-group name="Tracking" :accounts="getTrackingAccounts" :selectView="selectView" />
            <account-group name="Closed" :accounts="getClosedAccounts" :selectView="selectView" />
        </ul>
        
  </div>
</template>
<script>
import AccountGroup from '../components/AccountGroup.vue';

export default {
    props: ["budgetData","selectView", "selectBudget","logout"],
    data() {
        return {
            accounts: null,
        }
    },

    methods: {

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
        },
        getBudgetAccounts() {
            return this.budget.accounts.filter(x => x.on_budget && !x.closed);
        },
         getTrackingAccounts() {
            return this.budget.accounts.filter(x => !x.on_budget && !x.closed);

        },
        getClosedAccounts() {
            return this.budget.accounts.filter(x => x.closed);
        }

    },
    components: {
        AccountGroup

    }
}
</script>
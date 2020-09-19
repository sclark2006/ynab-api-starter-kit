<template>
    <div id="layout" class="col-12 wrapper">
        <Nav />
        <!-- Display a loading message if loading -->
        <h1 v-if="loading" class="display-4">Loading...</h1>
        <!-- Display an error if we got one -->
        <div v-if="error">
            <h1 class="display-4">Oops!</h1>
            <p class="lead">{{error}}</p>
            <button class="btn btn-primary" @click="resetToken">Try Again &gt;</button>
        </div>
        <Authorization :config="ynab">
          <LeftNav :budget="currentBudget" :selectView="selectView" />
          <PageContent :budget="currentBudget" :viewState="viewState" />          
        </Authorization>
        <Footer />
  </div>
</template>
<script>

import auth from "../utils/auth.js";

// Hooray! Here comes YNAB!
import * as ynab from 'ynab';

// Import our config for YNAB
import config from '../config.json';

// Import Our Components to Compose Our App
import Authorization from './Authorization.vue';
import LeftNav from './LeftNav.vue';
import PageContent from './Content.vue';
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import Budgets from '../components/Budgets.vue';
import Accounts from '../components/Accounts.vue';

export default {
  // The data to feed our templates
  data () {
    return {
      ynab: {
        clientId: config.clientId,
        redirectUri: config.redirectUri,
        token: null,
        api: null,
      },
      loading: false,
      error: null,
      budgetId: null,
      currentBudget: null,
      budgets: [],
      accounts: [],
      transactions: [],
      viewState: {
        currentView: 'budget'
      }
    }
  },
  // When this component is created, check whether we need to get a token,
  // budgets or display the transactions
  created() {
    this.ynab.token = auth.findYNABToken();
    if (this.ynab.token) {
      this.api = new ynab.api(this.ynab.token);
      if(!this.currentBudget) {
        this.loadLastUsedBudget();
      }
    }
  },
  methods: {
    selectView(view, id) {
      this.viewState = {'currentView': view, 'id': id };
     },    
    loadLastUsedBudget() {
      this.loading = true;
      this.error = null;
      this.api.budgets.getBudgetById('last-used').then((res) => {
        this.currentBudget = res.data.budget;
        return Promise.resolve(this.currentBudget);
      }).then(x => this.loadTransactions(x))
      .catch((err) => {
        this.error = err.error.detail;
      }).finally(() => {
        this.loading = false;
      });
    },
    loadTransactions(budget) {
      this.api.transactions.getTransactions(budget.id).then((res) => {
        budget.transactions = res.data.transactions;
      });
    },
    // This uses the YNAB API to get a list of budgets
    getBudgets() {
      this.loading = true;
      this.error = null;
      this.api.budgets.getBudgets().then((res) => {
        this.budgets = res.data.budgets;
      }).catch((err) => {
        this.error = err.error.detail;
      }).finally(() => {
        this.loading = false;
      });
    },
    // This selects a budget and gets all the transactions in that budget
    selectBudget(id) {
      this.loading = true;
      this.error = null;
      this.budgetId = id;
      this.transactions = [];
      this.accounts = [];
      this.api.accounts.getAccounts(id).then(response => {
        this.accounts = response.data.accounts;
      }).catch((err) => {
        this.error = err.error.detail;
      }).finally(() => {
        this.loading = false;
      });

    },
   

    // Clear the token and start authorization over
    resetToken() {
      sessionStorage.removeItem('ynab_access_token');
      this.ynab.token = null;
      this.error = null;
    }
  },
  // Specify which components we want to make available to our templates
  components: {
    Authorization,
    LeftNav,
    PageContent,
    Nav,
    Footer,
    Budgets,
    Accounts,
  }
}
</script>
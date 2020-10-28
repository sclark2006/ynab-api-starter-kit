<template>
  <div id="layout" class="col-12 wrapper">
    <Nav />
    <!-- Display a loading message if loading -->
    <h1 v-if="loading" class="display-4">Loading...</h1>
    <!-- Display an error if we got one -->
    <div v-else-if="error">
      <h1 class="display-4">Oops!</h1>
      <p class="lead">{{ error }}</p>
      <button class="btn btn-primary" @click="resetToken">
        Try Again &gt;
      </button>
    </div>
    <Authorization v-else :config="ynab">
      <LeftNav
        :budgetData="budgetData"
        :selectView="selectView"
        :selectBudget="loadBudget"
        :logout="resetToken"
      />
      <PageContent :budget="budgetData.currentBudget" :viewState="viewState" />
    </Authorization>
    <Footer />
  </div>
</template>
<script>
import auth from "../utils/auth.js";

// Hooray! Here comes YNAB!
import * as ynab from "ynab";

// Import our config for YNAB
import config from "../config.json";

// Import Our Components to Compose Our App
import Authorization from "./Authorization.vue";
import LeftNav from "./LeftNav.vue";
import PageContent from "./Content.vue";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

export default {
  // The data to feed our templates
  data() {
    return {
      ynab: {
        clientId: config.clientId,
        redirectUri: config.redirectUri,
        token: null,
        api: null,
      },
      loading: false,
      error: null,
      budgetData: {
        budgetId: null,
        currentBudget: null,
        budgets: [],
        accounts: [],
        transactions: [],
      },
      viewState: {
        currentView: "budget",
      },
    };
  },
  // When this component is created, check whether we need to get a token,
  // budgets or display the transactions
  created() {
    this.ynab.token = auth.findYNABToken();
    if (this.ynab.token) {
      this.api = new ynab.api(this.ynab.token);
      if (!this.budgetData.currentBudget) {
        this.loadAllBudgets();
        this.loadBudget("last-used");
      }
    }
  },
  methods: {
    selectView(view, id) {
      this.viewState = { currentView: view, id: id };
    },
    loadBudget(id) {
      this.loading = true;
      this.error = null;
      this.api.budgets
        .getBudgetById(id)
        .then((res) => {
          return Promise.resolve(res.data.budget);
        })
        .then((budget) => this.loadTransactions(budget))
        //.then((budget) => this.loadCategories(budget))
        .then((budget) => (this.budgetData.currentBudget = budget))
        .catch((err) => {
          if (err.error && err.error.detail) this.error = err.error.detail;
          else this.error = err;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadTransactions(budget) {
      return this.api.transactions.getTransactions(budget.id).then((res) => {
        let response = res.data.transactions.map((t) => {
          if (t.category_name == "Immediate Income SubCategory")
            t.category_name = "Inflow: To be Budgeted";
          return t;
        });
        response.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        budget.transactions = response;
        return Promise.resolve(budget);
      });
    },
    loadCategories(budget) {
      return this.api.categories.getCategories(budget.id).then((res) => {
        budget.category_groups = res.data.category_groups;
        return Promise.resolve(budget);
      });
    },

    loadAllBudgets() {
      this.loading = true;
      this.error = null;
      this.api.budgets
        .getBudgets(false)
        .then((res) => {
          this.budgetData.budgets = res.data.budgets;
        })
        .catch((err) => {
          this.error = err.error.detail;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // Clear the token and start authorization over
    resetToken() {
      sessionStorage.removeItem("ynab_access_token");
      this.ynab.token = null;
      this.error = null;
    },
  },
  // Specify which components we want to make available to our templates
  components: {
    Authorization,
    LeftNav,
    PageContent,
    Nav,
    Footer,
  },
};
</script>
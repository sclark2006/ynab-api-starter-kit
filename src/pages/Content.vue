<template>
  <div class="container-lg container-md">
    <div class="col-12">
      <div class="tab-content" id="tab-page-content">
        <div
          class="tab-pane fade show active"
          id="budget"
          role="tabpanel"
          aria-labelledby="budget-tab"
        >
          <budget :budget="budget"/>
        </div>
        <div
          class="tab-pane fade"
          id="rates"
          role="tabpanel"
          aria-labelledby="rates-tab"
        >
          <exchange-rates :ratesData="ratesData" />
        </div>
        <div
          class="tab-pane fade"
          id="reports"
          role="tabpanel"
          aria-labelledby="reports-tab"
        >
          Reports
        </div>
        <div
          class="tab-pane fade"
          id="all-accounts"
          role="tabpanel"
          aria-labelledby="all-accounts-tab"
        >
          <transactions :budget="budget" />
        </div>
        <div
          class="tab-pane fade"
          id="account-transactions"
          role="tabpanel"
          aria-labelledby="account-transactions-tab"
        >
          <transactions :budget="budget" :viewState="viewState" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Transactions from "../components/Transactions.vue";
import Budget from "../components/Budget.vue";
import ExchangeRates from "../components/ExchangeRates.vue";

export default {


  props: ["budget", "ratesData", "viewState"],
  data() {
    return {
    };
  },
  components: {
    Transactions,
    Budget,
    ExchangeRates,
  },
};
</script>
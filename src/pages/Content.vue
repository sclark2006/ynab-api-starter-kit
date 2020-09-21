<template>
    <div class="container-lg container-md">
        <div class="col-12 ">
            <div class="tab-content" id="tab-page-content">
                <div class="tab-pane fade show active" id="budget" role="tabpanel" aria-labelledby="budget-tab">
                   <Budget :budget="budget" />
                </div>
                <div class="tab-pane fade" id="rates" role="tabpanel" aria-labelledby="rates-tab">
                    <ExchangeRates />
                </div>
                <div class="tab-pane fade" id="reports" role="tabpanel" aria-labelledby="reports-tab">
                    Reports
                </div>
                <div class="tab-pane fade" id="all-accounts" role="tabpanel" aria-labelledby="all-accounts-tab">
                   <Transactions :budget="budget" />
                    </div>
                <div class="tab-pane fade" id="account-transactions" role="tabpanel" aria-labelledby="account-transactions-tab">
                   <Transactions :budget="budget" :viewState="viewState" />
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
import Transactions from '../components/Transactions.vue';
import Budget from '../components/Budget.vue';
import ExchangeRates from '../components/ExchangeRates.vue';

export default {
    props: ["budget", "viewState"],
    components: {
        Transactions,
        Budget,
        ExchangeRates
    }
}
</script>
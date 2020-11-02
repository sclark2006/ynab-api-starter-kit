<template>
  <div>
    <div class="row"> 
      <div class="col-12" v-if="showAll">
        <h5 class="col-6">All Accounts</h5>
      </div>
      <div class="col-12" v-else> 
          <h5>
            <button type="button" class="btn " @click="showEditModal"> 
              <font-awesome-icon icon="edit" />
            </button>
             {{account.name}} 
          </h5>
          <div v-if="account.currencyRateInfo && account.currencyRateInfo.isForeign">
            <h5>
              {{account.currencyRateInfo.iso_code}} 
              {{account.currencyRateInfo.bank}} 
              
              Compra: {{account.currencyRateInfo.rate.buying_rate}}
              Venta: {{account.currencyRateInfo.rate.selling_rate}} 
            </h5>
          </div>
          
      </div>

    </div>

    <table class="table table-sm col-12" >
    <thead>
      <tr>
        <th v-if="showAll">Account</th>
        <th>Flag</th>
        <th>Date</th>
        <th>Payee</th>
        <th>Category</th>
        <th>Memo</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions.slice(0,100)" v-bind:key="transaction.id">
        <td v-if="showAll" style="max-width: 200px;">{{transaction.account_name}}</td>
        <td><font-awesome-icon icon="flag" :class="(transaction.flag_color || 'noflag')"/> </td>
        <td>{{transaction.date}}</td>
        <td style="max-width: 200px">{{transaction.payee_name}}</td>
        <td style="max-width: 200px">{{transaction.category_name}}</td>
        <td style="max-width: 150px">{{transaction.memo}}</td>
        <td class="currency text-right" v-bind:class="{ 'red': transaction.amount < 0 }">{{millisToCurrency(transaction.amount)}}</td>
      </tr>
    </tbody>
    </table>
    <account-edit-modal :account="account" v-show="isEditModalVisible" @close="closeEditModal"  />

  </div>
</template>

<script>
import {millisToCurrency} from '../utils/formatting.js';
import AccountEditModal from './AccountEditModal.vue';


export default {
  props: {
    budget:Object,
    viewState:Object
  },
  data() {
    return {
      isEditModalVisible: false
    }
  },

  computed: {
    account() {
      if(!this.viewState || !this.budget) return {};

      return this.budget.accounts.find(x => x.id == this.viewState.id);
    },
    showAll() {
      return !this.viewState || !this.viewState.id;
    },
    transactions() {
        if(!this.budget || this.budget == null)
          return [];

        if( !this.viewState)
          return this.budget.transactions;
        else 
          return this.budget.transactions.filter(x => x.account_id == this.viewState.id);
        }
        
  },
  methods: {
    // Now we can make this method available to our template
    // So we can format this milliunits in the correct currency format
    millisToCurrency: millisToCurrency,
    showEditModal() {
      this.isEditModalVisible = true;
    },
    closeEditModal() {
      this.isEditModalVisible = false;
    }
  },
      components: {
        AccountEditModal

    }

}
</script>
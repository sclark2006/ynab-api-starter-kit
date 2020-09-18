import * as ynab from 'ynab';

 const _default = {
    getLastUsedBudget(data) {
        data.loading = true;
        data.error = null;
        this.api.budgets.getBudgetById('last-used').then((res) => {
          this.currentBudget = res.data.budget;
        }).catch((err) => {
          this.error = err.error.detail;
        }).finally(() => {
          this.loading = false;
        });
      }

};
export default _default;

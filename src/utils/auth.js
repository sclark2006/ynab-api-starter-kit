const _default = {
    // Method to find a YNAB token
    // First it looks in the location.hash and then sessionStorage
    findYNABToken() {
        let token = null;
        const search = window.location.hash.substring(1).replace(/&/g, '","').replace(/=/g,'":"');
        if (search && search !== '') {
          // Try to get access_token from the hash returned by OAuth
          const params = JSON.parse('{"' + search + '"}', function(key, value) {
            return key === '' ? value : decodeURIComponent(value);
          });
          token = params.access_token;
          sessionStorage.setItem('ynab_access_token', token);
          window.location.hash = '';
        } else {
          // Otherwise try sessionStorage
          token = sessionStorage.getItem('ynab_access_token');
        }
        return token;
      },

      authorizeWithYNAB(config, event) {
        event.preventDefault();
        const uri = `https://app.youneedabudget.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=token`;
        location.replace(uri);
    }
}

export default _default;
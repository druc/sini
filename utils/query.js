const axios = require('axios');
axios.defaults.timeout = 5000;

module.exports = async (searchTerm, maxResults = 10) => {
    const results = await axios({
        method: 'get',
        url: 'https://api.datamuse.com/words',
        params: {
            format: 'json',
            ml: searchTerm,
            max: maxResults
        },
    });

    return results.data;
};
const ora = require('ora');
const query = require('../utils/query');
const t = require('table');

module.exports = async (searchTerm, maxResults) => {
    function formatResults(results) {
        let data = [];

        // grab words
        for (let i = 0; i < results.length; i++) {
            data.push(results[i].word);
        }

        // split into columns (2)
        data = data.reduce((rows, key, index) => {
            if (index % 2 === 0) {
                return rows.push([key]) && rows;
            } else {
                return rows[rows.length - 1].push(key) && rows;
            }
        }, []);

        // fill empty columns
        data.forEach((row) => {
            while (row.length < 2) {
                row.push(' ');
            }
            return row;
        });

        return data;
    }

    async function execute() {
        const spinner = ora().start();

        try {
            const searchResults = await query(searchTerm, maxResults);
            let data = formatResults(searchResults);

            if (data.length) {
                let output = t.table(data, {
                    border: t.getBorderCharacters('void'),
                    columnDefault: {
                        paddingLeft: 0,
                        paddingRight: 1
                    },
                    drawHorizontalLine: () => {
                        return false
                    }
                });
                console.log(output);
            } else {
                console.error("The thesaurus api failed us this time.");
            }
            spinner.stop();
        } catch (err) {
            spinner.stop();
            console.log(err);
            console.error("The thesaurus api failed us this time.");
        }
    }

    await execute();
};
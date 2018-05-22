const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let word = args._[0] || 'help';
    let maxResults = args._[1] || 10;

    if (args.version || args.v) {
        word = 'version'
    }

    if (args.help || args.h) {
        word = 'help'
    }

    switch (word) {
        case 'version':
            require('./cmds/version')(args);
            break;

        case 'help':
            require('./cmds/help')(args);
            break;

        default:
            require('./cmds/searchWord')(word, maxResults);
            break;
    }
}
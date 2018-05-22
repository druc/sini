const menus = {
    main: `
    sini [word]          search synonyms
    sini [word] [limit]  limit results

    version ............ show package version
    help ............... show help menu`,
};

module.exports = (args) => {
    const subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0];

    console.log(menus[subCmd] || menus.main);
}
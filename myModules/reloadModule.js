const reload = (dir) => {
    var dir = "./../"+dir
    delete require.cache[require.resolve(dir)];
	return require(dir);
}

module.exports = reload
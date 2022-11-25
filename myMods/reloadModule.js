module.exports = (dir) => {
    var dir = "./../"+dir
    delete require.cache[require.resolve(dir)];
	return require(dir);
}
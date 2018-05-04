import babel from 'rollup-plugin-babel'

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/nsDuration.js',
		format: 'iife',
		name: 'Duration'
	},
	plugins: [
		babel({})
	]
}
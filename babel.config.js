const presets = [
	[
		"@babel/preset-env",
		{
			targets: {
			  edge: "15",
			  firefox: "44",
			  chrome: "55",
			  safari: "7",
			  ie:"9"
			},
			useBuiltIns: "usage"
		}
	],
	[
		"@babel/preset-react"
	]
]

module.exports = { presets };

#!/usr/bin/env node
// 使用env来找到node，并使用node来作为程序的解释程序。

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

// 版本相关
program
	.version(require('../package').version)
	.parse(process.argv)

program
	.usage('<command> [options]')

program
	.command('add')
	.description('Add a new template')
	.alias('a')
	.action(() => {
		require('../command/add')()
	})

program
	.command('list')
	.description('List all templates')
	.alias('l')
	.action(() => {
		require('../command/list')()
	})

program
	.command('init')
	.description('Generate project through template')
	.alias('i')
	.action(() => {
		require('../command/init')()
	})

program
	.command('delete')
	.description('Delete a template')
	.alias('d')
	.action(() => {
		require('../command/delete')()
	})

program.parse(process.argv)

if (!program.args.length) {
	program.help()
}

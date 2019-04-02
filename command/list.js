/**
 * @Author: Created By McChen
 * @Date: 2019/4/2
 * @Mail: mcchen.club@gmail.com
 */
const json = require('../templates')
const chalk = require('chalk')
const log = console.log

module.exports = () => {
	if (json && json.length) {
		log(chalk.white('Templates: \n'))
		const tpls = json.sort((a, b) => a.name > b.name)
		for (let i = 0; i < tpls.length; i++) {
			const tpl = tpls[i]
			log(`${chalk.greenBright(tpl.name)}`)
			log(`${chalk.white(' * url: ')}${chalk.blueBright(tpl.url)}`)
			log(`${chalk.white(' * branch: ')}${chalk.blueBright(tpl.branch)}`)
			log(`${chalk.white(' * description: ')}${chalk.blueBright(tpl.description)}`)
		}
	} else {
		log(`${chalk.white('Sorry, there is no template, please enter ')}${chalk.greenBright('\'artcli a\'')}${chalk.white(' to add a template.')}`)
	}
	process.exit()
}

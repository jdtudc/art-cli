/**
 * @Author: Created By McChen
 * @Date: 2019/4/2
 * @Mail: mcchen.club@gmail.com
 */
const fs = require('fs')
const co = require('co')
const prompt = require('co-prompt')
const json = require('../templates')
const chalk = require('chalk')
const log = console.log

module.exports = () => {
	co(function* () {
		// 接收用户输入的参数
		let tplName = yield prompt('Delete Template name: ')
		if (tplName && tplName.trim()) {
			// 删除对应的模板
			if (!~json.findIndex(_ => _.name === tplName.trim())) {
				log(chalk.redBright('Template does not exist!'))
				process.exit()
			}
		} else {
			log(chalk.redBright('Template name is required.'))
			tplName = yield prompt('Template name: ')
		}

		// 写入template.json
		const tpls = json.filter(_ => _.name !== tplName.trim())
		fs.writeFile(__dirname + '/../templates.json', JSON.stringify(tpls, null, 2), 'utf-8', err => {
			if (err) {
				log(chalk.redBright(err))
				process.exit()
			} else {
				log(chalk.greenBright('Delete template successfully!\n'))
				log(chalk.grey('The lastest template list is: \n'))
				for (let i = 0; i < tpls.length; i++) {
					const tpl = tpls[i]
					log(`${chalk.greenBright(tpl.name)}`)
					log(`${chalk.white(' * url: ')}${chalk.blueBright(tpl.url)}`)
					log(`${chalk.white(' * branch: ')}${chalk.blueBright(tpl.branch)}`)
					log(`${chalk.white(' * description: ')}${chalk.blueBright(tpl.description)}`)
				}
				process.exit()
			}
		})
	})
}

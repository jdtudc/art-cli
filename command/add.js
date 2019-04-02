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
		// 分步接收用户输入的参数
		let tplName = yield prompt('Template name: ')
		if (tplName && tplName.trim()) {
			// 避免重复添加
			if (~json.findIndex(_ => _.name === tplName.trim())) {
				log(chalk.redBright('Template has already existed!'))
				process.exit()
			}
		} else {
			log(chalk.redBright('Template name is required.'))
			tplName = yield prompt('Template name: ')
		}

		const gitUrl = yield prompt('Git https link: ')
		const branch = yield prompt('Branch: ')
		const description = yield prompt('Description: ')

		const newTpl = {
			name: tplName.trim(),
			url: gitUrl.trim().replace(/[\u0000-\u0019]/g, ''),
			branch: branch,
			description: description
		}

		// 把模板信息写入templates.json
		const tpls = json.concat(newTpl).sort((a, b) => a.name > b.name)
		fs.writeFile(__dirname + '/../templates.json', JSON.stringify(tpls, null, 2), 'utf-8', (err) => {
			if (err) {
				log(chalk.redBright(err))
				process.exit()
			} else {
				log(chalk.greenBright('Add template successfully!\n'))
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

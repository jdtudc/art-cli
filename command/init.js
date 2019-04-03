/**
 * @Author: Created By McChen
 * @Date: 2019/4/2
 * @Mail: mcchen.club@gmail.com
 */
const fs = require('fs')
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const json = require('../templates')
const chalk = require('chalk')
const log = console.log

module.exports = () => {
	co(function* () {
		// 处理用户输入
		let tplName = yield prompt('Template name: ')

		if (tplName && tplName.trim()) {
			// 避免重复添加
			if (!~json.findIndex(_ => _.name === tplName.trim())) {
				log(chalk.redBright('Template does not exit!'))
				process.exit()
			}
		} else {
			log(chalk.redBright('Template name is required.'))
			tplName = yield prompt('Template name: ')
		}

		const tpl = json.find(_ => _.name === tplName.trim())

		let projectName = yield prompt('Project name: ');


		const gitUrl = tpl.url
		const branch = tpl.branch

		// git命令，远程拉取项目并自定义项目名
		const cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

		log(chalk.whiteBright('\n Start generating...'))

		exec(cmdStr, (error, stdout, stderr) => {
			if (error) {
				log(error)
				process.exit()
			} else {
				complete()
			}
		})

		function complete() {
			log(chalk.greenBright('\n Delete .git completed!'));
			log(chalk.green('\n √ Generation completed!'))
			log(`\n cd ${projectName} && npm install \n`)

			process.exit()
		}
	})
}

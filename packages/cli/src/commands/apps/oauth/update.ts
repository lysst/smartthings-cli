import { AppOAuth } from '@smartthings/core-sdk'

import { InputOutputAPICommand } from '@smartthings/cli-lib'

import { buildTableForOutput } from '../oauth'


export default class AppOauthUpdateCommand extends InputOutputAPICommand<AppOAuth, AppOAuth> {
	static description = 'update the OAuth settings of the app'

	static flags = InputOutputAPICommand.flags

	static args = [{
		name: 'id',
		description: 'the app id',
		required: true,
	}]

	protected primaryKeyName(): string { return 'appId' }
	protected sortKeyName(): string { return 'displayName' }

	protected buildTableOutput(appOAuth: AppOAuth): string {
		const table = buildTableForOutput(this, appOAuth)
		return table.toString()
	}

	async run(): Promise<void> {
		const { args, argv, flags } = this.parse(AppOauthUpdateCommand)
		await super.setup(args, argv, flags)

		this.processNormally((data) => { return this.client.apps.updateOauth(args.id, data) })
	}
}

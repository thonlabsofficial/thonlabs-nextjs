const Log = {
	generateTimestamp() {
		const date = new Date();
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
	},
	info(data: any) {
		const timestamp = this.generateTimestamp();
		console.log(
			`\x1b[36m[${timestamp}]\x1b[0m \x1b[34mTL_LOG:\x1b[0m ${JSON.stringify(data)}`,
		);
	},
	error(data: any) {
		const timestamp = this.generateTimestamp();
		console.error(
			`\x1b[36m[${timestamp}]\x1b[0m \x1b[31mTL_ERROR:\x1b[0m \x1b[31m${JSON.stringify(data)}\x1b[0m`,
		);
	},
	debug(data: any) {
		if (process.env.TL_DEBUG !== 'true') {
			return;
		}

		const timestamp = this.generateTimestamp();
		console.debug(
			`\x1b[36m[${timestamp}]\x1b[0m \x1b[33mTL_DEBUG:\x1b[0m ${JSON.stringify(data)}`,
		);
	},
};

export default Log;

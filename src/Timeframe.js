import { Abstract, pad } from './utils'

@Abstract
class Timeframe {
	toMilliseconds() {
		return this.milliseconds
	}

	toSeconds() {
		return this.milliseconds / 1000
	}

	toMinutes() {
		return this.milliseconds / 1000 / 60
	}

	toHours() {
		return this.milliseconds / 1000 / 60 / 60
	}

	format(fmt = 'HH:mm:ss.SSS') {
		let unix = this.milliseconds
		let radix = 10

		let H = unix / 1000 / 60 / 60
		let m = (unix / 1000 / 60) - (parseInt(H, 10) * 60)
		let s = (unix / 1000) - (parseInt(H, 10) * 60 * 60) - (parseInt(m, 10) * 60)
		let S = unix - (parseInt(H, 10) * 60 * 60 * 1000) - (parseInt(m, 10) * 60 * 1000) - (parseInt(s, 10) * 1000)

		return fmt
			.replace(/HH/g, pad(H, 2))
			.replace(/H/g, parseInt(H, radix))
			.replace(/mm/g, pad(m, 2))
			.replace(/m/g, parseInt(m, radix))
			.replace(/ss/g, pad(s, 2))
			.replace(/s/g, parseInt(s, radix))
			.replace(/SSS/g, pad(S, 3))
			.replace(/S/g, parseInt(S, radix))
	}
}

export default Timeframe
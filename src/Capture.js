import Timeframe from './Timeframe'

export class Capture extends Timeframe {
	constructor(start = new Date(), end = null) {
		super()
		this.start = typeof start === 'string' ? new Date(start) : start
		this.end = typeof end === 'string' ? new Date(end) : end
	}

	get milliseconds() {
		return (this.end ? this.end.valueOf() : new Date()) - this.start.valueOf()
	}

	get isRunning() {
		return !this.end
	}

	stop() {
		if (!this.end) this.end = new Date()
	}
}

export default Capture
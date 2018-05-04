import Timeframe from './Timeframe'
import Capture from './Capture'
import { sum } from './utils'

class Duration extends Timeframe {
	static Capture = Capture
	static Timeframe = Timeframe
	
	constructor() {
		super()
		this.captures = []
	}

	get duration() {
		return this.captures.map(x => x.duration).reduce(sum, 0)
	}

	get isRunning() {
		if (!this.captures.length) {
			return false
		} else {
			return !this.captures[this.captures.length - 1].end
		}
	}

	start() {
		this.stop()
		this.captures.push(new Capture(new Date()))
		this.save()
	}

	stop() {
		this.captures.map(x => x.stop())
		this.save()
	}

	toggle() {
		if (this.isRunning) {
			this.stop()
		} else {
			this.start()
		}
	}

	clear() {
		this.captures = []
		this.save()
	}

	save() {
		localStorage.setItem('ns-duration', JSON.stringify(this))
	}

	restore(json) {
		if (!json) {
			json = localStorage.getItem('ns-duration') || '{"captures":[]}'
		}

		this.captures = JSON.parse(json).captures.map(({ start, end }) => new Capture(start, end))
	}
}

export default Duration
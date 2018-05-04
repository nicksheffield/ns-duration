import Timeframe from './Timeframe'
import Capture from './Capture'
import { sum } from './utils'

class Duration extends Timeframe {
	static Capture = Capture
	static Timeframe = Timeframe

	constructor(name = '') {
		super()
		this.captures = []
		this.name = name
		this.restore()
	}

	get milliseconds() {
		return this.captures.map(x => x.milliseconds).reduce(sum, 0)
	}

	get isRunning() {
		return this.captures.reduce((acc, cap) => acc || cap.isRunning, false)
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
		this[this.isRunning ? 'stop' : 'start']()
	}

	clear() {
		this.captures = []
		this.save()
	}

	save() {
		localStorage.setItem('ns-duration-' + this.name, JSON.stringify(this))
	}

	restore(json) {
		json = json || localStorage.getItem('ns-duration-' + this.name) || '{"captures":[]}'

		this.captures = JSON.parse(json).captures.map(({ start, end }) => new Capture(start, end))
	}
}

export default Duration
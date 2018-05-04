var Duration = (function () {
	'use strict';

	const sum = (a, b) => a + b;
	const pad = (n, len) => String(parseInt(n, 10)).padStart(len, '0');

	const Abstract = function (target) {
		return class Abstract extends target {
			constructor() {
				super();
				if (new.target === Abstract) {
					throw Error(`${target.name} is Abstract and cannot be instantiated`);
				}
			}
		};
	};

	var _class;

	let Timeframe = Abstract(_class = class Timeframe {
		toMilliseconds() {
			return this.duration;
		}

		toSeconds() {
			return this.duration / 1000;
		}

		toMinutes() {
			return this.duration / 1000 / 60;
		}

		toHours() {
			return this.duration / 1000 / 60 / 60;
		}

		format(fmt = 'HH:mm:ss.SSSS') {
			let H = this.duration / 1000 / 60 / 60;
			let m = this.duration / 1000 / 60 - parseInt(H, 10) * 60;
			let s = this.duration / 1000 - parseInt(H, 10) * 60 * 60 - parseInt(m, 10) * 60;
			let S = this.duration - parseInt(H, 10) * 60 * 60 * 1000 - parseInt(m, 10) * 60 * 1000 - parseInt(s, 10) * 1000;

			return fmt.replace(/HH/g, pad(H, 2)).replace(/H/g, parseInt(H, 10)).replace(/mm/g, pad(m, 2)).replace(/m/g, parseInt(m, 10)).replace(/ss/g, pad(s, 2)).replace(/s/g, parseInt(s, 10)).replace(/SSSS/g, pad(S, 4)).replace(/S/g, parseInt(S, 10));
		}
	}) || _class;

	let Capture = class Capture extends Timeframe {
		constructor(start = new Date(), end = null) {
			super();
			this.start = typeof start === 'string' ? new Date(start) : start;
			this.end = typeof end === 'string' ? new Date(end) : end;
		}

		get duration() {
			return (this.end ? this.end.valueOf() : new Date()) - this.start.valueOf();
		}

		stop() {
			if (!this.end) this.end = new Date();
		}
	};

	var _class$1, _temp;

	let Duration = (_temp = _class$1 = class Duration extends Timeframe {

		constructor(name = '') {
			super();
			this.captures = [];
			this.name = name;
			this.restore();
		}

		get duration() {
			return this.captures.map(x => x.duration).reduce(sum, 0);
		}

		get isRunning() {
			if (!this.captures.length) {
				return false;
			} else {
				return !this.captures[this.captures.length - 1].end;
			}
		}

		start() {
			this.stop();
			this.captures.push(new Capture(new Date()));
			this.save();
		}

		stop() {
			this.captures.map(x => x.stop());
			this.save();
		}

		toggle() {
			if (this.isRunning) {
				this.stop();
			} else {
				this.start();
			}
		}

		clear() {
			this.captures = [];
			this.save();
		}

		save() {
			localStorage.setItem('ns-duration-' + this.name, JSON.stringify(this));
		}

		restore(json) {
			if (!json) {
				json = localStorage.getItem('ns-duration-' + this.name) || '{"captures":[]}';
			}

			this.captures = JSON.parse(json).captures.map(({ start, end }) => new Capture(start, end));
		}
	}, _class$1.Capture = Capture, _class$1.Timeframe = Timeframe, _temp);

	return Duration;

}());

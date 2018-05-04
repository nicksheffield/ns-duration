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
			return this.milliseconds;
		}

		toSeconds() {
			return this.milliseconds / 1000;
		}

		toMinutes() {
			return this.milliseconds / 1000 / 60;
		}

		toHours() {
			return this.milliseconds / 1000 / 60 / 60;
		}

		format(fmt = 'HH:mm:ss.SSS') {
			let unix = this.milliseconds;
			let radix = 10;

			let H = unix / 1000 / 60 / 60;
			let m = unix / 1000 / 60 - parseInt(H, 10) * 60;
			let s = unix / 1000 - parseInt(H, 10) * 60 * 60 - parseInt(m, 10) * 60;
			let S = unix - parseInt(H, 10) * 60 * 60 * 1000 - parseInt(m, 10) * 60 * 1000 - parseInt(s, 10) * 1000;

			return fmt.replace(/HH/g, pad(H, 2)).replace(/H/g, parseInt(H, radix)).replace(/mm/g, pad(m, 2)).replace(/m/g, parseInt(m, radix)).replace(/ss/g, pad(s, 2)).replace(/s/g, parseInt(s, radix)).replace(/SSS/g, pad(S, 3)).replace(/S/g, parseInt(S, radix));
		}
	}) || _class;

	let Capture = class Capture extends Timeframe {
		constructor(start = new Date(), end = null) {
			super();
			this.start = typeof start === 'string' ? new Date(start) : start;
			this.end = typeof end === 'string' ? new Date(end) : end;
		}

		get milliseconds() {
			return (this.end ? this.end.valueOf() : new Date()) - this.start.valueOf();
		}

		get isRunning() {
			return !this.end;
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

		get milliseconds() {
			return this.captures.map(x => x.milliseconds).reduce(sum, 0);
		}

		get isRunning() {
			return this.captures.reduce((acc, cap) => acc || cap.isRunning, false);
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
			this[this.isRunning ? 'stop' : 'start']();
		}

		clear() {
			this.captures = [];
			this.save();
		}

		save() {
			localStorage.setItem('ns-duration-' + this.name, JSON.stringify(this));
		}

		restore(json) {
			json = json || localStorage.getItem('ns-duration-' + this.name) || '{"captures":[]}';

			this.captures = JSON.parse(json).captures.map(({ start, end }) => new Capture(start, end));
		}
	}, _class$1.Capture = Capture, _class$1.Timeframe = Timeframe, _temp);

	return Duration;

}());

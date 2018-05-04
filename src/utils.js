export const sum = (a, b) => a + b
export const pad = (n, len) => String(parseInt(n, 10)).padStart(len, '0')

export const Abstract = function(target) {
	return class Abstract extends target {
		constructor() {
			super()
			if (new.target === Abstract) {
				throw Error( `${target.name} is Abstract and cannot be instantiated` )
			}
		}
	}
}
# Duration

A tiny library for creating accurate pausable timers in the browser.

Really I have one use case for this and wanted to host it here for that, but it might be useful elsewhere.

It works by capturing separate start/end time blocks, and then summing their durations together.

Each Duration object also keeps itself synced to localStorage so page refreshes don't stop the timer.

---

## Example

```javascript
// Create a duration object
const dur = new Duration('myTimer')

// To start the duration
startButton.addEventListener('click', e => {
	dur.start()
})

// To pause the duration
stopButton.addEventListener('click', e => {
	dur.stop()
})

// To clear the duration
clearButton.addEventListener('click', e => {
	dur.clear()
})

// Displaying the duration on screen using requestAnimationFrame
;(function loop() {
	requestAnimationFrame(loop)
	displayField.innerHTML = dur.format('HH:mm:ss.SSSS')
})()
```

---

## Todo

- Write API docs
- Write some tests
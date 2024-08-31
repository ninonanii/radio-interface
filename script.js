const elements = {
	slider: document.querySelector('#slider'),
	sliderDisplay: document.querySelector('#slider-display'),
	actionButton: document.querySelector('#action-button'),
	actionButtonDisplay: document.querySelector('#action-button-display'),
	apiDisplay: document.querySelector('#api-display'),
}

// debounce to prevent too many calls
const debounce = (func, delay = 500) => {
	let timeoutId
	return function (...args) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func.apply(this, args), delay)
	}
}

const callApi = async () => {
	const sliderValue = elements.slider.value

	console.log('sliderValue', sliderValue)

	// show loading message
	elements.apiDisplay.innerHTML = 'Loading...'

	// placeholder api. see https://jsonplaceholder.typicode.com/guide/ and https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then((response) => response.json())
		.then((json) => {
			console.log(json)

			elements.apiDisplay.innerHTML = JSON.stringify(json, null, 2)
		})
}

const debouncedCallApi = debounce(callApi, 200)

const updateSliderDisplay = (value) => {
	elements.sliderDisplay.innerHTML = value
}

const addListeners = () => {
	elements.slider.addEventListener('input', (event) => {
		const sliderValue = event.target.value

		updateSliderDisplay(sliderValue)

		debouncedCallApi()
	})

	elements.actionButton.addEventListener('click', () => {
		debouncedCallApi()
	})
}

const initSliderDisplay = () => {
	const sliderValue = elements.slider.value

	updateSliderDisplay(sliderValue)
}

const initApiDisplay = () => {
	elements.apiDisplay.innerHTML = 'Nothing yet...'
}

const init = () => {
	addListeners()
	initSliderDisplay()
	initApiDisplay()
}

init()

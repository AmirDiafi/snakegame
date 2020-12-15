window.onload = function () {
	const playerHTML = document.querySelector('#player')
	const targetHTML = document.querySelector('#target')

	const loopTheAfters = (index, array, type) => {
		if (type === 'upDown') {
			for (let i = index; i < array.length; i++) {
				array[i].style.left = array[i].offsetLeft + 'px'
				array[i].style.top = array[i].offsetTop + 'px'
			}
		} else if ('rightLeft') {
			for (let i = index; i < array.length; i++) {
				array[i].style.top = array[i].offsetTop + 'px'
				array[i].style.left = array[i].offsetLeft + 'px'
			}
		}
	}

	// Coords Class
	class Coords {
		constructor(shape, x, y) {
			this.shape = shape
			this.x = x
			this.y = y
		}
	}
	let counterUp = 0
	let counterDown = 0
	let counterLeft = 0
	let counterRight = 0
	let initUp = 0
	let initDown = 0
	let initLeft = 0
	let initRight = 0
	let arrowkey
	let arrowkeyUp
	// Player Class
	class Player extends Coords {
		afters
		constructor(shape, x, y) {
			super(shape, x, y)
		}

		moveUp() {
			counterLeft = 0
			counterDown = 0
			counterRight = 0

			this.afters = this.shape.querySelectorAll('.after')
			if (this.y < 20) {
				this.y = window.innerHeight - (window.innerHeight % 20)
			}
			this.y -= 20
			this.shape.style.top = this.y + 'px'
			if (this.afters.length > 0) {
				loopTheAfters(0, this.afters, 'upDown')
				for (let k = 0; k <= counterUp; k++) {
					this.afters[k].style.left = '0px'
					this.afters[k].style.top = 20 * (k + 1) + 'px'
				}

				for (let k = counterUp + 1; k < this.afters.length; k++) {
					if (this.afters[k]) {
						if (
							(arrowkeyUp === 'ArrowLeft' &&
								this.afters[k].offsetLeft === 20) ||
							(arrowkeyUp === 'ArrowRight' && this.afters[k].offsetLeft === -20)
						) {
							this.afters[k].style.top =
								this.afters[counterUp].offsetTop - initUp * 20 + 'px'
							initUp++
						} else {
							this.afters[k].style.top = this.afters[k].offsetTop + 20 + 'px'
						}
						if (arrowkeyUp === 'ArrowLeft') {
							this.afters[k].style.left =
								this.afters[k].offsetLeft === 20
									? '20px'
									: this.afters[k].offsetLeft - 20 + 'px'
						} else if (arrowkeyUp === 'ArrowRight') {
							this.afters[k].style.left =
								this.afters[k].offsetLeft === -20
									? '-20px'
									: this.afters[k].offsetLeft + 20 + 'px'
						}
					}
				}

				if (this.afters.length > counterUp + 1) {
					counterUp++
				}
				if (this.afters.length >= initUp) {
					initUp = 0
				}
			}
		}
		moveDown() {
			counterUp = 0
			counterLeft = 0
			counterRight = 0

			this.afters = this.shape.querySelectorAll('.after')
			if (this.y > window.innerHeight - this.shape.offsetHeight - 10) {
				this.y = 20
			}
			this.y += 20
			this.shape.style.top = this.y + 'px'
			if (this.afters.length > 0) {
				loopTheAfters(0, this.afters, 'upDown')
				for (let k = 0; k <= counterDown; k++) {
					this.afters[k].style.left = '0px'
					this.afters[k].style.top = -20 * (k + 1) + 'px'
				}

				for (let k = counterDown + 1; k < this.afters.length; k++) {
					if (this.afters[k]) {
						if (
							(arrowkeyUp === 'ArrowLeft' &&
								this.afters[k].offsetLeft === 20) ||
							(arrowkeyUp === 'ArrowRight' && this.afters[k].offsetLeft === -20)
						) {
							this.afters[k].style.top =
								this.afters[counterDown].offsetTop + initDown * 20 + 'px'
							initDown++
						} else {
							this.afters[k].style.top = this.afters[k].offsetTop - 20 + 'px'
						}
						if (arrowkeyUp === 'ArrowLeft') {
							this.afters[k].style.left =
								this.afters[k].offsetLeft === 20
									? '20px'
									: this.afters[k].offsetLeft - 20 + 'px'
						} else if (arrowkeyUp === 'ArrowRight') {
							this.afters[k].style.left =
								this.afters[k].offsetLeft === -20
									? '-20px'
									: this.afters[k].offsetLeft + 20 + 'px'
						}
					}
				}

				if (this.afters.length > counterDown + 1) {
					counterDown++
				}
				if (this.afters.length >= initDown) {
					initDown = 0
				}
			}
		}
		moveLeft() {
			counterDown = 0
			counterUp = 0
			counterRight = 0
			this.afters = this.shape.querySelectorAll('.after')
			if (this.x < 20) {
				this.x = window.innerWidth - (window.innerWidth % 20)
			}
			this.x -= 20
			this.shape.style.left = this.x + 'px'

			if (this.afters.length > 0) {
				loopTheAfters(0, this.afters, 'rightLeft')
				for (let k = 0; k <= counterLeft; k++) {
					this.afters[k].style.left = 20 * (k + 1) + 'px'
					this.afters[k].style.top = '0px'
				}

				for (let k = counterLeft + 1; k < this.afters.length; k++) {
					if (arrowkey === 'ArrowUp' && this.afters[k].offsetTop === 20) {
						this.afters[k].style.left =
							this.afters[counterLeft].offsetLeft - initLeft * 20 + 'px'
						initLeft++
					} else if (
						arrowkey === 'ArrowDown' &&
						this.afters[k].offsetTop === -20
					) {
						this.afters[k].style.left =
							this.afters[counterLeft].offsetLeft - initLeft * 20 + 'px'
						initLeft++
					} else {
						this.afters[k].style.left = this.afters[k].offsetLeft + 20 + 'px'
					}

					if (this.afters[k]) {
						if (arrowkey === 'ArrowUp') {
							this.afters[k].style.top =
								this.afters[k].offsetTop === 0
									? '0px'
									: this.afters[k].offsetTop === 20
									? '20px'
									: this.afters[k].offsetTop - 20 + 'px'
						} else if (arrowkey === 'ArrowDown') {
							this.afters[k].style.top =
								this.afters[k].offsetTop === 0
									? '0px'
									: this.afters[k].offsetTop === -20
									? '-20px'
									: this.afters[k].offsetTop + 20 + 'px'
						}
					}
				}

				if (this.afters.length > counterLeft + 1) {
					counterLeft++
				}
				if (this.afters.length >= initLeft) {
					initLeft = 0
				}
			}
		}
		moveRight() {
			counterDown = 0
			counterUp = 0
			counterLeft = 0
			this.afters = this.shape.querySelectorAll('.after')
			if (this.x > window.innerWidth - this.shape.offsetHeight - 10) {
				this.x = 20
			}
			this.x += 20
			this.shape.style.left = this.x + 'px'

			if (this.afters.length > 0) {
				loopTheAfters(0, this.afters, 'rightLeft')
				for (let k = 0; k <= counterRight; k++) {
					this.afters[k].style.left = -20 * (k + 1) + 'px'
					this.afters[k].style.top = '0px'
				}
				// console.log(arrowkey)
				for (let k = counterRight + 1; k < this.afters.length; k++) {
					if (arrowkey === 'ArrowUp' && this.afters[k].offsetTop === 20) {
						this.afters[k].style.left =
							this.afters[counterRight].offsetLeft + initRight * 20 + 'px'
						initRight++
					} else if (
						arrowkey === 'ArrowDown' &&
						this.afters[k].offsetTop === -20
					) {
						this.afters[k].style.left =
							this.afters[counterRight].offsetLeft + initRight * 20 + 'px'
						initRight++
					} else {
						this.afters[k].style.left = this.afters[k].offsetLeft - 20 + 'px'
					}

					if (this.afters[k]) {
						if (arrowkey === 'ArrowUp') {
							this.afters[k].style.top =
								this.afters[k].offsetTop === 0
									? '0px'
									: this.afters[k].offsetTop === 20
									? '20px'
									: this.afters[k].offsetTop - 20 + 'px'
						} else if (arrowkey === 'ArrowDown') {
							this.afters[k].style.top =
								this.afters[k].offsetTop === 0
									? '0px'
									: this.afters[k].offsetTop === -20
									? '-20px'
									: this.afters[k].offsetTop + 20 + 'px'
						}
					}
				}

				if (this.afters.length > counterRight + 1) {
					counterRight++
				}
				if (this.afters.length >= initRight) {
					initRight = 0
				}
			}
		}
	}

	// Target Class
	class Target extends Coords {
		constructor(shape, x, y) {
			super(shape, x, y)
		}
	}

	const thePlayer = new Player(
		playerHTML,
		playerHTML.offsetLeft,
		playerHTML.offsetTop
	)

	const theTarget = new Target(
		targetHTML,
		targetHTML.offsetLeft,
		targetHTML.offsetTop
	)

	const moveTarget = (coords) => {
		theTarget.x = coords.x
		theTarget.y = coords.y
		theTarget.shape.style.left = coords.x + 'px'
		theTarget.shape.style.top = coords.y + 'px'
	}
	let getRandom = () => {
		let random = Math.random()
		let x = Math.floor(random * window.innerWidth)
		x = x - (x % 20)
		let y = Math.floor(random * window.innerHeight)
		y = y - (y % 20)
		return { x, y }
	}
	moveTarget(getRandom())

	window.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			arrowkey = e.key
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			arrowkeyUp = e.key
		}
		if (theTarget.x === thePlayer.x && theTarget.y === thePlayer.y) {
			moveTarget(getRandom())
			const newAfter = document.createElement('div')
			newAfter.setAttribute('class', 'after')
			thePlayer.shape.appendChild(newAfter)
		}
		switch (e.key) {
			case 'ArrowUp':
				thePlayer.moveUp()
				break
			case 'ArrowDown':
				thePlayer.moveDown()
				break
			case 'ArrowLeft':
				thePlayer.moveLeft()
				break
			case 'ArrowRight':
				thePlayer.moveRight()
				break

			default:
				break
		}
	})

	console.log('scripted')
}

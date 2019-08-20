<header class="hero">
	<div class="titles">
		<h1>Destrave sua mente</h1>
		<h2>Aprenda a controlar suas "paradinhas" automáticas praticando a consciência sobre suas escolhas</h2>
	</div>
	<div bind:this={elem} class="shapes" />
</header>

<script>
	import { onMount } from 'svelte';

	let elem;
	const SHAPES = ['point', 'square', 'penta', 'circle', 'cross'];

	onMount(() => {
		const ww = elem.clientWidth;
		const wh = elem.clientHeight;
		const offset = elem.offsetTop;
		const steps = wh / 2;

		function Particle() {
			let y = wh;
			let dir = Math.random() > 0.5 ? -1 : 1;
			let fric = Math.random() * 3 + 1;
			let scale = Math.random() + 0.5;
			let sine = Math.random() * 60;
			let x = ww * Math.random();

			let item = document.createElement('span');
			item.className = 'shape' + ' ' + SHAPES[SHAPES.length * Math.random() | 0];
			item.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
			elem.appendChild(item);

			let height = item.clientHeight;
			let target = -1 * height;

			return () => {
				y -= fric;
				let rot = dir * Math.abs(y + height);
				let left = x + Math.sin(y * Math.PI / steps) * sine;
				item.style.transform = `translate3d(${left}px,${y}px,0) scale(${scale}) rotate(${rot}deg)`;
				return (y > target) || item.remove();
			}
		}

		let last = 0;
		let running = 1;
		let particles = [];

		window.onblur = window.onfocus = () => {
			running = document.hasFocus();
		};

		function update(ms) {
			let len = particles.length;
			if (running && len < 50 && (ms - last) > 200) {
				last = ms;
				particles.push(Particle());
			}
			while (len--) {
				particles[len]() || particles.splice(len, 1);
			}
			requestAnimationFrame(update);
		}

		update();

		return () => {
			cancelAnimationFrame(update);
		};
	});
</script>

<style lang="sass">
	.hero
		position: relative
		background-color: var(--offwhite)
		border-bottom: 2px dashed var(--bright-green)
		max-height: 400px
		min-height: 45vh
		padding: 12vh 1.5rem 5vh
	
	.shapes
		width: 100%
		position: absolute
		transform: translateZ(0)
		overflow: hidden
		bottom: 0
		top: 0
	
	.titles
		z-index: 2
		position: relative
		font-family: var(--font-list)
		text-align: center
		max-width: 550px
		margin: 0 auto
		h1
			text-transform: uppercase
			font-size: 2.875em
			font-weight: 900
			line-height: 1
		h2
			line-height: 1.675
			font-weight: 200
			letter-spacing: 2px
			font-size: 1.5em
			color: #5e7283
			margin-top: .5rem
	
	\:global(.shape)
		--size: 30px
		position: absolute
		will-change: transform
		background: transparent no-repeat center
		background-size: contain
		height: var(--size)
		width: var(--size)
	
	\:global(.penta)
		background-image: url(~@assets/shapes/penta.svg)
	
	\:global(.point)
		background-image: url(~@assets/shapes/point.svg)
	
	\:global(.square)
		background-image: url(~@assets/shapes/square.svg)
	
	\:global(.cross)
		background-image: url(~@assets/shapes/cross.svg)
	
	\:global(.circle)
		background-image: url(~@assets/shapes/circle.svg)
	
	@media screen and (max-width: 421px)
		\:global(.shape)
			--size: 20px
</style>

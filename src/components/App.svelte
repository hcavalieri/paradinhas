<div class="app">
	<Hero />

	<svelte:component this={ Route } { params } />

</div>

<script>
	import Navaid from 'navaid';
	import { onMount } from 'svelte';
	import Hero from '@components/Hero';

	let Route, params={};

	function draw(m, params) {
		params = params || {};
		Route = m.default || m;
	}

	function track(obj) {
		if (window.ga) {
			ga.send('pageview', { dp:obj.uri });
		}
	}

	const router = (
		Navaid('/')
			.on('/', () => import('@pages/Home').then(draw))
	);

	onMount(() => {
		router.listen();
		addEventListener('replacestate', track);
		addEventListener('pushstate', track);
		addEventListener('popstate', track);

		return () => {
			removeEventListener('replacestate', track);
			removeEventListener('pushstate', track);
			removeEventListener('popstate', track);
			router.unlisten();
		};
	});
</script>

<style lang="sass">
	.app
		position: relative
</style>

<script>
	import { escolhasStore, paradinhasStore } from '../stores'
	
	import EscolhaForm from '@components/EscolhaForm';
	import ParadinhaForm from '@components/ParadinhaForm';

	function deleteParadinha(id) {
		const hasEscolha = $escolhasStore.find(e => e.paradinhaId === id)
		if (hasEscolha) {
			return
		}
		paradinhasStore.set($paradinhasStore.filter(p => p.id !== id))
	}
</script>

<main>

	<div>
		<h2>Suas escolhas recentes</h2>
		{#each $escolhasStore as escolha (escolha.id)}
			<div class="escolha">
				<div class="date">
					{new Date(escolha.date).toLocaleDateString('pt', { dateStyle: 'full', timeStyle: 'short'})}
				</div>
				<div class="title">{$paradinhasStore.find(p => p.id === escolha.paradinhaId).name}</div>
				<div class="props">
					{escolha.wasIgnored ? '👋 Ignorada' : '👌 Atendida'} ֎ decisão <b>{escolha.decisionQuality.toLowerCase()}</b>
				</div>
				<div>{escolha.comment}</div>
			</div>
		{:else}
			Você ainda não registrou nenhuma escolha!
		{/each}
	</div>
	<EscolhaForm />
</main>

<aside>
	<div>
		<h2>Todas as paradinhas</h2>
		{#each $paradinhasStore as paradinha (paradinha.id)}
			<div class="paradinha">
				{paradinha.name}
				<div>
					<button on:click={() => deleteParadinha(paradinha.id)}>❌</button>
				</div>
			</div>
		{/each}
	</div>
	<ParadinhaForm />
</aside>

<style lang="sass">
	main, aside
		padding: 0 1.5rem
		margin: 5rem auto 4rem
		max-width: 600px
		> *
			margin: 0 0 2rem
		h2
			margin-bottom: 16px
		> div
			max-height: 70vh
			overflow-y: auto
			> h2
				position: sticky
				top: 0
				background: var(--background-color)
				padding-bottom: .5rem
				z-index: 1
	
	.paradinha, .escolha
		border: 1px solid var(--border-color)
		padding: .75em 1em
		margin: 0 0 1.5rem 0
		border-radius: var(--border-radius)
		background: white

	.paradinha
		display: block
		> div
			margin-top: .5rem
			font-size: .8em
		button
			background: var(--background-color)
	
	.date
		font-size: .8em
		opacity: .8
	.title
		font-size: 1.35em
		font-weight: 600
		margin: .35rem 0 .25rem
	.props
		font-weight: 300
		font-size: 1.1em
		margin: 0 0 1rem

	
	@media screen and (min-width: 1200px)
		main, aside
			display: grid
			grid-template-columns: 1fr 1fr
			grid-gap: 5rem
			max-width: 1100px
</style>

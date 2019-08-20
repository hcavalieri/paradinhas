<script>
  import { escolhasStore, paradinhasStore } from "../stores";

  let date = new Date().toISOString();
  let selectedParadinha;
  let wasIgnored;
  let decisionQuality;
  let comment = "";

  function clearForm() {
    comment = ''
    wasIgnored = undefined
    decisionQuality = undefined
    selectedParadinha = undefined
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !selectedParadinha ||
      !selectedParadinha.id ||
      typeof wasIgnored !== 'boolean' ||
      !decisionQuality
    ) {
      return;
    }
    const paradinhaId = selectedParadinha.id;
    const id = `${date}-${paradinhaId}`;
    escolhasStore.set([
      { id, date, paradinhaId, wasIgnored, decisionQuality, comment },
      ...$escolhasStore
    ]);
    clearForm()
  }
</script>

<form on:submit={handleSubmit}>
  <h2>Registrar nova escolha</h2>
  <fieldset>
    <label for="selected-paradinha">Com qual paradinha você lidou?</label>
    <select bind:value={selectedParadinha} id="selected-paradinha">
      {#each $paradinhasStore as paradinha (paradinha.id)}
        <option value={paradinha}>{paradinha.name}</option>
      {/each}
    </select>
  </fieldset>

  <fieldset>
    <legend>Qual foi sua decisão?</legend>
    <div class="radio">
      <input
        id="ignored-true"
        type="radio"
        bind:group={wasIgnored}
        value={true} />
      <label for="ignored-true">👋 Ignorei</label>
    </div>
    <div class="radio">
      <input
        id="ignored-false"
        type="radio"
        bind:group={wasIgnored}
        value={false} />
      <label for="ignored-false">👌 Aceitei</label>
    </div>
  </fieldset>

  <fieldset>
    <legend>O que você achou dessa decisão?</legend>
    <div class="radio">
      <input
        id="quality-good"
        type="radio"
        bind:group={decisionQuality}
        value="👍 Boa" />
      <label for="quality-good">👍 Boa</label>
    </div>
    <div class="radio">
      <input
        id="quality-bad"
        type="radio"
        bind:group={decisionQuality}
        value="👎 Ruim" />
      <label for="quality-bad">👎 Ruim</label>
    </div>
    <div class="radio">
      <input
        id="quality-complicated"
        type="radio"
        bind:group={decisionQuality}
        value="😵 Complicada" />
      <label for="quality-complicated">😵 Complicada</label>
    </div>
  </fieldset>

  <fieldset>
    <label for="comment">Algum comentário sobre?</label>
  <textarea id="colmment" bind:value={comment} placeholder="Aproveite pra falar do contexto e do seu processo de decisão, por exemplo" />
  </fieldset>

  <button type="submit">Registrar escolha</button>
</form>

<script>
  import { paradinhasStore } from "../stores";

  let name = "";

  function handleSubmit(e) {
    e.preventDefault()
    const id = name.toLowerCase().replace(/\s/gi, "-");
    paradinhasStore.set([...$paradinhasStore, { id, name }]);
    name = ''
  }
</script>

<form on:submit={handleSubmit}>
  <h2>Registrar nova paradinha</h2>
  <fieldset>
    <label for="paradinha-name">Nome da paradinha</label>
    <input
      name="paradinha-name"
      id="paradinha-name"
      bind:value={name}
      placeholder="Ex: Eu não sou capaz..." />
  </fieldset>

  <button type="submit">Registrar</button>
</form>

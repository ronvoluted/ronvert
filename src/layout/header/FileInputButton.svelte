<script>
import { convertMode, convertInProgress, convertFile, reducedMotion } from '../../logic/stores';
import { initialiseIDB, addFile, getFile, clearStore } from '../../logic/idbOperations';

let button;
let label;
let input;

const handleFileInput = async (e) => {
  if (!e.target.files[0]) return;

  $convertMode = true;
  $convertInProgress = true;

  const file = e.target.files[0];

  await initialiseIDB('rontainer', new Set(['files']));
  await clearStore('rontainer', 'files');
  await addFile('rontainer', 'files', file, file.name);
  const retrievedFile = await getFile('rontainer', 'files', file.name);

  $convertFile.URL = URL.createObjectURL(retrievedFile);
  $convertFile.name = file.name;

  setTimeout(() => {
    $convertInProgress = false;
  }, reducedMotion.gate(5_000, 2_000));
};
</script>

<form action="#hero-media">
  <button bind:this={button} aria-controls="label" on:click|self={() => label.click()} disabled={$convertInProgress}>
    <label id="label" bind:this={label} for="fileinput">
      {#if $convertMode && $convertInProgress}
        {reducedMotion.gate('Squashing...', 'Ronverting...')}
      {:else if $convertMode && !$convertInProgress}
        ANOTHER!
      {:else}
        Convert a file
      {/if}
    </label>
    <input bind:this={input} id="fileinput" type="file" on:change={handleFileInput} disabled={$convertInProgress}>
  </button>
</form>

<style>
form {
  width: 90%;
}

button {
  width: 100%;
  margin: 1.5rem 0;
  font-weight: 700;
  color: hsl(200, 10%, 100%);
  background-color: var(--secondary-dark);
  filter: drop-shadow(0.15rem 0.3rem 0.4rem hsl(0, 0%, 50%));
}

button:is(:hover, :focus, :active) {
  color: hsl(200, 0%, 100%);
  background-color: var(--secondary);
}
button:active {
  transform: translate(0.15rem, 0.3rem);
  filter: none;
}

label {
  cursor: pointer;
}

#fileinput {
  display: none;
}

@media (min-width: 640px) {
  form {
    width: 15rem;
  }
}
</style>

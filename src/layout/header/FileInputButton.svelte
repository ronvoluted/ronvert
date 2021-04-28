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


<button bind:this={button} class="cta" aria-controls="label" on:click|self={() => label.click()} disabled={$convertInProgress}>
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

<style>
label {
  cursor: pointer;
}

#fileinput {
  display: none;
}
</style>

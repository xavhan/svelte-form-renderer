<script lang="ts">
  import { formDataStore } from "./stores";
  import { coreRegistry } from "./core-registry";

  import Field from "./Field.svelte";
  import {
    setContext,
    createEventDispatcher,
    onDestroy,
    getContext,
  } from "svelte";
  import { merge, pipe } from "./utils";
  import { coreStyles } from "./core-styles";

  export let fields: AnyField[];
  export let formData = {};
  export let registry = {};
  export let styles = {};

  const dispatch = createEventDispatcher();

  const buildRegistry = pipe<void, Registry>(
    () => Object.assign({}, coreRegistry), // copy core
    (x) => merge(x, registry) // merge custom
  );
  const buildStyles = pipe<void, StyleMap>(
    () => Object.assign({}, coreStyles), // copy core
    (x) => merge(x, styles) // merge custom
  );

  setContext("registry", buildRegistry());
  setContext("afondla.styles", buildStyles());
  setContext("afondla.formDataStore", formDataStore);

  const appliedStyles = getContext<StyleMap>("afondla.styles");

  formDataStore.set(formData);

  const unsubscribe = formDataStore.subscribe((formData) => {
    dispatch("form-data-changed", formData);
  });

  onDestroy(() => {
    unsubscribe();
  });

  const submit = () => {
    dispatch("submit", $formDataStore)
  }
</script>

<form
  class="form"
  on:submit|preventDefault={submit}
>
  <div class="fields">
    {#each fields as field}
      <Field {field} />
    {/each}
  </div>

  <button type="submit" class={appliedStyles.button}>Submit</button>
</form>

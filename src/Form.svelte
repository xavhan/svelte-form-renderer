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
  import { merge, pipe, namespaced } from "./utils";
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
  setContext("styles", buildStyles());
  setContext(namespaced('formDataStore'), formDataStore);

  const appliedStyles = getContext<StyleMap>("styles");

  formDataStore.set(formData);

  const unsubscribe = formDataStore.subscribe((formData) => {
    dispatch(namespaced('formDataChange'), formData);
  });

  onDestroy(() => {
    unsubscribe();
  });

  const submit = () => {
    dispatch(namespaced('submit'), $formDataStore)
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

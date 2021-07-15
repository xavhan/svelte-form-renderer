<script lang="ts">
  import { getContext } from "svelte";
  import { formDataStore } from "../stores";
  const appliedStyles = getContext<StyleMap>("afondla.styles");

  export let field: BooleanField;

  const update = (e): void => {
    $formDataStore[field.id] = e.currentTarget.value === "true" ? true : false;
  };
  const _class = appliedStyles?.fields?.[field.id] ?? appliedStyles.radio;
</script>

<div>
  {field.title}
  {#if field.required}
    <span class="required">*</span>
  {/if}
</div>

<div>
  <input
    id={field.id + "yes"}
    class={_class}
    type="radio"
    name={field.id}
    value="true"
    on:change={update}
    checked={$formDataStore[field.id]}
  />
  <label for={field.id + "yes"}> Yes </label>
</div>
<div>
  <input
    class={_class}
    type="radio"
    name={field.id}
    value="false"
    on:change={update}
    checked={!$formDataStore[field.id]}
  />
  <label for={field.id + "no"}> No </label>
</div>

<style>
  div {
    font-weight: bold;
    display: block;
  }
</style>

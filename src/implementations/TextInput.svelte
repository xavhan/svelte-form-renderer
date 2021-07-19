<script lang="ts">
  import { getContext } from "svelte";
  import { formDataStore } from "../stores";
  import { pathOr } from "./../utils";

  const appliedStyles = getContext<StyleMap>("styles");

  export let field: TextField;

  const update = (e): void => {
    $formDataStore[field.id] = e.target.value;
  };
  const _class = pathOr(appliedStyles.input, ['fields', field.id], appliedStyles);
</script>

<input
  type="text"
  class={_class}
  id={field.id}
  name={field.id}
  required={!!field.required}
  placeholder={field.placeholder || field.title || ""}
  pattern={field.pattern}
  value={$formDataStore[field.id] || ""}
  on:change={update}
/>

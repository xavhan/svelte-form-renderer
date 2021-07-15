<script lang="ts">
  import { getContext } from "svelte";
  import { formDataStore } from "../stores";

  export let field: BooleanField;

  const appliedStyles = getContext<StyleMap>("afondla.styles");

  const update = (e): void => {
    $formDataStore[field.id] = e.target.checked;
  };

  const _class = appliedStyles?.fields?.[field.id] ?? appliedStyles.checkbox;
</script>

<input
  type="checkbox"
  class={_class}
  id={field.id}
  on:change={update}
  checked={$formDataStore[field.id]}
  required={!!field.required}
/>
<label for={field.id}>
  {field.title}
  {#if field.required}
    <span class={appliedStyles.required}>*</span>
  {/if}
</label>

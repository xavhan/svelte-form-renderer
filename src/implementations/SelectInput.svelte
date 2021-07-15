<script lang="ts">
  import { getContext } from "svelte";

  import { formDataStore } from "../stores";
  const appliedStyles = getContext<StyleMap>("afondla.styles");

  export let field: ChoiceField;

  const update = (e): void => {
    $formDataStore[field.id] = e.target.value;
  };
  const _class = appliedStyles?.fields?.[field.id] ?? appliedStyles.select;
</script>

<select
  class={_class}
  type="text"
  id={field.id}
  name={field.id}
  value={$formDataStore[field.id] ?? ""}
  on:blur={update}
  required={!!field.required}
>
  <option value disabled>{field.placeholder ?? field.title ?? ""}</option>
  {#each field.choices as choice}
    <option value={choice}>{choice}</option>
  {/each}>
</select>

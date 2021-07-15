<script lang="ts">
  import { getContext } from "svelte";
  import { formDataStore } from "../stores";

  const appliedStyles = getContext<StyleMap>("afondla.styles");

  export let field: ChoiceField;

  const update = (e): void => {
    $formDataStore[field.id] = e.target.value;
  };
  const _class = appliedStyles?.fields?.[field.id] ?? appliedStyles.radio;
</script>

{#each field.choices as choice}
  <div>
    <input
      class={_class}
      type="radio"
      id={choice}
      name={choice}
      value={choice}
      on:change={update}
      checked={$formDataStore[field.id] === choice}
    />
    <label for={choice}>{choice}</label>
  </div>
{/each}

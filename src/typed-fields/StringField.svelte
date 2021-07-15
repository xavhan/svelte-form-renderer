<script lang="ts">
  import { isChoice } from "../domain";
  import { getContext } from "svelte";

  export let field: StringField;

  const registry = getContext<Registry>("registry");

  const getImplementation = (field: StringField) => {
    return isChoice(field)
      ? registry.string.choice[field.implem] ?? registry.string.choice.default
      : registry.string[field.implem] ?? registry.string.text;
  };
</script>

<svelte:component this={getImplementation(field)} {field} />

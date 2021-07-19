<script lang="ts">
  import { getContext } from "svelte";

  export let field: BooleanField;

  const registry = getContext<Registry>("registry");

  const getImplementation = (field: BooleanField) => {
    return registry.boolean[field.implem] || registry.boolean.default;
  };
</script>

<svelte:component this={getImplementation(field)} {field} />

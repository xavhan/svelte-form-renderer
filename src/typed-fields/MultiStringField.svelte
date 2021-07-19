<script lang="ts">
  import { getContext } from "svelte";

  export let field: MultiStringField;

  const registry = getContext<Registry>("registry");

  const getImplementation = (field: MultiStringField) => {
    return registry.multi[field.implem] || registry.multi.default;
  };
</script>

<svelte:component this={getImplementation(field)} {field} />

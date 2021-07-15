<script lang="ts">
  import StringField from "./typed-fields/StringField.svelte";
  import BooleanField from "./typed-fields/BooleanField.svelte";
  import MultiStringField from "./typed-fields/MultiStringField.svelte";
  import { getContext } from "svelte";

  export let field: AnyField;

  const appliedStyles = getContext<StyleMap>("afondla.styles");

  const typeRegistry = {
    boolean: BooleanField,
    string: StringField,
    strings: MultiStringField,
  };
  const getInput = (field: AnyField) => {
    return typeRegistry[field.type] ?? typeRegistry.string;
  };
</script>

<div class={appliedStyles.field}>
  {#if field.title && field.type !== "boolean"}
    <label for={field.id} class=""
      >{field.title}
      {#if field.required}
        <span class={appliedStyles.required}>*</span>
      {/if}
    </label>
  {/if}

  {#if field.description}
    <div class={appliedStyles.description}>
      {field.description}
    </div>
  {/if}

  <svelte:component this={getInput(field)} {field} />

  {#if field.help}
    <div class={appliedStyles.help}>
      {field.help}
    </div>
  {/if}
</div>

<style>
  .field {
    margin-bottom: 10px;
  }
  .help {
    font-style: italic;
  }
  label {
    font-weight: bold;
    display: block;
  }
</style>

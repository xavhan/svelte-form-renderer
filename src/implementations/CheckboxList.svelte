<script lang="ts">
  import { getContext } from "svelte";
  import { formDataStore } from "../stores";
  import  {pathOr} from './../utils';
  const appliedStyles = getContext<StyleMap>("afondla.styles");

  export let field: MultiStringField;

  const hash = Object.fromEntries(
    field.choices.map((c) => [c, ($formDataStore[field.id] || []).includes(c)])
  );

  const update = (e) => {
    hash[e.target.name] = e.target.checked;
    $formDataStore[field.id] = Object.entries(hash).reduce(
      (values, e) => (e[1] ? [...values, e[0]] : values),
      []
    );
  };
  const _class = pathOr(appliedStyles.checkbox, ['fields.', field.id], appliedStyles);
</script>

{#each field.choices as choice}
  <div>
    <input
      class={_class}
      id={field.id + choice}
      type="checkbox"
      name={choice}
      on:change={update}
      bind:checked={hash[choice]}
    />
    <label for={field.id + choice}>
      {choice}
    </label>
  </div>
{/each}

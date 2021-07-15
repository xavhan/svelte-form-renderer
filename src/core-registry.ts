import Yesnoradio from "./implementations/YesNoRadio.svelte";
import Checkbox from "./implementations/Checkbox.svelte";
import CheckboxList from "./implementations/CheckboxList.svelte";
import SelectInput from "./implementations/SelectInput.svelte";
import RadioGroupInput from "./implementations/RadioGroupInput.svelte";
import TextInput from "./implementations/TextInput.svelte";

const DEFAULT = "default";

export const coreRegistry: Registry = {
  string: {
    choice: {
      default: SelectInput,
      select: SelectInput,
      radiogroup: RadioGroupInput,
    },
    text: TextInput,
    [DEFAULT]: TextInput,
  },
  boolean: {
    radio: Yesnoradio,
    checkbox: Checkbox,
    [DEFAULT]: Checkbox,
  },
  multi: {
    "checkbox-list": CheckboxList,
    [DEFAULT]: CheckboxList,
  },
};

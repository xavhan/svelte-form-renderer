/// <reference types="svelte" />

type _BaseField<T> = {
  id: string;
  title?: string;
  description?: string;
  help?: string;
  required?: boolean;
} & T;

type _BaseStringType<T> = _BaseField<
  {
    type: "string";
    placeholder?: string;
  } & T
>;
type TextField = _BaseStringType<{
  implem?: "text";
  pattern?: string;
}>;
type ChoiceField = _BaseStringType<{
  implem?: "choice";
  choices: string[];
}>;

type StringField = TextField | ChoiceField;

type BooleanField = _BaseField<{
  type: "boolean";
  implem?: "radio" | "checkbox" | string;
}>;

type MultiStringField = _BaseField<{
  type: "strings";
  implem?: "checkbox-list";
  choices: string[];
}>;

type AnyField = StringField | BooleanField | MultiStringField;
type FieldValue = string | boolean | string[];

type Registry = {
  boolean: Record<string, any>;
  string: Record<string, any>;
  multi: Record<string, any>;
};

type StyleMap = {
  field: string;
  required: string;
  description: string;
  help: string;
  button: string;
  input: string;
  checkbox: string;
  radio: string;
  select: string;
  fields?: Records<string, string>;
};

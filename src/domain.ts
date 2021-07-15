export const isStringField = (field: AnyField): field is StringField => {
  return field.type === "string";
};
export const isBooleanField = (field: AnyField): field is BooleanField => {
  return field.type === "boolean";
};
export const isChoice = (field: StringField): field is ChoiceField => {
  return "choices" in field;
};
export const isMultiStringField = (field: AnyField): field is MultiStringField => {
  return isStringField(field) && "multi" in field;
};

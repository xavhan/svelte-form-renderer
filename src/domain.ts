export const isStringField = (field: Field): field is StringField => {
  return field.type === "string";
};
export const isBooleanField = (field: Field): field is BooleanField => {
  return field.type === "boolean";
};
export const isChoice = (field: StringField): field is ChoiceField => {
  return "choices" in field;
};
export const isMultiStringField = (field: Field): field is MultiStringField => {
  return isStringField(field) && "multi" in field;
};

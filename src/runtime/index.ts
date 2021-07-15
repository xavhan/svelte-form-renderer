// backend world
function compute(rules = {}, fields = [], data = {}) {
  return fields.reduce((renderedFields, field) => {
    const fieldId = field.id;
    if (fieldId in rules) {
      // a rule needs to be applied
      const fieldRules = rules[fieldId];

      if ("displayIf" in fieldRules) {
        // display rule
        if (!Boolean(data[fieldRules.displayIf])) {
          // display rule implem
          return renderedFields;
        }
      }

      if ("hiddenIf" in fieldRules) {
        if (Boolean(data[fieldRules.hiddenIf])) {
          return renderedFields;
        }
      }

      if ("fetch" in fieldRules) {
        if (Boolean(data[fieldRules.fetch.dataPropToWatch])) {
          field[fieldRules.fetch.formPropToFeed] = data[
            fieldRules.fetch.dataPropToWatch
          ]
            .repeat(3)
            .split(""); // fake fetch(data[fieldRules.fetch.url])
        }
      }
    }
    return [...renderedFields, field];
  }, []);
}
export const nextShape = (rules, fields) => (data) =>
  compute(rules, fields, data);

export default class FormValidator {
  #private = {
    rules: {},
    init: (rules) => {
      console.log(rules);
    },
  };

  constructor(rules) {
    this.#private.rules = rules;
    this.#private.init(rules);
  }

  validate(submitForm) {
    if (typeof submitForm === 'function') {
      submitForm();
    }
  }

  isValid() {
    return true;
  }
}
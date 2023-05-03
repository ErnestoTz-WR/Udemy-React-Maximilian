# 16 Handling forms and User Inputs

## Frontend validation

It is great to provide a user experience but it is not a secure mechanism, the code included on the fronted can be accessed by the user and be edited to trick the validation. For this reason it is important to also validate the inputs on the server-side.

## When to validate?

- When the form is submitted (at the end)
- When a input losses focus (on every input)
- On every keystroke (immediately)


### Keystroke Validation 

We store the state of the input with every keystroke change.

### For submitted Validation


## Third party libraries for form validations

- [Formik](https://formik.org)

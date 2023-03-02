export const email_rule = [
  {
    required: true,
    message: 'Please input email address',
    trigger: 'blur'
  },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: 'blur'
  }
]

export const text_rule = (field_name, min) => [
  {
    required: true,
    message: 'Please input ' + field_name,
    trigger: 'blur'
  },
  {
    min: min,
    message: "Minimum allowed number of characters " + min,
    trigger: "blur"
  }
]
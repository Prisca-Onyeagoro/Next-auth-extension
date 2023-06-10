export default function RegisterValidate(values) {
  const errors = {};
  // username field
  if (!values.username) {
    errors.username = 'This Field is Required';
  } else if (values.username.includes(' ')) {
    errors.username = 'Invalid username remove whitespaces';
  }

  if (!values.email) {
    errors.email = 'This Field is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Enter The Required password';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      'Password must be greater than 8 and les than 20 characters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'invalid password remove white space';
  }

  if (values.password !== values.cpassword) {
    errors.cpassword = 'Password Mis-match, Try again';
  } else if (!values.cpassword) {
    errors.cpassword = 'Password required';
  } else if (values.password.includes(' ')) {
    errors.cpassword = 'invalid password, remove white-spaces';
  }

  return errors;
}

import { ReanderField, React, Field, Button, Row, Col } from "components";
import { reduxForm } from "redux-form";
import Validate from "../validate";

const formStyles = {
  form: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '10px', // Mengurangi padding di form
    boxSizing: 'border-box'
  },
  field: {
    marginBottom: '15px', // Mengurangi jarak bawah antara field
    width: '100%', // Membuat field menggunakan lebar penuh
    padding: '10px', // Menambahkan padding di dalam field
    fontSize: '16px', // Memperbesar ukuran font di dalam field
  },
  button: {
    marginTop: '15px', // Mengurangi jarak atas antara button
    padding: '10px 20px', // Menambahkan padding di dalam button
    fontSize: '16px', // Memperbesar ukuran font di dalam button
  }
};

let FormLogin = (props) => {
  return (
    <form method="post" onSubmit={props.handleSubmit} style={formStyles.form}>
      <Field
        name="username"
        component={ReanderField}
        iconFormGroup="fas fa-envelope"
        formGroup
        placeholder="Silahkan Masukan Username"
        style={formStyles.field}
      />
      <Field
        name="password"
        type="password"
        component={ReanderField}
        placeholder="Silahkan Masukan Password"
        iconFormGroup="fas fa-lock"
        formGroup
        style={formStyles.field}
      />
      <Row>
        <Col size="12">
          <Button
            loading
            textLoading="Waiting"
            type="submit"
            color="primary"
            block
            title="Sign In"
            style={formStyles.button}
          />
        </Col>
      </Row>
    </form>
  );
};

FormLogin = reduxForm({
  form: "FormLogin",
  enableReinitialize: true,
  validate: Validate
})(FormLogin);

export default FormLogin;

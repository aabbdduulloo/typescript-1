import React, { useState } from "react";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { auth } from "@service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { signInValidationSchema } from "@validation";
import { useNavigate } from "react-router-dom";
import Notification from "@notification";

interface SignInValues {
  email: string;
  password: string;
}

const Index: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues: SignInValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: SignInValues) => {
    console.log(values);
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        console.log(response);
        Notification({ title: "Success", type: "success" });
        localStorage.setItem("access_token", response?.data?.access_token);
        setTimeout(() => {
          navigate("/main");
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "Error", type: "error" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div style={styles.field}>
                  <Field
                    name="email"
                    type="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={styles.error}
                      />
                    }
                  />
                </div>
                <div style={styles.field}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    as={TextField}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="div"
                        style={styles.error}
                      />
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={styles.button}
                >
                  {isSubmitting ? "Submitting..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "32px",
    color: "#333",
  },
  field: {
    marginBottom: "16px",
  },
  error: {
    color: "red",
    fontSize: "15px",
    marginTop: "8px",
  },
  button: {
    marginTop: "16px",
    padding: "12px",
    backgroundColor: "#1976d2",
  },
};

export default Index;

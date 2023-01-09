import { SxProps, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FormikHelper from "components/helper/FormikHelper";
import { XlLoadingButton } from "components/styled";
import { form } from "constants/form";
import { Form, Formik } from "formik";
import useError from "hooks/useError";
import useFormSubmit from "hooks/useFormSubmit";
import useToasts from "hooks/useToast";
import { useState } from "react";
import { useAccount } from "wagmi";
import * as yup from "yup";

/**
 * A component with form to subscribe for bet updates.
 */
export default function BetSubscribeForm(props: { id: string; sx?: SxProps }) {
  const { address } = useAccount();
  const { handleError } = useError();
  const { submitForm } = useFormSubmit();
  const { showToastSuccess } = useToasts();

  // Form states
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const formValidationSchema = yup.object({
    email: yup.string().required(),
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const isFormDisabled = isFormSubmitting;

  async function submit(values: any, actions: any) {
    try {
      setIsFormSubmitting(true);
      await submitForm(
        form.type.subscribe,
        {
          bet: props.id,
          ...values,
        },
        address
      );
      showToastSuccess("You have successfully subscribed for bet updates");
      actions?.resetForm();
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <Typography variant="h6" textAlign="center">
        🔔 Subscribe for bet updates to get the results
      </Typography>
      <Formik
        initialValues={formValues}
        validationSchema={formValidationSchema}
        onSubmit={submit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form style={{ width: "100%" }}>
            <FormikHelper onChange={(values: any) => setFormValues(values)} />
            <Box
              sx={{
                width: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                border: 3,
                borderColor: "divider",
                borderRadius: 5,
                px: { xs: 1, md: 2 },
                py: { xs: 2, md: 1 },
                mt: 2,
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                size="medium"
                id="email"
                name="email"
                placeholder="Your email *"
                type="string"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                disabled={isFormDisabled}
                sx={{
                  mb: { xs: 2, md: 0 },
                  mr: { xs: 0, md: 2 },
                  px: { xs: 2, md: 0 },
                }}
              />
              <XlLoadingButton
                loading={isFormSubmitting}
                variant="contained"
                type="submit"
                disabled={isFormDisabled}
              >
                Subscribe
              </XlLoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

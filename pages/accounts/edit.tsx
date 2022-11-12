import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import FormikHelper from "components/helper/FormikHelper";
import Layout from "components/layout";
import { CentralizedBox, XxlLoadingButton } from "components/styled";
import { bioContractAbi } from "contracts/abi/bioContract";
import { ethers } from "ethers";
import { Form, Formik } from "formik";
import useError from "hooks/useError";
import useIpfs from "hooks/useIpfs";
import useToasts from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as yup from "yup";

/**
 * Page to edit account.
 */
export default function EditAccount() {
  const { handleError } = useError();
  const { address } = useAccount();
  const { loadJsonFromIpfs } = useIpfs();
  const [bioData, setBioData] = useState<any>();

  // Contract states
  const {
    status: contractReadStatus,
    error: contractReadError,
    data: contractReadData,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_BIO_CONTRACT_ADDRESS,
    abi: bioContractAbi,
    functionName: "getURI",
    args: [ethers.utils.getAddress(address || ethers.constants.AddressZero)],
  });

  useEffect(() => {
    if (address && contractReadStatus === "success" && contractReadData) {
      loadJsonFromIpfs(contractReadData)
        .then((result) => setBioData(result))
        .catch((error) => handleError(error, true));
    }
    if (address && contractReadStatus === "error" && contractReadError) {
      setBioData({});
    }
  }, [address, contractReadStatus, contractReadError, contractReadData]);

  return (
    <Layout>
      <CentralizedBox>
        {bioData && <EditAccountForm bioData={bioData} />}
      </CentralizedBox>
    </Layout>
  );
}

function EditAccountForm(props: { bioData: any }) {
  const { handleError } = useError();
  const { uploadJsonToIpfs } = useIpfs();
  const { showToastSuccess } = useToasts();
  const router = useRouter();
  const { address } = useAccount();

  // Form states
  const [formValues, setFormValues] = useState({
    image: props.bioData?.image as string,
    text: props.bioData?.text as string,
    twitter: props.bioData?.twitter as string,
    telegram: props.bioData?.telegram as string,
    instagram: props.bioData?.instagram as string,
  });
  const formValidationSchema = yup.object({
    image: yup.string(),
    text: yup.string(),
    twitter: yup.string(),
    telegram: yup.string(),
    instagram: yup.string(),
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formValuesUri, setFormValuesUri] = useState("");

  // Contract states
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BIO_CONTRACT_ADDRESS,
    abi: bioContractAbi,
    functionName: "setURI",
    args: [formValuesUri],
  });
  const {
    data: contractWriteData,
    isLoading: isContractWriteLoading,
    write: contractWrite,
  } = useContractWrite(contractConfig);
  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } =
    useWaitForTransaction({
      hash: contractWriteData?.hash,
    });

  const isFormDisabled =
    isFormSubmitting ||
    isContractWriteLoading ||
    isTransactionLoading ||
    isTransactionSuccess;

  async function submit(values: any) {
    try {
      setIsFormSubmitting(true);
      const { ipfsUrl } = await uploadJsonToIpfs(values);
      setFormValuesUri(ipfsUrl);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  useEffect(() => {
    if (formValuesUri !== "" && contractWrite && !isContractWriteLoading) {
      setFormValuesUri("");
      contractWrite?.();
    }
  }, [formValuesUri, contractWrite, isContractWriteLoading]);

  useEffect(() => {
    if (isTransactionSuccess) {
      showToastSuccess("Account updated");
      router.push(`/accounts/${address}`);
    }
  }, [isTransactionSuccess]);

  return (
    <Formik
      initialValues={formValues}
      validationSchema={formValidationSchema}
      onSubmit={submit}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <FormikHelper onChange={(values: any) => setFormValues(values)} />
          {/* Image */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image"
              placeholder="ipfs://bafybeig..."
              type="string"
              value={values.image}
              onChange={handleChange}
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
              disabled={isFormDisabled}
            />
          </Box>
          {/* Text */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="text"
              name="text"
              label="Text"
              placeholder="Alice, crypto enthusiast..."
              type="string"
              multiline={true}
              rows={3}
              value={values.text}
              onChange={handleChange}
              error={touched.text && Boolean(errors.text)}
              helperText={touched.text && errors.text}
              disabled={isFormDisabled}
            />
          </Box>
          {/* Twitter */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="twitter"
              name="twitter"
              label="Twitter"
              placeholder="https://twitter.com/username"
              type="string"
              value={values.twitter}
              onChange={handleChange}
              error={touched.twitter && Boolean(errors.twitter)}
              helperText={touched.twitter && errors.twitter}
              disabled={isFormDisabled}
            />
          </Box>
          {/* Telegram */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="telegram"
              name="telegram"
              label="Telegram"
              placeholder="https://t.me/username"
              type="string"
              value={values.telegram}
              onChange={handleChange}
              error={touched.telegram && Boolean(errors.telegram)}
              helperText={touched.telegram && errors.telegram}
              disabled={isFormDisabled}
            />
          </Box>
          {/* Instagram */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="instagram"
              name="instagram"
              label="Instagram"
              placeholder="https://instagram.com/username"
              type="string"
              value={values.instagram}
              onChange={handleChange}
              error={touched.instagram && Boolean(errors.instagram)}
              helperText={touched.instagram && errors.instagram}
              disabled={isFormDisabled}
            />
          </Box>
          {/* Submit button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <XxlLoadingButton
              loading={
                isFormSubmitting ||
                isContractWriteLoading ||
                isTransactionLoading
              }
              variant="contained"
              type="submit"
              disabled={isFormDisabled}
            >
              Save
            </XxlLoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

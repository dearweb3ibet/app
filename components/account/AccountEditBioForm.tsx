import { Person } from "@mui/icons-material";
import { Avatar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import FormikHelper from "components/helper/FormikHelper";
import { XxlLoadingButton } from "components/styled";
import { bioContractAbi } from "contracts/abi/bioContract";
import { Form, Formik } from "formik";
import useError from "hooks/useError";
import useIpfs from "hooks/useIpfs";
import useToasts from "hooks/useToast";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { getContractsChain } from "utils/network";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as yup from "yup";

/**
 * A component with form to edit account bio.
 */
export default function AccountEditBioForm(props: { bioData: any }) {
  const { handleError } = useError();
  const { uploadJsonToIpfs, uploadFileToIpfs, ipfsUrlToHttpUrl } = useIpfs();
  const { showToastSuccess } = useToasts();
  const router = useRouter();
  const { address } = useAccount();

  // Form states
  const [formImageValue, setFormImageValue] = useState<{
    file: any;
    url: any;
  }>();
  const [formValues, setFormValues] = useState({
    name: props.bioData?.name as string,
    text: props.bioData?.text as string,
    twitter: props.bioData?.twitter as string,
    telegram: props.bioData?.telegram as string,
    instagram: props.bioData?.instagram as string,
  });
  const formValidationSchema = yup.object({
    name: yup.string(),
    text: yup.string(),
    twitter: yup.string(),
    telegram: yup.string(),
    instagram: yup.string(),
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [updatedBioDataUri, setUpdatedBioDataUri] = useState("");

  // Contract states
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BIO_CONTRACT_ADDRESS,
    abi: bioContractAbi,
    functionName: "setURI",
    args: [updatedBioDataUri],
    chainId: getContractsChain().id,
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

  async function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      // Get file
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      // Check file size
      const isLessThan2Mb = file.size / 1024 / 1024 < 2;
      if (!isLessThan2Mb) {
        throw new Error(
          "Only JPG/PNG/GIF files with size smaller than 2MB are currently supported!"
        );
      }
      // Read file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          // Save states
          setFormImageValue({
            file: file,
            url: fileReader.result,
          });
        }
      };
      fileReader.readAsDataURL(file);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  async function submit(values: any) {
    try {
      setIsFormSubmitting(true);
      // Upload image to ipfs
      let imageIpfsUrl;
      if (formImageValue?.file) {
        const { ipfsUrl } = await uploadFileToIpfs(formImageValue.file);
        imageIpfsUrl = ipfsUrl;
      }
      // Init updated bio data
      const updatedBioData = {
        image: imageIpfsUrl || props.bioData.image,
        ...values,
      };
      // Upload updated bio data to ipfs
      const { ipfsUrl } = await uploadJsonToIpfs(updatedBioData);
      setUpdatedBioDataUri(ipfsUrl);
    } catch (error: any) {
      handleError(error, true);
      setIsFormSubmitting(false);
    }
  }

  useEffect(() => {
    // Write data to contract if form was submitted
    if (updatedBioDataUri !== "" && contractWrite && !isContractWriteLoading) {
      setUpdatedBioDataUri("");
      contractWrite?.();
      setIsFormSubmitting(false);
    }
  }, [updatedBioDataUri, contractWrite, isContractWriteLoading]);

  useEffect(() => {
    if (isTransactionSuccess) {
      showToastSuccess("Changes saved, account will be updated soon");
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <label
              htmlFor="image"
              style={{ display: "block", width: 164, height: 164 }}
            >
              <Avatar
                sx={{
                  cursor: !isFormDisabled ? "pointer" : undefined,
                  width: 164,
                  height: 164,
                  borderRadius: 164,
                }}
                src={
                  formImageValue?.url ||
                  (props.bioData?.image
                    ? ipfsUrlToHttpUrl(props.bioData.image)
                    : undefined)
                }
              >
                <Person sx={{ fontSize: 64 }} />
              </Avatar>
              <input
                hidden
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                disabled={isFormDisabled}
              />
            </label>
          </Box>
          {/* Name */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              placeholder="Alice"
              type="string"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              disabled={isFormDisabled}
            />
          </Box>
          {/* Text */}
          <Box sx={{ width: 400, mb: 2 }}>
            <TextField
              fullWidth
              id="text"
              name="text"
              label="Bio"
              placeholder="crypto enthusiast..."
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
              placeholder="username"
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
              placeholder="username"
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
              placeholder="username"
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
              disabled={isFormDisabled || !contractWrite}
            >
              Save
            </XxlLoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

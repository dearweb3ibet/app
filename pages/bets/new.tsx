import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  Link as MuiLink,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import FormikHelper from "components/helpers/FormikHelper";
import Layout from "components/layout/Layout";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import { Form, Formik } from "formik";
import useDebounce from "hooks/useDebounce";
import Link from "next/link";
import { useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as yup from "yup";

/**
 * Page to make a new bet.
 */
export default function NewBet() {
  // Form states
  const [formValues, setFormValues] = useState({
    rate: 0.01,
    symbol: "ETHUSD",
    minPrice: 1200,
    maxPrice: 1600,
    date: "2023-01-01",
  });
  const debouncedFormValues = useDebounce(formValues);
  const formValidationSchema = yup.object({
    rate: yup.number().required(),
    symbol: yup.string().required(),
    minPrice: yup.number().required(),
    maxPrice: yup.number().required(),
    date: yup.string().required(),
  });

  // Account state
  const { address } = useAccount();
  // Contract states
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "create",
    args: formValuesToContractArgs(debouncedFormValues),
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
  const [madeBetId, setMadeBetId] = useState<string | undefined>();

  const isFormDisabled =
    isContractWriteLoading || isTransactionLoading || isTransactionSuccess;

  function formValuesToContractArgs(values: any): any {
    const uri = "";
    const symbol = values.symbol;
    const minPrice = BigNumber.from(values.minPrice || 0);
    const maxPrice = BigNumber.from(values.maxPrice || 0);
    const dayStartTimestamp = BigNumber.from(
      new Date(values.date).getTime() / 1000
    );
    const rate = ethers.utils.parseEther(values.rate?.toString() || "0");
    return [
      uri,
      symbol,
      minPrice,
      maxPrice,
      dayStartTimestamp,
      rate,
      { value: rate },
    ];
  }

  // Listen contract events to get id of made bet
  useContractEvent({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    eventName: "Transfer",
    listener(from, to, tokenId) {
      if (from === ethers.constants.AddressZero && to === address) {
        setMadeBetId(tokenId.toString());
      }
    },
  });

  return (
    <Layout>
      {/* Intro message */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dear Web3,
      </Typography>
      {/* Form */}
      <Box sx={{ mt: 4 }}>
        <Formik
          initialValues={formValues}
          validationSchema={formValidationSchema}
          onSubmit={() => contractWrite?.()}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <FormikHelper onChange={(values: any) => setFormValues(values)} />
              <Stack direction="column" spacing={2}>
                <TextField
                  fullWidth
                  id="rate"
                  name="rate"
                  label="I bet"
                  type="number"
                  value={values.rate}
                  onChange={handleChange}
                  error={touched.rate && Boolean(errors.rate)}
                  helperText={touched.rate && errors.rate}
                  disabled={isFormDisabled}
                />
                <FormControl fullWidth>
                  <InputLabel id="symbol-label">That</InputLabel>
                  <Select
                    labelId="symbol-label"
                    id="symbol"
                    name="symbol"
                    label="That"
                    value={values.symbol}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                  >
                    <MenuItem value="ETHUSD">ETHUSD</MenuItem>
                    <MenuItem value="BTCUSD">BTCUSD</MenuItem>
                  </Select>
                </FormControl>
                <Typography fontWeight={700}>will be cost</Typography>
                <TextField
                  fullWidth
                  id="minPrice"
                  name="minPrice"
                  label="More than"
                  type="number"
                  value={values.minPrice}
                  onChange={handleChange}
                  error={touched.minPrice && Boolean(errors.minPrice)}
                  helperText={touched.minPrice && errors.minPrice}
                  disabled={isFormDisabled}
                />
                <Typography fontWeight={700}>and</Typography>
                <TextField
                  fullWidth
                  id="maxPrice"
                  name="maxPrice"
                  label="Less than"
                  type="number"
                  value={values.maxPrice}
                  onChange={handleChange}
                  error={touched.maxPrice && Boolean(errors.maxPrice)}
                  helperText={touched.maxPrice && errors.maxPrice}
                  disabled={isFormDisabled}
                />
                <TextField
                  fullWidth
                  id="date"
                  name="date"
                  label="On"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  disabled={isFormDisabled}
                />
                <LoadingButton
                  loading={isContractWriteLoading || isTransactionLoading}
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isFormDisabled || !contractWrite}
                >
                  Make Bet
                </LoadingButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      {/* Success message */}
      {madeBetId && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Bet is made!
          </Typography>
          <Link href={`/bets/${madeBetId}`} legacyBehavior passHref>
            <MuiLink>Link</MuiLink>
          </Link>
        </Box>
      )}
    </Layout>
  );
}

import { Box, MenuItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import FormikHelper from "components/helper/FormikHelper";
import {
  CentralizedBox,
  WidgetInputSelect,
  WidgetInputTextField,
  XxlLoadingButton,
} from "components/styled";
import Widget from "components/widget";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import { Form, Formik } from "formik";
import useDebounce from "hooks/useDebounce";
import useToasts from "hooks/useToast";
import { useState } from "react";
import { targetPriceNumberToBigNumber } from "utils/converters";
import { getContractsChain } from "utils/network";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as yup from "yup";
import BetFeesMessage from "./BetFeesMessage";

/**
 * A component with form to create a bet.
 */
export default function BetCreateForm(props: {
  onSuccessCreate: (id: string) => void;
}) {
  const { address } = useAccount();
  const { showToastError } = useToasts();

  // Form states
  const [formValues, setFormValues] = useState({
    fee: 0.01,
    feeCurrency: "native",
    symbol: "ETHUSD",
    targetMinPrice: 1200,
    targetMaxPrice: 1600,
    targetTimestamp: "2023-02-15",
    participationDeadlineTimestamp: "2023-02-01",
  });
  const debouncedFormValues = useDebounce(formValues);
  const formValidationSchema = yup.object({
    fee: yup.number().required(),
    feeCurrency: yup.string().required(),
    symbol: yup.string().required(),
    targetMinPrice: yup.number().required(),
    targetMaxPrice: yup.number().required(),
    targetTimestamp: yup.string().required(),
  });

  // Contract states
  const { config: contractPrepareConfig, isError: isContractPrepareError } =
    usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
      abi: betContractAbi,
      functionName: "create",
      args: formValuesToContractArgs(debouncedFormValues),
      chainId: getContractsChain().id,
      onError(error: any) {
        showToastError(error);
      },
    });
  const {
    data: contractWriteData,
    isLoading: isContractWriteLoading,
    write: contractWrite,
  } = useContractWrite(contractPrepareConfig);
  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } =
    useWaitForTransaction({
      hash: contractWriteData?.hash,
    });

  const isFormDisabled =
    isContractWriteLoading || isTransactionLoading || isTransactionSuccess;

  function formValuesToContractArgs(values: any): any {
    const uri = "";
    const fee = ethers.utils.parseEther(values.fee?.toString() || "0");
    const symbol = values.symbol;
    const targetMinPrice = BigNumber.from(
      targetPriceNumberToBigNumber(values.targetMinPrice).toString()
    );
    const targetMaxPrice = BigNumber.from(
      targetPriceNumberToBigNumber(values.targetMaxPrice).toString()
    );
    const targetTimestamp = BigNumber.from(
      new Date(values.targetTimestamp).getTime() / 1000
    );
    const participationDeadlineTimestamp = BigNumber.from(
      new Date(values.participationDeadlineTimestamp).getTime() / 1000
    );
    return [
      uri,
      fee,
      symbol,
      targetMinPrice,
      targetMaxPrice,
      targetTimestamp,
      participationDeadlineTimestamp,
      { value: fee },
    ];
  }

  // Listen contract events to get id of made bet
  useContractEvent({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    eventName: "Transfer",
    listener(from, to, tokenId) {
      if (from === ethers.constants.AddressZero && to === address) {
        props.onSuccessCreate(tokenId.toString());
      }
    },
  });

  return (
    <CentralizedBox>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        🤞 Dear Web3,
      </Typography>
      <Formik
        initialValues={formValues}
        validationSchema={formValidationSchema}
        onSubmit={() => contractWrite?.()}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form style={{ width: "100%" }}>
            <FormikHelper onChange={(values: any) => setFormValues(values)} />
            {/* Fee input */}
            <Widget title="I bet" color="#2B6EFD" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1}>
                <WidgetInputTextField
                  id="fee"
                  name="fee"
                  type="number"
                  value={values.fee}
                  onChange={handleChange}
                  error={touched.fee && Boolean(errors.fee)}
                  helperText={touched.fee && errors.fee}
                  disabled={isFormDisabled}
                />
                <WidgetInputSelect
                  id="feeCurrency"
                  name="feeCurrency"
                  value={values.feeCurrency}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                >
                  <MenuItem value="native">
                    {getContractsChain().nativeCurrency?.symbol}
                  </MenuItem>
                </WidgetInputSelect>
              </Stack>
            </Widget>
            {/* Symbol input */}
            <Widget title="That" color="#410c92" sx={{ mb: 3 }}>
              <WidgetInputSelect
                id="symbol"
                name="symbol"
                value={values.symbol}
                onChange={handleChange}
                disabled={isFormDisabled}
              >
                <MenuItem value="ETHUSD">ETH</MenuItem>
                <MenuItem value="BTCUSD">BTC</MenuItem>
                <MenuItem value="MATICUSD">MATIC</MenuItem>
              </WidgetInputSelect>
            </Widget>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              will cost
            </Typography>
            {/* Target min price input */}
            <Widget title="More than" color="#1DB954" sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1}>
                <WidgetInputTextField
                  id="targetMinPrice"
                  name="targetMinPrice"
                  type="number"
                  value={values.targetMinPrice}
                  onChange={handleChange}
                  error={
                    touched.targetMinPrice && Boolean(errors.targetMinPrice)
                  }
                  helperText={touched.targetMinPrice && errors.targetMinPrice}
                  disabled={isFormDisabled}
                />
                <WidgetInputSelect
                  id="targetPriceCurrency"
                  name="targetPriceCurrency"
                  value="USD"
                  disabled={isFormDisabled}
                >
                  <MenuItem value="USD">USD</MenuItem>
                </WidgetInputSelect>
              </Stack>
            </Widget>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              and
            </Typography>
            {/* Target max price input */}
            <Widget title="Less than" color="#FF4400" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1}>
                <WidgetInputTextField
                  id="targetMaxPrice"
                  name="targetMaxPrice"
                  type="number"
                  value={values.targetMaxPrice}
                  onChange={handleChange}
                  error={
                    touched.targetMaxPrice && Boolean(errors.targetMaxPrice)
                  }
                  helperText={touched.targetMaxPrice && errors.targetMaxPrice}
                  disabled={isFormDisabled}
                />
                <WidgetInputSelect
                  id="targetPriceCurrency"
                  name="targetPriceCurrency"
                  value="USD"
                  disabled={isFormDisabled}
                >
                  <MenuItem value="USD">USD</MenuItem>
                </WidgetInputSelect>
              </Stack>
            </Widget>
            {/* Target timestamp input */}
            <Widget title="On" color="#4B144B" sx={{ mb: 3 }}>
              <WidgetInputTextField
                id="targetTimestamp"
                name="targetTimestamp"
                type="date"
                value={values.targetTimestamp}
                onChange={handleChange}
                error={
                  touched.targetTimestamp && Boolean(errors.targetTimestamp)
                }
                helperText={touched.targetTimestamp && errors.targetTimestamp}
                disabled={isFormDisabled}
                sx={{ width: 180 }}
              />
            </Widget>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              and other accounts can take part in this bet
            </Typography>
            {/* Participation deadline timestamp input */}
            <Widget title="Before" color="#E97E27" sx={{ mb: 6 }}>
              <WidgetInputTextField
                id="participationDeadlineTimestamp"
                name="participationDeadlineTimestamp"
                type="date"
                value={values.participationDeadlineTimestamp}
                onChange={handleChange}
                error={
                  touched.participationDeadlineTimestamp &&
                  Boolean(errors.participationDeadlineTimestamp)
                }
                helperText={
                  touched.participationDeadlineTimestamp &&
                  errors.participationDeadlineTimestamp
                }
                disabled={isFormDisabled}
                sx={{ width: 180 }}
              />
            </Widget>
            {/* Submit button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <XxlLoadingButton
                loading={isContractWriteLoading || isTransactionLoading}
                variant="contained"
                type="submit"
                disabled={
                  isFormDisabled || isContractPrepareError || !contractWrite
                }
              >
                Make Bet
              </XxlLoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
      <BetFeesMessage sx={{ mt: 4 }} />
    </CentralizedBox>
  );
}

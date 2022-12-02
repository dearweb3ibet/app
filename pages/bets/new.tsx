import { Box, Link as MuiLink, MenuItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import FormikHelper from "components/helper/FormikHelper";
import Layout from "components/layout";
import {
  CentralizedBox,
  XxlLoadingButton,
  WidgetInputSelect,
  WidgetInputTextField,
} from "components/styled";
import WidgetWrapper from "components/widget/WidgetWrapper";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import { Form, Formik } from "formik";
import useDebounce from "hooks/useDebounce";
import useToasts from "hooks/useToast";
import Link from "next/link";
import { useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as yup from "yup";

/**
 * Page to make a new bet.
 */
export default function NewBet() {
  const [createdBetId, setCreatedBetId] = useState<string | undefined>();

  return (
    <Layout>
      {createdBetId ? (
        <CreatedBetMessage betId={createdBetId} />
      ) : (
        <CreateBetForm
          onSuccessCreate={(createdBetId) => setCreatedBetId(createdBetId)}
        />
      )}
    </Layout>
  );
}

function CreatedBetMessage(props: { betId: string }) {
  const { showToastSuccess } = useToasts();
  const betLink = `${global.window.location.origin}/bets/${props.betId}`;

  return (
    <CentralizedBox>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        🤟 Congrats, your bet is published!
      </Typography>
      {betLink && (
        <>
          {/* Link */}
          <Box sx={{ border: 3, borderRadius: 3, px: 4, py: 2, mb: 3 }}>
            <Link href={betLink} legacyBehavior passHref>
              <MuiLink sx={{ fontWeight: 700, textAlign: "center" }}>
                🔗 {betLink}
              </MuiLink>
            </Link>
          </Box>
          {/* Copy link button */}
          <XxlLoadingButton
            variant="contained"
            onClick={() => {
              navigator.clipboard.writeText(betLink);
              showToastSuccess("Link copied");
            }}
          >
            Copy Link
          </XxlLoadingButton>
        </>
      )}
    </CentralizedBox>
  );
}

// TODO: Calculate the default form dates relative to the current date
// TODO: Implement using of different fee currencies
function CreateBetForm(props: { onSuccessCreate: (betId: string) => void }) {
  // Form states
  const [formValues, setFormValues] = useState({
    fee: 0.01,
    feeCurrency: "MATIC",
    symbol: "ETHUSD",
    targetMinPrice: 1200,
    targetMaxPrice: 1600,
    targetTimestamp: "2023-01-14",
    participationDeadlineTimestamp: "2023-01-01",
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

  const isFormDisabled =
    isContractWriteLoading || isTransactionLoading || isTransactionSuccess;

  function formValuesToContractArgs(values: any): any {
    const uri = "";
    const fee = ethers.utils.parseEther(values.fee?.toString() || "0");
    const symbol = values.symbol;
    const targetMinPrice = BigNumber.from(values.targetMinPrice || 0);
    const targetMaxPrice = BigNumber.from(values.targetMaxPrice || 0);
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
          <Form>
            <FormikHelper onChange={(values: any) => setFormValues(values)} />
            {/* Fee input */}
            <WidgetWrapper title="I bet" color="#2B6EFD" sx={{ mb: 2 }}>
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
                  id="symbol"
                  name="symbol"
                  value={values.feeCurrency}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                >
                  <MenuItem value="MATIC">MATIC</MenuItem>
                </WidgetInputSelect>
              </Stack>
            </WidgetWrapper>
            {/* Symbol input */}
            <WidgetWrapper title="That" color="#410c92" sx={{ mb: 3 }}>
              <WidgetInputSelect
                id="symbol"
                name="symbol"
                value={values.symbol}
                onChange={handleChange}
                disabled={isFormDisabled}
              >
                <MenuItem value="ETHUSD">ETH</MenuItem>
                <MenuItem value="BTCUSD">BTC</MenuItem>
              </WidgetInputSelect>
            </WidgetWrapper>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              will cost
            </Typography>
            {/* Target min price input */}
            <WidgetWrapper
              title="More than"
              subtitle="USD"
              color="#1DB954"
              sx={{ mb: 3 }}
            >
              <WidgetInputTextField
                id="targetMinPrice"
                name="targetMinPrice"
                type="number"
                value={values.targetMinPrice}
                onChange={handleChange}
                error={touched.targetMinPrice && Boolean(errors.targetMinPrice)}
                helperText={touched.targetMinPrice && errors.targetMinPrice}
                disabled={isFormDisabled}
              />
            </WidgetWrapper>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              and
            </Typography>
            {/* Target max price input */}
            <WidgetWrapper
              title="Less than"
              subtitle="USD"
              color="#FF4400"
              sx={{ mb: 2 }}
            >
              <WidgetInputTextField
                id="targetMaxPrice"
                name="targetMaxPrice"
                type="number"
                value={values.targetMaxPrice}
                onChange={handleChange}
                error={touched.targetMaxPrice && Boolean(errors.targetMaxPrice)}
                helperText={touched.targetMaxPrice && errors.targetMaxPrice}
                disabled={isFormDisabled}
              />
            </WidgetWrapper>
            {/* Target timestamp input */}
            <WidgetWrapper title="On" color="#4B144B" sx={{ mb: 3 }}>
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
            </WidgetWrapper>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              and other accounts can take part in this bet
            </Typography>
            {/* Participation deadline timestamp input */}
            <WidgetWrapper title="Before" color="#E97E27" sx={{ mb: 6 }}>
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
            </WidgetWrapper>
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
                disabled={isFormDisabled || !contractWrite}
              >
                Make Bet
              </XxlLoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </CentralizedBox>
  );
}

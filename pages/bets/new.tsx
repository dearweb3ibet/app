import {
  Box,
  Link as MuiLink,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { HugeLoadingButton } from "components/buttons";
import FormikHelper from "components/helpers/FormikHelper";
import Layout from "components/layout";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import { Form, Formik } from "formik";
import useDebounce from "hooks/useDebounce";
import useToasts from "hooks/useToast";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [betLink, setBetLink] = useState<string | undefined>();

  useEffect(() => {
    if (global.window) {
      setBetLink(`${global.window.location.origin}/bets/${props.betId}`);
    }
  }, [global.window]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        🤞 Congrats, your bet is published!
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
          <HugeLoadingButton
            variant="contained"
            onClick={() => {
              navigator.clipboard.writeText(betLink);
              showToastSuccess("Link copied");
            }}
          >
            Copy Link
          </HugeLoadingButton>
        </>
      )}
    </Box>
  );
}

function CreateBetForm(props: { onSuccessCreate: (betId: string) => void }) {
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
  // Network state
  const { chain } = useNetwork();
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
        props.onSuccessCreate(tokenId.toString());
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        gutterBottom
        sx={{ mb: 3 }}
      >
        🙏 Dear Web3,
      </Typography>
      <Formik
        initialValues={formValues}
        validationSchema={formValidationSchema}
        onSubmit={() => contractWrite?.()}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <FormikHelper onChange={(values: any) => setFormValues(values)} />
            {/* Rate input */}
            <CreateBetInputBox
              title="I bet"
              subtitle={chain?.nativeCurrency?.symbol}
              color="#2B6EFD"
              sx={{ mb: 2 }}
            >
              <TextField
                id="rate"
                name="rate"
                type="number"
                value={values.rate}
                onChange={handleChange}
                error={touched.rate && Boolean(errors.rate)}
                helperText={touched.rate && errors.rate}
                disabled={isFormDisabled}
                variant="standard"
                sx={{
                  width: 120,
                  bgcolor: "#FFFFFF",
                  borderRadius: 4,
                  py: 1,
                  px: 2,
                }}
              />
            </CreateBetInputBox>
            {/* Symbol input */}
            <CreateBetInputBox title="That" color="#333333" sx={{ mb: 3 }}>
              <Select
                labelId="symbol-label"
                id="symbol"
                name="symbol"
                value={values.symbol}
                onChange={handleChange}
                disabled={isFormDisabled}
                variant="standard"
                sx={{
                  width: 160,
                  bgcolor: "#FFFFFF",
                  borderRadius: 4,
                  py: 1,
                  px: 2,
                }}
              >
                <MenuItem value="ETHUSD">ETH</MenuItem>
                <MenuItem value="BTCUSD">BTC</MenuItem>
              </Select>
            </CreateBetInputBox>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              will be cost
            </Typography>
            {/* Min price input */}
            <CreateBetInputBox
              title="More than"
              subtitle="USD"
              color="#1DB954"
              sx={{ mb: 3 }}
            >
              <TextField
                id="minPrice"
                name="minPrice"
                type="number"
                value={values.minPrice}
                onChange={handleChange}
                error={touched.minPrice && Boolean(errors.minPrice)}
                helperText={touched.minPrice && errors.minPrice}
                disabled={isFormDisabled}
                variant="standard"
                sx={{
                  width: 120,
                  bgcolor: "#FFFFFF",
                  borderRadius: 4,
                  py: 1,
                  px: 2,
                }}
              />
            </CreateBetInputBox>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
              and
            </Typography>
            {/* Min price input */}
            <CreateBetInputBox
              title="Less than"
              subtitle="USD"
              color="#FF4400"
              sx={{ mb: 2 }}
            >
              <TextField
                id="maxPrice"
                name="maxPrice"
                type="number"
                value={values.maxPrice}
                onChange={handleChange}
                error={touched.maxPrice && Boolean(errors.maxPrice)}
                helperText={touched.maxPrice && errors.maxPrice}
                disabled={isFormDisabled}
                variant="standard"
                sx={{
                  width: 120,
                  bgcolor: "#FFFFFF",
                  borderRadius: 4,
                  py: 1,
                  px: 2,
                }}
              />
            </CreateBetInputBox>
            {/* Date */}
            <CreateBetInputBox title="On" color="#4B144B" sx={{ mb: 6 }}>
              <TextField
                id="date"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                disabled={isFormDisabled}
                variant="standard"
                sx={{
                  width: 180,
                  bgcolor: "#FFFFFF",
                  borderRadius: 4,
                  py: 1,
                  px: 2,
                }}
              />
            </CreateBetInputBox>
            {/* Submit button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <HugeLoadingButton
                loading={isContractWriteLoading || isTransactionLoading}
                variant="contained"
                type="submit"
                disabled={isFormDisabled || !contractWrite}
              >
                Make Bet
              </HugeLoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

function CreateBetInputBox(props: {
  title: string;
  subtitle?: string;
  color?: string;
  sx?: any;
  children: any;
}) {
  const [subtitle, setSubtitle] = useState<string | undefined>();

  useEffect(() => {
    setSubtitle(props.subtitle);
  }, [props.subtitle]);

  return (
    <Box
      sx={{
        width: 540,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        bgcolor: props.color || "#000000",
        py: 2,
        px: 4,
        borderRadius: 3,
        ...props.sx,
      }}
    >
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: 32,
          fontWeight: 700,
          minWidth: 180,
          mr: 3,
        }}
      >
        {props.title}
      </Typography>
      {props.children}
      <Typography sx={{ color: "#FFFFFF", ml: 2 }}>{subtitle}</Typography>
    </Box>
  );
}

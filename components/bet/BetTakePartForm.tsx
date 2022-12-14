import { MenuItem, Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BetSuccessTakingPartDialog from "components/dialog/BetSuccessTakingPartDialog";
import FormikHelper from "components/helper/FormikHelper";
import {
  ThickDivider,
  WidgetInputSelect,
  WidgetInputTextField,
  XxlLoadingButton,
} from "components/styled";
import Widget from "components/widget";
import { DialogContext } from "context/dialog";
import { betContractAbi } from "contracts/abi/betContract";
import { ethers } from "ethers";
import { Form, Formik } from "formik";
import useDebounce from "hooks/useDebounce";
import { useContext, useEffect, useState } from "react";
import { getContractsChain } from "utils/network";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as yup from "yup";
import BetFeesMessage from "./BetFeesMessage";

/**
 * A component with form to take part in a bet.
 */
export default function BetTakePartForm(props: {
  id: string;
  isClosed: boolean;
  participants: readonly any[];
  onSuccess?: Function;
  sx?: SxProps;
}) {
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { isConnected, address } = useAccount();

  // Form states
  const [formValues, setFormValues] = useState({
    fee: 0.01,
    feeCurrency: "native",
    isFeeForSuccess: "false",
  });
  const debouncedFormValues = useDebounce(formValues);
  const formValidationSchema = yup.object({
    fee: yup.number().required(),
    feeCurrency: yup.string().required(),
    isFeeForSuccess: yup.string().required(),
  });

  // Contract states
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "takePart",
    args: formValuesToContractArgs(debouncedFormValues),
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
    isContractWriteLoading || isTransactionLoading || isTransactionSuccess;
  const isAddressParticipant = props.participants.some(
    (p) => p.accountAddress === address
  );

  function formValuesToContractArgs(values: any): any {
    const tokenId = props.id;
    const fee = ethers.utils.parseEther(values.fee?.toString() || "0");
    const isFeeForSuccess = values.isFeeForSuccess === "true";
    return [tokenId, fee, isFeeForSuccess, { value: fee }];
  }

  useEffect(() => {
    if (isTransactionSuccess) {
      showDialog?.(
        <BetSuccessTakingPartDialog id={props.id} onClose={closeDialog} />
      );
      props.onSuccess?.();
    }
  }, [isTransactionSuccess]);

  if (!props.isClosed && isConnected && !isAddressParticipant) {
    return (
      <Box sx={{ width: 1, ...props.sx }}>
        <ThickDivider sx={{ mb: 4 }} />
        {/* Text divider */}
        <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          or participate in this bet
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
                    id="symbol"
                    name="symbol"
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
              <Widget title="On" color="#410C92" sx={{ mb: 3 }}>
                <WidgetInputSelect
                  id="isFeeForSuccess"
                  name="isFeeForSuccess"
                  value={values.isFeeForSuccess}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  sx={{ width: 180 }}
                >
                  <MenuItem value="false">???? bet failure</MenuItem>
                  <MenuItem value="true">???? bet success</MenuItem>
                </WidgetInputSelect>
              </Widget>
              {/* Submit button */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <XxlLoadingButton
                  loading={isContractWriteLoading || isTransactionLoading}
                  variant="contained"
                  type="submit"
                  disabled={isFormDisabled || !contractWrite}
                >
                  Take Part
                </XxlLoadingButton>
              </Stack>
            </Form>
          )}
        </Formik>
        <BetFeesMessage sx={{ mt: 4 }} />
      </Box>
    );
  }

  return <></>;
}

import {
  CreateReportMutationVariables,
  GetAllReportsDocument,
  GetInventoryDocument,
  GetSalesDocument,
  GetStockDocument,
  useCreateReportMutation,
} from "../../generated/graphql";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createInputSchema } from "../../helpers/validation";
import { useDispatch } from "../../store";
import { setError } from "../../store/slices/error";
import { ReportOptions, StuffOptions } from "../../helpers/constants";
import { useIntl } from "react-intl";

interface Props {
  onComplete: () => void;
}

export default function CreateReportForm({ onComplete }: Props) {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const [create, { loading }] = useCreateReportMutation({
    onCompleted: ({ createReport }) => {
      if (createReport) {
        onComplete();
      }
    },
    onError: (e) => {
      dispatch(setError(e.message));
    },
    refetchQueries: [
      {
        query: GetAllReportsDocument,
      },
      {
        query: GetStockDocument,
      },
      {
        query: GetSalesDocument,
      },
      {
        query: GetInventoryDocument,
      },
    ],
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateReportMutationVariables>({
    resolver: yupResolver(createInputSchema),
    mode: "onChange",
  });
  const handleCreateReport = async (value: CreateReportMutationVariables) => {
    if (isDirty && isValid) {
      try {
        await create({
          variables: {
            ...value,
          },
        });
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleCreateReport)}>
      <FormControl>
        <FormLabel>
          {formatMessage({ id: "createReport.reportNameLabel" })}
        </FormLabel>
        <Input {...register("name")} id="name" placeholder="Awesome Report" />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={6}>
        <FormLabel>
          {formatMessage({ id: "createReport.reportTypeLabel" })}
        </FormLabel>
        <Select {...register("type")} name="type">
          {ReportOptions.map((type, idx) => (
            <option key={idx} value={type.value}>
              {formatMessage({ id: type.label })}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.type && errors.type.message}
        </FormErrorMessage>
      </FormControl>
      <Text fontSize="24" mb="4">
        {formatMessage({ id: "createReport.stuffLabel" })}
      </Text>
      <FormControl>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffNameLabel" })}
        </FormLabel>
        <Input
          {...register("data.name")}
          id="data.name"
          placeholder="Urgent Stuff"
        />
        <FormErrorMessage>
          {errors.data?.name && errors.data.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffPriceLabel" })}
        </FormLabel>
        <Input
          {...register("data.price")}
          type="number"
          id="data.price"
          placeholder="$100"
        />
        <FormErrorMessage>
          {errors.data?.price && errors.data.price.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffAmountLabel" })}
        </FormLabel>
        <Input
          {...register("data.amount")}
          id="data.amount"
          type="number"
          placeholder="12 in pcs"
        />
        <FormErrorMessage>
          {errors.data?.amount && errors.data?.amount.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={6}>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffTypeLabel" })}
        </FormLabel>
        <Select {...register("data.type")} name="data.type">
          {StuffOptions.map((type, idx) => (
            <option key={type.value + idx} value={type.value}>
              {formatMessage({ id: type.label })}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.data?.type && errors.data?.type.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        isDisabled={!isValid}
        isLoading={isDirty && loading}
        w="full"
        my={4}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

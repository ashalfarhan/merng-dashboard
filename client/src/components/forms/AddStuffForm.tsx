import {
  AddStuffMutationVariables,
  GetReportDocument,
  useAddStuffMutation,
} from "../../generated/graphql";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { StuffOptions, addStuffSchema } from "../../helpers";
import { useAppDispatch } from "../../store";
import { setError } from "../../store/slices/error";
import { useIntl } from "react-intl";

interface Props {
  onComplete: () => void;
  data: {
    id: string;
  };
}

export default function AddStuffForm({ data, onComplete }: Props) {
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const [editReport, { loading }] = useAddStuffMutation({
    onCompleted: ({ addStuff }) => {
      if (addStuff) {
        onComplete();
      }
    },
    onError: (e) => {
      dispatch(setError(e.message));
    },
    refetchQueries: [
      {
        query: GetReportDocument,
        variables: { id: data.id },
      },
    ],
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<AddStuffMutationVariables>({
    resolver: yupResolver(addStuffSchema),
    mode: "onChange",
  });
  const handleCreateReport = async (value: AddStuffMutationVariables) => {
    if (isDirty && isValid) {
      try {
        const variable = {
          ...value,
          reportId: data.id,
        };
        await editReport({
          variables: {
            ...variable,
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
          {formatMessage({ id: "createReport.stuffPriceLabel" })}
        </FormLabel>
        <Input {...register("name")} id="name" placeholder="Urgen Stuff" />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffPriceLabel" })}
        </FormLabel>
        <Input
          {...register("price")}
          type="number"
          id="data.price"
          placeholder="$100"
        />
        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffAmountLabel" })}
        </FormLabel>
        <Input
          {...register("amount")}
          id="amount"
          type="number"
          placeholder="12 in pcs"
        />
        <FormErrorMessage>
          {errors.amount && errors.amount.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>
          {formatMessage({ id: "createReport.stuffTypeLabel" })}
        </FormLabel>
        <Select {...register("type")} name="type">
          {StuffOptions.map((type, idx) => (
            <option key={idx} value={type.value}>
              {formatMessage({ id: type.label })}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.type && errors.type.message}
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

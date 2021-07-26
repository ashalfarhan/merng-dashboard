import {
  EditReportMutationVariables,
  GetReportDocument,
  ReportType,
  useEditReportMutation,
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
import { editReportSchema } from "../../helpers";
import { useAppDispatch } from "../../store";
import { setError } from "../../store/slices/error";
import { ReportOptions } from "../../helpers/constants";
import { useIntl } from "react-intl";

interface Props {
  onComplete: () => void;
  data: {
    type: ReportType;
    id: string;
    name: string;
  };
}

export default function EditReportForm({ data, onComplete }: Props) {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const [editReport, { loading }] = useEditReportMutation({
    onCompleted: ({ editReport }) => {
      if (editReport) {
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
  } = useForm<EditReportMutationVariables>({
    resolver: yupResolver(editReportSchema),
    mode: "onChange",
  });
  const handleCreateReport = async (value: EditReportMutationVariables) => {
    if (isValid) {
      try {
        const variable = {
          ...value.data,
          _id: data.id,
        };
        await editReport({
          variables: {
            data: variable,
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
        <Input
          {...register("data.name")}
          id="name"
          defaultValue={data.name}
          placeholder="Awesome Report"
        />
        <FormErrorMessage>
          {errors.data?.name && errors.data?.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>
          {formatMessage({ id: "createReport.reportTypeLabel" })}
        </FormLabel>
        <Select {...register("data.type")} name="type" defaultValue={data.type}>
          {ReportOptions.map((type, idx) => (
            <option key={idx} value={type.value}>
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

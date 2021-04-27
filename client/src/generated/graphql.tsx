import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type EditReportInput = {
  _id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<StuffType>;
};

export type EditStuffInput = {
  _id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
  type?: Maybe<StuffType>;
  amount?: Maybe<Scalars["Int"]>;
};

export type LoginPayload = {
  __typename?: "LoginPayload";
  user: User;
  token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  register?: Maybe<User>;
  loginWithUsername?: Maybe<LoginPayload>;
  loginWithEmail?: Maybe<LoginPayload>;
  createReport?: Maybe<Report>;
  deleteReport?: Maybe<Report>;
  editReport?: Maybe<Report>;
  editStuff?: Maybe<Stuff>;
  addStuff?: Maybe<Report>;
};

export type MutationRegisterArgs = {
  isAdmin?: Maybe<Scalars["Boolean"]>;
  password: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
  lastName: Scalars["String"];
  firstName: Scalars["String"];
};

export type MutationLoginWithUsernameArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationLoginWithEmailArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateReportArgs = {
  name: Scalars["String"];
  data: StuffInput;
  type: ReportType;
};

export type MutationDeleteReportArgs = {
  id: Scalars["String"];
};

export type MutationEditReportArgs = {
  data: EditReportInput;
};

export type MutationEditStuffArgs = {
  data: EditStuffInput;
};

export type MutationAddStuffArgs = {
  reportId: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Int"];
  type: StuffType;
  amount: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  getAllUsers?: Maybe<Array<User>>;
  getUser?: Maybe<User>;
  getAllReports?: Maybe<Array<Report>>;
  getReport?: Maybe<Report>;
  getStock?: Maybe<Array<Report>>;
  getSales?: Maybe<Array<Report>>;
  getInventory?: Maybe<Array<Stuff>>;
  hello: Scalars["String"];
};

export type QueryGetUserArgs = {
  userId: Scalars["String"];
};

export type QueryGetReportArgs = {
  id: Scalars["String"];
};

export type Report = {
  __typename?: "Report";
  _id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  goods: Array<Stuff>;
  reporter: User;
  name: Scalars["String"];
  type: ReportType;
  reporterId: Scalars["ID"];
};

/** Type of report that will be submitted */
export enum ReportType {
  Wholesale = "WHOLESALE",
  Purchase = "PURCHASE",
  Sell = "SELL",
}

export type Stuff = {
  __typename?: "Stuff";
  _id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  price: Scalars["Int"];
  reportId: Scalars["ID"];
  amount: Scalars["Int"];
  type: StuffType;
};

export type StuffInput = {
  reportId?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  price: Scalars["Int"];
  type: StuffType;
  amount: Scalars["Int"];
};

/** Type of stuff that will be submitted */
export enum StuffType {
  Stationary = "STATIONARY",
  Foods = "FOODS",
  Personal = "PERSONAL",
  Others = "OTHERS",
}

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  name: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  reports: Array<Report>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export type LoginWithEmailMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginWithEmailMutation = { __typename?: "Mutation" } & {
  loginWithEmail?: Maybe<
    { __typename?: "LoginPayload" } & Pick<LoginPayload, "token"> & {
        user: { __typename?: "User" } & Pick<
          User,
          "_id" | "email" | "username" | "name" | "isAdmin"
        >;
      }
  >;
};

export type LoginWithUsernameMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginWithUsernameMutation = { __typename?: "Mutation" } & {
  loginWithUsername?: Maybe<
    { __typename?: "LoginPayload" } & Pick<LoginPayload, "token"> & {
        user: { __typename?: "User" } & Pick<
          User,
          "_id" | "name" | "isAdmin" | "email" | "username"
        >;
      }
  >;
};

export type CreateReportMutationVariables = Exact<{
  name: Scalars["String"];
  type: ReportType;
  data: StuffInput;
}>;

export type CreateReportMutation = { __typename?: "Mutation" } & {
  createReport?: Maybe<
    { __typename?: "Report" } & Pick<Report, "name" | "createdAt"> & {
        reporter: { __typename?: "User" } & Pick<User, "name">;
      }
  >;
};

export type DeleteReportMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteReportMutation = { __typename?: "Mutation" } & {
  deleteReport?: Maybe<{ __typename?: "Report" } & Pick<Report, "name">>;
};

export type EditReportMutationVariables = Exact<{
  data: EditReportInput;
}>;

export type EditReportMutation = { __typename?: "Mutation" } & {
  editReport?: Maybe<
    { __typename?: "Report" } & Pick<Report, "name" | "updatedAt">
  >;
};

export type EditStuffMutationVariables = Exact<{
  data: EditStuffInput;
}>;

export type EditStuffMutation = { __typename?: "Mutation" } & {
  editStuff?: Maybe<
    { __typename?: "Stuff" } & Pick<Stuff, "name" | "updatedAt">
  >;
};

export type AddStuffMutationVariables = Exact<{
  reportId: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Int"];
  type: StuffType;
  amount: Scalars["Int"];
}>;

export type AddStuffMutation = { __typename?: "Mutation" } & {
  addStuff?: Maybe<
    { __typename?: "Report" } & Pick<Report, "name"> & {
        reporter: { __typename?: "User" } & Pick<User, "name">;
      }
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "username" | "isAdmin" | "_id" | "name" | "email"
    > & {
        reports: Array<
          { __typename?: "Report" } & Pick<
            Report,
            "_id" | "name" | "createdAt" | "updatedAt" | "type"
          > & {
              goods: Array<
                { __typename?: "Stuff" } & Pick<
                  Stuff,
                  | "_id"
                  | "createdAt"
                  | "updatedAt"
                  | "price"
                  | "type"
                  | "amount"
                >
              >;
            }
        >;
      }
  >;
};

export type GetAllReportsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllReportsQuery = { __typename?: "Query" } & {
  getAllReports?: Maybe<
    Array<
      { __typename?: "Report" } & Pick<
        Report,
        "_id" | "name" | "createdAt" | "updatedAt" | "type"
      > & {
          goods: Array<
            { __typename?: "Stuff" } & Pick<
              Stuff,
              "_id" | "createdAt" | "updatedAt" | "price" | "type" | "amount"
            >
          >;
          reporter: { __typename?: "User" } & Pick<User, "_id" | "name">;
        }
    >
  >;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = { __typename?: "Query" } & {
  getAllUsers?: Maybe<
    Array<
      { __typename?: "User" } & Pick<
        User,
        "username" | "email" | "name" | "isAdmin" | "_id"
      > & {
          reports: Array<
            { __typename?: "Report" } & Pick<
              Report,
              "name" | "createdAt" | "updatedAt"
            >
          >;
        }
    >
  >;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  getUser?: Maybe<
    { __typename?: "User" } & Pick<User, "_id" | "isAdmin"> & {
        reports: Array<
          { __typename?: "Report" } & Pick<
            Report,
            "name" | "createdAt" | "updatedAt"
          >
        >;
      }
  >;
};

export type GetReportQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetReportQuery = { __typename?: "Query" } & {
  getReport?: Maybe<
    { __typename?: "Report" } & Pick<
      Report,
      "name" | "createdAt" | "updatedAt" | "type"
    > & {
        reporter: { __typename?: "User" } & Pick<User, "name">;
        goods: Array<
          { __typename?: "Stuff" } & Pick<
            Stuff,
            | "_id"
            | "name"
            | "createdAt"
            | "updatedAt"
            | "price"
            | "type"
            | "amount"
          >
        >;
      }
  >;
};

export type GetSalesQueryVariables = Exact<{ [key: string]: never }>;

export type GetSalesQuery = { __typename?: "Query" } & {
  getSales?: Maybe<
    Array<
      { __typename?: "Report" } & Pick<Report, "_id" | "name" | "createdAt"> & {
          reporter: { __typename?: "User" } & Pick<User, "name">;
          goods: Array<
            { __typename?: "Stuff" } & Pick<
              Stuff,
              "type" | "_id" | "name" | "price" | "amount"
            >
          >;
        }
    >
  >;
};

export type GetStockQueryVariables = Exact<{ [key: string]: never }>;

export type GetStockQuery = { __typename?: "Query" } & {
  getStock?: Maybe<
    Array<
      { __typename?: "Report" } & Pick<Report, "_id" | "name" | "createdAt"> & {
          reporter: { __typename?: "User" } & Pick<User, "name">;
          goods: Array<
            { __typename?: "Stuff" } & Pick<
              Stuff,
              "_id" | "type" | "name" | "price" | "amount"
            >
          >;
        }
    >
  >;
};

export type GetInventoryQueryVariables = Exact<{ [key: string]: never }>;

export type GetInventoryQuery = { __typename?: "Query" } & {
  getInventory?: Maybe<
    Array<
      { __typename?: "Stuff" } & Pick<
        Stuff,
        "_id" | "createdAt" | "type" | "name" | "price" | "amount"
      >
    >
  >;
};

export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    options
  );
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    options
  );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<
  HelloQuery,
  HelloQueryVariables
>;
export const LoginWithEmailDocument = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password) {
      user {
        _id
        email
        username
        name
        isAdmin
      }
      token
    }
  }
`;
export type LoginWithEmailMutationFn = Apollo.MutationFunction<
  LoginWithEmailMutation,
  LoginWithEmailMutationVariables
>;

/**
 * __useLoginWithEmailMutation__
 *
 * To run a mutation, you first call `useLoginWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithEmailMutation, { data, loading, error }] = useLoginWithEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginWithEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginWithEmailMutation,
    LoginWithEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LoginWithEmailMutation,
    LoginWithEmailMutationVariables
  >(LoginWithEmailDocument, options);
}
export type LoginWithEmailMutationHookResult = ReturnType<
  typeof useLoginWithEmailMutation
>;
export type LoginWithEmailMutationResult = Apollo.MutationResult<LoginWithEmailMutation>;
export type LoginWithEmailMutationOptions = Apollo.BaseMutationOptions<
  LoginWithEmailMutation,
  LoginWithEmailMutationVariables
>;
export const LoginWithUsernameDocument = gql`
  mutation LoginWithUsername($username: String!, $password: String!) {
    loginWithUsername(username: $username, password: $password) {
      user {
        _id
        name
        isAdmin
        email
        username
      }
      token
    }
  }
`;
export type LoginWithUsernameMutationFn = Apollo.MutationFunction<
  LoginWithUsernameMutation,
  LoginWithUsernameMutationVariables
>;

/**
 * __useLoginWithUsernameMutation__
 *
 * To run a mutation, you first call `useLoginWithUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithUsernameMutation, { data, loading, error }] = useLoginWithUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginWithUsernameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginWithUsernameMutation,
    LoginWithUsernameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LoginWithUsernameMutation,
    LoginWithUsernameMutationVariables
  >(LoginWithUsernameDocument, options);
}
export type LoginWithUsernameMutationHookResult = ReturnType<
  typeof useLoginWithUsernameMutation
>;
export type LoginWithUsernameMutationResult = Apollo.MutationResult<LoginWithUsernameMutation>;
export type LoginWithUsernameMutationOptions = Apollo.BaseMutationOptions<
  LoginWithUsernameMutation,
  LoginWithUsernameMutationVariables
>;
export const CreateReportDocument = gql`
  mutation CreateReport(
    $name: String!
    $type: ReportType!
    $data: StuffInput!
  ) {
    createReport(name: $name, type: $type, data: $data) {
      name
      createdAt
      reporter {
        name
      }
    }
  }
`;
export type CreateReportMutationFn = Apollo.MutationFunction<
  CreateReportMutation,
  CreateReportMutationVariables
>;

/**
 * __useCreateReportMutation__
 *
 * To run a mutation, you first call `useCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportMutation, { data, loading, error }] = useCreateReportMutation({
 *   variables: {
 *      name: // value for 'name'
 *      type: // value for 'type'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReportMutation,
    CreateReportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateReportMutation,
    CreateReportMutationVariables
  >(CreateReportDocument, options);
}
export type CreateReportMutationHookResult = ReturnType<
  typeof useCreateReportMutation
>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<
  CreateReportMutation,
  CreateReportMutationVariables
>;
export const DeleteReportDocument = gql`
  mutation DeleteReport($id: String!) {
    deleteReport(id: $id) {
      name
    }
  }
`;
export type DeleteReportMutationFn = Apollo.MutationFunction<
  DeleteReportMutation,
  DeleteReportMutationVariables
>;

/**
 * __useDeleteReportMutation__
 *
 * To run a mutation, you first call `useDeleteReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReportMutation, { data, loading, error }] = useDeleteReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteReportMutation,
    DeleteReportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteReportMutation,
    DeleteReportMutationVariables
  >(DeleteReportDocument, options);
}
export type DeleteReportMutationHookResult = ReturnType<
  typeof useDeleteReportMutation
>;
export type DeleteReportMutationResult = Apollo.MutationResult<DeleteReportMutation>;
export type DeleteReportMutationOptions = Apollo.BaseMutationOptions<
  DeleteReportMutation,
  DeleteReportMutationVariables
>;
export const EditReportDocument = gql`
  mutation EditReport($data: EditReportInput!) {
    editReport(data: $data) {
      name
      updatedAt
    }
  }
`;
export type EditReportMutationFn = Apollo.MutationFunction<
  EditReportMutation,
  EditReportMutationVariables
>;

/**
 * __useEditReportMutation__
 *
 * To run a mutation, you first call `useEditReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editReportMutation, { data, loading, error }] = useEditReportMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditReportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditReportMutation,
    EditReportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditReportMutation, EditReportMutationVariables>(
    EditReportDocument,
    options
  );
}
export type EditReportMutationHookResult = ReturnType<
  typeof useEditReportMutation
>;
export type EditReportMutationResult = Apollo.MutationResult<EditReportMutation>;
export type EditReportMutationOptions = Apollo.BaseMutationOptions<
  EditReportMutation,
  EditReportMutationVariables
>;
export const EditStuffDocument = gql`
  mutation EditStuff($data: EditStuffInput!) {
    editStuff(data: $data) {
      name
      updatedAt
    }
  }
`;
export type EditStuffMutationFn = Apollo.MutationFunction<
  EditStuffMutation,
  EditStuffMutationVariables
>;

/**
 * __useEditStuffMutation__
 *
 * To run a mutation, you first call `useEditStuffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditStuffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editStuffMutation, { data, loading, error }] = useEditStuffMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditStuffMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditStuffMutation,
    EditStuffMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditStuffMutation, EditStuffMutationVariables>(
    EditStuffDocument,
    options
  );
}
export type EditStuffMutationHookResult = ReturnType<
  typeof useEditStuffMutation
>;
export type EditStuffMutationResult = Apollo.MutationResult<EditStuffMutation>;
export type EditStuffMutationOptions = Apollo.BaseMutationOptions<
  EditStuffMutation,
  EditStuffMutationVariables
>;
export const AddStuffDocument = gql`
  mutation AddStuff(
    $reportId: ID!
    $name: String!
    $price: Int!
    $type: StuffType!
    $amount: Int!
  ) {
    addStuff(
      reportId: $reportId
      name: $name
      price: $price
      type: $type
      amount: $amount
    ) {
      name
      reporter {
        name
      }
    }
  }
`;
export type AddStuffMutationFn = Apollo.MutationFunction<
  AddStuffMutation,
  AddStuffMutationVariables
>;

/**
 * __useAddStuffMutation__
 *
 * To run a mutation, you first call `useAddStuffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStuffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStuffMutation, { data, loading, error }] = useAddStuffMutation({
 *   variables: {
 *      reportId: // value for 'reportId'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      type: // value for 'type'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useAddStuffMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddStuffMutation,
    AddStuffMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddStuffMutation, AddStuffMutationVariables>(
    AddStuffDocument,
    options
  );
}
export type AddStuffMutationHookResult = ReturnType<typeof useAddStuffMutation>;
export type AddStuffMutationResult = Apollo.MutationResult<AddStuffMutation>;
export type AddStuffMutationOptions = Apollo.BaseMutationOptions<
  AddStuffMutation,
  AddStuffMutationVariables
>;
export const MeDocument = gql`
  query ME {
    me {
      username
      isAdmin
      _id
      name
      email
      reports {
        _id
        name
        createdAt
        updatedAt
        type
        goods {
          _id
          createdAt
          updatedAt
          price
          type
          amount
        }
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetAllReportsDocument = gql`
  query GetAllReports {
    getAllReports {
      _id
      name
      createdAt
      updatedAt
      type
      goods {
        _id
        createdAt
        updatedAt
        price
        type
        amount
      }
      reporter {
        _id
        name
      }
    }
  }
`;

/**
 * __useGetAllReportsQuery__
 *
 * To run a query within a React component, call `useGetAllReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReportsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllReportsQuery,
    GetAllReportsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllReportsQuery, GetAllReportsQueryVariables>(
    GetAllReportsDocument,
    options
  );
}
export function useGetAllReportsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllReportsQuery,
    GetAllReportsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllReportsQuery, GetAllReportsQueryVariables>(
    GetAllReportsDocument,
    options
  );
}
export type GetAllReportsQueryHookResult = ReturnType<
  typeof useGetAllReportsQuery
>;
export type GetAllReportsLazyQueryHookResult = ReturnType<
  typeof useGetAllReportsLazyQuery
>;
export type GetAllReportsQueryResult = Apollo.QueryResult<
  GetAllReportsQuery,
  GetAllReportsQueryVariables
>;
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    getAllUsers {
      username
      email
      name
      isAdmin
      _id
      reports {
        name
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($id: String!) {
    getUser(userId: $id) {
      _id
      isAdmin
      reports {
        name
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetReportDocument = gql`
  query GetReport($id: String!) {
    getReport(id: $id) {
      name
      createdAt
      updatedAt
      type
      reporter {
        name
      }
      goods {
        _id
        name
        createdAt
        updatedAt
        price
        type
        amount
      }
    }
  }
`;

/**
 * __useGetReportQuery__
 *
 * To run a query within a React component, call `useGetReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetReportQuery(
  baseOptions: Apollo.QueryHookOptions<GetReportQuery, GetReportQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReportQuery, GetReportQueryVariables>(
    GetReportDocument,
    options
  );
}
export function useGetReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetReportQuery,
    GetReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetReportQuery, GetReportQueryVariables>(
    GetReportDocument,
    options
  );
}
export type GetReportQueryHookResult = ReturnType<typeof useGetReportQuery>;
export type GetReportLazyQueryHookResult = ReturnType<
  typeof useGetReportLazyQuery
>;
export type GetReportQueryResult = Apollo.QueryResult<
  GetReportQuery,
  GetReportQueryVariables
>;
export const GetSalesDocument = gql`
  query GetSales {
    getSales {
      _id
      name
      reporter {
        name
      }
      createdAt
      goods {
        type
        _id
        name
        price
        amount
      }
    }
  }
`;

/**
 * __useGetSalesQuery__
 *
 * To run a query within a React component, call `useGetSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSalesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSalesQuery, GetSalesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSalesQuery, GetSalesQueryVariables>(
    GetSalesDocument,
    options
  );
}
export function useGetSalesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSalesQuery,
    GetSalesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSalesQuery, GetSalesQueryVariables>(
    GetSalesDocument,
    options
  );
}
export type GetSalesQueryHookResult = ReturnType<typeof useGetSalesQuery>;
export type GetSalesLazyQueryHookResult = ReturnType<
  typeof useGetSalesLazyQuery
>;
export type GetSalesQueryResult = Apollo.QueryResult<
  GetSalesQuery,
  GetSalesQueryVariables
>;
export const GetStockDocument = gql`
  query GetStock {
    getStock {
      _id
      name
      reporter {
        name
      }
      createdAt
      goods {
        _id
        type
        name
        price
        amount
      }
    }
  }
`;

/**
 * __useGetStockQuery__
 *
 * To run a query within a React component, call `useGetStockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStockQuery(
  baseOptions?: Apollo.QueryHookOptions<GetStockQuery, GetStockQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStockQuery, GetStockQueryVariables>(
    GetStockDocument,
    options
  );
}
export function useGetStockLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStockQuery,
    GetStockQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStockQuery, GetStockQueryVariables>(
    GetStockDocument,
    options
  );
}
export type GetStockQueryHookResult = ReturnType<typeof useGetStockQuery>;
export type GetStockLazyQueryHookResult = ReturnType<
  typeof useGetStockLazyQuery
>;
export type GetStockQueryResult = Apollo.QueryResult<
  GetStockQuery,
  GetStockQueryVariables
>;
export const GetInventoryDocument = gql`
  query GetInventory {
    getInventory {
      _id
      createdAt
      type
      name
      price
      amount
    }
  }
`;

/**
 * __useGetInventoryQuery__
 *
 * To run a query within a React component, call `useGetInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInventoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInventoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInventoryQuery,
    GetInventoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInventoryQuery, GetInventoryQueryVariables>(
    GetInventoryDocument,
    options
  );
}
export function useGetInventoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInventoryQuery,
    GetInventoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInventoryQuery, GetInventoryQueryVariables>(
    GetInventoryDocument,
    options
  );
}
export type GetInventoryQueryHookResult = ReturnType<
  typeof useGetInventoryQuery
>;
export type GetInventoryLazyQueryHookResult = ReturnType<
  typeof useGetInventoryLazyQuery
>;
export type GetInventoryQueryResult = Apollo.QueryResult<
  GetInventoryQuery,
  GetInventoryQueryVariables
>;

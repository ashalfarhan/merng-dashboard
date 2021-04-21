import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type CreateInput = {
  stuff: Scalars['String'];
  price: Scalars['Int'];
};


export type EditInput = {
  stuff?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  user: User;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  loginWithUsername?: Maybe<LoginPayload>;
  loginWithEmail?: Maybe<LoginPayload>;
  createReport: Report;
  deleteReport?: Maybe<Report>;
  editReport: Report;
};


export type MutationRegisterArgs = {
  isAdmin?: Maybe<Scalars['Boolean']>;
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationLoginWithUsernameArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginWithEmailArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateReportArgs = {
  createdAt?: Maybe<Scalars['DateTime']>;
  reporterId?: Maybe<Scalars['String']>;
  data: CreateInput;
  name: Scalars['String'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['String'];
};


export type MutationEditReportArgs = {
  data: EditInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getAllReports?: Maybe<Array<Report>>;
  getReport: Report;
  hello: Scalars['String'];
};


export type QueryGetReportArgs = {
  id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  detail: ReportData;
  name: Scalars['String'];
  reporterId?: Maybe<Scalars['ID']>;
  reporter?: Maybe<User>;
};

export type ReportData = {
  __typename?: 'ReportData';
  stuff: Scalars['String'];
  price: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginWithEmailMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginWithEmailMutation = (
  { __typename?: 'Mutation' }
  & { loginWithEmail?: Maybe<(
    { __typename?: 'LoginPayload' }
    & Pick<LoginPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'username'>
    ) }
  )> }
);

export type LoginWithUsernameMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginWithUsernameMutation = (
  { __typename?: 'Mutation' }
  & { loginWithUsername?: Maybe<(
    { __typename?: 'LoginPayload' }
    & Pick<LoginPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'username'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'name' | '_id'>
  )> }
);


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
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginWithEmailDocument = gql`
    mutation LoginWithEmail($email: String!, $password: String!) {
  loginWithEmail(email: $email, password: $password) {
    user {
      email
      username
    }
    token
  }
}
    `;
export type LoginWithEmailMutationFn = Apollo.MutationFunction<LoginWithEmailMutation, LoginWithEmailMutationVariables>;

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
export function useLoginWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>(LoginWithEmailDocument, options);
      }
export type LoginWithEmailMutationHookResult = ReturnType<typeof useLoginWithEmailMutation>;
export type LoginWithEmailMutationResult = Apollo.MutationResult<LoginWithEmailMutation>;
export type LoginWithEmailMutationOptions = Apollo.BaseMutationOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>;
export const LoginWithUsernameDocument = gql`
    mutation LoginWithUsername($username: String!, $password: String!) {
  loginWithUsername(username: $username, password: $password) {
    user {
      email
      username
    }
    token
  }
}
    `;
export type LoginWithUsernameMutationFn = Apollo.MutationFunction<LoginWithUsernameMutation, LoginWithUsernameMutationVariables>;

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
export function useLoginWithUsernameMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithUsernameMutation, LoginWithUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithUsernameMutation, LoginWithUsernameMutationVariables>(LoginWithUsernameDocument, options);
      }
export type LoginWithUsernameMutationHookResult = ReturnType<typeof useLoginWithUsernameMutation>;
export type LoginWithUsernameMutationResult = Apollo.MutationResult<LoginWithUsernameMutation>;
export type LoginWithUsernameMutationOptions = Apollo.BaseMutationOptions<LoginWithUsernameMutation, LoginWithUsernameMutationVariables>;
export const MeDocument = gql`
    query ME {
  me {
    username
    name
    _id
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
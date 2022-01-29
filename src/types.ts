export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthValidationError = ClientError & Error & {
  __typename?: 'AuthValidationError';
  field: Scalars['String'];
  message: Scalars['String'];
  type: Scalars['String'];
};

export type ClientError = {
  message: Scalars['String'];
  type: Scalars['String'];
};

export type DateFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
};

export type Error = {
  message: Scalars['String'];
  type: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user?: Maybe<User>;
};

export type IdFilter = {
  eq?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  reportCreate: ReportCreateResponse;
  reportDelete: ReportDeleteResponse;
  reportGeneratePdf: ReportGeneratePdfResponse;
  reportUpdate: ReportUpdateResponse;
  signIn: SignInResponse;
  userCreate: UserCreateResponse;
  userDelete: UserDeleteResponse;
  userUpdate: UserUpdateResponse;
  vehicleCreate: VehicleCreateResponse;
  vehicleDelete: VehicleDeleteResponse;
  vehicleUpdate: VehicleUpdateResponse;
};


export type MutationReportCreateArgs = {
  input: ReportCreateInput;
};


export type MutationReportDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationReportGeneratePdfArgs = {
  filter?: Maybe<ReportFilter>;
  sort?: Maybe<Array<ReportSort>>;
};


export type MutationReportUpdateArgs = {
  id: Scalars['Int'];
  input: ReportUpdateInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationUserUpdateArgs = {
  id: Scalars['Int'];
  input: UserUpdateInput;
};


export type MutationVehicleCreateArgs = {
  input: VehicleCreateInput;
};


export type MutationVehicleDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationVehicleUpdateArgs = {
  id: Scalars['Int'];
  input: VehicleUpdateInput;
};

export type NotAllowedError = {
  message: Scalars['String'];
  type: Scalars['String'];
};

export type NotFoundError = {
  message: Scalars['String'];
  type: Scalars['String'];
};

export type NumberFilter = {
  eq?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  file?: Maybe<File>;
  report?: Maybe<Report>;
  reportPaginate: ReportPaginateResponse;
  user?: Maybe<User>;
  userPaginate: UserPaginateResponse;
  vehicle?: Maybe<Vehicle>;
  vehiclePaginate: VehiclePaginateResponse;
};


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryReportArgs = {
  id: Scalars['Int'];
};


export type QueryReportPaginateArgs = {
  filter?: Maybe<ReportFilter>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<ReportSort>>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserPaginateArgs = {
  filter?: Maybe<UserFilter>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<UserSort>>;
};


export type QueryVehicleArgs = {
  id: Scalars['Int'];
};


export type QueryVehiclePaginateArgs = {
  filter?: Maybe<VehicleFilter>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<VehicleSort>>;
};

export type Report = {
  __typename?: 'Report';
  client?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  expressLaboratoryResult?: Maybe<File>;
  id: Scalars['Float'];
  laboratoryResult?: Maybe<File>;
  lubricant: Scalars['String'];
  lubricantMileage: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  totalMileage: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  vehicle?: Maybe<Vehicle>;
};

export type ReportCreateError = ReportCreateNotAllowedError;

export type ReportCreateInput = {
  client?: Maybe<Scalars['Int']>;
  expressLaboratoryResult?: Maybe<Scalars['Int']>;
  laboratoryResult?: Maybe<Scalars['Int']>;
  lubricant: Scalars['String'];
  lubricantMileage: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  totalMileage: Scalars['String'];
  vehicle?: Maybe<Scalars['Int']>;
};

export type ReportCreateNotAllowedError = Error & NotAllowedError & {
  __typename?: 'ReportCreateNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type ReportCreateResponse = {
  __typename?: 'ReportCreateResponse';
  error?: Maybe<ReportCreateError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type ReportDeleteError = ReportDeleteNotAllowedError | ReportNotFoundError;

export type ReportDeleteNotAllowedError = Error & NotAllowedError & {
  __typename?: 'ReportDeleteNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type ReportDeleteResponse = {
  __typename?: 'ReportDeleteResponse';
  error?: Maybe<ReportDeleteError>;
  success: Scalars['Boolean'];
};

export type ReportFilter = {
  clientName?: Maybe<StringFilter>;
  id?: Maybe<NumberFilter>;
  lubricant?: Maybe<StringFilter>;
  lubricantMileage?: Maybe<StringFilter>;
  sampledAt?: Maybe<DateFilter>;
  samplingNodes?: Maybe<StringFilter>;
  totalMileage?: Maybe<StringFilter>;
  vehicleEngineModel?: Maybe<StringFilter>;
  vehicleModel?: Maybe<StringFilter>;
  vehicleReleaseYear?: Maybe<StringFilter>;
  vehicleStateNumber?: Maybe<StringFilter>;
};

export type ReportGeneratePdfError = ReportGeneratePdfNotAllowedError;

export type ReportGeneratePdfNotAllowedError = Error & NotAllowedError & {
  __typename?: 'ReportGeneratePdfNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type ReportGeneratePdfResponse = {
  __typename?: 'ReportGeneratePdfResponse';
  error?: Maybe<ReportGeneratePdfError>;
  record?: Maybe<File>;
  success: Scalars['Boolean'];
};

export type ReportNotFoundError = Error & NotFoundError & {
  __typename?: 'ReportNotFoundError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type ReportPaginateResponse = {
  __typename?: 'ReportPaginateResponse';
  items: Array<Report>;
  pageInfo: PageInfo;
};

export enum ReportSort {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LubricantAsc = 'LUBRICANT_ASC',
  LubricantDesc = 'LUBRICANT_DESC',
  LubricantMileageAsc = 'LUBRICANT_MILEAGE_ASC',
  LubricantMileageDesc = 'LUBRICANT_MILEAGE_DESC',
  SampledAtAsc = 'SAMPLED_AT_ASC',
  SampledAtDesc = 'SAMPLED_AT_DESC',
  SamplingNodesAsc = 'SAMPLING_NODES_ASC',
  SamplingNodesDesc = 'SAMPLING_NODES_DESC',
  StateNumberAsc = 'STATE_NUMBER_ASC',
  StateNumberDesc = 'STATE_NUMBER_DESC',
  TotalMileageAsc = 'TOTAL_MILEAGE_ASC',
  TotalMileageDesc = 'TOTAL_MILEAGE_DESC'
}

export type ReportUpdateError = ReportNotFoundError | ReportUpdateNotAllowedError;

export type ReportUpdateInput = {
  client?: Maybe<Scalars['Int']>;
  expressLaboratoryResult?: Maybe<Scalars['Int']>;
  laboratoryResult?: Maybe<Scalars['Int']>;
  lubricant?: Maybe<Scalars['String']>;
  lubricantMileage?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  sampledAt?: Maybe<Scalars['DateTime']>;
  samplingNodes?: Maybe<Scalars['String']>;
  totalMileage?: Maybe<Scalars['String']>;
  vehicle?: Maybe<Scalars['Int']>;
};

export type ReportUpdateNotAllowedError = Error & NotAllowedError & {
  __typename?: 'ReportUpdateNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type ReportUpdateResponse = {
  __typename?: 'ReportUpdateResponse';
  error?: Maybe<ReportUpdateError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type SignInError = AuthValidationError;

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  error?: Maybe<SignInError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  files: Array<Maybe<File>>;
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lastActivityAt: Scalars['DateTime'];
  name: Scalars['String'];
  password: Scalars['String'];
  reports: Array<Report>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  vehicles: Array<Vehicle>;
};

export type UserCreateError = UserCreateNotAllowedError;

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserCreateNotAllowedError = Error & NotAllowedError & {
  __typename?: 'UserCreateNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  error?: Maybe<UserCreateError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type UserDeleteError = UserDeleteNotAllowedError | UserNotFoundError;

export type UserDeleteNotAllowedError = Error & NotAllowedError & {
  __typename?: 'UserDeleteNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  error?: Maybe<UserDeleteError>;
  success: Scalars['Boolean'];
};

export type UserFilter = {
  email?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
};

export type UserNotFoundError = Error & NotFoundError & {
  __typename?: 'UserNotFoundError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type UserPaginateResponse = {
  __typename?: 'UserPaginateResponse';
  items: Array<User>;
  pageInfo: PageInfo;
};

export enum UserRole {
  Administrator = 'Administrator',
  Member = 'Member'
}

export enum UserSort {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type UserUpdateError = UserNotFoundError | UserUpdateNotAllowedError;

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateNotAllowedError = Error & NotAllowedError & {
  __typename?: 'UserUpdateNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  error?: Maybe<UserUpdateError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt: Scalars['DateTime'];
  engineModel: Scalars['String'];
  id: Scalars['Float'];
  model: Scalars['String'];
  owner: User;
  releaseYear: Scalars['String'];
  reports: Array<Report>;
  stateNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type VehicleCreateError = VehicleCreateNotAllowedError;

export type VehicleCreateInput = {
  engineModel: Scalars['String'];
  model: Scalars['String'];
  owner: Scalars['Float'];
  releaseYear: Scalars['String'];
  stateNumber: Scalars['String'];
};

export type VehicleCreateNotAllowedError = Error & NotAllowedError & {
  __typename?: 'VehicleCreateNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type VehicleCreateResponse = {
  __typename?: 'VehicleCreateResponse';
  error?: Maybe<VehicleCreateError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean'];
};

export type VehicleDeleteError = VehicleDeleteNotAllowedError | VehicleNotFoundError;

export type VehicleDeleteNotAllowedError = Error & NotAllowedError & {
  __typename?: 'VehicleDeleteNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type VehicleDeleteResponse = {
  __typename?: 'VehicleDeleteResponse';
  error?: Maybe<VehicleDeleteError>;
  success: Scalars['Boolean'];
};

export type VehicleFilter = {
  engineModel?: Maybe<StringFilter>;
  model?: Maybe<StringFilter>;
  ownerId?: Maybe<IdFilter>;
  ownerName?: Maybe<StringFilter>;
  releaseYear?: Maybe<StringFilter>;
  stateNumber?: Maybe<StringFilter>;
};

export type VehicleNotFoundError = Error & NotFoundError & {
  __typename?: 'VehicleNotFoundError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type VehiclePaginateResponse = {
  __typename?: 'VehiclePaginateResponse';
  items: Array<Vehicle>;
  pageInfo: PageInfo;
};

export enum VehicleSort {
  EngineModelAsc = 'ENGINE_MODEL_ASC',
  EngineModelDesc = 'ENGINE_MODEL_DESC',
  GeneralOperatingTimeAsc = 'GENERAL_OPERATING_TIME_ASC',
  GeneralOperatingTimeDesc = 'GENERAL_OPERATING_TIME_DESC',
  ModelAsc = 'MODEL_ASC',
  ModelDesc = 'MODEL_DESC',
  ReleaseYearAsc = 'RELEASE_YEAR_ASC',
  ReleaseYearDesc = 'RELEASE_YEAR_DESC',
  StateNumberAsc = 'STATE_NUMBER_ASC',
  StateNumberDesc = 'STATE_NUMBER_DESC'
}

export type VehicleUpdateError = VehicleNotFoundError | VehicleUpdateNotAllowedError;

export type VehicleUpdateInput = {
  engineModel?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['Float']>;
  releaseYear?: Maybe<Scalars['String']>;
  stateNumber?: Maybe<Scalars['String']>;
};

export type VehicleUpdateNotAllowedError = Error & NotAllowedError & {
  __typename?: 'VehicleUpdateNotAllowedError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type VehicleUpdateResponse = {
  __typename?: 'VehicleUpdateResponse';
  error?: Maybe<VehicleUpdateError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean'];
};

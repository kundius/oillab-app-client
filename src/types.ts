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

export type DefaultError = {
  message: Scalars['String'];
};

export type DefaultMutationResponse = {
  __typename?: 'DefaultMutationResponse';
  error?: Maybe<DefaultError>;
  success: Scalars['Boolean'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  reportCreate: ReportCreateResponse;
  reportDelete: DefaultMutationResponse;
  reportUpdate: ReportUpdateResponse;
  userCreate: UserCreateResponse;
  userDelete: DefaultMutationResponse;
  userUpdate: UserUpdateResponse;
  vehicleCreate: VehicleCreateResponse;
  vehicleDelete: DefaultMutationResponse;
  vehicleUpdate: VehicleUpdateResponse;
};


export type MutationReportCreateArgs = {
  input: ReportCreateInput;
};


export type MutationReportDeleteArgs = {
  id: Scalars['String'];
};


export type MutationReportUpdateArgs = {
  id: Scalars['String'];
  input: ReportUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['String'];
};


export type MutationUserUpdateArgs = {
  id: Scalars['String'];
  input: UserUpdateInput;
};


export type MutationVehicleCreateArgs = {
  input: VehicleCreateInput;
};


export type MutationVehicleDeleteArgs = {
  id: Scalars['String'];
};


export type MutationVehicleUpdateArgs = {
  id: Scalars['String'];
  input: VehicleUpdateInput;
};

export type NotFoundError = DefaultError & {
  __typename?: 'NotFoundError';
  message: Scalars['String'];
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
  report?: Maybe<Report>;
  reportPaginate: ReportPaginateResponse;
  user?: Maybe<User>;
  userPaginate: UserPaginateResponse;
  vehicle?: Maybe<Vehicle>;
  vehiclePaginate: VehiclePaginateResponse;
};


export type QueryReportArgs = {
  id: Scalars['String'];
};


export type QueryReportPaginateArgs = {
  filter?: Maybe<ReportFilter>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<ReportSort>>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserPaginateArgs = {
  filter?: Maybe<UserFilter>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<UserSort>>;
};


export type QueryVehicleArgs = {
  id: Scalars['String'];
};


export type QueryVehiclePaginateArgs = {
  filter?: Maybe<VehicleFilter>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<VehicleSort>>;
};

export type Report = {
  __typename?: 'Report';
  client: User;
  createdAt: Scalars['DateTime'];
  expressLaboratoryResult?: Maybe<File>;
  id: Scalars['String'];
  laboratoryResult?: Maybe<File>;
  lubricant: Scalars['String'];
  lubricantMileage: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  stateNumber: Scalars['String'];
  totalMileage: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  vehicle: Vehicle;
};

export type ReportCreateInput = {
  client: Scalars['String'];
  lubricant: Scalars['String'];
  lubricantMileage: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  stateNumber: Scalars['String'];
  totalMileage: Scalars['String'];
  vehicle: Scalars['String'];
};

export type ReportCreateResponse = {
  __typename?: 'ReportCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type ReportFilter = {
  lubricant?: Maybe<StringFilter>;
  lubricantMileage?: Maybe<StringFilter>;
  sampledAt?: Maybe<StringFilter>;
  samplingNodes?: Maybe<StringFilter>;
  stateNumber?: Maybe<StringFilter>;
  totalMileage?: Maybe<StringFilter>;
};

export type ReportPaginateResponse = {
  __typename?: 'ReportPaginateResponse';
  items: Array<Report>;
  pageInfo: PageInfo;
};

export enum ReportSort {
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

export type ReportUpdateInput = {
  client?: Maybe<Scalars['String']>;
  lubricant?: Maybe<Scalars['String']>;
  lubricantMileage?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  sampledAt?: Maybe<Scalars['DateTime']>;
  samplingNodes?: Maybe<Scalars['String']>;
  stateNumber?: Maybe<Scalars['String']>;
  totalMileage?: Maybe<Scalars['String']>;
  vehicle?: Maybe<Scalars['String']>;
};

export type ReportUpdateResponse = {
  __typename?: 'ReportUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
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
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastActivityAt: Scalars['DateTime'];
  name: Scalars['String'];
  password: Scalars['String'];
  reports: Array<Report>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  vehicles: Array<Vehicle>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type UserFilter = {
  email?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
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

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt: Scalars['DateTime'];
  engineModel: Scalars['String'];
  generalOperatingTime: Scalars['String'];
  id: Scalars['String'];
  model: Scalars['String'];
  owner: User;
  releaseYear: Scalars['String'];
  reports: Array<Report>;
  stateNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type VehicleCreateInput = {
  engineModel: Scalars['String'];
  generalOperatingTime: Scalars['String'];
  model: Scalars['String'];
  owner: Scalars['String'];
  releaseYear: Scalars['String'];
  stateNumber: Scalars['String'];
};

export type VehicleCreateResponse = {
  __typename?: 'VehicleCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean'];
};

export type VehicleFilter = {
  engineModel?: Maybe<StringFilter>;
  generalOperatingTime?: Maybe<StringFilter>;
  model?: Maybe<StringFilter>;
  releaseYear?: Maybe<StringFilter>;
  stateNumber?: Maybe<StringFilter>;
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

export type VehicleUpdateInput = {
  engineModel?: Maybe<Scalars['String']>;
  generalOperatingTime?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  releaseYear?: Maybe<Scalars['String']>;
  stateNumber?: Maybe<Scalars['String']>;
};

export type VehicleUpdateResponse = {
  __typename?: 'VehicleUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean'];
};

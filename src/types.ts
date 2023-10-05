export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type AuthenticationError = DefaultError & {
  __typename?: 'AuthenticationError';
  message: Scalars['String'];
};

export type DateFilterOperator = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
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
  id: Scalars['Float'];
  name: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user?: Maybe<User>;
};

export type IdFilterOperator = {
  eq?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
};

export type Lubricant = {
  __typename?: 'Lubricant';
  brand: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  model: Scalars['String'];
  productType?: Maybe<ProductType>;
  reports: Array<Maybe<Report>>;
  updatedAt: Scalars['DateTime'];
  viscosity?: Maybe<Scalars['String']>;
};

export type LubricantCreateInput = {
  brand: Scalars['String'];
  model: Scalars['String'];
  productType?: InputMaybe<Scalars['String']>;
  viscosity?: InputMaybe<Scalars['String']>;
};

export type LubricantCreateResponse = {
  __typename?: 'LubricantCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Lubricant>;
  success: Scalars['Boolean'];
};

export type LubricantFilter = {
  brand?: InputMaybe<StringFilterOperator>;
  model?: InputMaybe<StringFilterOperator>;
  viscosity?: InputMaybe<StringFilterOperator>;
};

export type LubricantPaginateResponse = {
  __typename?: 'LubricantPaginateResponse';
  items: Array<Lubricant>;
  pageInfo: PageInfo;
};

export enum LubricantSort {
  BrandAsc = 'BRAND_ASC',
  BrandDesc = 'BRAND_DESC',
  ModelAsc = 'MODEL_ASC',
  ModelDesc = 'MODEL_DESC',
  ViscosityAsc = 'VISCOSITY_ASC',
  ViscosityDesc = 'VISCOSITY_DESC'
}

export type LubricantUpdateInput = {
  brand?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  productType?: InputMaybe<Scalars['String']>;
  viscosity?: InputMaybe<Scalars['String']>;
};

export type LubricantUpdateResponse = {
  __typename?: 'LubricantUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Lubricant>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  lubricantCreate: LubricantCreateResponse;
  lubricantDelete: DefaultMutationResponse;
  lubricantUpdate: LubricantUpdateResponse;
  oilTypeIndicatorCreate: OilTypeIndicatorCreateResponse;
  oilTypeIndicatorDelete: DefaultMutationResponse;
  oilTypeIndicatorUpdate: OilTypeIndicatorUpdateResponse;
  oilTypeResearchCreate: OilTypeResearchCreateResponse;
  oilTypeResearchDelete: DefaultMutationResponse;
  oilTypeResearchUpdate: OilTypeResearchUpdateResponse;
  oiltypeCreate: OilTypeCreateResponse;
  oiltypeDelete: DefaultMutationResponse;
  oiltypeUpdate: OilTypeUpdateResponse;
  reportCreate: ReportCreateResponse;
  reportDelete: DefaultMutationResponse;
  reportGeneratePdf: ReportGeneratePdfResponse;
  reportUpdate: ReportUpdateResponse;
  resultCreate: ResultCreateResponse;
  resultDelete: DefaultMutationResponse;
  resultUpdate: ResultUpdateResponse;
  signIn: SignInResponse;
  userCreate: UserCreateResponse;
  userDelete: DefaultMutationResponse;
  userUpdate: UserUpdateResponse;
  vehicleCreate: VehicleCreateResponse;
  vehicleDelete: DefaultMutationResponse;
  vehicleUpdate: VehicleUpdateResponse;
};


export type MutationLubricantCreateArgs = {
  input: LubricantCreateInput;
};


export type MutationLubricantDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationLubricantUpdateArgs = {
  id: Scalars['Int'];
  input: LubricantUpdateInput;
};


export type MutationOilTypeIndicatorCreateArgs = {
  input: OilTypeIndicatorCreateInput;
  oilTypeId: Scalars['Int'];
};


export type MutationOilTypeIndicatorDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationOilTypeIndicatorUpdateArgs = {
  id: Scalars['Int'];
  input: OilTypeIndicatorUpdateInput;
};


export type MutationOilTypeResearchCreateArgs = {
  input: OilTypeResearchCreateInput;
  oilTypeId: Scalars['Int'];
};


export type MutationOilTypeResearchDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationOilTypeResearchUpdateArgs = {
  id: Scalars['Int'];
  input: OilTypeResearchUpdateInput;
};


export type MutationOiltypeCreateArgs = {
  input: OilTypeCreateInput;
};


export type MutationOiltypeDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationOiltypeUpdateArgs = {
  id: Scalars['Int'];
  input: OilTypeUpdateInput;
};


export type MutationReportCreateArgs = {
  input: ReportCreateInput;
};


export type MutationReportDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationReportGeneratePdfArgs = {
  filter?: InputMaybe<ReportFilter>;
  sort?: InputMaybe<Array<ReportSort>>;
};


export type MutationReportUpdateArgs = {
  id: Scalars['Int'];
  input: ReportUpdateInput;
};


export type MutationResultCreateArgs = {
  input: ResultCreateInput;
};


export type MutationResultDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationResultUpdateArgs = {
  id: Scalars['Int'];
  input: ResultUpdateInput;
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

export type NotAllowedError = DefaultError & {
  __typename?: 'NotAllowedError';
  message: Scalars['String'];
};

export type NotFoundError = DefaultError & {
  __typename?: 'NotFoundError';
  message: Scalars['String'];
};

export type NumberFilterOperator = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
};

export type OilType = {
  __typename?: 'OilType';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  indicators: Array<Maybe<OilTypeIndicator>>;
  name: Scalars['String'];
  researches: Array<Maybe<OilTypeResearch>>;
  results: Array<Maybe<Result>>;
  standard: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type OilTypeCreateInput = {
  name: Scalars['String'];
  standard: Scalars['Boolean'];
};

export type OilTypeCreateResponse = {
  __typename?: 'OilTypeCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilType>;
  success: Scalars['Boolean'];
};

export type OilTypeFilter = {
  name?: InputMaybe<StringFilterOperator>;
};

export type OilTypeIndicator = {
  __typename?: 'OilTypeIndicator';
  id: Scalars['Float'];
  name: Scalars['String'];
  ntd: Scalars['String'];
  oilType: OilType;
  resultIndicators: Array<ResultIndicator>;
  units: Scalars['String'];
};

export type OilTypeIndicatorCreateInput = {
  name: Scalars['String'];
  ntd: Scalars['String'];
  units: Scalars['String'];
};

export type OilTypeIndicatorCreateResponse = {
  __typename?: 'OilTypeIndicatorCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeIndicator>;
  success: Scalars['Boolean'];
};

export type OilTypeIndicatorListResponse = {
  __typename?: 'OilTypeIndicatorListResponse';
  items: Array<OilTypeIndicator>;
};

export type OilTypeIndicatorUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  ntd?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['String']>;
};

export type OilTypeIndicatorUpdateResponse = {
  __typename?: 'OilTypeIndicatorUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeIndicator>;
  success: Scalars['Boolean'];
};

export type OilTypePaginateResponse = {
  __typename?: 'OilTypePaginateResponse';
  items: Array<OilType>;
  pageInfo: PageInfo;
};

export type OilTypeResearch = {
  __typename?: 'OilTypeResearch';
  id: Scalars['Float'];
  name: Scalars['String'];
  oilType: OilType;
};

export type OilTypeResearchCreateInput = {
  name: Scalars['String'];
};

export type OilTypeResearchCreateResponse = {
  __typename?: 'OilTypeResearchCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeResearch>;
  success: Scalars['Boolean'];
};

export type OilTypeResearchListResponse = {
  __typename?: 'OilTypeResearchListResponse';
  items: Array<OilTypeResearch>;
};

export type OilTypeResearchUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type OilTypeResearchUpdateResponse = {
  __typename?: 'OilTypeResearchUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeResearch>;
  success: Scalars['Boolean'];
};

export enum OilTypeSort {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type OilTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  standard?: InputMaybe<Scalars['Boolean']>;
};

export type OilTypeUpdateResponse = {
  __typename?: 'OilTypeUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilType>;
  success: Scalars['Boolean'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  total: Scalars['Int'];
};

export enum ProductType {
  Coolant = 'Coolant',
  Fuel = 'Fuel',
  Oil = 'Oil'
}

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  file?: Maybe<File>;
  lubricant?: Maybe<Lubricant>;
  lubricantPaginate: LubricantPaginateResponse;
  oilTypeIndicator?: Maybe<OilType>;
  oilTypeIndicatorList: OilTypeIndicatorListResponse;
  oilTypeResearch?: Maybe<OilType>;
  oilTypeResearchList: OilTypeResearchListResponse;
  oiltype?: Maybe<OilType>;
  oiltypePaginate: OilTypePaginateResponse;
  report?: Maybe<Report>;
  reportPaginate: ReportPaginateResponse;
  result?: Maybe<Result>;
  resultPaginate: ResultPaginateResponse;
  user?: Maybe<User>;
  userPaginate: UserPaginateResponse;
  vehicle?: Maybe<Vehicle>;
  vehiclePaginate: VehiclePaginateResponse;
};


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryLubricantArgs = {
  id: Scalars['Int'];
};


export type QueryLubricantPaginateArgs = {
  filter?: InputMaybe<LubricantFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<LubricantSort>>;
};


export type QueryOilTypeIndicatorArgs = {
  id: Scalars['Int'];
};


export type QueryOilTypeIndicatorListArgs = {
  oilTypeId: Scalars['Int'];
};


export type QueryOilTypeResearchArgs = {
  id: Scalars['Int'];
};


export type QueryOilTypeResearchListArgs = {
  oilTypeId: Scalars['Int'];
};


export type QueryOiltypeArgs = {
  id: Scalars['Int'];
};


export type QueryOiltypePaginateArgs = {
  filter?: InputMaybe<OilTypeFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<OilTypeSort>>;
};


export type QueryReportArgs = {
  id: Scalars['Int'];
};


export type QueryReportPaginateArgs = {
  filter?: InputMaybe<ReportFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ReportSort>>;
};


export type QueryResultArgs = {
  id: Scalars['Int'];
};


export type QueryResultPaginateArgs = {
  filter?: InputMaybe<ResultFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ResultSort>>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserPaginateArgs = {
  filter?: InputMaybe<UserFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserSort>>;
};


export type QueryVehicleArgs = {
  id: Scalars['Int'];
};


export type QueryVehiclePaginateArgs = {
  filter?: InputMaybe<VehicleFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<VehicleSort>>;
};

export type Report = {
  __typename?: 'Report';
  client?: Maybe<User>;
  color?: Maybe<ReportColor>;
  createdAt: Scalars['DateTime'];
  expressLaboratoryResult?: Maybe<File>;
  formNumber?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  laboratoryResult?: Maybe<File>;
  lubricantEntity?: Maybe<Lubricant>;
  lubricantMileage: Scalars['String'];
  lubricantState?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  selectionVolume?: Maybe<Scalars['String']>;
  totalMileage: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  vehicle?: Maybe<Vehicle>;
  vehicleToppingUpLubricant?: Maybe<Scalars['String']>;
};

export enum ReportColor {
  LightGreen = 'LightGreen',
  Red = 'Red',
  Yellow = 'Yellow'
}

export type ReportCreateInput = {
  client?: InputMaybe<Scalars['Int']>;
  color?: InputMaybe<Scalars['String']>;
  expressLaboratoryResult?: InputMaybe<Scalars['Int']>;
  formNumber: Scalars['String'];
  laboratoryResult?: InputMaybe<Scalars['Int']>;
  lubricantEntityId?: InputMaybe<Scalars['Int']>;
  lubricantMileage: Scalars['String'];
  lubricantState?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  selectionVolume?: InputMaybe<Scalars['String']>;
  totalMileage: Scalars['String'];
  vehicle?: InputMaybe<Scalars['Int']>;
  vehicleToppingUpLubricant?: InputMaybe<Scalars['String']>;
};

export type ReportCreateResponse = {
  __typename?: 'ReportCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type ReportFilter = {
  client?: InputMaybe<UserFilter>;
  color?: InputMaybe<StringFilterOperator>;
  id?: InputMaybe<NumberFilterOperator>;
  lubricantEntity?: InputMaybe<LubricantFilter>;
  lubricantMileage?: InputMaybe<StringFilterOperator>;
  sampledAt?: InputMaybe<DateFilterOperator>;
  samplingNodes?: InputMaybe<StringFilterOperator>;
  totalMileage?: InputMaybe<StringFilterOperator>;
  vehicle?: InputMaybe<VehicleFilter>;
};

export type ReportGeneratePdfResponse = {
  __typename?: 'ReportGeneratePdfResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<File>;
  success: Scalars['Boolean'];
};

export type ReportPaginateResponse = {
  __typename?: 'ReportPaginateResponse';
  items: Array<Report>;
  pageInfo: PageInfo;
};

export enum ReportSort {
  ColorAsc = 'COLOR_ASC',
  ColorDesc = 'COLOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LubricantMileageAsc = 'LUBRICANT_MILEAGE_ASC',
  LubricantMileageDesc = 'LUBRICANT_MILEAGE_DESC',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
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
  client?: InputMaybe<Scalars['Int']>;
  color?: InputMaybe<Scalars['String']>;
  expressLaboratoryResult?: InputMaybe<Scalars['Int']>;
  formNumber?: InputMaybe<Scalars['String']>;
  laboratoryResult?: InputMaybe<Scalars['Int']>;
  lubricantEntityId?: InputMaybe<Scalars['Int']>;
  lubricantMileage?: InputMaybe<Scalars['String']>;
  lubricantState?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  sampledAt?: InputMaybe<Scalars['DateTime']>;
  samplingNodes?: InputMaybe<Scalars['String']>;
  selectionVolume?: InputMaybe<Scalars['String']>;
  totalMileage?: InputMaybe<Scalars['String']>;
  vehicle?: InputMaybe<Scalars['Int']>;
  vehicleToppingUpLubricant?: InputMaybe<Scalars['String']>;
};

export type ReportUpdateResponse = {
  __typename?: 'ReportUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type Result = {
  __typename?: 'Result';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  indicators: Array<ResultIndicator>;
  number: Scalars['String'];
  oilType: OilType;
  updatedAt: Scalars['DateTime'];
};

export type ResultCreateInput = {
  number: Scalars['String'];
  oilTypeId: Scalars['Float'];
};

export type ResultCreateResponse = {
  __typename?: 'ResultCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Result>;
  success: Scalars['Boolean'];
};

export type ResultFilter = {
  number?: InputMaybe<StringFilterOperator>;
};

export type ResultIndicator = {
  __typename?: 'ResultIndicator';
  id: Scalars['Float'];
  oilTypeIndicator: OilTypeIndicator;
  result: Result;
  value?: Maybe<Scalars['String']>;
};

export type ResultPaginateResponse = {
  __typename?: 'ResultPaginateResponse';
  items: Array<Result>;
  pageInfo: PageInfo;
};

export enum ResultSort {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC'
}

export type ResultUpdateIndicatorValue = {
  oilTypeIndicatorId: Scalars['Float'];
  value: Scalars['String'];
};

export type ResultUpdateInput = {
  values: Array<ResultUpdateIndicatorValue>;
};

export type ResultUpdateResponse = {
  __typename?: 'ResultUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Result>;
  success: Scalars['Boolean'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type StringFilterOperator = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  contactPerson?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  files: Array<Maybe<File>>;
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lastActivityAt: Scalars['DateTime'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  reports: Array<Maybe<Report>>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  vehicles: Array<Maybe<Vehicle>>;
};

export type UserCreateInput = {
  contactPerson?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type UserFilter = {
  contactPerson?: InputMaybe<StringFilterOperator>;
  email?: InputMaybe<StringFilterOperator>;
  name?: InputMaybe<StringFilterOperator>;
  phone?: InputMaybe<StringFilterOperator>;
};

export type UserPaginateResponse = {
  __typename?: 'UserPaginateResponse';
  items: Array<User>;
  pageInfo: PageInfo;
};

export enum UserRole {
  Administrator = 'Administrator',
  Manager = 'Manager',
  Member = 'Member'
}

export enum UserSort {
  ContactPersonAsc = 'CONTACT_PERSON_ASC',
  ContactPersonDesc = 'CONTACT_PERSON_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PhoneAsc = 'PHONE_ASC',
  PhoneDesc = 'PHONE_DESC'
}

export type UserUpdateInput = {
  contactPerson?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type ValidationError = DefaultError & {
  __typename?: 'ValidationError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt: Scalars['DateTime'];
  engineModel: Scalars['String'];
  id: Scalars['Float'];
  liquidVolume?: Maybe<Scalars['String']>;
  model: Scalars['String'];
  owner: User;
  releaseYear: Scalars['String'];
  reports: Array<Report>;
  stateNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type VehicleCreateInput = {
  engineModel: Scalars['String'];
  liquidVolume?: InputMaybe<Scalars['String']>;
  model: Scalars['String'];
  owner: Scalars['Float'];
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
  engineModel?: InputMaybe<StringFilterOperator>;
  liquidVolume?: InputMaybe<StringFilterOperator>;
  model?: InputMaybe<StringFilterOperator>;
  owner?: InputMaybe<UserFilter>;
  ownerId?: InputMaybe<IdFilterOperator>;
  releaseYear?: InputMaybe<StringFilterOperator>;
  stateNumber?: InputMaybe<StringFilterOperator>;
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
  LiquidVolumeAsc = 'LIQUID_VOLUME_ASC',
  LiquidVolumeDesc = 'LIQUID_VOLUME_DESC',
  ModelAsc = 'MODEL_ASC',
  ModelDesc = 'MODEL_DESC',
  ReleaseYearAsc = 'RELEASE_YEAR_ASC',
  ReleaseYearDesc = 'RELEASE_YEAR_DESC',
  StateNumberAsc = 'STATE_NUMBER_ASC',
  StateNumberDesc = 'STATE_NUMBER_DESC'
}

export type VehicleUpdateInput = {
  engineModel?: InputMaybe<Scalars['String']>;
  liquidVolume?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['Float']>;
  releaseYear?: InputMaybe<Scalars['String']>;
  stateNumber?: InputMaybe<Scalars['String']>;
};

export type VehicleUpdateResponse = {
  __typename?: 'VehicleUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean'];
};

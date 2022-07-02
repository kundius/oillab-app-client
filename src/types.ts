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

export type DateFilter = {
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

export type IdFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
};

export type Lubricant = {
  __typename?: 'Lubricant';
  brand: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  model: Scalars['String'];
  reportApplicationForms?: Maybe<ReportApplicationForm>;
  updatedAt: Scalars['DateTime'];
  viscosity: Scalars['String'];
};

export type LubricantCreateInput = {
  brand: Scalars['String'];
  model: Scalars['String'];
  viscosity: Scalars['String'];
};

export type LubricantCreateResponse = {
  __typename?: 'LubricantCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Lubricant>;
  success: Scalars['Boolean'];
};

export type LubricantFilter = {
  brand?: InputMaybe<StringFilter>;
  model?: InputMaybe<StringFilter>;
  viscosity?: InputMaybe<StringFilter>;
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
  reportCreate: ReportCreateResponse;
  reportDelete: DefaultMutationResponse;
  reportGeneratePdf: ReportGeneratePdfResponse;
  reportUpdate: ReportUpdateResponse;
  reportUpdateApplicationForm: ReportUpdateApplicationFormResponse;
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


export type MutationReportUpdateApplicationFormArgs = {
  id: Scalars['Int'];
  input: ReportUpdateApplicationFormInput;
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

export type NumberFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
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


export type QueryLubricantArgs = {
  id: Scalars['Int'];
};


export type QueryLubricantPaginateArgs = {
  filter?: InputMaybe<LubricantFilter>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<LubricantSort>>;
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
  applicationForm?: Maybe<ReportApplicationForm>;
  client?: Maybe<User>;
  color?: Maybe<ReportColor>;
  createdAt: Scalars['DateTime'];
  expressLaboratoryResult?: Maybe<File>;
  id: Scalars['Float'];
  laboratoryResult?: Maybe<File>;
  lubricant: Scalars['String'];
  lubricantMileage: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  totalMileage: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  vehicle?: Maybe<Vehicle>;
};

export type ReportApplicationForm = {
  __typename?: 'ReportApplicationForm';
  createdAt: Scalars['DateTime'];
  customer?: Maybe<User>;
  id: Scalars['Float'];
  lubricant?: Maybe<Lubricant>;
  lubricantState?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  productType?: Maybe<ProductType>;
  report?: Maybe<Report>;
  selectionBrand?: Maybe<Scalars['String']>;
  selectionPlace?: Maybe<Scalars['String']>;
  selectionVolume?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  vehicleEquipmentManufacturer?: Maybe<Scalars['String']>;
  vehicleEquipmentModel?: Maybe<Scalars['String']>;
  vehicleLiquidVolume?: Maybe<Scalars['String']>;
  vehicleRegistrationNumber?: Maybe<Scalars['String']>;
  vehicleSamplingPoint?: Maybe<Scalars['String']>;
  vehicleToppingUpLubricant?: Maybe<Scalars['String']>;
  vehicleTotalOperatingTime?: Maybe<Scalars['String']>;
  vehicleTotalOperatingTimeLubricant?: Maybe<Scalars['String']>;
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
  laboratoryResult?: InputMaybe<Scalars['Int']>;
  lubricant: Scalars['String'];
  lubricantMileage: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  sampledAt: Scalars['DateTime'];
  samplingNodes: Scalars['String'];
  totalMileage: Scalars['String'];
  vehicle?: InputMaybe<Scalars['Int']>;
};

export type ReportCreateResponse = {
  __typename?: 'ReportCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type ReportFilter = {
  clientName?: InputMaybe<StringFilter>;
  color?: InputMaybe<StringFilter>;
  id?: InputMaybe<NumberFilter>;
  lubricant?: InputMaybe<StringFilter>;
  lubricantMileage?: InputMaybe<StringFilter>;
  sampledAt?: InputMaybe<DateFilter>;
  samplingNodes?: InputMaybe<StringFilter>;
  totalMileage?: InputMaybe<StringFilter>;
  vehicleEngineModel?: InputMaybe<StringFilter>;
  vehicleModel?: InputMaybe<StringFilter>;
  vehicleReleaseYear?: InputMaybe<StringFilter>;
  vehicleStateNumber?: InputMaybe<StringFilter>;
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
  LubricantAsc = 'LUBRICANT_ASC',
  LubricantDesc = 'LUBRICANT_DESC',
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

export type ReportUpdateApplicationFormInput = {
  customerId?: InputMaybe<Scalars['Int']>;
  lubricantId?: InputMaybe<Scalars['Int']>;
  lubricantState?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  productType?: InputMaybe<Scalars['String']>;
  selectionBrand?: InputMaybe<Scalars['String']>;
  selectionPlace?: InputMaybe<Scalars['String']>;
  selectionVolume?: InputMaybe<Scalars['String']>;
  vehicleEquipmentManufacturer?: InputMaybe<Scalars['String']>;
  vehicleEquipmentModel?: InputMaybe<Scalars['String']>;
  vehicleLiquidVolume?: InputMaybe<Scalars['String']>;
  vehicleRegistrationNumber?: InputMaybe<Scalars['String']>;
  vehicleSamplingPoint?: InputMaybe<Scalars['String']>;
  vehicleToppingUpLubricant?: InputMaybe<Scalars['String']>;
  vehicleTotalOperatingTime?: InputMaybe<Scalars['String']>;
  vehicleTotalOperatingTimeLubricant?: InputMaybe<Scalars['String']>;
};

export type ReportUpdateApplicationFormResponse = {
  __typename?: 'ReportUpdateApplicationFormResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean'];
};

export type ReportUpdateInput = {
  client?: InputMaybe<Scalars['Int']>;
  color?: InputMaybe<Scalars['String']>;
  expressLaboratoryResult?: InputMaybe<Scalars['Int']>;
  laboratoryResult?: InputMaybe<Scalars['Int']>;
  lubricant?: InputMaybe<Scalars['String']>;
  lubricantMileage?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  sampledAt?: InputMaybe<Scalars['DateTime']>;
  samplingNodes?: InputMaybe<Scalars['String']>;
  totalMileage?: InputMaybe<Scalars['String']>;
  vehicle?: InputMaybe<Scalars['Int']>;
};

export type ReportUpdateResponse = {
  __typename?: 'ReportUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
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

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  files: Array<Maybe<File>>;
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lastActivityAt: Scalars['DateTime'];
  name: Scalars['String'];
  organization?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  reportApplicationForms: Array<Maybe<ReportApplicationForm>>;
  reports: Array<Maybe<Report>>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  vehicles: Array<Maybe<Vehicle>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  organization?: InputMaybe<Scalars['String']>;
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
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  organization?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
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
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  OrganizationAsc = 'ORGANIZATION_ASC',
  OrganizationDesc = 'ORGANIZATION_DESC',
  PhoneAsc = 'PHONE_ASC',
  PhoneDesc = 'PHONE_DESC'
}

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
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
  model: Scalars['String'];
  owner: User;
  releaseYear: Scalars['String'];
  reports: Array<Report>;
  stateNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type VehicleCreateInput = {
  engineModel: Scalars['String'];
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
  engineModel?: InputMaybe<StringFilter>;
  model?: InputMaybe<StringFilter>;
  ownerId?: InputMaybe<IdFilter>;
  ownerName?: InputMaybe<StringFilter>;
  releaseYear?: InputMaybe<StringFilter>;
  stateNumber?: InputMaybe<StringFilter>;
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
  engineModel?: InputMaybe<Scalars['String']>;
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

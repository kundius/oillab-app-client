export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthenticationError = DefaultError & {
  __typename?: 'AuthenticationError';
  message: Scalars['String']['output'];
};

export type Brand = {
  __typename?: 'Brand';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  lubricants: Array<Maybe<Lubricant>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  users: Array<Maybe<User>>;
};

export type BrandCreateInput = {
  name: Scalars['String']['input'];
};

export type BrandCreateResponse = {
  __typename?: 'BrandCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Brand>;
  success: Scalars['Boolean']['output'];
};

export type BrandFilter = {
  name?: InputMaybe<StringFilterOperator>;
};

export type BrandPaginateResponse = {
  __typename?: 'BrandPaginateResponse';
  items: Array<Brand>;
  pageInfo: PageInfo;
};

export enum BrandSort {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type BrandUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BrandUpdateResponse = {
  __typename?: 'BrandUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Brand>;
  success: Scalars['Boolean']['output'];
};

export type DateFilterOperator = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DefaultError = {
  message: Scalars['String']['output'];
};

export type DefaultMutationResponse = {
  __typename?: 'DefaultMutationResponse';
  error?: Maybe<DefaultError>;
  success: Scalars['Boolean']['output'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type IdFilterOperator = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Lubricant = {
  __typename?: 'Lubricant';
  brandEntity?: Maybe<Brand>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  model: Scalars['String']['output'];
  productType?: Maybe<ProductType>;
  reports: Array<Maybe<Report>>;
  updatedAt: Scalars['DateTime']['output'];
  viscosity?: Maybe<Scalars['String']['output']>;
};

export type LubricantCreateInput = {
  brandId: Scalars['Int']['input'];
  model: Scalars['String']['input'];
  productType?: InputMaybe<Scalars['String']['input']>;
  viscosity?: InputMaybe<Scalars['String']['input']>;
};

export type LubricantCreateResponse = {
  __typename?: 'LubricantCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Lubricant>;
  success: Scalars['Boolean']['output'];
};

export type LubricantFilter = {
  brandEntity?: InputMaybe<BrandFilter>;
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
  brandId?: InputMaybe<Scalars['Int']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  viscosity?: InputMaybe<Scalars['String']['input']>;
};

export type LubricantUpdateResponse = {
  __typename?: 'LubricantUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Lubricant>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  brandCreate: BrandCreateResponse;
  brandDelete: DefaultMutationResponse;
  brandUpdate: BrandUpdateResponse;
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
  reportSend: ReportSendResponse;
  reportUpdate: ReportUpdateResponse;
  resultCreate: ResultCreateResponse;
  resultDelete: DefaultMutationResponse;
  resultUpdate: ResultUpdateResponse;
  signIn: SignInResponse;
  userAddBrand: UserAddBrandResponse;
  userCreate: UserCreateResponse;
  userDelete: DefaultMutationResponse;
  userRemoveBrand: UserRemoveBrandResponse;
  userUpdate: UserUpdateResponse;
  vehicleCreate: VehicleCreateResponse;
  vehicleDelete: DefaultMutationResponse;
  vehicleUpdate: VehicleUpdateResponse;
};


export type MutationBrandCreateArgs = {
  input: BrandCreateInput;
};


export type MutationBrandDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationBrandUpdateArgs = {
  id: Scalars['Int']['input'];
  input: BrandUpdateInput;
};


export type MutationLubricantCreateArgs = {
  input: LubricantCreateInput;
};


export type MutationLubricantDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLubricantUpdateArgs = {
  id: Scalars['Int']['input'];
  input: LubricantUpdateInput;
};


export type MutationOilTypeIndicatorCreateArgs = {
  input: OilTypeIndicatorCreateInput;
  oilTypeId: Scalars['Int']['input'];
};


export type MutationOilTypeIndicatorDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationOilTypeIndicatorUpdateArgs = {
  id: Scalars['Int']['input'];
  input: OilTypeIndicatorUpdateInput;
};


export type MutationOilTypeResearchCreateArgs = {
  input: OilTypeResearchCreateInput;
  oilTypeId: Scalars['Int']['input'];
};


export type MutationOilTypeResearchDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationOilTypeResearchUpdateArgs = {
  id: Scalars['Int']['input'];
  input: OilTypeResearchUpdateInput;
};


export type MutationOiltypeCreateArgs = {
  input: OilTypeCreateInput;
};


export type MutationOiltypeDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationOiltypeUpdateArgs = {
  id: Scalars['Int']['input'];
  input: OilTypeUpdateInput;
};


export type MutationReportCreateArgs = {
  input: ReportCreateInput;
};


export type MutationReportDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationReportGeneratePdfArgs = {
  filter?: InputMaybe<ReportFilter>;
  sort?: InputMaybe<Array<ReportSort>>;
};


export type MutationReportSendArgs = {
  input: ReportSendInput;
};


export type MutationReportUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ReportUpdateInput;
};


export type MutationResultCreateArgs = {
  input: ResultCreateInput;
};


export type MutationResultDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationResultUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ResultUpdateInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationUserAddBrandArgs = {
  brandId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUserRemoveBrandArgs = {
  brandId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUserUpdateArgs = {
  id: Scalars['Int']['input'];
  input: UserUpdateInput;
};


export type MutationVehicleCreateArgs = {
  input: VehicleCreateInput;
};


export type MutationVehicleDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationVehicleUpdateArgs = {
  id: Scalars['Int']['input'];
  input: VehicleUpdateInput;
};

export type NotAllowedError = DefaultError & {
  __typename?: 'NotAllowedError';
  message: Scalars['String']['output'];
};

export type NotFoundError = DefaultError & {
  __typename?: 'NotFoundError';
  message: Scalars['String']['output'];
};

export type NumberFilterOperator = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
};

export type OilType = {
  __typename?: 'OilType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  indicators: Array<Maybe<OilTypeIndicator>>;
  name: Scalars['String']['output'];
  reports: Array<Maybe<Report>>;
  researches: Array<Maybe<OilTypeResearch>>;
  results: Array<Maybe<Result>>;
  standard: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OilTypeCreateInput = {
  name: Scalars['String']['input'];
  standard: Scalars['Boolean']['input'];
};

export type OilTypeCreateResponse = {
  __typename?: 'OilTypeCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilType>;
  success: Scalars['Boolean']['output'];
};

export type OilTypeFilter = {
  name?: InputMaybe<StringFilterOperator>;
};

export type OilTypeIndicator = {
  __typename?: 'OilTypeIndicator';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  ntd: Scalars['String']['output'];
  oilType: OilType;
  resultIndicators: Array<ResultIndicator>;
  units: Scalars['String']['output'];
};

export type OilTypeIndicatorCreateInput = {
  name: Scalars['String']['input'];
  ntd: Scalars['String']['input'];
  units: Scalars['String']['input'];
};

export type OilTypeIndicatorCreateResponse = {
  __typename?: 'OilTypeIndicatorCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeIndicator>;
  success: Scalars['Boolean']['output'];
};

export type OilTypeIndicatorListResponse = {
  __typename?: 'OilTypeIndicatorListResponse';
  items: Array<OilTypeIndicator>;
};

export type OilTypeIndicatorUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  ntd?: InputMaybe<Scalars['String']['input']>;
  units?: InputMaybe<Scalars['String']['input']>;
};

export type OilTypeIndicatorUpdateResponse = {
  __typename?: 'OilTypeIndicatorUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeIndicator>;
  success: Scalars['Boolean']['output'];
};

export type OilTypePaginateResponse = {
  __typename?: 'OilTypePaginateResponse';
  items: Array<OilType>;
  pageInfo: PageInfo;
};

export type OilTypeResearch = {
  __typename?: 'OilTypeResearch';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  oilType: OilType;
};

export type OilTypeResearchCreateInput = {
  name: Scalars['String']['input'];
};

export type OilTypeResearchCreateResponse = {
  __typename?: 'OilTypeResearchCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeResearch>;
  success: Scalars['Boolean']['output'];
};

export type OilTypeResearchListResponse = {
  __typename?: 'OilTypeResearchListResponse';
  items: Array<OilTypeResearch>;
};

export type OilTypeResearchUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type OilTypeResearchUpdateResponse = {
  __typename?: 'OilTypeResearchUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilTypeResearch>;
  success: Scalars['Boolean']['output'];
};

export enum OilTypeSort {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type OilTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  standard?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OilTypeUpdateResponse = {
  __typename?: 'OilTypeUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<OilType>;
  success: Scalars['Boolean']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ProductType {
  Coolant = 'Coolant',
  Fuel = 'Fuel',
  Oil = 'Oil'
}

export type Query = {
  __typename?: 'Query';
  brand?: Maybe<Brand>;
  brandPaginate: BrandPaginateResponse;
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
  reportByFormNumber?: Maybe<Report>;
  reportPaginate: ReportPaginateResponse;
  result?: Maybe<Result>;
  resultPaginate: ResultPaginateResponse;
  user?: Maybe<User>;
  userPaginate: UserPaginateResponse;
  vehicle?: Maybe<Vehicle>;
  vehiclePaginate: VehiclePaginateResponse;
};


export type QueryBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBrandPaginateArgs = {
  filter?: InputMaybe<BrandFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<BrandSort>>;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLubricantArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLubricantPaginateArgs = {
  filter?: InputMaybe<LubricantFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<LubricantSort>>;
};


export type QueryOilTypeIndicatorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOilTypeIndicatorListArgs = {
  oilTypeId: Scalars['Int']['input'];
};


export type QueryOilTypeResearchArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOilTypeResearchListArgs = {
  oilTypeId: Scalars['Int']['input'];
};


export type QueryOiltypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOiltypePaginateArgs = {
  filter?: InputMaybe<OilTypeFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<OilTypeSort>>;
};


export type QueryReportArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReportByFormNumberArgs = {
  formNumber: Scalars['String']['input'];
};


export type QueryReportPaginateArgs = {
  filter?: InputMaybe<ReportFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<ReportSort>>;
};


export type QueryResultArgs = {
  id: Scalars['Int']['input'];
};


export type QueryResultPaginateArgs = {
  filter?: InputMaybe<ResultFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<ResultSort>>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserPaginateArgs = {
  filter?: InputMaybe<UserFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<UserSort>>;
};


export type QueryVehicleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryVehiclePaginateArgs = {
  filter?: InputMaybe<VehicleFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<VehicleSort>>;
};

export type Report = {
  __typename?: 'Report';
  client?: Maybe<User>;
  color?: Maybe<ReportColor>;
  createdAt: Scalars['DateTime']['output'];
  expressLaboratoryResult?: Maybe<File>;
  formNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  laboratoryResult?: Maybe<File>;
  lubricantEntity?: Maybe<Lubricant>;
  lubricantMileage: Scalars['String']['output'];
  lubricantState?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  oilType?: Maybe<OilType>;
  sampledAt: Scalars['DateTime']['output'];
  samplingNodes: Scalars['String']['output'];
  selectionVolume?: Maybe<Scalars['String']['output']>;
  totalMileage: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vehicle?: Maybe<Vehicle>;
  vehicleToppingUpLubricant?: Maybe<Scalars['String']['output']>;
};

export enum ReportColor {
  LightGreen = 'LightGreen',
  Red = 'Red',
  Yellow = 'Yellow'
}

export type ReportCreateInput = {
  client?: InputMaybe<Scalars['Int']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  expressLaboratoryResult?: InputMaybe<Scalars['Int']['input']>;
  formNumber: Scalars['String']['input'];
  laboratoryResult?: InputMaybe<Scalars['Int']['input']>;
  lubricantEntityId?: InputMaybe<Scalars['Int']['input']>;
  lubricantMileage: Scalars['String']['input'];
  lubricantState?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  oilTypeId?: InputMaybe<Scalars['Int']['input']>;
  sampledAt: Scalars['DateTime']['input'];
  samplingNodes: Scalars['String']['input'];
  selectionVolume?: InputMaybe<Scalars['String']['input']>;
  totalMileage: Scalars['String']['input'];
  vehicle?: InputMaybe<Scalars['Int']['input']>;
  vehicleToppingUpLubricant?: InputMaybe<Scalars['String']['input']>;
};

export type ReportCreateResponse = {
  __typename?: 'ReportCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean']['output'];
};

export type ReportFilter = {
  client?: InputMaybe<UserFilter>;
  color?: InputMaybe<StringFilterOperator>;
  formNumber?: InputMaybe<StringFilterOperator>;
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
  success: Scalars['Boolean']['output'];
};

export type ReportPaginateResponse = {
  __typename?: 'ReportPaginateResponse';
  items: Array<Report>;
  pageInfo: PageInfo;
};

export type ReportSendInput = {
  recipients: Array<ReportSendInputRecipient>;
  reports: Array<ReportSendInputReport>;
};

export type ReportSendInputRecipient = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type ReportSendInputReport = {
  extended: Scalars['Boolean']['input'];
  formNumber?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type ReportSendResponse = {
  __typename?: 'ReportSendResponse';
  error?: Maybe<DefaultError>;
  success: Scalars['Boolean']['output'];
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
  client?: InputMaybe<Scalars['Int']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  expressLaboratoryResult?: InputMaybe<Scalars['Int']['input']>;
  formNumber?: InputMaybe<Scalars['String']['input']>;
  laboratoryResult?: InputMaybe<Scalars['Int']['input']>;
  lubricantEntityId?: InputMaybe<Scalars['Int']['input']>;
  lubricantMileage?: InputMaybe<Scalars['String']['input']>;
  lubricantState?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  oilTypeId?: InputMaybe<Scalars['Int']['input']>;
  sampledAt?: InputMaybe<Scalars['DateTime']['input']>;
  samplingNodes?: InputMaybe<Scalars['String']['input']>;
  selectionVolume?: InputMaybe<Scalars['String']['input']>;
  totalMileage?: InputMaybe<Scalars['String']['input']>;
  vehicle?: InputMaybe<Scalars['Int']['input']>;
  vehicleToppingUpLubricant?: InputMaybe<Scalars['String']['input']>;
};

export type ReportUpdateResponse = {
  __typename?: 'ReportUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Report>;
  success: Scalars['Boolean']['output'];
};

export type Result = {
  __typename?: 'Result';
  createdAt: Scalars['DateTime']['output'];
  formNumber: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  indicators: Array<ResultIndicator>;
  interpretation?: Maybe<Scalars['String']['output']>;
  oilType: OilType;
  researches: Array<ResultResearch>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ResultCreateInput = {
  formNumber: Scalars['String']['input'];
  oilTypeId: Scalars['Float']['input'];
};

export type ResultCreateResponse = {
  __typename?: 'ResultCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Result>;
  success: Scalars['Boolean']['output'];
};

export type ResultFilter = {
  formNumber?: InputMaybe<StringFilterOperator>;
};

export type ResultIndicator = {
  __typename?: 'ResultIndicator';
  color?: Maybe<ResultIndicatorColor>;
  id: Scalars['Float']['output'];
  oilTypeIndicator: OilTypeIndicator;
  result: Result;
  value?: Maybe<Scalars['String']['output']>;
};

export enum ResultIndicatorColor {
  Green = 'Green',
  Red = 'Red',
  White = 'White',
  Yellow = 'Yellow'
}

export type ResultPaginateResponse = {
  __typename?: 'ResultPaginateResponse';
  items: Array<Result>;
  pageInfo: PageInfo;
};

export type ResultResearch = {
  __typename?: 'ResultResearch';
  color?: Maybe<ResultResearchColor>;
  id: Scalars['Float']['output'];
  oilTypeResearch: OilTypeResearch;
  result: Result;
  value?: Maybe<Scalars['String']['output']>;
};

export enum ResultResearchColor {
  Green = 'Green',
  Red = 'Red',
  White = 'White',
  Yellow = 'Yellow'
}

export enum ResultSort {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC'
}

export type ResultUpdateIndicatorValue = {
  color: ResultIndicatorColor;
  oilTypeIndicatorId: Scalars['Float']['input'];
  value: Scalars['String']['input'];
};

export type ResultUpdateInput = {
  interpretation: Scalars['String']['input'];
  researches: Array<ResultUpdateResearchValue>;
  values: Array<ResultUpdateIndicatorValue>;
};

export type ResultUpdateResearchValue = {
  color: ResultResearchColor;
  oilTypeResearchId: Scalars['Float']['input'];
  value: Scalars['String']['input'];
};

export type ResultUpdateResponse = {
  __typename?: 'ResultUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Result>;
  success: Scalars['Boolean']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type StringFilterOperator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  brands: Array<Brand>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  files: Array<Maybe<File>>;
  id: Scalars['Float']['output'];
  isActive: Scalars['Boolean']['output'];
  lastActivityAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  reports: Array<Maybe<Report>>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
  vehicles: Array<Maybe<Vehicle>>;
};

export type UserAddBrandResponse = {
  __typename?: 'UserAddBrandResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean']['output'];
};

export type UserCreateInput = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean']['output'];
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

export type UserRemoveBrandResponse = {
  __typename?: 'UserRemoveBrandResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean']['output'];
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
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<User>;
  success: Scalars['Boolean']['output'];
};

export type ValidationError = DefaultError & {
  __typename?: 'ValidationError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt: Scalars['DateTime']['output'];
  engineModel: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  liquidVolume?: Maybe<Scalars['String']['output']>;
  model: Scalars['String']['output'];
  owner: User;
  releaseYear: Scalars['String']['output'];
  reports: Array<Report>;
  stateNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type VehicleCreateInput = {
  engineModel: Scalars['String']['input'];
  liquidVolume?: InputMaybe<Scalars['String']['input']>;
  model: Scalars['String']['input'];
  owner: Scalars['Float']['input'];
  releaseYear: Scalars['String']['input'];
  stateNumber: Scalars['String']['input'];
};

export type VehicleCreateResponse = {
  __typename?: 'VehicleCreateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean']['output'];
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
  engineModel?: InputMaybe<Scalars['String']['input']>;
  liquidVolume?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['Float']['input']>;
  releaseYear?: InputMaybe<Scalars['String']['input']>;
  stateNumber?: InputMaybe<Scalars['String']['input']>;
};

export type VehicleUpdateResponse = {
  __typename?: 'VehicleUpdateResponse';
  error?: Maybe<DefaultError>;
  record?: Maybe<Vehicle>;
  success: Scalars['Boolean']['output'];
};

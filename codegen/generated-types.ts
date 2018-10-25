/* tslint:disable */

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = any;

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any;

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

export interface AdministratorListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: AdministratorSortParameter | null;
  filter?: AdministratorFilterParameter | null;
}

export interface AdministratorSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  firstName?: SortOrder | null;
  lastName?: SortOrder | null;
  emailAddress?: SortOrder | null;
}

export interface AdministratorFilterParameter {
  firstName?: StringOperators | null;
  lastName?: StringOperators | null;
  emailAddress?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface StringOperators {
  eq?: string | null;
  contains?: string | null;
}

export interface DateOperators {
  eq?: DateTime | null;
  before?: DateTime | null;
  after?: DateTime | null;
  between?: DateRange | null;
}

export interface DateRange {
  start: DateTime;
  end: DateTime;
}

export interface AssetListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: AssetSortParameter | null;
  filter?: AssetFilterParameter | null;
}

export interface AssetSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  name?: SortOrder | null;
  description?: SortOrder | null;
}

export interface AssetFilterParameter {
  name?: StringOperators | null;
  description?: StringOperators | null;
  type?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface CountryListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: CountrySortParameter | null;
  filter?: CountryFilterParameter | null;
}

export interface CountrySortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  code?: SortOrder | null;
  name?: SortOrder | null;
  enabled?: SortOrder | null;
}

export interface CountryFilterParameter {
  code?: StringOperators | null;
  name?: StringOperators | null;
  enabled?: BooleanOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface BooleanOperators {
  eq?: boolean | null;
}

export interface CustomerListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: CustomerSortParameter | null;
  filter?: CustomerFilterParameter | null;
}

export interface CustomerSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  firstName?: SortOrder | null;
  lastName?: SortOrder | null;
  phoneNumber?: SortOrder | null;
  emailAddress?: SortOrder | null;
}

export interface CustomerFilterParameter {
  firstName?: StringOperators | null;
  lastName?: StringOperators | null;
  phoneNumber?: StringOperators | null;
  emailAddress?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface FacetListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: FacetSortParameter | null;
  filter?: FacetFilterParameter | null;
}

export interface FacetSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  name?: SortOrder | null;
  code?: SortOrder | null;
  searchable?: SortOrder | null;
}

export interface FacetFilterParameter {
  name?: StringOperators | null;
  code?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
  searchable?: BooleanOperators | null;
}

export interface OrderListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: OrderSortParameter | null;
  filter?: OrderFilterParameter | null;
}

export interface OrderSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  code?: SortOrder | null;
}

export interface OrderFilterParameter {
  code?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface ProductListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: ProductSortParameter | null;
  filter?: ProductFilterParameter | null;
}

export interface ProductSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  name?: SortOrder | null;
  slug?: SortOrder | null;
  description?: SortOrder | null;
  image?: SortOrder | null;
  infoUrl?: SortOrder | null;
  downloadable?: SortOrder | null;
  nickname?: SortOrder | null;
}

export interface ProductFilterParameter {
  name?: StringOperators | null;
  slug?: StringOperators | null;
  description?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
  infoUrl?: StringOperators | null;
  downloadable?: BooleanOperators | null;
  nickname?: StringOperators | null;
}

export interface PromotionListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: PromotionSortParameter | null;
  filter?: PromotionFilterParameter | null;
}

export interface PromotionSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  name?: SortOrder | null;
}

export interface PromotionFilterParameter {
  name?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
  type?: StringOperators | null;
}

export interface RoleListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: RoleSortParameter | null;
  filter?: RoleFilterParameter | null;
}

export interface RoleSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  code?: SortOrder | null;
  description?: SortOrder | null;
}

export interface RoleFilterParameter {
  code?: StringOperators | null;
  description?: StringOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface TaxRateListOptions {
  take?: number | null;
  skip?: number | null;
  sort?: TaxRateSortParameter | null;
  filter?: TaxRateFilterParameter | null;
}

export interface TaxRateSortParameter {
  id?: SortOrder | null;
  createdAt?: SortOrder | null;
  updatedAt?: SortOrder | null;
  name?: SortOrder | null;
  enabled?: SortOrder | null;
}

export interface TaxRateFilterParameter {
  code?: StringOperators | null;
  name?: StringOperators | null;
  enabled?: BooleanOperators | null;
  createdAt?: DateOperators | null;
  updatedAt?: DateOperators | null;
}

export interface CreateAdministratorInput {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  roleIds: string[];
}

export interface UpdateAdministratorInput {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: string | null;
  password?: string | null;
  roleIds?: string[] | null;
}

export interface CreateAssetInput {
  file: Upload;
}

export interface CreateChannelInput {
  code: string;
  token: string;
  defaultLanguageCode: LanguageCode;
  pricesIncludeTax: boolean;
  defaultTaxZoneId?: string | null;
  defaultShippingZoneId?: string | null;
}

export interface UpdateChannelInput {
  id: string;
  code?: string | null;
  token?: string | null;
  defaultLanguageCode?: LanguageCode | null;
  pricesIncludeTax?: boolean | null;
  defaultTaxZoneId?: string | null;
  defaultShippingZoneId?: string | null;
}

export interface CreateCountryInput {
  code: string;
  name: string;
  enabled: boolean;
}

export interface UpdateCountryInput {
  id: string;
  code?: string | null;
  name?: string | null;
  enabled?: boolean | null;
}

export interface CreateCustomerGroupInput {
  name: string;
  customerIds?: string[] | null;
}

export interface UpdateCustomerGroupInput {
  id: string;
  name?: string | null;
}

export interface CreateCustomerInput {
  title?: string | null;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  emailAddress: string;
  customFields?: Json | null;
}

export interface UpdateCustomerInput {
  id: string;
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  emailAddress?: string | null;
  customFields?: Json | null;
}

export interface CreateAddressInput {
  fullName?: string | null;
  company?: string | null;
  streetLine1?: string | null;
  streetLine2?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phoneNumber?: string | null;
  defaultShippingAddress?: boolean | null;
  defaultBillingAddress?: boolean | null;
  customFields?: Json | null;
}

export interface UpdateAddressInput {
  id: string;
  fullName?: string | null;
  company?: string | null;
  streetLine1?: string | null;
  streetLine2?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phoneNumber?: string | null;
  defaultShippingAddress?: boolean | null;
  defaultBillingAddress?: boolean | null;
  customFields?: Json | null;
}

export interface CreateFacetInput {
  code: string;
  translations: FacetTranslationInput[];
  values?: CreateFacetValueWithFacetInput[] | null;
  customFields?: CreateFacetCustomFieldsInput | null;
}

export interface FacetTranslationInput {
  id?: string | null;
  languageCode: LanguageCode;
  name?: string | null;
  customFields?: Json | null;
}

export interface CreateFacetValueWithFacetInput {
  code: string;
  translations: FacetValueTranslationInput[];
}

export interface FacetValueTranslationInput {
  id?: string | null;
  languageCode: LanguageCode;
  name?: string | null;
  customFields?: Json | null;
}

export interface CreateFacetCustomFieldsInput {
  searchable?: boolean | null;
}

export interface UpdateFacetInput {
  id: string;
  code?: string | null;
  translations?: FacetTranslationInput[] | null;
  customFields?: UpdateFacetCustomFieldsInput | null;
}

export interface UpdateFacetCustomFieldsInput {
  searchable?: boolean | null;
}

export interface CreateFacetValueInput {
  facetId: string;
  code: string;
  translations: FacetValueTranslationInput[];
  customFields?: CreateFacetValueCustomFieldsInput | null;
}

export interface CreateFacetValueCustomFieldsInput {
  link?: string | null;
  available?: boolean | null;
}

export interface UpdateFacetValueInput {
  id: string;
  code?: string | null;
  translations?: FacetValueTranslationInput[] | null;
  customFields?: UpdateFacetValueCustomFieldsInput | null;
}

export interface UpdateFacetValueCustomFieldsInput {
  link?: string | null;
  available?: boolean | null;
}

export interface CreateProductOptionGroupInput {
  code: string;
  translations: ProductOptionGroupTranslationInput[];
  options: CreateProductOptionInput[];
  customFields?: Json | null;
}

export interface ProductOptionGroupTranslationInput {
  id?: string | null;
  languageCode: LanguageCode;
  name?: string | null;
  customFields?: Json | null;
}

export interface CreateProductOptionInput {
  code: string;
  translations: ProductOptionGroupTranslationInput[];
  customFields?: Json | null;
}

export interface UpdateProductOptionGroupInput {
  id: string;
  code?: string | null;
  translations?: ProductOptionGroupTranslationInput[] | null;
  customFields?: Json | null;
}

export interface CreateProductInput {
  featuredAssetId?: string | null;
  assetIds?: string[] | null;
  translations: ProductTranslationInput[];
  customFields?: CreateProductCustomFieldsInput | null;
}

export interface ProductTranslationInput {
  id?: string | null;
  languageCode: LanguageCode;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  customFields?: ProductTranslationCustomFieldsInput | null;
}

export interface ProductTranslationCustomFieldsInput {
  nickname?: string | null;
}

export interface CreateProductCustomFieldsInput {
  infoUrl?: string | null;
  downloadable?: boolean | null;
}

export interface UpdateProductInput {
  id: string;
  featuredAssetId?: string | null;
  assetIds?: string[] | null;
  translations?: ProductTranslationInput[] | null;
  customFields?: UpdateProductCustomFieldsInput | null;
}

export interface UpdateProductCustomFieldsInput {
  infoUrl?: string | null;
  downloadable?: boolean | null;
}

export interface UpdateProductVariantInput {
  id: string;
  translations?: ProductVariantTranslationInput[] | null;
  sku?: string | null;
  taxCategoryId?: string | null;
  price?: number | null;
  customFields?: Json | null;
}

export interface ProductVariantTranslationInput {
  id?: string | null;
  languageCode: LanguageCode;
  name?: string | null;
  customFields?: Json | null;
}

export interface CreatePromotionInput {
  name: string;
  enabled: boolean;
  conditions: AdjustmentOperationInput[];
  actions: AdjustmentOperationInput[];
}

export interface AdjustmentOperationInput {
  code: string;
  arguments: AdjustmentOperationInputArg[];
}

export interface AdjustmentOperationInputArg {
  name: string;
  value: string;
}

export interface UpdatePromotionInput {
  id: string;
  name?: string | null;
  enabled?: boolean | null;
  conditions?: AdjustmentOperationInput[] | null;
  actions?: AdjustmentOperationInput[] | null;
}

export interface CreateRoleInput {
  code: string;
  description: string;
  permissions: Permission[];
}

export interface UpdateRoleInput {
  id: string;
  code?: string | null;
  description?: string | null;
  permissions?: Permission[] | null;
}

export interface CreateTaxCategoryInput {
  name: string;
}

export interface UpdateTaxCategoryInput {
  id: string;
  name?: string | null;
}

export interface CreateTaxRateInput {
  name: string;
  enabled: boolean;
  value: number;
  categoryId: string;
  zoneId: string;
  customerGroupId?: string | null;
}

export interface UpdateTaxRateInput {
  id: string;
  name?: string | null;
  value?: number | null;
  enabled?: boolean | null;
  categoryId?: string | null;
  zoneId?: string | null;
  customerGroupId?: string | null;
}

export interface CreateZoneInput {
  name: string;
  memberIds?: string[] | null;
}

export interface UpdateZoneInput {
  id: string;
  name?: string | null;
}

export interface CreateProductVariantInput {
  translations: ProductVariantTranslationInput[];
  sku: string;
  price?: number | null;
  taxCategoryId: string;
  optionCodes?: string[] | null;
  customFields?: Json | null;
}

export interface NumberOperators {
  eq?: number | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  between?: NumberRange | null;
}

export interface NumberRange {
  start: number;
  end: number;
}

export interface ProductOptionTranslationInput {
  id?: string | null;
  languageCode: LanguageCode;
  name?: string | null;
  customFields?: Json | null;
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC"
}
/** Permissions for administrators and customers */
export enum Permission {
  Authenticated = "Authenticated",
  SuperAdmin = "SuperAdmin",
  Owner = "Owner",
  Public = "Public",
  CreateCatalog = "CreateCatalog",
  ReadCatalog = "ReadCatalog",
  UpdateCatalog = "UpdateCatalog",
  DeleteCatalog = "DeleteCatalog",
  CreateCustomer = "CreateCustomer",
  ReadCustomer = "ReadCustomer",
  UpdateCustomer = "UpdateCustomer",
  DeleteCustomer = "DeleteCustomer",
  CreateAdministrator = "CreateAdministrator",
  ReadAdministrator = "ReadAdministrator",
  UpdateAdministrator = "UpdateAdministrator",
  DeleteAdministrator = "DeleteAdministrator",
  CreateOrder = "CreateOrder",
  ReadOrder = "ReadOrder",
  UpdateOrder = "UpdateOrder",
  DeleteOrder = "DeleteOrder",
  CreateSettings = "CreateSettings",
  ReadSettings = "ReadSettings",
  UpdateSettings = "UpdateSettings",
  DeleteSettings = "DeleteSettings"
}
/** ISO 639-1 language code */
export enum LanguageCode {
  aa = "aa",
  ab = "ab",
  af = "af",
  ak = "ak",
  sq = "sq",
  am = "am",
  ar = "ar",
  an = "an",
  hy = "hy",
  as = "as",
  av = "av",
  ae = "ae",
  ay = "ay",
  az = "az",
  ba = "ba",
  bm = "bm",
  eu = "eu",
  be = "be",
  bn = "bn",
  bh = "bh",
  bi = "bi",
  bs = "bs",
  br = "br",
  bg = "bg",
  my = "my",
  ca = "ca",
  ch = "ch",
  ce = "ce",
  zh = "zh",
  cu = "cu",
  cv = "cv",
  kw = "kw",
  co = "co",
  cr = "cr",
  cs = "cs",
  da = "da",
  dv = "dv",
  nl = "nl",
  dz = "dz",
  en = "en",
  eo = "eo",
  et = "et",
  ee = "ee",
  fo = "fo",
  fj = "fj",
  fi = "fi",
  fr = "fr",
  fy = "fy",
  ff = "ff",
  ka = "ka",
  de = "de",
  gd = "gd",
  ga = "ga",
  gl = "gl",
  gv = "gv",
  el = "el",
  gn = "gn",
  gu = "gu",
  ht = "ht",
  ha = "ha",
  he = "he",
  hz = "hz",
  hi = "hi",
  ho = "ho",
  hr = "hr",
  hu = "hu",
  ig = "ig",
  is = "is",
  io = "io",
  ii = "ii",
  iu = "iu",
  ie = "ie",
  ia = "ia",
  id = "id",
  ik = "ik",
  it = "it",
  jv = "jv",
  ja = "ja",
  kl = "kl",
  kn = "kn",
  ks = "ks",
  kr = "kr",
  kk = "kk",
  km = "km",
  ki = "ki",
  rw = "rw",
  ky = "ky",
  kv = "kv",
  kg = "kg",
  ko = "ko",
  kj = "kj",
  ku = "ku",
  lo = "lo",
  la = "la",
  lv = "lv",
  li = "li",
  ln = "ln",
  lt = "lt",
  lb = "lb",
  lu = "lu",
  lg = "lg",
  mk = "mk",
  mh = "mh",
  ml = "ml",
  mi = "mi",
  mr = "mr",
  ms = "ms",
  mg = "mg",
  mt = "mt",
  mn = "mn",
  na = "na",
  nv = "nv",
  nr = "nr",
  nd = "nd",
  ng = "ng",
  ne = "ne",
  nn = "nn",
  nb = "nb",
  no = "no",
  ny = "ny",
  oc = "oc",
  oj = "oj",
  or = "or",
  om = "om",
  os = "os",
  pa = "pa",
  fa = "fa",
  pi = "pi",
  pl = "pl",
  pt = "pt",
  ps = "ps",
  qu = "qu",
  rm = "rm",
  ro = "ro",
  rn = "rn",
  ru = "ru",
  sg = "sg",
  sa = "sa",
  si = "si",
  sk = "sk",
  sl = "sl",
  se = "se",
  sm = "sm",
  sn = "sn",
  sd = "sd",
  so = "so",
  st = "st",
  es = "es",
  sc = "sc",
  sr = "sr",
  ss = "ss",
  su = "su",
  sw = "sw",
  sv = "sv",
  ty = "ty",
  ta = "ta",
  tt = "tt",
  te = "te",
  tg = "tg",
  tl = "tl",
  th = "th",
  bo = "bo",
  ti = "ti",
  to = "to",
  tn = "tn",
  ts = "ts",
  tk = "tk",
  tr = "tr",
  tw = "tw",
  ug = "ug",
  uk = "uk",
  ur = "ur",
  uz = "uz",
  ve = "ve",
  vi = "vi",
  vo = "vo",
  cy = "cy",
  wa = "wa",
  wo = "wo",
  xh = "xh",
  yi = "yi",
  yo = "yo",
  za = "za",
  zu = "zu"
}

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  BINARY = "BINARY"
}

export enum AdjustmentType {
  TAX = "TAX",
  PROMOTION = "PROMOTION",
  REFUND = "REFUND",
  TAX_REFUND = "TAX_REFUND",
  PROMOTION_REFUND = "PROMOTION_REFUND"
}

export namespace GetAccountOverview {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    activeCustomer?: ActiveCustomer | null;
  };

  export type ActiveCustomer = {
    __typename?: "Customer";
    id: string;
    title?: string | null;
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
}

export namespace SignOut {
  export type Variables = {};

  export type Mutation = {
    __typename?: "Mutation";
    logout: boolean;
  };
}

export namespace GetActiveCustomer {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    activeCustomer?: ActiveCustomer | null;
  };

  export type ActiveCustomer = {
    __typename?: "Customer";
    id: string;
    firstName: string;
    lastName: string;
  };
}

export namespace GetCartContents {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    activeOrder?: ActiveOrder | null;
  };

  export type ActiveOrder = Cart.Fragment;
}

export namespace AdjustItemQuantity {
  export type Variables = {
    id: string;
    qty: number;
  };

  export type Mutation = {
    __typename?: "Mutation";
    adjustItemQuantity?: AdjustItemQuantity | null;
  };

  export type AdjustItemQuantity = Cart.Fragment;
}

export namespace RemoveItemFromCart {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    removeItemFromOrder?: RemoveItemFromOrder | null;
  };

  export type RemoveItemFromOrder = Cart.Fragment;
}

export namespace GetCartTotals {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    activeOrder?: ActiveOrder | null;
  };

  export type ActiveOrder = {
    __typename?: "Order";
    id: string;
    lines: Lines[];
    total: number;
  };

  export type Lines = {
    __typename?: "OrderLine";
    id: string;
    quantity: number;
  };
}

export namespace GetProductDetail {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    product?: Product | null;
  };

  export type Product = {
    __typename?: "Product";
    id: string;
    name: string;
    description: string;
    variants: Variants[];
    featuredAsset?: FeaturedAsset | null;
    assets: Assets[];
  };

  export type Variants = {
    __typename?: "ProductVariant";
    id: string;
    name: string;
    options: Options[];
    price: number;
    priceWithTax: number;
    sku: string;
  };

  export type Options = {
    __typename?: "ProductOption";
    code?: string | null;
    name?: string | null;
  };

  export type FeaturedAsset = {
    __typename?: "Asset";
    id: string;
    name: string;
    preview: string;
    type: AssetType;
  };

  export type Assets = {
    __typename?: "Asset";
    id: string;
    name: string;
    preview: string;
    type: AssetType;
  };
}

export namespace AddToCart {
  export type Variables = {
    variantId: string;
    qty: number;
  };

  export type Mutation = {
    __typename?: "Mutation";
    addItemToOrder?: AddItemToOrder | null;
  };

  export type AddItemToOrder = Cart.Fragment;
}

export namespace GetProductList {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    products: Products;
  };

  export type Products = {
    __typename?: "ProductList";
    items: Items[];
    totalItems: number;
  };

  export type Items = {
    __typename?: "Product";
    id: string;
    name: string;
    description: string;
    variants: Variants[];
    featuredAsset?: FeaturedAsset | null;
  };

  export type Variants = {
    __typename?: "ProductVariant";
    id: string;
    name: string;
    options: Options[];
    price: number;
    sku: string;
  };

  export type Options = {
    __typename?: "ProductOption";
    code?: string | null;
    name?: string | null;
  };

  export type FeaturedAsset = {
    __typename?: "Asset";
    id: string;
    name: string;
    preview: string;
    type: AssetType;
  };
}

export namespace SignIn {
  export type Variables = {
    emailAddress: string;
    password: string;
    rememberMe: boolean;
  };

  export type Mutation = {
    __typename?: "Mutation";
    login: Login;
  };

  export type Login = {
    __typename?: "LoginResult";
    user: User;
  };

  export type User = {
    __typename?: "CurrentUser";
    id: string;
  };
}

export namespace Cart {
  export type Fragment = {
    __typename?: "Order";
    id: string;
    lines: Lines[];
    subTotal: number;
    subTotalBeforeTax: number;
    totalBeforeTax: number;
    total: number;
    adjustments: __Adjustments[];
  };

  export type Lines = {
    __typename?: "OrderLine";
    id: string;
    featuredAsset?: FeaturedAsset | null;
    unitPrice: number;
    unitPriceWithTax: number;
    quantity: number;
    totalPrice: number;
    productVariant: ProductVariant;
    adjustments: Adjustments[];
    items: Items[];
  };

  export type FeaturedAsset = {
    __typename?: "Asset";
    id: string;
    preview: string;
    name: string;
  };

  export type ProductVariant = {
    __typename?: "ProductVariant";
    id: string;
    name: string;
  };

  export type Adjustments = {
    __typename?: "Adjustment";
    amount: number;
    description: string;
    adjustmentSource: string;
    type: AdjustmentType;
  };

  export type Items = {
    __typename?: "OrderItem";
    id: string;
    unitPrice: number;
    taxRate: number;
    unitPriceIncludesTax: boolean;
    unitPriceWithTax: number;
    adjustments: _Adjustments[];
  };

  export type _Adjustments = {
    __typename?: "Adjustment";
    amount: number;
    description: string;
    adjustmentSource: string;
    type: AdjustmentType;
  };

  export type __Adjustments = {
    __typename?: "Adjustment";
    amount: number;
    description: string;
    adjustmentSource: string;
    type: AdjustmentType;
  };
}

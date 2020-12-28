// tslint:disable

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "CustomField": [
      "BooleanCustomFieldConfig",
      "DateTimeCustomFieldConfig",
      "FloatCustomFieldConfig",
      "IntCustomFieldConfig",
      "LocaleStringCustomFieldConfig",
      "StringCustomFieldConfig"
    ],
    "ErrorResult": [
      "AlreadyLoggedInError",
      "CouponCodeExpiredError",
      "CouponCodeInvalidError",
      "CouponCodeLimitError",
      "EmailAddressConflictError",
      "IdentifierChangeTokenExpiredError",
      "IdentifierChangeTokenInvalidError",
      "IneligibleShippingMethodError",
      "InsufficientStockError",
      "InvalidCredentialsError",
      "MissingPasswordError",
      "NativeAuthStrategyError",
      "NegativeQuantityError",
      "NoActiveOrderError",
      "NotVerifiedError",
      "OrderLimitError",
      "OrderModificationError",
      "OrderPaymentStateError",
      "OrderStateTransitionError",
      "PasswordAlreadySetError",
      "PasswordResetTokenExpiredError",
      "PasswordResetTokenInvalidError",
      "PaymentDeclinedError",
      "PaymentFailedError",
      "VerificationTokenExpiredError",
      "VerificationTokenInvalidError"
    ],
    "Node": [
      "Address",
      "Asset",
      "AuthenticationMethod",
      "Channel",
      "Collection",
      "Country",
      "Customer",
      "CustomerGroup",
      "Facet",
      "FacetValue",
      "Fulfillment",
      "HistoryEntry",
      "Order",
      "OrderItem",
      "OrderLine",
      "Payment",
      "Product",
      "ProductOption",
      "ProductOptionGroup",
      "ProductVariant",
      "Promotion",
      "Refund",
      "Role",
      "ShippingMethod",
      "Surcharge",
      "TaxCategory",
      "TaxRate",
      "User",
      "Zone"
    ],
    "PaginatedList": [
      "AssetList",
      "CollectionList",
      "CountryList",
      "CustomerList",
      "FacetList",
      "HistoryEntryList",
      "OrderList",
      "ProductList",
      "ProductVariantList",
      "PromotionList",
      "RoleList",
      "ShippingMethodList",
      "TaxRateList"
    ],
    "ActiveOrderResult": [
      "NoActiveOrderError",
      "Order"
    ],
    "AddPaymentToOrderResult": [
      "NoActiveOrderError",
      "Order",
      "OrderPaymentStateError",
      "OrderStateTransitionError",
      "PaymentDeclinedError",
      "PaymentFailedError"
    ],
    "ApplyCouponCodeResult": [
      "CouponCodeExpiredError",
      "CouponCodeInvalidError",
      "CouponCodeLimitError",
      "Order"
    ],
    "AuthenticationResult": [
      "CurrentUser",
      "InvalidCredentialsError",
      "NotVerifiedError"
    ],
    "CustomFieldConfig": [
      "BooleanCustomFieldConfig",
      "DateTimeCustomFieldConfig",
      "FloatCustomFieldConfig",
      "IntCustomFieldConfig",
      "LocaleStringCustomFieldConfig",
      "StringCustomFieldConfig"
    ],
    "NativeAuthenticationResult": [
      "CurrentUser",
      "InvalidCredentialsError",
      "NativeAuthStrategyError",
      "NotVerifiedError"
    ],
    "RefreshCustomerVerificationResult": [
      "NativeAuthStrategyError",
      "Success"
    ],
    "RegisterCustomerAccountResult": [
      "MissingPasswordError",
      "NativeAuthStrategyError",
      "Success"
    ],
    "RemoveOrderItemsResult": [
      "Order",
      "OrderModificationError"
    ],
    "RequestPasswordResetResult": [
      "NativeAuthStrategyError",
      "Success"
    ],
    "RequestUpdateCustomerEmailAddressResult": [
      "EmailAddressConflictError",
      "InvalidCredentialsError",
      "NativeAuthStrategyError",
      "Success"
    ],
    "ResetPasswordResult": [
      "CurrentUser",
      "NativeAuthStrategyError",
      "PasswordResetTokenExpiredError",
      "PasswordResetTokenInvalidError"
    ],
    "SearchResultPrice": [
      "PriceRange",
      "SinglePrice"
    ],
    "SetCustomerForOrderResult": [
      "AlreadyLoggedInError",
      "EmailAddressConflictError",
      "NoActiveOrderError",
      "Order"
    ],
    "SetOrderShippingMethodResult": [
      "IneligibleShippingMethodError",
      "NoActiveOrderError",
      "Order",
      "OrderModificationError"
    ],
    "TransitionOrderToStateResult": [
      "Order",
      "OrderStateTransitionError"
    ],
    "UpdateCustomerEmailAddressResult": [
      "IdentifierChangeTokenExpiredError",
      "IdentifierChangeTokenInvalidError",
      "NativeAuthStrategyError",
      "Success"
    ],
    "UpdateCustomerPasswordResult": [
      "InvalidCredentialsError",
      "NativeAuthStrategyError",
      "Success"
    ],
    "UpdateOrderItemsResult": [
      "InsufficientStockError",
      "NegativeQuantityError",
      "Order",
      "OrderLimitError",
      "OrderModificationError"
    ],
    "VerifyCustomerAccountResult": [
      "CurrentUser",
      "MissingPasswordError",
      "NativeAuthStrategyError",
      "PasswordAlreadySetError",
      "VerificationTokenExpiredError",
      "VerificationTokenInvalidError"
    ]
  }
};
      export default result;
    
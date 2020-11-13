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
      "Administrator",
      "Allocation",
      "Asset",
      "AuthenticationMethod",
      "Cancellation",
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
      "PaymentMethod",
      "Product",
      "ProductOption",
      "ProductOptionGroup",
      "ProductVariant",
      "Promotion",
      "Refund",
      "Release",
      "Return",
      "Role",
      "Sale",
      "ShippingMethod",
      "StockAdjustment",
      "TaxCategory",
      "TaxRate",
      "User",
      "Zone"
    ],
    "PaginatedList": [
      "AdministratorList",
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
    "StockMovement": [
      "Allocation",
      "Cancellation",
      "Release",
      "Return",
      "Sale",
      "StockAdjustment"
    ],
    "AddPaymentToOrderResult": [
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
      "Order"
    ],
    "SetOrderShippingMethodResult": [
      "IneligibleShippingMethodError",
      "Order",
      "OrderModificationError"
    ],
    "StockMovementItem": [
      "Allocation",
      "Cancellation",
      "Release",
      "Return",
      "Sale",
      "StockAdjustment"
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
    
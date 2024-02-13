export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}

const result: PossibleTypesResultData = {
    "possibleTypes": {
        "ActiveOrderResult": [
            "NoActiveOrderError",
            "Order"
        ],
        "AddPaymentToOrderResult": [
            "IneligiblePaymentMethodError",
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
        "CustomField": [
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "FloatCustomFieldConfig",
            "IntCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "LocaleTextCustomFieldConfig",
            "RelationCustomFieldConfig",
            "StringCustomFieldConfig",
            "TextCustomFieldConfig"
        ],
        "CustomFieldConfig": [
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "FloatCustomFieldConfig",
            "IntCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "LocaleTextCustomFieldConfig",
            "RelationCustomFieldConfig",
            "StringCustomFieldConfig",
            "TextCustomFieldConfig"
        ],
        "ErrorResult": [
            "AlreadyLoggedInError",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError",
            "EmailAddressConflictError",
            "GuestCheckoutError",
            "IdentifierChangeTokenExpiredError",
            "IdentifierChangeTokenInvalidError",
            "IneligiblePaymentMethodError",
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
            "PasswordValidationError",
            "PaymentDeclinedError",
            "PaymentFailedError",
            "VerificationTokenExpiredError",
            "VerificationTokenInvalidError"
        ],
        "NativeAuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError",
            "NativeAuthStrategyError",
            "NotVerifiedError"
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
            "OrderLine",
            "Payment",
            "PaymentMethod",
            "Product",
            "ProductOption",
            "ProductOptionGroup",
            "ProductVariant",
            "Promotion",
            "Province",
            "Refund",
            "Role",
            "Seller",
            "ShippingMethod",
            "Surcharge",
            "Tag",
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
            "ProvinceList",
            "RoleList",
            "ShippingMethodList",
            "TagList",
            "TaxRateList"
        ],
        "RefreshCustomerVerificationResult": [
            "NativeAuthStrategyError",
            "Success"
        ],
        "Region": [
            "Country",
            "Province"
        ],
        "RegisterCustomerAccountResult": [
            "MissingPasswordError",
            "NativeAuthStrategyError",
            "PasswordValidationError",
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
            "NotVerifiedError",
            "PasswordResetTokenExpiredError",
            "PasswordResetTokenInvalidError",
            "PasswordValidationError"
        ],
        "SearchResultPrice": [
            "PriceRange",
            "SinglePrice"
        ],
        "SetCustomerForOrderResult": [
            "AlreadyLoggedInError",
            "EmailAddressConflictError",
            "GuestCheckoutError",
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
            "PasswordValidationError",
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
            "PasswordValidationError",
            "VerificationTokenExpiredError",
            "VerificationTokenInvalidError"
        ]
    }
};
export default result;

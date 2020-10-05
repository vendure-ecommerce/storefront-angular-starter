// tslint:disable

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "Channel"
          },
          {
            "name": "Zone"
          },
          {
            "name": "Country"
          },
          {
            "name": "Customer"
          },
          {
            "name": "Address"
          },
          {
            "name": "Order"
          },
          {
            "name": "Fulfillment"
          },
          {
            "name": "OrderItem"
          },
          {
            "name": "HistoryEntry"
          },
          {
            "name": "Administrator"
          },
          {
            "name": "User"
          },
          {
            "name": "AuthenticationMethod"
          },
          {
            "name": "Role"
          },
          {
            "name": "OrderLine"
          },
          {
            "name": "Asset"
          },
          {
            "name": "ProductVariant"
          },
          {
            "name": "FacetValue"
          },
          {
            "name": "Facet"
          },
          {
            "name": "ProductOption"
          },
          {
            "name": "ProductOptionGroup"
          },
          {
            "name": "Product"
          },
          {
            "name": "Collection"
          },
          {
            "name": "TaxCategory"
          },
          {
            "name": "TaxRate"
          },
          {
            "name": "CustomerGroup"
          },
          {
            "name": "Payment"
          },
          {
            "name": "Refund"
          },
          {
            "name": "Promotion"
          },
          {
            "name": "ShippingMethod"
          },
          {
            "name": "Cancellation"
          },
          {
            "name": "Return"
          },
          {
            "name": "Sale"
          },
          {
            "name": "StockAdjustment"
          },
          {
            "name": "PaymentMethod"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PaginatedList",
        "possibleTypes": [
          {
            "name": "OrderList"
          },
          {
            "name": "HistoryEntryList"
          },
          {
            "name": "ProductVariantList"
          },
          {
            "name": "CustomerList"
          },
          {
            "name": "CollectionList"
          },
          {
            "name": "ProductList"
          },
          {
            "name": "AdministratorList"
          },
          {
            "name": "AssetList"
          },
          {
            "name": "CountryList"
          },
          {
            "name": "FacetList"
          },
          {
            "name": "PromotionList"
          },
          {
            "name": "RoleList"
          },
          {
            "name": "ShippingMethodList"
          },
          {
            "name": "TaxRateList"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SearchResultPrice",
        "possibleTypes": [
          {
            "name": "PriceRange"
          },
          {
            "name": "SinglePrice"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UpdateOrderItemsResult",
        "possibleTypes": [
          {
            "name": "NegativeQuantityError"
          },
          {
            "name": "Order"
          },
          {
            "name": "OrderLimitError"
          },
          {
            "name": "OrderModificationError"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ErrorResult",
        "possibleTypes": [
          {
            "name": "NegativeQuantityError"
          },
          {
            "name": "OrderLimitError"
          },
          {
            "name": "OrderModificationError"
          },
          {
            "name": "OrderPaymentStateError"
          },
          {
            "name": "OrderStateTransitionError"
          },
          {
            "name": "PaymentDeclinedError"
          },
          {
            "name": "PaymentFailedError"
          },
          {
            "name": "CouponCodeExpiredError"
          },
          {
            "name": "CouponCodeInvalidError"
          },
          {
            "name": "CouponCodeLimitError"
          },
          {
            "name": "InvalidCredentialsError"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "MissingPasswordError"
          },
          {
            "name": "EmailAddressConflictError"
          },
          {
            "name": "PasswordResetTokenExpiredError"
          },
          {
            "name": "PasswordResetTokenInvalidError"
          },
          {
            "name": "AlreadyLoggedInError"
          },
          {
            "name": "IdentifierChangeTokenExpiredError"
          },
          {
            "name": "IdentifierChangeTokenInvalidError"
          },
          {
            "name": "PasswordAlreadySetError"
          },
          {
            "name": "VerificationTokenExpiredError"
          },
          {
            "name": "VerificationTokenInvalidError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "AddPaymentToOrderResult",
        "possibleTypes": [
          {
            "name": "Order"
          },
          {
            "name": "OrderPaymentStateError"
          },
          {
            "name": "OrderStateTransitionError"
          },
          {
            "name": "PaymentDeclinedError"
          },
          {
            "name": "PaymentFailedError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ApplyCouponCodeResult",
        "possibleTypes": [
          {
            "name": "CouponCodeExpiredError"
          },
          {
            "name": "CouponCodeInvalidError"
          },
          {
            "name": "CouponCodeLimitError"
          },
          {
            "name": "Order"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "AuthenticationResult",
        "possibleTypes": [
          {
            "name": "CurrentUser"
          },
          {
            "name": "InvalidCredentialsError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "NativeAuthenticationResult",
        "possibleTypes": [
          {
            "name": "CurrentUser"
          },
          {
            "name": "InvalidCredentialsError"
          },
          {
            "name": "NativeAuthStrategyError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RefreshCustomerVerificationResult",
        "possibleTypes": [
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "Success"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RegisterCustomerAccountResult",
        "possibleTypes": [
          {
            "name": "MissingPasswordError"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "Success"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RemoveOrderItemsResult",
        "possibleTypes": [
          {
            "name": "Order"
          },
          {
            "name": "OrderModificationError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RequestPasswordResetResult",
        "possibleTypes": [
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "Success"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RequestUpdateCustomerEmailAddressResult",
        "possibleTypes": [
          {
            "name": "EmailAddressConflictError"
          },
          {
            "name": "InvalidCredentialsError"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "Success"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ResetPasswordResult",
        "possibleTypes": [
          {
            "name": "CurrentUser"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "PasswordResetTokenExpiredError"
          },
          {
            "name": "PasswordResetTokenInvalidError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SetCustomerForOrderResult",
        "possibleTypes": [
          {
            "name": "AlreadyLoggedInError"
          },
          {
            "name": "EmailAddressConflictError"
          },
          {
            "name": "Order"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SetOrderShippingMethodResult",
        "possibleTypes": [
          {
            "name": "Order"
          },
          {
            "name": "OrderModificationError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "TransitionOrderToStateResult",
        "possibleTypes": [
          {
            "name": "Order"
          },
          {
            "name": "OrderStateTransitionError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UpdateCustomerEmailAddressResult",
        "possibleTypes": [
          {
            "name": "IdentifierChangeTokenExpiredError"
          },
          {
            "name": "IdentifierChangeTokenInvalidError"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "Success"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UpdateCustomerPasswordResult",
        "possibleTypes": [
          {
            "name": "InvalidCredentialsError"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "Success"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "VerifyCustomerAccountResult",
        "possibleTypes": [
          {
            "name": "CurrentUser"
          },
          {
            "name": "MissingPasswordError"
          },
          {
            "name": "NativeAuthStrategyError"
          },
          {
            "name": "PasswordAlreadySetError"
          },
          {
            "name": "VerificationTokenExpiredError"
          },
          {
            "name": "VerificationTokenInvalidError"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CustomField",
        "possibleTypes": [
          {
            "name": "BooleanCustomFieldConfig"
          },
          {
            "name": "DateTimeCustomFieldConfig"
          },
          {
            "name": "FloatCustomFieldConfig"
          },
          {
            "name": "IntCustomFieldConfig"
          },
          {
            "name": "LocaleStringCustomFieldConfig"
          },
          {
            "name": "StringCustomFieldConfig"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "StockMovement",
        "possibleTypes": [
          {
            "name": "Cancellation"
          },
          {
            "name": "Return"
          },
          {
            "name": "Sale"
          },
          {
            "name": "StockAdjustment"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CustomFieldConfig",
        "possibleTypes": [
          {
            "name": "BooleanCustomFieldConfig"
          },
          {
            "name": "DateTimeCustomFieldConfig"
          },
          {
            "name": "FloatCustomFieldConfig"
          },
          {
            "name": "IntCustomFieldConfig"
          },
          {
            "name": "LocaleStringCustomFieldConfig"
          },
          {
            "name": "StringCustomFieldConfig"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "StockMovementItem",
        "possibleTypes": [
          {
            "name": "Cancellation"
          },
          {
            "name": "Return"
          },
          {
            "name": "Sale"
          },
          {
            "name": "StockAdjustment"
          }
        ]
      }
    ]
  }
};
      export default result;
    
exports.mapParams = function (providerConfig, options) {
  return {
    "NET_VERSION" : providerConfig.paymentVersion,
    "NET_STAMP" : options.requestId,
    "NET_SELLER_ID" : providerConfig.vendorId,
    "NET_AMOUNT" : options.amount,
    "NET_CUR" : providerConfig.currency,
    "NET_REF" : options.paymentReference,
    "NET_DATE" : options.dueDate,
    "NET_MSG" : options.message,
    "NET_RETURN" : providerConfig.returnUrls.ok,
    "NET_CANCEL" : providerConfig.returnUrls.cancel,
    "NET_REJECT" : providerConfig.returnUrls.reject,
    "NET_MAC" : options.checksum,
    "NET_CONFIRM" : providerConfig.confirm
  };
};
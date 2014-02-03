var formatting = require('../format');
var parameters = require('../parameters');

var MAC_PARAMS = [
  'AAB_VERSION',
  'AAB_STAMP',
  'AAB_RCV_ID',
  'AAB_AMOUNT',
  'AAB_REF',
  'AAB_DATE',
  'AAB_CUR'
];

exports.mapParams = function (providerConfig, options) {
  validateParams(providerConfig, options);

  return {
    "AAB_VERSION" : providerConfig.paymentVersion,
    "AAB_STAMP" : options.requestId,
    "AAB_RCV_ID" : providerConfig.vendorId,
    "AAB_RCV_ACCOUNT" : providerConfig.vendorAccount,
    "AAB_RCV_NAME" : providerConfig.vendorName,
    "AAB_LANGUAGE" : formatting.formatLanguage(options.language, formatting.mapEnglishToDefault),
    "AAB_AMOUNT" : formatting.formatAmount(options.amount),
    "AAB_REF" : formatting.formatToPaymentReference(options.requestId),
    "AAB_DATE" : providerConfig.dueDate,
    "AAB_MSG" : formatting.formatMessage(options.message),
    "AAB_RETURN" : providerConfig.returnUrls.ok,
    "AAB_CANCEL" : providerConfig.returnUrls.cancel,
    "AAB_REJECT" : providerConfig.returnUrls.reject,
    "AAB_CONFIRM" : providerConfig.confirm,
    "AAB_KEYVERS" : providerConfig.keyVersion,
    "AAB_CUR" : providerConfig.currency
  };
};

function validateParams (providerConfig, options) {
  parameters.requireParams(options, ['requestId', 'amount']);
  parameters.requireParams(providerConfig,
    ['paymentVersion', 'vendorId', 'vendorAccount', 'vendorName',
      'dueDate', 'currency', 'returnUrls', 'confirm', 'keyVersion']);

  parameters.requireInclusionIn(providerConfig, 'dueDate', ['EXPRESS']);
  parameters.requireLengthMax(options, 'requestId', 15);
}

exports.algorithmType = function (bankConfig) {
  return bankConfig.algorithmType;
};

exports.requestMacParams = function (providerConfig, formParams) {
  return parameters.macParams(formParams, MAC_PARAMS, [], [providerConfig.checksumKey]);
};

exports.macFormName = 'AAB_MAC';
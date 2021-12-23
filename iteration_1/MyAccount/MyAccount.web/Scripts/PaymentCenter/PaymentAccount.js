

$(document).ready(function () {
    var PaymentUIIFrameUrl = $("#paymentUIIFrameUrl").val();
    var Url;
    var PostObject;
    var BrandCode = $("#getbrandUrl").val();
    var accounNumber = sessionStorage.getItem("accountNumber");
    var baseURL = $("#baseURL").val();
    var firstName = sessionStorage.getItem("FirstName");
    var lastName = sessionStorage.getItem("LastName");
    $.ajax({
        url: baseURL + "Payment/PaymentToken",
        //url: "http://localhost:27570/Payment/PaymentToken",
        type: "GET",
        //data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            if (response.SessionId != null) {
                var sessionId = response.SessionId;

                var data = {
                    "AccountNumber": accounNumber
                };

                $.ajax({
                    url: baseURL + "Payment/GetAccountBalanceInfo",
                    //url: "http://localhost:27570/Payment/GetAccountBalanceInfo",
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (response) {
                        console.log(response);
                        if (response.resultCode == 1) {

                            PostObject = {
                                SessionId: sessionId,
                                CustomerNumber: response.Cust_No,
                                CustomerAccountId: response.Cust_ID,
                                AccountStatus: '',
                                ConnectStatus: '',
                                PastDue: response.Past_Due_Balance,
                                CurrentBalance: response.CurrentBalance,
                                IsAutoPay: response.Auto_Pay,
                                LastInvoiceDueDate: response.LastInvoiceDueDate,
                                IsInsertPCILog: "1",
                                PastDueDisplayValue: response.Past_Due_Balance,
                                CurrentBalaceDisplayValue: response.CurrentBalance,
                                FirstName: firstName,
                                LastName: lastName,
                                Email: response.Email,
                                ContactNumber: response.Cell,
                                //ContractType: ContractType,
                                //IsWriteoffAmount: IsWriteoffAmount,
                                //Source: Source
                            };

                            if (!PostObject.ContactNumber) {
                                ContactNumber: response.Phone;
                            }

                            //if (SelectedSiteIdentifier) {
                            //    PostObject.SiteIdentifier = SelectedSiteIdentifier;
                            //}


                            // set the source to iframe.
                            document.getElementById('PaymentAccountsIFrame').src = "".concat(PaymentUIIFrameUrl, "PaymentAccounts?Brand=").concat("FROTX");

                        }
                    }

                });
            }
        }

    });

    var iframe = document.querySelector('#PaymentAccountsIFrame');

    iframe.onload = function () {// REVISIT
        //var makePaymentIframe = $('#MakePaymentIFrame')[0];
        //makePaymentIframe.contentWindow.postMessage(postObject, '*');
    };

    $('#PaymentAccountsIFrame').on('load', function () {// Here's how you'd do this with jQuery
    });

    $("#PaymentAccountsPanel").show();

    function iframePostHandler(evt) {
        if (evt && evt.data) {
            var paymentAccountsIframe = $('#PaymentAccountsIFrame')[0];

            //if (evt.data.Redirect === 'ViewMyBill') {
            //    window.location.href = '/Payments/ViewMyBill';
            //}

            if (evt.data.height) {
                if (paymentAccountsIframe.contentWindow === evt.source) {
                    paymentAccountsIframe.height = evt.data.height + "px";
                    paymentAccountsIframe.style.height = evt.data.height + "px";
                }
            }

            if (evt.data.Loaded) {
                var timeValue = setInterval(function (interval) {
                    if (PostObject) {
                        clearInterval(timeValue);
                        paymentAccountsIframe.contentWindow.postMessage(PostObject, '*');
                    }
                }, 200);
            }

            if (evt.data.INSERTPCI) {

                var request = {
                    ChildId: evt.data.ChildUniqueId,
                    PCISessionId: evt.data.PCISessionId,
                    Url: "".concat(baseURL + "Payment/ValidatePCITransactionLog"),
                    InsertPCITransactionUrl: "".concat(baseURL + "Payment/ValidatePCITransactionLog"),
                    AccessToken: "Barer " + sessionStorage.getItem("accessToken"),
                    SelectedAccountNumber: accounNumber
                };
                validatePCITransaction(request);
                $('#PaymentAccountsPanel').show();
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener("message", iframePostHandler, false);
    } else {
        window.attachEvent("onmessage", iframePostHandler);
    }
    function validatePCITransaction(request, cb, ecb) {

        fetch(request.Url, {
            method: 'POST',
            headers: {
                'RequestVerificationToken': $('input:hidden[name="__RequestVerificationToken"]').val(),
                "Content-Type": "application/json",
                "Access_Token": request.AccessToken
            },
            body: JSON.stringify(request)
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    if (data.ResultCode == 1) {
                        cb();
                    } else {
                        if (ecb) {
                            var inesertPCIrequest = {
                                message: "Try Again CustNo: " + request.SelectedAccountNumber,
                                SourcePage: "Source Page: MyAccount - Payments,",
                                Url: "".concat(request.InsertPCITransactionUrl),
                                AccessToken: request.AccessToken
                            };
                            insertPCILog(inesertPCIrequest);
                            ecb();
                        }
                    }
                });
            } else if (response.status === 400) {
                response.json().then(function (data) { })["catch"](function (error) {
                    throw error;
                });
            } else if (response.status === 500) { }
        })["catch"](function (error) { })["finally"](function () { });
    }
    function insertPCILog(request) {
        var insertPCITransactionUrl = "".concat(request.Url);
        fetch(insertPCITransactionUrl, {
            method: 'POST',
            headers: {
                'RequestVerificationToken': $('input:hidden[name="__RequestVerificationToken"]').val(),
                "Content-Type": "application/json",
                "Access_Token": request.AccessToken
            },
            body: JSON.stringify(request)
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) { });
            } else if (response.status === 400) {
                response.json().then(function (data) { })["catch"](function (error) {
                    throw error;
                });
            } else if (response.status === 500) { }
        })["catch"](function (error) { })["finally"](function () { });
    }

});


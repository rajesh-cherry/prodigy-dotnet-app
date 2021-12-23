$(document).ready(function () {

    $(function () {
        $("#monthSelection").datepicker({
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            showOn: 'button',
            buttonImageOnly: true,
            buttonImage: '/Content/images/calendar_icon.png',
            dateFormat: 'mm/dd/yy',
            yearRange: '1900:+0',
            onSelect: function (dateString, txtDate) {
                dateSearch(dateString);
            }
        });
    });

    var commonResponse = [];
    var data = {
        "CustomerNo": "35101443",
        "IncludePADetails": true,
        "accessToken": "string",
        "requestType": "string",
        "BrandCode": "string"
    };

    $.ajax({
        url: "http://localhost:27570/Payment/GetTransactions",
        //url: "https://apitest.frontierutilities.com/MyAccountAPI/Payment/GetTransactions",

        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",

        success: function (response) {
            commonResponse = response;
            for (var i = 0; i < response.listTrans.length; i++) {
                if (response.listTrans[i].receipt_id == transactionId) {
                    $("#transactionId").append(response.listTrans[i].receipt_id)
                    $("#amountUsed").append(response.listTrans[i].receipt_amount)
                }
            }
        }
    })

    $("#backBtn").click(function () {
        window.location = 'https://localhost:44338/paymentCenter/paymentHistory';
    })

    $("#addAgainBtn").click(function () {
        $("#addSuccessfullModal").show();
    })

    $("#backToHome").click(function () {
        window.location = 'https://localhost:44338/paymentCenter/paymentHistory';
    })
    

    function dateSearch(dateString) {
        dateString = dateString.replace(/\b0/g, '');
        if (dateString != null) {
            for (var i = 0; i < commonResponse.listTrans.length; i++) {
                if (dateString == commonResponse.listTrans[i].receipt_date) {
                    $("#transactionId").empty();
                    $("#amountUsed").empty();
                    $("#transactionId").append(commonResponse.listTrans[i].receipt_id)
                    $("#amountUsed").append(commonResponse.listTrans[i].receipt_amount)
                    break;
                }
            }
        }
    }
})
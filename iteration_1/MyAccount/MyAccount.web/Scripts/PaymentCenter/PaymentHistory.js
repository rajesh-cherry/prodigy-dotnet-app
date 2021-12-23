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

            var appendtext = "";
            for (var i = 0; i < response.listTrans.length; i++) {
                var receiptDate = response.listTrans[i].insertDateTime
                commonResponse = response;
                var Id = String(response.listTrans[i].receipt_id)
                var text = `
            <a style= "text-decoration: none; cursor:pointer; color : #333333 !important "  href='/paymentCenter/paymentDetails?transactionId=${Id}' 
            <div  class="bg-white p-3 pl-4 border_radius_8 border_success d-flex flex-row justify-content-between">
                <div>
                    <p class="font_18 mb-0"> ${receiptDate}</p>
                    <p class="font_14">
                        Debited From : ****4572 &nbsp;
                        <img src="/Content/images/payment_discover.png" />
                    </p>
                    <p class="font_14 mb-0">Usage:230 kWh </p>
                </div>
                <div class="d-flex flex-column justify-content-between align-items-end">
                    <h4 class="font-weight-normal">${response.listTrans[i].receipt_amount}</h4>
                    <img src="/Content/images/payment_pdf.png" />
                </div>

            </div>
            </a>`;

                appendtext += text
            }
            $("#paymentHistory").html(appendtext);
        }
    })

    function dateSearch(dateString) {
        dateString = dateString.replace(/\b0/g, '');
        if (dateString != null) {
            for (var i = 0; i < commonResponse.listTrans.length; i++) {
                if (dateString == commonResponse.listTrans[i].receipt_date) {
                    var filterText = "";

                    var Id = String(commonResponse.listTrans[i].receipt_id)
                    var text = `
                                <a style= "text-decoration: none; cursor:pointer; color : #333333 !important "  href='/paymentCenter/paymentDetails?transactionId=${Id}' 
                        <div  class="bg-white p-3 pl-4 border_radius_8 border_success d-flex flex-row justify-content-between">
           
                          <div>

                    <p class="font_18 mb-0"> ${commonResponse.listTrans[i].receipt_date}, 10:37 Am</p>
                    <p class="font_14">
                        Debited From : ****4572 &nbsp;
                        <img src="/Content/images/payment_discover.png" />
                    </p>
                    <p class="font_14 mb-0">Usage:230 kWh </p>
                      </div>
                     <div class="d-flex flex-column justify-content-between align-items-end">
                    <h4 class="font-weight-normal">${commonResponse.listTrans[i].receipt_amount}</h4>
                    <img src="/Content/images/payment_pdf.png" />
                      </div>

                       </div>
                     </a>`;

                    filterText += text
                    $("#paymentHistory").html(filterText);
                    break;
                }
            }
        }
    }
})
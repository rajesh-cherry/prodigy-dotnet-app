$(document).ready(function () {

    var baseURL = $("#baseURL").val();

    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxStop(function () {
            $('#AjaxLoader').hide();
        });

    var data = {

        "longitude": 0,
        "latitude": 0,
        "zip": "775731903",
        "AccountNo": "35101443",
        "accessToken": "string",
        "requestType": "string",
        "BrandCode": "string"
    };

    $.ajax({
        //url: baseURL + "Payment/MyPaymentLocations",
        url: "http://localhost:27570/Payment/MyPaymentLocations",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            var appendtext = "";
            for (var i = 0; i < result.paymentLocations.length; i++) {
                var phone = Number(result.paymentLocations[i].Phone)
                phone = phoneFormat(phone.toString())
                var CenterName = result.paymentLocations[i].CenterName
                var paymentLogo = "";
                if (CenterName.includes("Dollar General")) {
                    paymentLogo = "/Content/images/DollarGeneral.png";
                }
                else if (CenterName.includes("ACE CENTER")) {
                    paymentLogo = "/Content/images/AceLogo.png";
                }
                else {
                    paymentLogo = "/Content/images/location_cmp.png";
                }
                var text = `<div class="col-xl-4 col-lg-4 col-md-6 pr-lg-0 mt-3">
                    <div class="bg-white border_radius_8 table-responsive box_min_height">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td colspan="3" class="font_16">
                                       <img src= "${paymentLogo}"/> &nbsp; ${result.paymentLocations[i].CenterName}
                                    </td>
                                    <td class="font_14 text-right">
                                    <a data-role='button' target='_blank' href='http://maps.google.com/?q=" ${result.paymentLocations[i].Latitude} "," ${result.paymentLocations[i].Longitude} "' class='lv-detailsbtn'><img src="/Content/images/location_direction.png" /> <br /></a>
                                               <p class='pr-1'> ${result.paymentLocations[i].Distance} </p>
                                            </td>
                                </tr>
                                <tr class="font_14">
                                    <td class="text-center"><img src="/Content/images/location_proc.png" /></td>
                                    <td class="pl-0"> Processing Time:2 hrs</td>
                                    <td class="text-center"><img src="/Content/images/location_map.png" /></td>
                                    <td class="pl-0"> ${result.paymentLocations[i].Address}, ${ result.paymentLocations[i].City}, ${ result.paymentLocations[i].State}, ${ result.paymentLocations[i].Zip}</td>
                                </tr>
                                <tr class="font_14">
                                    <td class="text-center"><img src="/Content/images/location_phone.png" /></td>
                                    <td class="pl-0">  ${phone}</td>
                                    <td class="text-center"><img src="/Content/images/location_time.png" /> </td>
                                    <td class="font-weight-bold pl-0">Open Untill  ${result.paymentLocations[i].ClosedToday}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                `;
                //var text = `<div class="gry-box row"> 
                //                    <div class="col-lg-8 col1">
                //                    <div>
                //                    <span>Company name</span>
                //                    <span>${result.paymentLocations[i].CenterName}</span>
                //                     </div>
                //                    <div>
                //                    <span>Address</span>
                //                    <span>${result.paymentLocations[i].Distance} Miles</span>
                //                     </div>
                //                    <div>
                //                    <span>Today</span>
                //                    <span>${result.paymentLocations[i].OpenToday} to ${result.paymentLocations[i].ClosedToday}</span>
                //                     </div>
                //                     </div>
                //                    <div class="col-lg-2 col2"><a data-role='button' target='_blank' href='http://maps.google.com/?q=" ${result.paymentLocations[i].Latitude} "," ${result.paymentLocations[i].Longitude} "' class='lv-detailsbtn'><img src='../images/payments/location_button.png'/></a></div>
                //                      </div>
                //                      `;
                appendtext += text;
            }
            $("#paymentlocations").html(appendtext);

        }
    })

})
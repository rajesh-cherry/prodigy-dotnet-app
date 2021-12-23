
$(document).ready(function () {

    var resolutionCode = "P";
    var currentmonthfinalresult;
    var previousmonthfinalresult;
    var finalformatcurrentday;
    var finalformatpreviuosday;
    var currentyear;
    var previousyear;

    if (resolutionCode == "P") {
        //current month format
        var date = new Date();

        var currentmonthfirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var currentmonthlastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        currentmonthfirstdayresult = currentmonthfirstDay.toLocaleDateString("en-us", { day: 'numeric', month: 'long'/*, year: 'numeric'*/ });
        currentmonthlastdayresult = currentmonthlastDay.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
        currentmonthfinalresult = currentmonthfirstdayresult + " - " + currentmonthlastdayresult;

        var futuremonthfirstday = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        var futuremonthlastday = new Date(date.getFullYear(), date.getMonth() + 2, 0);
        futuremonthfirstdayresult = futuremonthfirstday.toLocaleDateString("en-us", { day: 'numeric', month: 'long'/*, year: 'numeric'*/ });
        futuremonthlastdayresult = futuremonthlastday.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
        var futuremonthfinalresult = futuremonthfirstdayresult + " - " + futuremonthlastdayresult;


        var date = new Date();
        date.setDate(0);
        previousmonthlastdayresult = date.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });

        var date = new Date();
        date.setDate(0);
        date.setDate(1);
        previousmonthfirstdayresult = date.toLocaleDateString("en-us", { day: 'numeric', month: 'long', /*year: 'numeric'*/ });
        previousmonthfinalresult = previousmonthfirstdayresult + " - " + previousmonthlastdayresult;

        $("#monthlydate").text(currentmonthfinalresult);
        $("#previousmonth").text(previousmonthfinalresult);
        $("#currentmonth").text(currentmonthfinalresult);
        $("#projectedmonth").text(futuremonthfinalresult);





    }

    var options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            /*  text: "Monthly Sales Data"*/
        },
        axisX: {
            valueFormatString: "DD MMM"
        },
        axisY: {
            //prefix: "$",
            //labelFormatter: addSymbols,
            title: "Monthly Usage(KWH)"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [
            {
                type: "column",
                name: "Usage ",
                showInLegend: true,
                xValueFormatString: " DD MMM",
                /* yValueFormatString: "$#,##0",*/
                dataPoints: [
                    { x: new Date(2017, 2, 1), y: 344 },
                    { x: new Date(2017, 2, 2), y: 564 },
                    { x: new Date(2017, 2, 3), y: 234 },
                    { x: new Date(2017, 2, 4), y: 675, indexLabel: "High Renewals" },
                    { x: new Date(2017, 2, 5), y: 546 },
                    { x: new Date(2017, 2, 6), y: 987 },
                    { x: new Date(2017, 2, 7), y: 1460 },
                    { x: new Date(2017, 2, 8), y: 864 },
                    { x: new Date(2017, 2, 9), y: 1120 },
                    { x: new Date(2017, 2, 10), y: 1080 },
                    { x: new Date(2017, 2, 11), y: 467 },
                    { x: new Date(2017, 2, 12), y: 896 },
                    { x: new Date(2017, 2, 13), y: 546 },
                    { x: new Date(2017, 2, 14), y: 987 },
                    { x: new Date(2017, 2, 15), y: 1460 },
                    { x: new Date(2017, 2, 16), y: 864 },
                    { x: new Date(2017, 2, 17), y: 1120 },
                    { x: new Date(2017, 2, 18), y: 1080 },
                    { x: new Date(2017, 2, 19), y: 467 },
                    { x: new Date(2017, 2, 20), y: 987 },
                    { x: new Date(2017, 2, 21), y: 1460 },
                    { x: new Date(2017, 2, 22), y: 864 },
                    { x: new Date(2017, 2, 23), y: 1120 },
                    { x: new Date(2017, 2, 24), y: 1080 },
                    { x: new Date(2017, 2, 25), y: 467 },
                    { x: new Date(2017, 2, 26), y: 896 },
                    { x: new Date(2017, 2, 27), y: 546 },
                    { x: new Date(2017, 2, 28), y: 987 },
                    { x: new Date(2017, 2, 29), y: 1460 },
                    { x: new Date(2017, 2, 30), y: 864 },
                    { x: new Date(2017, 2, 31), y: 1120 },

                ]
            },
            {
                type: "line",
                name: "Temperature",
                showInLegend: true,
                //yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 2, 1), y: 768 },
                    { x: new Date(2017, 2, 2), y: 342 },
                    { x: new Date(2017, 2, 3), y: 980 },
                    { x: new Date(2017, 2, 4), y: 1243 },
                    { x: new Date(2017, 2, 5), y: 1343 },
                    { x: new Date(2017, 2, 6), y: 1123 },
                    { x: new Date(2017, 2, 7), y: 786 },
                    { x: new Date(2017, 2, 8), y: 892 },
                    { x: new Date(2017, 2, 9), y: 989 },
                    { x: new Date(2017, 2, 10), y: 234 },
                    { x: new Date(2017, 2, 11), y: 345 },
                    { x: new Date(2017, 2, 12), y: 678 },
                    { x: new Date(2017, 2, 13), y: 1080 },
                    { x: new Date(2017, 2, 14), y: 1234 },
                    { x: new Date(2017, 2, 15), y: 789 },
                    { x: new Date(2017, 2, 16), y: 989 },
                    { x: new Date(2017, 2, 17), y: 675 },
                    { x: new Date(2017, 2, 18), y: 576 },
                    { x: new Date(2017, 2, 19), y: 789 },
                    { x: new Date(2017, 2, 20), y: 1276 },
                    { x: new Date(2017, 2, 21), y: 1243 },
                    { x: new Date(2017, 2, 22), y: 1098 },
                    { x: new Date(2017, 2, 23), y: 967 },
                    { x: new Date(2017, 2, 24), y: 768 },
                    { x: new Date(2017, 2, 25), y: 879 },
                    { x: new Date(2017, 2, 26), y: 677 },
                    { x: new Date(2017, 2, 27), y: 787 },
                    { x: new Date(2017, 2, 28), y: 989 },
                    { x: new Date(2017, 2, 29), y: 656 },
                    { x: new Date(2017, 2, 30), y: 1389 },
                    { x: new Date(2017, 2, 31), y: 1287 }
                ]
            }
        ]
    };


    function addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

        if (order > suffixes.length - 1)
            order = suffixes.length - 1;

        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    $("#viewallenergytips").click(function (ev) {
        window.location = hnProdUrl + '/Usage/EnergySavingTips';
    });
    $('.read_now').click(function (ev) {
        window.location = hnProdUrl + '/Usage/EnergySavingTipsDetails';
    });
    loadusagedata();
    $("#monthlyleftarrow").click(function (ev) {

        $("#cmborder_highlight").removeClass('border_highlight');
        $("#pmborder_highlight").addClass('border_highlight');
        $("#monthlydate").empty();
        $("#monthlydate").text(previousmonthfinalresult);
        loadusagedata();

    })
    $("#monthlyrightarrow").click(function (ev) {

        $("#cmborder_highlight").addClass('border_highlight');
        $("#pmborder_highlight").removeClass('border_highlight');
        $("#monthlydate").empty();
        $("#monthlydate").text(currentmonthfinalresult);
        loadusagedata();
    })

    $("#dailyleftarrow").click(function (ev) {
        $("#cdborder_highlight").removeClass('border_highlight');
        $("#pdborder_highlight").addClass('border_highlight');
        $("#dailydate").empty();
        $("#dailydate").text(finalformatpreviuosday);
        loadusagedata();
        $('#dailyleftarrow').addClass('ui-state-disabled');
    })
    $("#dailyrightarrow").click(function (ev) {
        $("#cdborder_highlight").addClass('border_highlight');
        $("#pdborder_highlight").removeClass('border_highlight');
        $("#dailydate").empty();
        $("#dailydate").text(finalformatcurrentday);
        loadusagedata();
    })
    $("#yearlyleftarrow").click(function (ev) {
        $("#cyborder_highlight").removeClass('border_highlight');
        $("#pyborder_highlight").addClass('border_highlight');
        $("#yearlydate").empty();
        $("#yearlydate").text(previousyear);
        loadusagedata();
        $('#yearlyleftarrow').addClass('ui-state-disabled');
    })
    $("#yearlyrightarrow").click(function (ev) {
        $("#cyborder_highlight").addClass('border_highlight');
        $("#pyborder_highlight").removeClass('border_highlight');
        $("#yearlydate").empty();
        $("#yearlydate").text(currentyear);
        loadusagedata();
    })
    if ($('#billingmonths').is(':checked')) {
        $("#billcheck").show();
        $("#billuncheck").hide();
    } else {
        $("#billcheck").hide();
        $("#billuncheck").show();
    }



    $("#billingmonths").change(function () {
        if (this.checked) {
            $("#billcheck").show();
            $("#billuncheck").hide();
        }
        else {
            $("#billcheck").hide();
            $("#billuncheck").show();
        }
    });

    var hnProdUrl = document.getElementById("hnProdUrl").value;
    var BrandCode = document.getElementById("getbrandUrl").value;
    $("#yearly").click(function () {
        var date = new Date();
        currentyear = new Date().getFullYear();
        previousyear = new Date().getFullYear() - 1;
        var currentyearsdate = new Date(new Date().getFullYear(), 0, 1);
        var currentmonthlastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        currentyearsdate = currentyearsdate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
        currentmonthlastdayresult = currentmonthlastDay.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });

        $("#currentyear").text(currentyearsdate + " - " + currentmonthlastdayresult)
        $("#yearlydate").text(currentyear);
        $("#previousyear").text(previousyear);

        resolutionCode = "P";
        loadusagedata();


    });

    $("#monthly").click(function () {
        resolutionCode = "P";
        loadusagedata();


    });
    $("#weekly").click(function () {
        let fdWeek = new Date();
        let dia = fdWeek.getDay();
        let firtDay = new Date();
        firtDay.setTime(fdWeek.setUTCHours(-((dia) * 24)));
        let lastDay = new Date();
        lastDay.setTime(fdWeek.setUTCHours(6 * 24));
        //alert(firtDay);
        //alert(lastDay);
        //var d = new Date();
        //var to = new Date(d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000));
        //var from = new Date(d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000));
        //alert(from);
        //alert(to);
        //var curr = new Date();
        //day = curr.getDay();
        //firsttday = new Date(curr.getTime() - 60 * 60 * 24 * day * 1000); //will return firstday (ie sunday) of the week
        //lasttday = new Date(curr.getTime() + 60 * 60 * 24 * 6 * 1000);
        //alert(firsttday);
        //alert(lasttday);
        resolutionCode = "P";
        loadusagedata();


    });
    $("#daily").click(function () {
        var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        var date = new Date();
        currentdate = date.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
        currentdayname = weekday[date.getDay()];
        finalformatcurrentday = currentdayname + " " + currentdate;


        var pdate = new Date();
        pdate.setDate(pdate.getDate() - 1);
        var previousdate = pdate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
        previuosdayname = weekday[pdate.getDay()];
        finalformatpreviuosday = previuosdayname + " " + previousdate;


        var ndate = new Date();
        ndate.setDate(ndate.getDate() + 1);
        var projecteddate = ndate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
        projecteddayname = weekday[ndate.getDay()];
        var finalformatprojectedday = projecteddayname + " " + projecteddate;
        $("#dailydate").text(finalformatcurrentday);
        $("#previousday").text(finalformatpreviuosday);
        $("#currentday").text(finalformatcurrentday);
        $("#projectedday").text(finalformatprojectedday);

        resolutionCode = "D";
        loadusagedata();


    });

    function loadusagedata() {

        $("#monthlychartContainer").CanvasJSChart(options);

        $("#weeklychartContainer").CanvasJSChart(options);



        var data = {
            "ResolutionCode": resolutionCode,
            "SUsageDate": "12/01/2020",
            "EUsageDate": "12/31/2020",
            "CustomerAccountId": "35102313",
            "accessToken": "string",
            "requestType": "string",
            "BrandCode": BrandCode
        }

        $.ajax({
            //url: "https://apitest.frontierutilities.com/myaccountapi/Account/GetAccountUsageData",
            url: "http://localhost:27570/Account/GetAccountUsageData",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {

                if (response !== null) {
                    if (resolutionCode == "P") {

                        $('#monthlist tbody tr').remove();
                        var tr = "";
                        $.each(response.usageDataLst, function (index, item) {
                            var udate = new Date(item.UsageDate);
                            var usagedate = udate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' });
                            tr += "<tr>"
                            tr += '<td>' + usagedate + '</td>';
                            tr += '<td>' + item.KWH + '</td>';
                            tr += '<td>' + item.AvgTemp + '</td>';
                            tr += '<td>' + "$" + item.Cost + '</td>';
                            tr += "</tr>";
                        });

                        $('#monthlist tbody').append(tr);
                        //table = $('#monthlist').DataTable({ "bFilter": true });

                    }
                    if (resolutionCode == "D") {
                        //yearlist
                        $('#daylist tbody tr').remove();
                        var tr = "";
                        $.each(response.usageDataLst, function (index, item) {

                            tr += "<tr>"
                            tr += '<td>' + item.UsageHour + '</td>';
                            tr += '<td>' + item.KWH + '</td>';
                            tr += '<td>' + item.AvgTemp + '</td>';
                            tr += '<td>' + "$" + item.Cost + '</td>';
                            tr += "</tr>";
                        });

                        $('#daylist tbody').append(tr);
                    }

                }
                else {

                }
            },
        });






    }








    window.onload = function () {




    }



});
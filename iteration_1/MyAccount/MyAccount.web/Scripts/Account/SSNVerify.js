
$(document).ready(function () {
    var BrandCode = document.getElementById("getbrandUrl").value;
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxComplete(function () {
            $('#AjaxLoader').hide();
        });
    var AccountNo = sessionStorage.getItem("AccountNumber")
    $('#Headeraccountno').append(getMaskedAccountnumber(AccountNo))
    $(".btnNxt").attr('disabled', 'disabled');

    $("#txtSSN").keyup(function () {

        var my_txt = $("#txtSSN_error").text();
        var len = my_txt.length;

        var my_txt1 = $("#txtDOB_error").text();
        var len1 = my_txt1.length;

        if (len > 0 || len1 > 0) {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }

    });

    $("#txtDOB").on(function () {

        var my_txt = $("#txtSSN_error").text();
        var len = my_txt.length;

        var my_txt1 = $("#txtDOB_error").text();
        var len1 = my_txt1.length;

        if (len > 0 || len1 > 0) {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }

    });

    $("#txtDOB").blur(function () {
        var my_txt = $("#txtSSN_error").text();
        var len = my_txt.length;

        var my_txt1 = $("#txtDOB_error").text();
        var len1 = my_txt1.length;

        if (len > 0 || len1 > 0) {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });
    $("#txtConsulate").keyup(function () {
        var phone = document.getElementById("txtConsulate").value;
        var filter = /^[0-9-+]+$/;
        if (filter.test(phone)) {

            if (phone.length == 10) {
                document.getElementById("txtConsulate").style.borderColor = "#ced4da";
                document.getElementById("txtConsulate").style.borderWidth = "thin";
                $("#txtGovernment_error").html('');
                $("#txtGovernment_error").hide();
                return true;
            }
            else {
                document.getElementById("txtConsulate").style.borderColor = "red";
                document.getElementById("txtConsulate").style.borderWidth = "medium";
                $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Consulate ID").show();
                return false;
            }
        }
        else {
            document.getElementById("txtConsulate").style.borderColor = "red";
            document.getElementById("txtConsulate").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Consulate ID").show();
            return false;
        }
    });
    $("#txtBirth").keyup(function () {
        var phone = document.getElementById("txtBirth").value;
        var filter = /^[0-9-+]+$/;
        if (filter.test(phone)) {

            if (phone.length == 11) {
                document.getElementById("txtBirth").style.borderColor = "#ced4da";
                document.getElementById("txtBirth").style.borderWidth = "thin";
                $("#txtGovernment_error").html('');
                $("#txtGovernment_error").hide();
                return true;
            }
            else {
                document.getElementById("txtBirth").style.borderColor = "red";
                document.getElementById("txtBirth").style.borderWidth = "medium";
                $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Birth Certificate Number").show();
                return false;
            }
        }
        else {
            document.getElementById("txtBirth").style.borderColor = "red";
            document.getElementById("txtBirth").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Birth Certificate Number").show();
            return false;
        }
    });

    $("#txtMilitary").keyup(function () {
        var phone = document.getElementById("txtMilitary").value;
        var filter = /^[0-9-+]+$/;
        if (filter.test(phone)) {

            if (phone.length == 10) {
                document.getElementById("txtMilitary").style.borderColor = "#ced4da";
                document.getElementById("txtMilitary").style.borderWidth = "thin";
                $("#txtGovernment_error").html('');
                $("#txtGovernment_error").hide();
                return true;
            }
            else {
                document.getElementById("txtMilitary").style.borderColor = "red";
                document.getElementById("txtMilitary").style.borderWidth = "medium";
                $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Military ID").show();
                return false;
            }
        }
        else {
            document.getElementById("txtMilitary").style.borderColor = "red";
            document.getElementById("txtMilitary").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Military ID").show();
            return false;
        }
    });

    $("#txtDriver").keyup(function () {

        var phone = document.getElementById("txtDriver").value;
        var filter = /^[0-9-+]+$/;
        if (filter.test(phone)) {

            if (phone.length == 13) {
                document.getElementById("txtDriver").style.borderColor = "#ced4da";
                document.getElementById("txtDriver").style.borderWidth = "thin";
                $("#txtGovernment_error").html('');
                $("#txtGovernment_error").hide();
                return true;
            }
            else {
                document.getElementById("txtDriver").style.borderColor = "red";
                document.getElementById("txtDriver").style.borderWidth = "medium";
                $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Driver's License Number").show();
                return false;
            }

        }
        else {
            document.getElementById("txtDriver").style.borderColor = "red";
            document.getElementById("txtDriver").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Driver's License Number").show();
            return false;
        }


    });
    $("#txtResident").keyup(function () {
        var phone = document.getElementById("txtResident").value;
        var filter = /^[0-9-+]+$/;
        if (filter.test(phone)) {

            if (phone.length == 13) {
                document.getElementById("txtResident").style.borderColor = "#ced4da";
                document.getElementById("txtResident").style.borderWidth = "thin";
                $("#txtGovernment_error").html('');
                $("#txtGovernment_error").hide();
                return true;
            }
            else {
                document.getElementById("txtResident").style.borderColor = "red";
                document.getElementById("txtResident").style.borderWidth = "medium";
                $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Resident Card Number").show();
                return false;
            }

        }

        else {
            document.getElementById("txtResident").style.borderColor = "red";
            document.getElementById("txtResident").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Resident Card Number").show();
            return false;
        }

    });
    $("#txtPassport").keyup(function () {
        var phone = document.getElementById("txtPassport").value;
        if (phone.length == 9) {
            document.getElementById("txtPassport").style.borderColor = "#ced4da";
            document.getElementById("txtPassport").style.borderWidth = "thin";
            $("#txtGovernment_error").html('');
            $("#txtGovernment_error").hide();
            return true;
        }
        else {
            document.getElementById("txtPassport").style.borderColor = "red";
            document.getElementById("txtPassport").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid passport Number").show();
            return false;
        }

    });
    $("#txtState").keyup(function () {
        var phone = document.getElementById("txtState").value;
        if (phone.length == 15) {
            document.getElementById("txtState").style.borderColor = "#ced4da";
            document.getElementById("txtState").style.borderWidth = "thin";
            $("#txtGovernment_error").html('');
            $("#txtGovernment_error").hide();
            return true;
        }
        else {
            document.getElementById("txtState").style.borderColor = "red";
            document.getElementById("txtState").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid State ID").show();
            return false;
        }

    });
    $("#txtVisa").keyup(function () {
        var phone = document.getElementById("txtVisa").value;
        if (phone.length == 9) {
            document.getElementById("txtVisa").style.borderColor = "#ced4da";
            document.getElementById("txtVisa").style.borderWidth = "thin";
            $("#txtGovernment_error").html('');
            $("#txtGovernment_error").hide();
            return true;
        }
        else {
            document.getElementById("txtVisa").style.borderColor = "red";
            document.getElementById("txtVisa").style.borderWidth = "medium";
            $("#txtGovernment_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Visa Number").show();
            return false;
        }
    });
    $(function () {
        $("#txtDOB").datepicker({
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            showOn: 'button',
            buttonImageOnly: true,
            buttonImage: '/Content/images/calendar_icon.png',
            dateFormat: 'mm/dd/yy',
            yearRange: '1900:+0',
            onSelect: function (dateString, txtDate) {
                ValidateDOB(dateString);
                $(".btnNxt").removeAttr("disabled");
                $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
            }

        });
    });
    function ValidateDOB(dateString) {

        var lblError = $("#txtDOB_error");

        var parts = dateString.split("/");
        var dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
        var dtCurrent = new Date();
        lblError.html("")

        if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
            $(".btnNxt").attr('disabled', 'disabled');
            $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
            lblError.html("You must be at least 18 years old to sign up for electricity service.");

            return false;
        }

        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

            //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {

                lblError.html("You must be at least 18 years old to sign up for electricity service.");
                $(".btnNxt").attr('disabled', 'disabled');
                $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
                return false;
            }
            if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                lblError.html("You must be at least 18 years old to sign up for electricity service.");
                if (dtCurrent.getDate() < dtDOB.getDate()) {

                    $(".btnNxt").attr('disabled', 'disabled');
                    $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
                    return false;
                }
            }
        }

        lblError.html("");
        return true;
    }

    $('#SSNForm').on('blur keyup change', 'input', function (event) {
        $("#error").empty();
        formValidation();
        buttonValidation();
    });

    function buttonValidation() {
        if ($("#txtSSN").val() !== '') {
            document.getElementById("txtSSN").style.borderColor = "#ced4da";
            document.getElementById("txtSSN").style.borderWidth = "thin";
            $("#txtSSN_error").html('');
            $("#txtSSN_error").hide();
        }
        if ($("#txtDOB").val() !== '') {
            document.getElementById("txtDOB").style.borderColor = "#ced4da";
            document.getElementById("txtDOB").style.borderWidth = "thin";
            $("#txtDOB_error").html('');
            $("#txtDOB_error").hide();
        }
        var txtSSN = $("#txtSSN").val(); //grabs the value

        var my_txt = $("#txtSSN_error").text();
        var len = my_txt.length;

        var my_txt1 = $("#txtDOB_error").text();
        var len1 = my_txt1.length;
        //Passport
        if ($("#txtMilitary").val() != '' || $("#txtState").val() != '' || $("#txtDriver").val() != '' || $("#txtBirth").val() != '' || $("#txtConsulate").val() != '' || $("#txtPassport").val() != '' || $("#txtResident").val() != '' || $("#txtVisa").val() != '') {
            if ($("#txtDOB").val() !== '') {
                $(".btnNxt").removeAttr("disabled");
                $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else {
                $(".btnNxt").attr('disabled', 'disabled');
                $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }
        else {
            $(".btnNxt").attr('disabled', 'disabled');
            $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if ($("#txtSSN").val() !== '' && $("#txtDOB").val() !== '' && len === 0 && len1 === 0) {
            if (txtSSN.length == 11 || txtSSN.length == 9) {
                $(".btnNxt").removeAttr("disabled");
                $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else if ($("#txtSSN").val() === '' && $("#txtDOB").val() !== '') {

                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }


        if ($("#txtSSN").val() !== '' && $("#txtDOB").val() !== '' && len == 0 && len1 == 0) {

            if (txtSSN.length == 11 || txtSSN.length == 9) {
                $(".btnNxt").removeAttr("disabled");
                $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else if ($("#txtSSN").val() !== '' && $("#txtDOB").val() === '') {
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }


        if ($("#txtSSN").val() !== '' && $("#txtDOB").val() !== '') {
            if (txtSSN.length == 11 || txtSSN.length == 9) {
                $(".btnNxt").removeAttr("disabled");
                $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else {
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }
    }

    function formValidation() {
        $("#SSNForm").validate({
            rules: {
                txtSSN: {
                    required: true,
                },
                txtDOB: {
                    required: true,
                },
                txtPassport: {
                    required: true,
                },
                txtDriver: {
                    required: true,
                },
                txtState: {
                    required: true,
                },
                txtResident: {
                    required: true,
                },
                txtMilitary: {
                    required: true,
                },
                txtBirth: {
                    required: true,
                },
                txtConsulate: {
                    required: true,
                },
                txtVisa: {
                    required: true
                }
            },
            messages: {
                txtSSN: {
                    required: "SSN is required."
                },
                txtPassport: {
                    required: "Government ID is required."
                },
                txtDriver: {
                    required: "Government ID is required."
                },

                txtState: {
                    required: "Government ID is required."
                },

                txtResident: {
                    required: "Government ID is required."
                },

                txtMilitary: {
                    required: "Government ID is required."
                },

                txtBirth: {
                    required: "Government ID is required."
                },

                txtConsulate: {
                    required: "Government ID is required."
                },

                txtVisa: {
                    required: "Government ID is required."
                },
                txtDOB: {
                    required: "DOB is required.",
                },
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    for (const [key, value] of Object.entries(errorMap)) {
                        document.getElementById(key).style.borderColor = "red";
                        document.getElementById(key).style.borderWidth = "medium";
                        if (key == "txtDOB") {
                            document.getElementById("txtDOB_error").style.display = "block";
                            $("#txtDOB_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                        }
                        if (key == "txtPassport" || key == "txtDriver" || key == "txtState" || key == "txtResident" || key == "txtMilitary" || key == "txtBirth" || key == "txtConsulate" || key == "txtVisa") {
                            document.getElementById("txtGovernment_error").style.display = "block";
                            $("#txtGovernment_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                        }
                        if (key == "txtSSN") {
                            document.getElementById("txtSSN_error").style.display = "block";
                            $("#txtSSN_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                        }
                    }

                    var my_txt = $("#txtSSN_error").text();
                    var len = my_txt.length;

                    var my_txt1 = $("#txtDOB_error").text();
                    var len1 = my_txt1.length;

                    if (len > 0 || len1 > 0) {
                        $(".btnNext").attr('disabled', 'disabled');
                        $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
                    }

                }
            },
        });
    }
    var GoviD = false;

    var data = {
        "AccountNumber": accountNo,
        "BrandCode": BrandCode,
    };
    $.ajax({
        url: "https://apitest.frontierutilities.com/myaccountapi/Account/GetAccountDetailsNew",
        //url: "http://localhost:27570/Account/GetAccountDetailsNew",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            sessionStorage.setItem("BillingOptions", response.DocumentViaEmail);
            sessionStorage.setItem("AccountNumber", response.AccountNumber);
            sessionStorage.setItem("Email", response.Email);
            if ((response.Email === null || response.Email === "")) {
                if (response.SSN == "") {
                    GoviD = true;
                    $("#SSN_Valid").hide();
                    $("#Government_Valid").show();
                    $("#label_GovId").html(response.GovtIdentificationtype + "*");
                    $("#txtGovernment").attr('placeholder', response.GovtIdentificationtype);
                    if (response.GovtIdentificationtype == "Military ID") {
                        $("#txtMilitary").show();
                        $("#txtMilitary").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "State ID") {
                        $("#txtState").show();
                        $("#txtState").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Drivers License") {
                        $("#txtDriver").show();
                        $("#txtDriver").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Birth Certificate") {
                        $("#txtBirth").show();
                        $("#txtBirth").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Consulate ID") {
                        $("#txtConsulate").show();
                        $("#txtConsulate").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Passport") {
                        $("#txtPassport").show();
                        $("#txtPassport").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Resident Card") {
                        $("#txtResident").show();
                        $("#txtResident").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Visa") {
                        $("#txtVisa").show();
                        $("#txtVisa").attr('placeholder', response.GovtIdentificationtype);

                    }

                }
                else {
                    GoviD = false;
                    $("#SSN_Valid").show();
                    $("#Government_Valid").hide();
                }
            }
            else {
                if (response.SSN == "") {
                    GoviD = true;
                    $("#SSN_Valid").hide();
                    $("#Government_Valid").show();
                    $("#label_GovId").html(response.GovtIdentificationtype + "*");
                    if (response.GovtIdentificationtype == "Military ID") {
                        $("#txtMilitary").show();
                        $("#txtMilitary").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "State ID") {
                        $("#txtState").show();
                        $("#txtState").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Drivers License") {
                        $("#txtDriver").show();
                        $("#txtDriver").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Birth Certificate") {
                        $("#txtBirth").show();
                        $("#txtBirth").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Consulate ID") {
                        $("#txtConsulate").show();
                        $("#txtConsulate").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Passport") {
                        $("#txtPassport").show();
                        $("#txtPassport").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Resident Card") {
                        $("#txtResident").show();
                        $("#txtResident").attr('placeholder', response.GovtIdentificationtype);

                    }
                    else if (response.GovtIdentificationtype == "Visa") {
                        $("#txtVisa").show();
                        $("#txtVisa").attr('placeholder', response.GovtIdentificationtype);

                    }

                }
                else {
                    GoviD = false;
                    $("#SSN_Valid").show();
                    $("#Government_Valid").hide();
                }
            }

        },

    });

    $("#btnNxt").click(function () {
        var AccountNumber = sessionStorage.getItem("AccountNumber");
        var EmptyEmail = sessionStorage.getItem("EmptyEmail");
        var hnProdUrl = document.getElementById("hnProdUrl").value;
        var Email = sessionStorage.getItem("Email");
        var BrandCode = document.getElementById("getbrandUrl").value;

        var Dob = sessionStorage.getItem("Dob");
        if (Dob == "Invalid date format") {
            return false;
        }
        if (GoviD == false) {
            var Val_date = document.getElementById("txtDOB").value;
            var data = {
                "AccountNumber": AccountNumber,
                "SSN": $("#txtSSN").val(),
                "DOB": Val_date,
                "BrandCode": BrandCode,
            };
            $.ajax({
               url: "https://apitest.frontierutilities.com/myaccountapi/Account/ValidateSSN",
                //url: "http://localhost:27570/Account/ValidateSSN",

                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    if (response.resultCode == 1) {
                        if (EmptyEmail == "2") {
                            sessionStorage.setItem("AccountNumber", AccountNumber)
                            window.location.href = hnProdUrl + '/Account/EmailNotReceived';
                        }
                        else {
                            window.location = hnProdUrl + '/Account/CreatePassword';
                        }
                    }
                    else if (response.resultMessage == "Invalid Date of Birth") {
                        $("#txtDOB_error").empty();
                        $("#txtDOB_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                        document.getElementById("txtSSN").style.borderColor = "red";
                        document.getElementById("txtSSN").style.borderWidth = "medium";
                        return false;
                    }
                    else {
                        $("#txtSSN_error").empty();
                        $("#txtSSN_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                        document.getElementById("txtSSN").style.borderColor = "red";
                        document.getElementById("txtSSN").style.borderWidth = "medium";
                        return false;
                    }
                },

            });
        }
        else {
            var Textdata;
            if ($("#txtMilitary").val() != '') {
                Textdata = $("#txtMilitary").val();
            }
            if ($("#txtState").val() != '') {
                Textdata = $("#txtState").val();
            }
            if ($("#txtDriver").val() != '') {
                Textdata = $("#txtDriver").val();
            }
            if ($("#txtBirth").val() != '') {
                Textdata = $("#txtBirth").val();
            }
            if ($("#txtConsulate").val() != '') {
                Textdata = $("#txtConsulate").val();
            }
            if ($("#txtPassport").val() != '') {
                Textdata = $("#txtPassport").val();
            }
            if ($("#txtResident").val() != '') {
                Textdata = $("#txtResident").val();
            }
            if ($("#txtVisa").val() != '') {
                Textdata = $("#txtVisa").val();
            }
            var Val_date = document.getElementById("txtDOB").value;
            var data = {
                "AccountNumber": AccountNumber,
                "GovtIdentityNumber": Textdata,
                "DOB": Val_date,
                "BrandCode": BrandCode,
            };
            $.ajax({
                url: "https://apitest.frontierutilities.com/myaccountapi/Account/ValidateGovernmentId",
                //url: "http://localhost:27570/Account/ValidateGovernmentId",

                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    if (response.resultCode == 1) {

                        if (EmptyEmail == "2") {
                            sessionStorage.setItem("AccountNumber", AccountNumber)
                            window.location.href = hnProdUrl + '/Account/EmailNotReceived';
                        }
                        else {
                            window.location = hnProdUrl + '/Account/CreatePassword';
                        }
                    }
                    else if (response.resultMessage != "Invalid Date of Birth") {
                        $("#txtDOB_error").empty();
                        $("#txtGovernment_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                        $(".btnNxt").removeAttr("disabled");
                        $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
                        document.getElementById("txtPassport").style.borderColor = "red";
                        document.getElementById("txtPassport").style.borderWidth = "medium";
                        return false;
                    }
                    else {
                        $(".btnNxt").removeAttr("disabled");
                        $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
                        $("#txtGovernment_error").empty();
                        $("#txtDOB_error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                        return false;
                    }
                }
            });
        }
    });

    $("#txtSSN").on("keydown keyup", function (e) {
        $(this).prop("value", function (i, o) {
            if (o.length < 7) {
                return o.replace(/\d/g, "XXX-XX-")
                $("#txtSSN_error").hide();
            }
        })
    })

    $("#txtSSN").blur(function () {
        $("#txtSSN_error").empty();
        var txtSSN = $("#txtSSN").val(); //grabs the value
        if (txtSSN != '') {
            if (txtSSN.length != 0 && (txtSSN.length == 11 || txtSSN.length == 9)) {

                if (txtSSN.length == 9) {
                    var res = txtSSN,
                        len = res.length,
                        stars = len > 0 ? len > 1 ? len > 2 ? len > 3 ? len > 4 ? 'XXX-XX-' : 'XXX-X' : 'XXX-' : 'XX' : 'X' : '', //this provides the masking and formatting
                        result = stars + res.substring(5);
                    $("#txtSSN").val(result);
                    $("#txtSSN_error").hide();
                }
                else {

                    $("#txtSSN_error").hide();
                    document.getElementById("txtSSN").style.borderColor = "red";
                    document.getElementById("txtSSN").style.borderWidth = "medium";
                }
            }
            else {
                $("#txtSSN_error").html("<i class='fas fa-exclamation-triangle'></i>" + " Please enter no more than 9 characters.").show();
                document.getElementById("txtSSN").style.borderColor = "red";
                document.getElementById("txtSSN").style.borderWidth = "medium";
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }
    });
    $("#txtPassport").blur(function () {
        var txtdob = $("#txtDOB").val();
        var txtSSN = $("#txtPassport").val();
        if (txtSSN != '' && txtdob != '') {
            $(".btnNxt").removeAttr("disabled");
            $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });
    $("#txtState").blur(function () {
        var txtdob = $("#txtDOB").val();
        var txtState = $("#txtState").val();
        if (txtState != '' && txtdob != '') {
            $(".btnNxt").removeAttr("disabled");
            $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });
    $("#txtResident").blur(function () {
        var txtdob = $("#txtDOB").val();
        var txtResident = $("#txtResident").val();
        if ((txtResident != '' && txtResident != null) && (txtdob != '' && txtdob != null)) {
            $(".btnNxt").removeAttr("disabled");
            $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else {
            $(".btnNxt").attr('disabled', 'disabled');
            $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });
    //function getMaskedAccountnumber(accountnumber) {
    //    let mask = "*****";
    //    let maskLen = Math.min(Math.max(accountnumber / 2, 2), 4);
    //    let start = 0;
    //    return mask.substring(0, maskLen) + accountnumber.substring(0, start) + accountnumber.substring(maskLen + start);

    //}
    //Show AccountNumber Mask behavior
    function getMaskedAccountnumber(accountnumber) {
        let skipFirstChars = 4;
        let firstThreeChar = accountnumber.slice(0, skipFirstChars);
        let domainIndexStart = accountnumber.lastIndexOf("");
        let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart)
        maskedEmail = maskedEmail.replace(/./g, '*')
        let domainPlusPreviousChar = accountnumber.slice(domainIndexStart, accountnumber.length);
        return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
    }
});

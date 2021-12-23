$(document).ready(function () {
    var MaskedEmail = getMaskedAccountnumber(sessionStorage.getItem("accountForRegistration"));

    $('#headerAccount').append(MaskedEmail);

    function getMaskedAccountnumber(accountnumber) {
        let skipFirstChars = 3;
        let firstThreeChar = accountnumber.slice(0, skipFirstChars);
        let domainIndexStart = accountnumber.lastIndexOf("");
        let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart - 1)
        maskedEmail = maskedEmail.replace(/./g, '*')
        let domainPlusPreviousChar = accountnumber.slice(domainIndexStart - 1, accountnumber.length);
        return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
    }
    
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxComplete(function () {
            $('#AjaxLoader').hide();
        });

    $(".btnContinue").attr('disabled', 'disabled');

    $("#txtAccountNumber").keyup(function () {
        var my_txt = $(this).val();
        var len = my_txt.length;

        if (len < 8) {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }

        document.getElementById("txtAccountNumber").style.removeProperty("border-color");
        document.getElementById("txtAccountNumber").style.removeProperty("border-width");
        $("#errorAccountNumber").html('');
        $("#errorAccountNumber").hide();
    });

    $('#txtAccountNumber').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode

        if (String.fromCharCode(charCode).match(/[^0-9]/g))

            return false;

    });

    $('#registerForm').on('blur keyup change', 'input', function (event) {
        $("#errorAccountNumber").empty();
        formValidation();
        buttonValidation();
        //Validate();
    });

    //function Validate() {
    //    var x = $('#txtAccountNumber').val();

    //    if (x != "") {
    //        if (x.charAt(0) != "2" && x.charAt(0) != "3") {
    //            $(".btnContinue").attr('disabled', 'disabled');
    //            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
    //            $("#errorAccountNumber").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid account number").show();
    //            document.getElementById("txtAccountNumber").style.borderColor = "red";
    //            document.getElementById("txtAccountNumber").style.borderWidth = "medium";
    //            $("#errorAccountNumber").show();
    //            return false
    //        }
    //        else if (x.length < 8) {
    //            $(".btnContinue").attr('disabled', 'disabled');
    //            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
    //        }
    //        else {

    //            $(".btnContinue").removeAttr("disabled");
    //            document.getElementById("txtAccountNumber").style.borderColor = "#ced4da";
    //            document.getElementById("txtAccountNumber").style.borderWidth = "thin";
    //            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
    //        }
    //    }
    //}


    function buttonValidation() {

        var my_txt = $("#txtAccountNumber").val();
        var len = my_txt.length;

        if ($("#txtAccountNumber").val() !== '' && len == 8 && $('#registerForm').validate().checkForm()) {

            $(".btnContinue").removeAttr("disabled");
            document.getElementById("txtAccountNumber").style.borderColor = "#ced4da";
            document.getElementById("txtAccountNumber").style.borderWidth = "thin";
            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtUtxtAccountNumberser").val() === '') {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }

    }
    function formValidation() {
        $("#registerForm").validate({
            rules: {
                accountnumber: {
                    required: true,
                }
            },
            messages: {
                accountnumber: {
                    required: "Account Number is required",
                },
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    document.getElementById("txtAccountNumber").style.borderColor = "red";
                    document.getElementById("txtAccountNumber").style.borderWidth = "medium";
                    document.getElementById("errorAccountNumber").style.display = "block";
                    $("#errorAccountNumber").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                }
            },
        });
    }
    var hnProdUrl = document.getElementById("hnProdUrl").value;
    var BrandCode = document.getElementById("getbrandUrl").value;
    var FirstName = $.cookie('HeaderLastName');

    if ($("#txtAccountNumber").val() != "" || $("#txtAccountNumber").val() != null) {

        //$(".btnContinue").removeAttr("disabled");
        document.getElementById("txtAccountNumber").style.borderColor = "#ced4da";
        document.getElementById("txtAccountNumber").style.borderWidth = "thin";
        //$(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
    }
    $("#btnNxt").click(function () {
        var data = {
            "EmailAddress": $("#txtUser").val(),
            "ValidationType": "string",
            "Brand": "string",
            "brandCode": BrandCode,
            "FirstName": FirstName

        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/MyAccountAPI/User/SendEmail",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.resultCode === 1) {
                    window.location = hnProdUrl + '/Account/MailSent';

                }
                else if (response.resultCode === -3) {
                    $("#Error").text("Internal service error").show();
                }
                else {
                    $("#Error").text(response.resultMessage).show();
                }
            },

        });
    });
    var BrandCode = document.getElementById("getbrandUrl").value;


    $("#btnContinue").click(function () {
        var accountNo = $("#txtAccountNumber").val();
        var data = {
            "AccountNumber": accountNo,
            "BrandCode": BrandCode,
        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/myaccountapi/Account/GetAccountDetailsNew",
            ///url: "http://localhost:27570/Account/GetAccountDetailsNew",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.AccountNumber == accountNo) {
                    sessionStorage.setItem("AccountNumber", response.AccountNumber);
                    sessionStorage.setItem("Email", response.Email);
                    window.location = hnProdUrl + '/Account/SSNVerify/?accountNo=' + response.AccountNumber;
                }
                else {
                    $("#errorAccountNumber").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " Please verify your entry. That account number is not associated with the email address entered").show();
                    document.getElementById("txtAccountNumber").style.borderColor = "red";
                    document.getElementById("txtAccountNumber").style.borderWidth = "medium";
                }
            },
        });
    });
});
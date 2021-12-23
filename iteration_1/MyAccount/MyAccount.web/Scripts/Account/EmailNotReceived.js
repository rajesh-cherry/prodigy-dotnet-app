
$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxStop(function () {
            $('#AjaxLoader').hide();
        });
    var FirstName = $.cookie('HeaderLastName');
    $("#btnsubscription").click(function () {
        $("#SubscriptionPopup").show();
    });


    $('.close').click(function () {
        $("#SubscriptionPopup").hide();
    });

    $('#chkTCPA').change(function () {
        var rememberMe = $('#chkTCPA').prop('checked');

        if (rememberMe) {
            $(".btnNxt").removeAttr("disabled");
            $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");

        }
        else {
            $(".btnNxt").attr('disabled', 'disabled');
            $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });
    $(".btnContinue").attr('disabled', 'disabled');
    var AccNo = sessionStorage.getItem("AccountNumber")
    var AccountNumber = getMaskedAccountnumber(AccNo);
    $('#headerAccount').append(AccountNumber);

    function getMaskedAccountnumber(accountnumber) {
        let skipFirstChars = 4;
        let firstThreeChar = accountnumber.slice(0, skipFirstChars);
        let domainIndexStart = accountnumber.lastIndexOf("");
        let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart)
        maskedEmail = maskedEmail.replace(/./g, '*')
        let domainPlusPreviousChar = accountnumber.slice(domainIndexStart, accountnumber.length);
        return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
    }

    //$('#emailNotReceivedForm').on('blur keyup change', 'input', function (event) {
    $("input#txtUser").on("keyup", function (e) {
        $("#error").empty();
        document.getElementById("txtUser").style.borderColor = "#ced4da";
        document.getElementById("txtUser").style.borderWidth = "thin";
        formValidation();
        buttonValidation();
        checkEmail();
    });

    function buttonValidation() {
        var rememberMe = $('#chkTCPAEmail').prop('checked');
        if ($("#txtUser").val() !== '' && $('#emailNotReceivedForm').validate().checkForm() && rememberMe) {
            $(".btnContinue").removeAttr("disabled");
            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if (($("#txtUser").val() === '') || rememberMe == false) {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    }

    $('#chkTCPAEmail').change(function () {
        var rememberMe = $('#chkTCPAEmail').prop('checked');

        if (rememberMe && $("#txtUser").val() !== '') {
            $(".btnContinue").removeAttr("disabled");
            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");

        }
        else {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });


    function checkEmail() {

        var email = document.getElementById('txtUser').value;
        var regex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
        // var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,3})?$/;
        //  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var substringIndex = email.indexOf("@");
        var substring = email.substring(substringIndex, email.length);
        var lastindex = substring.lastIndexOf(".");
        var index = substring.indexOf(".");
        if (email.match(regex)) {
            return true;
        }
        else {

            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
            document.getElementById("txtUser").style.borderColor = "red";
            document.getElementById("txtUser").style.borderWidth = "medium";
            document.getElementById("error").style.display = "block";
            $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + "Please check that your email was entered correctly");
            return false;
        }
    }



    function formValidation() {
        $("#emailNotReceivedForm").validate({
            //rules: {
            //    email: {
            //        required: true
            //    },
            //},
            //messages: {
            //    email: {
            //        required: "Invalid Email"
            //    },
            //},
            //showErrors: function (errorMap, errorList) {
            //    if (errorList.length) {
            //        document.getElementById("txtUser").style.borderColor = "red";
            //        document.getElementById("txtUser").style.borderWidth = "medium";
            //        document.getElementById("error").style.display = "block";
            //        $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
            //    }
            //},
            rules: {
                User: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                User: {
                    required: "Email is required",
                    email: "Please check that your email was entered correctly",
                },
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    document.getElementById("txtUser").style.borderColor = "red";
                    document.getElementById("txtUser").style.borderWidth = "medium";
                    document.getElementById("error").style.display = "block";
                    $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                    var my_txt = $("#error").text();
                    var len = my_txt.length;

                    if (len > 0) {
                        $(".btnContinue").attr('disabled', 'disabled');
                        $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
                    }
                }
            },
        });
    }
    var BrandCode = document.getElementById("getbrandUrl").value;

    var hnProdUrl = document.getElementById("hnProdUrl").value;
    
  
    var FirstName = $.cookie('HeaderLastName');

    $("#btnContinue").click(function () {
        var data = {
            "email": $("#txtUser").val(),
            "AccountNo": AccNo,
        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/MyAccountAPI/User/UpdateEmailMobile",
            //url: "http://localhost:27570/User/UpdateEmailMobile",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                // TODO 
                //** Change the validation type after conformation
                if (response.Status === '1') {
                    var data = {
                        "EmailAddress": $("#txtUser").val(),
                        "ValidationType": "Enrole",
                        "Brand": "",
                        "brandCode": BrandCode,
                        "AccountNo": AccNo,
                        "FirstName": FirstName
                    };
                    $.ajax({
                        url: "https://apitest.frontierutilities.com/MyAccountAPI/User/SendEmail",
                        //url: "http://localhost:27570/User/SendEmail",

                        type: "POST",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (response) {
                            if (response.resultCode === 1) {
                                sessionStorage.setItem("Email", $("#txtUser").val())
                                window.location = hnProdUrl + '/Account/MailSentSuccessful';
                            }
                            else if (response.resultCode === -3) {
                                $("#error").text("Internal service error").show();
                            }
                            else {
                                $("#error").text(response.resultMessage).show();
                            }
                        },
                    });
                }
                else {
                    $("#error").text("Account not found").show();
                    document.getElementById("txtUser").style.borderColor = "red";
                    document.getElementById("txtUser").style.borderWidth = "medium";
                }
            },
        });
    });
    
    $("#btnNxt").click(function () {
        var data = {
            "cust_no": AccNo,
            "brandCode": BrandCode,
            "productAndServices": $('#chkProductAndServices').prop('checked'),
            "energyEfficiency": $('#chkEnergyEfficiency').prop('checked'),
            "thirdParty": $('#chkThirdParty').prop('checked'),
            "autoPayment": $('#chkAutoPayment').prop('checked'),
            "monthlyBill": $('#chkMonthlyBill').prop('checked'),
            "requestLetter": $('#chkRequestLetter').prop('checked'),
            "isactive": $('#chkTCPA').prop('checked'),
            "modifiedby": FirstName,
            "createdby": FirstName
        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/MyAccountAPI/User/AddSubscriptions",
            //url: "http://localhost:27570/User/AddSubscriptions",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                // TODO 
                //** Change the validation type after conformation
                if (response.resultCode === 1) {
                    //$("#SubscriptionPopup").modal('hide');
                   $('#chkProductAndServices').prop('checked',false),
                     $('#chkEnergyEfficiency').prop('checked',false),
                        $('#chkThirdParty').prop('checked',false),
                        $('#chkAutoPayment').prop('checked',false),
                        $('#chkMonthlyBill').prop('checked',false),
                         $('#chkRequestLetter').prop('checked',false),
                         $('#chkTCPA').prop('checked',false),
                    $("#SubscriptionPopup").hide();


                }
            },
        });
    });
});
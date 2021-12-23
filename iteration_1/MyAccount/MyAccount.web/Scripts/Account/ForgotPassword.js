
$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxComplete(function () {
            $('#AjaxLoader').hide();
        });

    phone = getMaskedAccountnumber(sessionStorage.getItem('phone').toString());

    email = getMaskedEmail(sessionStorage.getItem('email').toString()).toLowerCase();
    var selectedPhone = '';
    var selectedEmail = '';

    var ischeck = $("input[type=radio][name='radiobutton']:checked").val();
   

    $('#phoneSelected').addClass("fas fa-check ");
    $("#headerPhone").addClass("text_primary");
    $("#headerEmail").removeClass("text_primary");
    $('#emailSelected').removeClass("fas fa-check ");
    selectedPhone = phone;
    selectedEmail = '';

    function ucphone(text) {
        text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        return text;
    }
    phoneformat = ucphone(sessionStorage.getItem('phone').toString());
    maskedphone = getMaskedAccountnumber(phoneformat);
    $('#headerPhone').append(maskedphone);
    $("#headerEmail").append(email);

    $(".btnContinue").attr('disabled', 'disabled');

    //$('#forgotform').on('blur keyup change', 'input', function (event) {
    //    $(".btncontinue").attr('disabled', 'disabled');
    //    $(".btncontinue").removeclass("btn_primary").addclass("btn_primary_outline");
    //});

    $('#phone, #email').keyup(function () {

        if ($('#phoneSelected').val() != '' && $('#emailSelected').val() != '') {
            $(".btnContinue").removeAttr("disabled");
            document.getElementById("txtUser").style.borderColor = "#ced4da";
            document.getElementById("txtUser").style.borderWidth = "thin";
            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });

    //$('#forgotform').on('blur keyup change', 'input', function (event) {
    //    $("#error").emppty();
    //    //formvalidation();
    //    buttonvalidation();
    //});
    //$("#phone").text(function (i, text) {
    //    function buttonValidation()
    //    text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    //    return text;
    //});
    $('#phone').click(function (event) {
        $('#phoneSelected').addClass("fas fa-check ");
        $("#headerPhone").addClass(" text_primary");
        $("#headerEmail").removeClass("text_primary");
        $('#emailSelected').removeClass("fas fa-check ");
        selectedPhone = phone;
        selectedEmail = '';
    });
    $('#email').click(function (event) {
        $('#emailSelected').addClass("fas fa-check ");
        $('#phoneSelected').removeClass("fas fa-check ");
        $("#headerPhone").removeClass(" text_primary");
        $("#headerEmail").addClass("text_primary");
        selectedPhone = '';
        selectedEmail = email;
    });

    // Change Submit Btn Status
    $("#btnContinue").attr('disabled', 'disabled');
    var rad = document.forgotForm.radiobutton;
    for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            $("#btnContinue").removeAttr("disabled");
            $("#btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        });
    }


    function formValidation() {
        $("#forgotForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Email is required",
                    email: "Enter a valid email"
                }
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    document.getElementById("txtUser").style.borderColor = "red";
                    document.getElementById("txtUser").style.borderWidth = "medium";
                    document.getElementById("error").style.display = "block";
                    $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                }
            },
        });
    }
    var hnProdUrl = document.getElementById("hnProdUrl").value;
    var BrandCode = document.getElementById("getbrandUrl").value;

    if (ischeck == "on")
    {
        $("#btnContinue").removeAttr("disabled");
        $("#btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
    }

    var FirstName = $.cookie('HeaderLastName');

    if (FirstName != null) {
        FirstName = ucfirst(FirstName);
    }
    
    $("#btnContinue").click(function () {
        if (selectedPhone == "") {
            var data = {
                "EmailAddress": sessionStorage.getItem('email').toString(),
                "ValidationType": "Forgot",
                "Brand": "",
                "brandCode": BrandCode,
                "FirstName": FirstName
            };

            $.ajax({
                //url: "http://localhost:27570/User/SendEmail",
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
        }

        else if (selectedEmail == "") {
            var data = {
                "MobileNumber": sessionStorage.getItem('phone').toString(),
                "EmailAddress": sessionStorage.getItem('email').toString(),
                "Brand": "string",
                "brandCode": BrandCode
            };
            $.ajax({
                //url: "http://localhost:27570/User/SendSMS",
                url: "https://apitest.frontierutilities.com/MyAccountAPI/User/SendSMS",

                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",

                success: function (response) {
                    if (response.resultCode === 1) {
                        window.location = hnProdUrl + '/Account/VerifyOtp';
                    }
                    else if (response.resultCode === -3) {
                        $("#Error").text("Internal service error").show();
                    }
                    else {
                        $("#Error").text(response.resultMessage).show();
                    }
                },
            });
        }
    });

    //Assiging PhoneNumber & Email textbox Values
    //$("#txtPhoneNumber").val(sessionStorage.getItem("phone"));
    //$("#txtUser").val(sessionStorage.getItem("email"));

    function ucfirst(str) {
        str = true ? str.toLowerCase() : str;
        return str.replace(/(\b)([a-zA-Z])/,
            function (firstLetter) {
                return firstLetter.toUpperCase();
            });
    }

    function getMaskedEmail(email) {
        //let mask = "*****";
        //let at = email.indexOf("@");
        //if (at > 2) {
        //    let maskLen = Math.min(Math.max(at / 2, 2), 4);
        //    let start = (at - maskLen) / 2;
        //    return email.substring(0, start) + mask.substring(0, maskLen) + email.substring(start + maskLen);
        //}
        //return email;

        let maskedemail = email.split('');
        let finalArr = [];
        let len = maskedemail.indexOf('@');
        maskedemail.forEach((item, pos) => {
            (pos >= 1 && pos <= len - 2) ? finalArr.push('*') : finalArr.push(maskedemail[pos]);
        })
        maskedemail = finalArr.join('');

        return maskedemail;


    }

    //Show AccountNumber Mask behavior
    function getMaskedAccountnumber(accountnumber) {
        let skipFirstChars = 10;
        let firstThreeChar = accountnumber.slice(0, skipFirstChars);
        let domainIndexStart = accountnumber.lastIndexOf("");
        let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart)
        maskedEmail = maskedEmail.replace(/./g, '*')
        let domainPlusPreviousChar = accountnumber.slice(domainIndexStart, accountnumber.length);
        return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
    }


});


$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxComplete(function () {
            $('#AjaxLoader').hide();
        });

    phone = getMaskedAccountnumber(sessionStorage.getItem('phone').toString());

    email = getMaskedEmail(sessionStorage.getItem('email').toString()).toLowerCase();
    var selectedPhone = '';
    var selectedEmail = '';

    var ischeck = $("input[type=radio][name='radiobutton']:checked").val();
   

    $('#phoneSelected').addClass("fas fa-check ");
    $("#headerPhone").addClass("text_primary");
    $("#headerEmail").removeClass("text_primary");
    $('#emailSelected').removeClass("fas fa-check ");
    selectedPhone = phone;
    selectedEmail = '';

    function ucphone(text) {
        text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        return text;
    }
    phoneformat = ucphone(sessionStorage.getItem('phone').toString());
    maskedphone = getMaskedAccountnumber(phoneformat);
    $('#headerPhone').append(maskedphone);
    $("#headerEmail").append(email);

    $(".btnContinue").attr('disabled', 'disabled');

    //$('#forgotform').on('blur keyup change', 'input', function (event) {
    //    $(".btncontinue").attr('disabled', 'disabled');
    //    $(".btncontinue").removeclass("btn_primary").addclass("btn_primary_outline");
    //});

    $('#phone, #email').keyup(function () {

        if ($('#phoneSelected').val() != '' && $('#emailSelected').val() != '') {
            $(".btnContinue").removeAttr("disabled");
            document.getElementById("txtUser").style.borderColor = "#ced4da";
            document.getElementById("txtUser").style.borderWidth = "thin";
            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    });

    //$('#forgotform').on('blur keyup change', 'input', function (event) {
    //    $("#error").emppty();
    //    //formvalidation();
    //    buttonvalidation();
    //});
    //$("#phone").text(function (i, text) {
    //    function buttonValidation()
    //    text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    //    return text;
    //});
    $('#phone').click(function (event) {
        $('#phoneSelected').addClass("fas fa-check ");
        $("#headerPhone").addClass(" text_primary");
        $("#headerEmail").removeClass("text_primary");
        $('#emailSelected').removeClass("fas fa-check ");
        selectedPhone = phone;
        selectedEmail = '';
    });
    $('#email').click(function (event) {
        $('#emailSelected').addClass("fas fa-check ");
        $('#phoneSelected').removeClass("fas fa-check ");
        $("#headerPhone").removeClass(" text_primary");
        $("#headerEmail").addClass("text_primary");
        selectedPhone = '';
        selectedEmail = email;
    });

    // Change Submit Btn Status
    $("#btnContinue").attr('disabled', 'disabled');
    var rad = document.forgotForm.radiobutton;
    for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            $("#btnContinue").removeAttr("disabled");
            $("#btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        });
    }


    function formValidation() {
        $("#forgotForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Email is required",
                    email: "Enter a valid email"
                }
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    document.getElementById("txtUser").style.borderColor = "red";
                    document.getElementById("txtUser").style.borderWidth = "medium";
                    document.getElementById("error").style.display = "block";
                    $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);
                }
            },
        });
    }
    var hnProdUrl = document.getElementById("hnProdUrl").value;
    var BrandCode = document.getElementById("getbrandUrl").value;

    if (ischeck == "on")
    {
        $("#btnContinue").removeAttr("disabled");
        $("#btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
    }

    var FirstName = $.cookie('HeaderLastName');

    if (FirstName != null) {
        FirstName = ucfirst(FirstName);
    }
    
    $("#btnContinue").click(function () {
        if (selectedPhone == "") {
            var data = {
                "EmailAddress": sessionStorage.getItem('email').toString(),
                "ValidationType": "Forgot",
                "Brand": "",
                "brandCode": BrandCode,
                "FirstName": FirstName
            };

            $.ajax({
                //url: "http://localhost:27570/User/SendEmail",
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
        }

        else if (selectedEmail == "") {
            var data = {
                "MobileNumber": sessionStorage.getItem('phone').toString(),
                "EmailAddress": sessionStorage.getItem('email').toString(),
                "Brand": "string",
                "brandCode": BrandCode
            };
            $.ajax({
                //url: "http://localhost:27570/User/SendSMS",
                url: "https://apitest.frontierutilities.com/MyAccountAPI/User/SendSMS",

                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",

                success: function (response) {
                    if (response.resultCode === 1) {
                        window.location = hnProdUrl + '/Account/VerifyOtp';
                    }
                    else if (response.resultCode === -3) {
                        $("#Error").text("Internal service error").show();
                    }
                    else {
                        $("#Error").text(response.resultMessage).show();
                    }
                },
            });
        }
    });

    //Assiging PhoneNumber & Email textbox Values
    //$("#txtPhoneNumber").val(sessionStorage.getItem("phone"));
    //$("#txtUser").val(sessionStorage.getItem("email"));

    function ucfirst(str) {
        str = true ? str.toLowerCase() : str;
        return str.replace(/(\b)([a-zA-Z])/,
            function (firstLetter) {
                return firstLetter.toUpperCase();
            });
    }

    function getMaskedEmail(email) {
        //let mask = "*****";
        //let at = email.indexOf("@");
        //if (at > 2) {
        //    let maskLen = Math.min(Math.max(at / 2, 2), 4);
        //    let start = (at - maskLen) / 2;
        //    return email.substring(0, start) + mask.substring(0, maskLen) + email.substring(start + maskLen);
        //}
        //return email;

        let maskedemail = email.split('');
        let finalArr = [];
        let len = maskedemail.indexOf('@');
        maskedemail.forEach((item, pos) => {
            (pos >= 1 && pos <= len - 2) ? finalArr.push('*') : finalArr.push(maskedemail[pos]);
        })
        maskedemail = finalArr.join('');

        return maskedemail;
    }

    //Show AccountNumber Mask behavior
    function getMaskedAccountnumber(accountnumber) {
        let skipFirstChars = 10;
        let firstThreeChar = accountnumber.slice(0, skipFirstChars);
        let domainIndexStart = accountnumber.lastIndexOf("");
        let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart)
        maskedEmail = maskedEmail.replace(/./g, '*')
        let domainPlusPreviousChar = accountnumber.slice(domainIndexStart, accountnumber.length);
        return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
    }
});



$(document).ready(function () {
    var Ispasswordchk = false;
    var ppuccolour = false;
    var ppncolour = false;
    var ppscolour = false;
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxSuccess(function () {
            $('#AjaxLoader').hide();
        });
    $(".btnNext").attr('disabled', 'disabled');

    $('#createpasswordForm').on('blur keyup change', 'input', function (event) {
        $("#error").empty();
        formValidation();
        buttonValidation();
    });

    function buttonValidation() {
        if ($("#txtPassword").val() !== '' && $("#txtConfirmPassword").val() !== '' && $('#createpasswordForm').validate().checkForm()) {
            if (Ispasswordchk && ppuccolour == false && ppncolour == false && ppscolour == false) {

                $(".btnNext").removeAttr("disabled");
                $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else {
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }
        else if ($("#txtPassword").val() === '' && $("txtConfirmPassword").val() === '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        else if ($("txtConfirmPassword").val() === $("#txtPassword").val() && $('#createpasswordForm').validate().checkForm() && ppcolour == false) {

            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
    }

    document.getElementById('txtPassword').onkeypress = function () {
        var char = String.fromCharCode(event.which);
        if (char.match(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])|\s/)) {
            event.preventDefault();
        }
    };

    $("#show_password_new").click(function () {
        if ($("#txtPassword").attr("type") === "password") {
            $("#txtPassword").attr("type", "text");
            $('.newIcon').removeClass('far fa-eye-slash').addClass('far fa-eye');
        } else {
            $("#txtPassword").attr("type", "password");
            $('.newIcon').removeClass('far fa-eye').addClass('far fa-eye-slash');
        }
    })

    $("#show_password_confirm").click(function () {
        if ($("#txtConfirmPassword").attr("type") === "password") {
            $("#txtConfirmPassword").attr("type", "text");
            $('.confirmIcon').removeClass('far fa-eye-slash').addClass('far fa-eye');
        } else {
            $("#txtConfirmPassword").attr("type", "password");
            $('.confirmIcon').removeClass('far fa-eye').addClass('far fa-eye-slash');
        }
    })

    function formValidation() {
        $("#createpasswordForm").validate({
            rules: {
                NewPassword: {
                    required: true
                },
                ConfirmPassword: {
                    required: true,
                    equalTo: "#txtPassword"
                },
            },
            messages: {
                NewPassword: {
                    required: "New Password is required",
                    email: "Invalid Email",
                },
                ConfirmPassword: {
                    required: "Confirm Password is required",
                    email: "Invalid Email",
                    equalTo: "Password doesn't match"


                },
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    document.getElementById("error").style.display = "block";
                    document.getElementById("txtConfirmPassword").style.borderColor = "red";
                    document.getElementById("txtConfirmPassword").style.borderWidth = "medium";
                    $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " " + errorList[0].message);

                    $(".btnNext").attr('disabled', 'disabled');
                    $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
                }
                else {
                    document.getElementById("error").style.display = "block";
                    document.getElementById("txtConfirmPassword").style.borderColor = "#ced4da";
                    document.getElementById("txtConfirmPassword").style.borderWidth = "thin";

                }
            },

        });
    }
    $("#txtPassword").on('keyup', ValidatePassword);
    function ValidatePassword() {

        var rules = [
            {
                Pattern: "",
                Target: "Empty"
            },
            {
                Pattern: "(?=.*[a-z])(?=.*[A-Z])",
                Target: "UpperCase"
            },

            {
                Pattern: "[0-9]",
                Target: "Numbers"
            },
            {
                Pattern: "[!@@#$%^&*]",
                Target: "Symbols"
            }
        ];
        var password = $(this).val();
        if (password.length >= 8) {
            Ispasswordchk = true;
        }
        else {
            Ispasswordchk = false;
        }

        $("#Length").attr('src', password.length >= 8 ? "../Content/images/password_green.png" : "../Content/images/password_red.png");

        for (var i = 0; i < rules.length; i++) {
            $("#" + rules[i].Target).attr('src', new RegExp(rules[i].Pattern).test(password) ? "../Content/images/password_green.png" : "../Content/images/password_red.png");
            $("#" + rules[i].Target).attr('src', new RegExp(rules[i].Pattern).test(password) ? "../Content/images/password_green.png" : "../Content/images/password_red.png");
            $("#" + rules[i].Target).attr('src', new RegExp(rules[i].Pattern).test(password) ? "../Content/images/password_green.png" : "../Content/images/password_red.png");

            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_red.png" && rules[i].Target == "UpperCase") {
                ppuccolour = true;
            }
            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_red.png" && rules[i].Target == "Numbers") {
                ppncolour = true;
            }
            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_red.png" && rules[i].Target == "Symbols") {
                ppscolour = true;
            }
            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_green.png" && rules[i].Target == "UpperCase") {
                ppuccolour = false;
            }
            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_green.png" && rules[i].Target == "Numbers") {
                ppncolour = false;
            }
            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_green.png" && rules[i].Target == "Symbols") {
                ppscolour = false;
            }

        }

        //$("#Length").attr(password.length >= 8 ? "glyphicon-ok" : "glyphicon-remove");
        //for (var i = 0; i < rules.length; i++) {
        //    $("#" + rules[i].Target).addClass(new RegExp(rules[i].Pattern).test(password) ? "glyphicon-xx" : "glyphicon-xx");
        //    $("#" + rules[i].Target).removeClass(new RegExp(rules[i].Pattern).test(password) ? "glyphicon-remove" : "glyphicon-ok");
        //    $("#" + rules[i].Target).addClass(new RegExp(rules[i].Pattern).test(password) ? "glyphicon-ok" : "glyphicon-remove");
        //}
    }

    var result = $("#strength");
    $('#txtPassword').keyup(function () {
        $(".result").html(checkStrength($('#txtPassword').val()))
    })

    //function checkStrength(password) {
    //    var strength = 0
    //    if (password.length == 0) {
    //        result.removeClass()
    //        return 'Password strength indicator'
    //    }
    //    if (password.length > 7) strength += 1
    //    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
    //    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
    //    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
    //    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) strength += 1
    //    if (strength < 2) {
    //        result.removeClass()
    //        result.addClass('weak')
    //        return 'Password is weak'
    //    } else if (strength == 3) {
    //        result.removeClass()
    //        result.addClass('good')
    //        return 'Password is good'
    //    } else {
    //        result.removeClass()
    //        result.addClass('strong')
    //        return 'Password is strong'
    //    }
    //}

    function checkStrength(password) {

        var strength = 0
        if (password.length == 0) {
            $("#btnNext").attr('disabled', 'disabled');
            $("#btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            result.removeClass()
            return 'Password strength indicator'
        }
        if (password.length > 7) strength += 1
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        if (strength < 2) {
            //$("#btnNext").attr('disabled', 'disabled');
            //$("#btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            result.removeClass()
            result.addClass('weak')
            return 'Password is weak'
        } else if (strength == 3) {

            //$("#btnNext").attr('disabled', 'disabled');
            //$("#btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            result.removeClass()
            result.addClass('good')
            return 'Password is good'
        }
        else if (strength == 4) {
            result.removeClass();
            result.addClass('strong');
            //if (Ispasswordchk) {
            //    $("#btnNext").removeAttr("disabled");
            //    $("#btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
            //}
            //else {
            //    $("#btnNext").attr('disabled', 'disabled');
            //    $("#btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            //}
            return 'Password is strong'
        }
    }

    $(".btnNext").removeAttr('disabled', 'disabled');

    $("#btnNext").click(function () {
        var hnProdUrl = document.getElementById("hnProdUrl").value;
        if ((user != null && user != "") && (accountNo != null && accountNo != "")) {
            var EmailAddress = user;
            var AccountNo = accountNo;
        }
        else {
            var EmailAddress = sessionStorage.getItem("Email");
            var AccountNo = sessionStorage.getItem("AccountNumber");
        }
        var pwd = CryptoJS.MD5($("#txtPassword").val()).toString();

        var data = {
            "EmailAddress": EmailAddress,
            "AccountNo": AccountNo,
            "Password": pwd,
            "MobileNo": "",
            "StateCode": "TX",
            "accessToken": "",
            "requestType": "",
            "BrandCode": ""
        };

        $.ajax({
            url: "https://apitest.frontierutilities.com/MyAccountAPI/User/AddUser",
            //url: "http://localhost:27570/User/AddUser",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {

                if (response.resultCode === 1) {
                    sessionStorage.setItem("BillingOptions", response.DocumentViaEmail);
                    window.location = hnProdUrl + '/Account/RegistrationSuccessful';

                }
                else {
                    $("#error").html(response.resultmessage).show();
                }

            },

        });
    });

    $('#txtConfirmPassword').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $('#txtPassword').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

});






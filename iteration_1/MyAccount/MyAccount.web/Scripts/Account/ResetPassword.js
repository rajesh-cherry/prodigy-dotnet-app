
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

    $('#resetForm').on('blur keyup change', 'input', function (event) {
        $("#error").empty();
        formValidation();
        buttonValidation();
    });

    function buttonValidation() {
        if ($("#txtNewPassword").val() !== '' && $("#txtConfirmPassword").val() !== '' && $('#resetForm').validate().checkForm()) {
            if (Ispasswordchk && ppuccolour == false && ppncolour == false && ppscolour==false) {
               
                $(".btnNext").removeAttr("disabled");
                $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else {
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }
        else if ($("#txtNewPassword").val() === '' && $("txtConfirmPassword").val() === '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        else if ($("txtConfirmPassword").val() === $("#txtNewPassword").val() && $('#resetForm').validate().checkForm()&&ppcolour==false ) {

            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
    }

    document.getElementById('txtNewPassword').onkeypress = function () {
        var char = String.fromCharCode(event.which);
        if (char.match(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])|\s/)) {
            event.preventDefault();
        }
    };

    $("#show_password_new").click(function () {
        if ($("#txtNewPassword").attr("type") === "password") {
            $("#txtNewPassword").attr("type", "text");
            $('.newIcon').removeClass('far fa-eye-slash').addClass('far fa-eye');
        } else {
            $("#txtNewPassword").attr("type", "password");
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
        $("#resetForm").validate({
            rules: {
                NewPassword: {
                    required: true
                },
                ConfirmPassword: {
                    required: true,
                    equalTo: "#txtNewPassword"
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
    $("#txtNewPassword").on('keyup', ValidatePassword);
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
          
            if ($("#" + rules[i].Target).attr('src') == "../Content/images/password_red.png" && rules[i].Target =="UpperCase") {
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
    $('#txtNewPassword').keyup(function () {
        $(".result").html(checkStrength($('#txtNewPassword').val()))
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
        if (accountNo != null && accountNo != "") {
            var AccountNo = accountNo;
        }
        else {
            var AccountNo = sessionStorage.getItem("accountNumber");
        }
        var data = {
            "newPassword": CryptoJS.MD5($("#txtNewPassword").val()).toString(),
            "accountNo": AccountNo,
        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/myaccountapi/User/resetPassword",
            //url: "http://localhost:27570/User/resetPassword",

            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.resultCode == 1) {
                    window.location = "../";
                }
                else {
                    $("#Error").text(response.resultMessage).show();
                }
            },
        });
    });

    $('#txtConfirmPassword').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $('#txtNewPassword').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

});






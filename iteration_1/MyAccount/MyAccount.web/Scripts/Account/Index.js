$(document).ready(function () {
    var baseURL = $("#baseURL").val();
    var enrollURL = $("#enrollURL").val();
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxStop(function () {
            $('#AjaxLoader').hide();
        });
    $(".btnContinue").attr('disabled', 'disabled');

    var Email = sessionStorage.getItem("email");
    $('#txtUser').val(Email).focus();
    //if ($("#txtUser").val() === '')  {
    //    $(".btnContinue").attr('disabled', 'disabled');
    //}
    //else {
    //    $(".btnContinue").removeAttr('disabled', 'disabled');
    //}

    $('#txtUser').blur(function () {
        $(this).val(
            $.trim($(this).val())
        );
    });

    $('#txtUser').mouseout(function () {
        $(this).val(
            $.trim($(this).val())
        );
    });

    //function ValidateEmail(mail) {
    //    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value)) {
    //        return (true)
    //    }
    //    $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + 'You have entered an invalid email address');
    //    /*alert("You have entered an invalid email address!")*/
    //    return (false)
    //}
    $("#txtUser").keyup(function () {

        $(this).val(
            $.trim($(this).val())
        );
        var my_txt = $("#error").text();
        var len = my_txt.length;


        if (len > 0) {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        //var Email = sessionStorage.getItem("email");
        //$('#txtUser').val(Email).focus();

        document.getElementById("txtUser").style.removeProperty("border-color");
        document.getElementById("txtUser").style.removeProperty("border-width");
        $("#error").html('');
        $("#error").hide();
    });
    $('#welcomeForm').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
    //$('#welcomeForm').on('blur keyup change', 'input', function (event) {
    $("input").keyup(function () {
        $("#error").html('');
        $("#error").empty();
        formValidation();
        buttonValidation();
        checkEmail();
        $("error").each(function () {
            if ($(this).html().trim() == "") {
                $(".btnContinue").attr('disabled', 'disabled');
                $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        });
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
    function buttonValidation() {

        var my_txt = $("#error").text();
        var len = my_txt.length;
        if ($("#txtUser").val() !== '' && len == 0 && $('#welcomeForm').validate().checkForm()) {
            $(".btnContinue").removeAttr("disabled");
            document.getElementById("txtUser").style.borderColor = "#ced4da";
            document.getElementById("txtUser").style.borderWidth = "thin";
            $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtUser").val() === '') {
            $(".btnContinue").attr('disabled', 'disabled');
            $(".btnContinue").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    }

    function formValidation() {
        $("#welcomeForm").validate({
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
            /*errorElement: "span",*/
        });
    }
    $('#cancelModal').click(function () {
        $("#rp").attr('disabled', 'disabled');
        $("#InvalidUserModal").hide();
    });





    if (Email != null) {

        $(".btnContinue").removeAttr("disabled");
        document.getElementById("txtUser").style.borderColor = "#ced4da";
        document.getElementById("txtUser").style.borderWidth = "thin";
        $(".btnContinue").removeClass("btn_primary_outline").addClass("btn_primary");
    }
    $("#btnContinue").click(function () {
        var BrandCode = $("#getbrandUrl").val();
        var hnProdUrl = $("#hnProdUrl").val();

        //$("#InvalidUserModal").hide();

        var data = {
            "AccountNumber": $("#txtUser").val(),
            "BrandCode": BrandCode,
        };


        $.ajax({
            url: baseURL + "Account/ValidateCustomerTypeDetails",
            //url: "http://localhost:27570/Account/ValidateCustomerTypeDetails",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                //$("#InvalidUserModal").hide();
                $('#headerAccount').html(response.AccountNumber);
                $('#headerEmail').html(response.EmailAddress);
                if ((response.Result == "Small Non-Residential") && (response.BrandCode == 'FROTX')) {
                    $("#InvalidUserModal").show();
                    $('.gemsuser').hide();
                    $('.nonresidential').show();
                    return false;
                }
                else if ((response.Result == "Small Non-Residential") && (response.BrandCode == 'GEXAIX')) {
                    $("#InvalidUserModal").show();
                    $('.gemsuser').show();
                    $('.nonresidential').hide();
                    return false;
                }
                else if (response.Result == "Gems_User") {
                    $("#InvalidUserModal").show();
                    $('.gemsuser').show();
                    $('.nonresidential').hide();
                    return false;
                }
                else {
                    var data = {
                        "AccountNumber": $("#txtUser").val(),
                        "BrandCode": BrandCode,
                    };
                    $.ajax({
                        url: baseURL + "Account/GetAccountDetailsNew",
                        //url: "http://localhost:27570/Account/GetAccountDetailsNew",
                        type: "POST",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (response) {

                            var commonResponse = response;
                            sessionStorage.setItem("Login_email", commonResponse.Email);
                            sessionStorage.setItem("Login_AccountNumber", commonResponse.AccountNumber);

                            $.cookie('HeaderEmail', commonResponse.Email, { expires: 7, path: '/' });
                            $.cookie('HeaderLastName', commonResponse.FirstName, { expires: 7, path: '/' });
                            var data = {
                                "user": $("#txtUser").val(),
                                "brandCode": BrandCode,
                            };
                            $.ajax({
                                url: baseURL + "User/VerifyRegisteredUser",
                                //url: "http://localhost:27570/User/VerifyRegisteredUser",
                                type: "POST",
                                data: JSON.stringify(data),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (response) {
                                    $("#InvalidUserModal").hide();
                                    if (response.resultMessage === 'User already registered' && response.UserExists === true) {
                                        var Email = $("#txtUser").val();
                                        sessionStorage.setItem("RememberEmail", Email);
                                        var encodedUser = btoa($('#txtUser').val());
                                        if ($("#txtUser").val() != $.cookie('userId')) {
                                            $.cookie('rememberMe', null, { expires: -1, path: '/' });
                                        }
                                        window.location = hnProdUrl + '/Account/Login?user=' + encodedUser
                                        sessionStorage.setItem("Account_Mask", "");
                                    }
                                    if (response.UserExists === false) {
                                        if (response.resultMessage === 'Not registered. Continue to registration') {
                                            // The API call is made commonly in the above line 172
                                            sessionStorage.setItem("AccountNumber", commonResponse.AccountNumber);
                                            sessionStorage.setItem("Email", commonResponse.Email);
                                            if (commonResponse.Email === null) {
                                                sessionStorage.setItem("accountForRegistration", $("#txtUser").val())
                                                window.location = hnProdUrl + '/Account/Register';

                                            }
                                            else {
                                                sessionStorage.setItem("accountForRegistration", commonResponse.AccountNumber)
                                                sessionStorage.setItem("AccountNumber", commonResponse.AccountNumber)
                                                window.location = hnProdUrl + '/Account/Register'
                                                sessionStorage.setItem("EmptyEmail", "")
                                            }
                                        }
                                        else if (response.resultMessage === 'Account not found') {
                                            window.location = enrollURL;
                                        }
                                    }

                                },

                            });

                        }
                    })
                }
            }
        });
    });
});


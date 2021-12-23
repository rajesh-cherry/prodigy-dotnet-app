$(document).ready(function () {
    var baseURL = $("#baseURL").val();
    
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        //.ajaxSuccess(function () {
        //    $('#AjaxLoader').hide();
        //});
        .ajaxStop(function () {
            $('#AjaxLoader').hide();
        });
    //var AccountNumber = '@ViewData["AccountNumber"].ToString()';


    //$("#txtUser").append(AccountNumber);

    var accountno = sessionStorage.getItem("accountNumber");
    //$('#txtUser').val(accountno).focus();


    $(".btnNxt").attr('disabled', 'disabled');
    var flag = 0;
    var Atp = 2;

    $("#txtUser").keyup(function () {
        document.getElementById("txtUser").style.removeProperty("border-color");
        document.getElementById("txtUser").style.removeProperty("border-width");
        $("#error").html('');
        $("#error").hide();
    });

    $('#welcomeForm').on('blur keyup change', 'input', function (event) {
        $("#error").empty();
        formValidation();
        buttonValidation();
    });

    function buttonValidation() {
        if ($("#txtUser").val() !== '' && $('#welcomeForm').validate().checkForm()) {
            $(".btnNxt").removeAttr("disabled");
            document.getElementById("txtUser").style.borderColor = "#ced4da";
            document.getElementById("txtUser").style.borderWidth = "thin";
            $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtUser").val() === '') {
            $(".btnNxt").attr('disabled', 'disabled');
            $(".btnNxt").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    }
    function startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) {
            m = m - 1
        }
        if (m < 0) {
            $("#error").empty();
            $("#myModal1").hide();
            document.getElementById("txtUser").style.borderColor = "#FFFFFF";
        }
        document.getElementById('timer').innerHTML =
            m + ":" + s;
        console.log(m)
        setTimeout(startTimer, 1000);

    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec };
        if (sec < 0) { sec = "59" };
        return sec;
    }


    function formValidation() {
        $("#welcomeForm").validate({
            rules: {
                User: {
                    required: true
                },
            },
            messages: {
                User: {
                    required: "UserName/Account Number is required"
                },
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

    if ($("#txtUser").val() !== '') {
        $(".btnNxt").removeAttr("disabled");
        document.getElementById("txtUser").style.borderColor = "#ced4da";
        document.getElementById("txtUser").style.borderWidth = "thin";
        $(".btnNxt").removeClass("btn_primary_outline").addClass("btn_primary");
    }
    var hnProdUrl = document.getElementById("hnProdUrl").value;
    var BrandCode = document.getElementById("getbrandUrl").value;

    $("#btnNxt").click(function () {

        var data = {
            "AccountNumber": $("#txtUser").val(),
            "BrandCode": BrandCode,
        };
        $.ajax({
            url: baseURL+"Account/ValidateCustomerTypeDetails",
            //url: "http://localhost:27570/Account/ValidateCustomerTypeDetails",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
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
                        "user": $("#txtUser").val(),
                        "brandCode": BrandCode,
                    };
                    $.ajax({
                        url: baseURL+"User/VerifyRegisteredUser",
                        //url: "http://localhost:27570/User/VerifyRegisteredUser",
                        type: "POST",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (response) {
                            if (response.resultMessage === 'User already registered' && response.UserExists === true) {

                                var data = {
                                    "AccountNumber": $("#txtUser").val(),
                                    "BrandCode": BrandCode,
                                };
                                $.ajax({
                                    url: baseURL+"Account/GetAccountDetailsNew",
                                    //url: "http://localhost:27570/Account/GetAccountDetailsNew",
                                    type: "POST",
                                    data: JSON.stringify(data),
                                    dataType: "json",
                                    contentType: "application/json",
                                    success: function (response) {
                                        if (response.Email !== null) {
                                            $.cookie('Login_email', response.Email, { expires: 7, path: '/' });
                                            $.cookie('Login_AccountNumber', response.AccountNumber, { expires: 7, path: '/' });
                                            $.cookie('HeaderLastName', response.FirstName, { expires: 7, path: '/' });
                                            var encodedUser = btoa($('#txtUser').val());
                                            if ($("#txtUser").val() !== $.cookie('Login_AccountNumber')) {
                                                $.cookie('rememberMe', null, { expires: -1, path: '/' });
                                            }
                                            window.location = hnProdUrl + '/Account/Login/?user=' + encodedUser
                                            sessionStorage.setItem("Account_Mask", 2);
                                        }
                                    },
                                });
                            }
                            if (response.UserExists === false) {
                                if (response.resultMessage === 'Not registered. Continue to registration') {
                                    var data = {
                                        "AccountNumber": $("#txtUser").val(),
                                        "BrandCode": BrandCode,
                                    };
                                    $.ajax({
                                        url: baseURL+"Account/GetAccountDetailsNew",
                                        //url: "http://localhost:27570/Account/GetAccountDetailsNew",
                                        type: "POST",
                                        data: JSON.stringify(data),
                                        dataType: "json",
                                        contentType: "application/json",
                                        success: function (response) {
                                            if (response.resultMessage === "Account found") {

                                                if ((response.Email === null || response.Email === "" || response.Email === "null") && (response.AccountNumber !== null || response.AccountNumber !== "")) {

                                                    sessionStorage.setItem("AccountNumber", response.AccountNumber)
                                                    sessionStorage.setItem("EmptyEmail", "2")
                                                    $.cookie('HeaderLastName', response.FirstName, { expires: 7, path: '/' });
                                                    window.location = hnProdUrl + '/Account/SSNVerify/?accountNo=' + response.AccountNumber
                                                }
                                                else {
                                                    sessionStorage.setItem("accountForRegistration", response.AccountNumber)
                                                    sessionStorage.setItem("AccountNumber", response.AccountNumber)
                                                    sessionStorage.setItem("EmptyEmail", "")
                                                    window.location = hnProdUrl + '/Account/SSNVerify/?accountNo=' + response.AccountNumber

                                                }
                                            }

                                        }

                                    });
                                }
                                else if (response.resultMessage === 'Account not found') {
                                    $("#error").empty();
                                    flag += 1;
                                    /*alert("flag value is =" + flag);//print flag value*/
                                    if (flag <= 2) {
                                        $("#error").empty();
                                        $("#error").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid account number").show();
                                        document.getElementById("txtUser").style.borderColor = "red";
                                        document.getElementById("txtUser").style.borderWidth = "medium";
                                    }
                                    else if (flag >= 2 && flag < 8) {

                                        $("#error").empty();
                                        $("#error").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " Invalid account number ");
                                        document.getElementById("txtUser").style.borderColor = "red";
                                        document.getElementById("txtUser").style.borderWidth = "medium";

                                    }
                                    else {
                                        $("#myModal1").show();
                                        document.getElementById('timer').innerHTML =
                                            000 + ":" + 10;
                                        startTimer();
                                        $('#txtUser').val('');

                                    }
                                }
                            }
                        }
                    });
                }
            }

        });
    });
});
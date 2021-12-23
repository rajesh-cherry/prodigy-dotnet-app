$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxStop(function () {
            $('#AjaxLoader').hide();
        });
    var accountNo = sessionStorage.getItem("retrivedAccount");
    var userexists = sessionStorage.getItem("userexists");

    if (userexists == "true") {

        $('.login').show();
        $('.register').hide();
        

    }
    else {
        $('.login').hide();
        $('.register').show();
        
    }

    $('#AccountNo').append(accountNo);
    var hnProdUrl = document.getElementById("hnProdUrl").value;

    $('.btnContinue').click(function () {
        var BrandCode = document.getElementById("getbrandUrl").value;
        var data = {
            "AccountNumber": accountNo,
            "BrandCode": BrandCode,
        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/myaccountapi/Account/VerifyGemsCustomerDetails",
            //url: "http://localhost:27570/Account/VerifyGemsCustomerDetails",
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
                        "user": accountNo,
                        "brandCode": BrandCode,
                    };
                    $.ajax({
                        url: "https://apitest.frontierutilities.com/myaccountapi/User/VerifyRegisteredUser",
                        //url: "http://localhost:27570/User/VerifyRegisteredUser",
                        type: "POST",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (response) {
                            if (response.resultMessage === 'User already registered' && response.UserExists === true) {
                                var encodedAccNo = btoa(accountNo);
                                window.location = hnProdUrl + '/Account/Login_account/?user=' + encodedAccNo
                                sessionStorage.setItem("Account_Mask", 2);
                            }   
                            if (response.UserExists === false) {
                                if (response.resultMessage === 'Not registered. Continue to registration') {
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
                                            if (response.Email === null) {
                                                sessionStorage.setItem("accountForRegistration", $("#txtUser").val())
                                                window.location = hnProdUrl + '/Register';
                                            }
                                            else {
                                                sessionStorage.setItem("accountForRegistration", response.AccountNumber)
                                                sessionStorage.setItem("AccountNumber", response.AccountNumber)
                                                window.location = hnProdUrl + '/Account/SSNVerify/?accountNo=' + response.AccountNumber;
                                                sessionStorage.setItem("EmptyEmail", "")
                                            }
                                        },

                                    });
                                }
                            }
                        },
                    });
                }
            }
        });
    });
});
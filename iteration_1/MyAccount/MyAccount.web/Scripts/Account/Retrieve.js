$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxComplete(function () {
            $('#AjaxLoader').hide();
        });
    var phone;
    document.getElementById('txtEmail').addEventListener('keyup', function (evt) {
        var phoneNumber = document.getElementById('txtEmail');
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        phoneNumber.value = phoneFormat(phoneNumber.value);
        
    });

    var accountNo = '';

    $("#btnBack").click(function () {
        window.location = "../Account/ForgotEmail";
    });

    $('#retriveform').on('blur keyup change', 'input', function (event) {
        buttonValidation();
        ValidateFileds();
    });

    $(".btnNext").attr('disabled', 'disabled');
    var bool = false;
    $("#txtLastName").keyup(function () {
        document.getElementById("txtLastName").style.removeProperty("border-color");
        document.getElementById("txtLastName").style.removeProperty("border-width");
        $("#errorLastName").html('');
        $("#errorLastName").hide();
    });
    $("#txtStreetNo").keyup(function () {
        document.getElementById("txtStreetNo").style.removeProperty("border-color");
        document.getElementById("txtStreetNo").style.removeProperty("border-width");
        $("#errorstreetNo").html('');
        $("#errorstreetNo").hide();
        var phone = document.getElementById("txtStreetNo").value;
        var filter = /^[0-9-+]+$/;
        if (filter.test(phone)) {
            bool = false;
            return true;
            //if (phone.length == 4) {
            //    bool = false;
            //    return true;
            //}
            //else {
            //    $("#errorstreetNo").html("<i class='fas fa-exclamation-triangle'></i>" + " StreetNo should be 4 digits").show();
            //    $(".btnNext").attr('disabled', 'disabled');
            //    $(".btnNext").addClass("btn_primary_outline").removeClass("btn_primary");
            //    document.getElementById("txtStreetNo").style.borderColor = "red";
            //    document.getElementById("txtStreetNo").style.borderWidth = "medium";
            //    bool = true;
            //    return false;
            //}

        }
        else {
            $("#errorstreetNo").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid StreetNo").show();
            //$(".btnNext").removeAttr("disabled");
            //$(".btnNext").addClass("btn_primary_outline").removeClass("btn_primary");
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            document.getElementById("txtStreetNo").style.borderColor = "red";
            document.getElementById("txtStreetNo").style.borderWidth = "medium";
            bool = true;
            return false;
        }
    });

    $("#txtZipCode").keyup(function () {
        document.getElementById("txtZipCode").style.removeProperty("border-color");
        document.getElementById("txtZipCode").style.removeProperty("border-width");
        $("#errorZipCode").html('');
        $("#errorZipCode").hide();
        var ZipCode = document.getElementById("txtZipCode").value;

        var filter = (/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        if (filter.test(ZipCode)) {
            bool = false;
            return true;
        }
        else {
            $("#errorZipCode").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid zip code").show();
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").addClass("btn_primary_outline").removeClass("btn_primary");
            document.getElementById("txtZipCode").style.borderColor = "red";
            document.getElementById("txtZipCode").style.borderWidth = "medium";
            bool = true;
            return false;
        }
    });
    $("#txtEmail").keyup(function () {
        document.getElementById("txtEmail").style.removeProperty("border-color");
        document.getElementById("txtEmail").style.removeProperty("border-width");
        $("#errorEmailOrPhone").html('');
        $("#errorEmailOrPhone").hide();
        var phone = document.getElementById("txtEmail").value;
        //var filter = /^[0-9-+]+$/;
        var filter= /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/;
        if (filter.test(phone)) {
            if (phone.length == 14) {
                bool = false;
                return true;
            }
            else {
                bool = true;
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").addClass("btn_primary_outline").removeClass("btn_primary");
                $("#errorEmailOrPhone").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Phone Number").show();
                document.getElementById("txtEmail").style.borderColor = "red";
                document.getElementById("txtEmail").style.borderWidth = "medium";
                return false;
                
            }
        }
        else {
            bool = true;

            //$(".btnNext").removeAttr("disabled");
            //$(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            $("#errorEmailOrPhone").html("<i class='fas fa-exclamation-triangle'></i>" + " Invalid Phone Number").show();
            return false;

        }
    });

    function buttonValidation() {
        if ($("#txtLastName").val() !== '' && $("#txtEmail").val() !== '' && $("#txtEmail").val() != '' && $("#txtStreetNo").val() != '') {
            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtLastName").val() === '' && $("#txtEmail").val() !== '' && $("#txtEmail").val() != '' && $("#txtStreetNo").val() != '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if ($("#txtStreetNo").val() !== '' && $("#txtEmail").val() !== '' && $("#txtLastName").val() !== '' && $("#txtZipCode").val() !== '') {
            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtStreetNo").val() === '' && $("#txtEmail").val() != '' && $("#txtLastName").val() !== '' && $("#txtZipCode").val() !== '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if ($("#txtZipCode").val() !== '' && $("#txtEmail").val() !== '' && $("#txtLastName").val() !== '' && $("#txtStreetNo").val() != '') {
            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtZipCode").val() === '' && $("#txtEmail").val() != '' && $("#txtLastName").val() !== '' && $("#txtStreetNo").val() != '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if ($("#txtEmail").val() !== '' && $("#txtLastName").val() !== '' && $("#txtZipCode").val() !== '' && $("#txtStreetNo").val() != '') {
            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtEmail").val() === '' && $("#txtLastName").val() !== '' && $("#txtZipCode").val() !== '' && $("#txtStreetNo").val() != '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if ($("#txtEmail").val() === '' && $("#txtLastName").val() == '' && $("#txtZipCode").val() == '' && $("#txtStreetNo").val() == '') {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }

    }
    function ValidateFileds() {
        var ZipCode = document.getElementById("txtZipCode").value;
        var StreetNo = document.getElementById("txtStreetNo").value;
        var phone = document.getElementById("txtEmail").value;
        var lastname = document.getElementById("txtLastName").value;
        if ((ZipCode != "" && bool == true)) {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if (StreetNo != "" && bool == true) {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
        if (phone != "" && bool == true) {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
     
        var zipfilter = (/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        var filter = /^[0-9-+]+$/;
        var phonefilter = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/;
        if (phonefilter.test(phone) && filter.test(StreetNo) && zipfilter.test(ZipCode) && lastname != "" && phone.length == 14) {
            //if (StreetNo.length == 4 && phone.length == 10 && zipfilter.test(ZipCode)  && lastname != "") {

                $(".btnNext").removeAttr("disabled");
                $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
            }
            else {
                $(".btnNext").attr('disabled', 'disabled');
                $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
            }
        }

        //else {
        //    $(".btnNext").attr('disabled', 'disabled');
        //    $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        //}
   // }

    $(function () {
        $("#retriveform").validate({
            rules: {
                txtLastName: {
                    required: true
                },
                txtStreetNo: {
                    required: true
                },
                txtZipCode: {
                    required: true
                },
                txtEmail: {
                    required: true
                },
            },
            messages: {
                txtLastName: {
                    required: " Last Name is required"
                },
                txtStreetNo: {
                    required: "Streetnumber is required"
                },
                txtZipCode: {
                    required: "Zip Code is required"
                },
                txtEmail: {
                    required: "Email/Phone is required"
                },
            },
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    $.each(errorMap, function (index, value) {
                        document.getElementById(index).style.borderColor = "red";
                        document.getElementById(index).style.borderWidth = "medium";
                        if (index == 'txtLastName') {
                            document.getElementById("errorLastName").style.display = "block";
                            $("#errorLastName").empty().append("<i class='fas fa-exclamation-triangle'></i>" + "" + value);
                        }
                        if (index == 'txtStreetNo') {
                            document.getElementById("errorstreetNo").style.display = "block";
                            $("#errorstreetNo").empty().append("<i class='fas fa-exclamation-triangle'></i>" + value);
                        }
                        if (index == 'txtZipCode') {
                            document.getElementById("errorZipCode").style.display = "block";
                            $("#errorZipCode").empty().append("<i class='fas fa-exclamation-triangle'></i>" + value);
                        }
                        if (index == 'txtEmail') {
                            document.getElementById("errorEmailOrPhone").style.display = "block";
                            $("#errorEmailOrPhone").empty().append("<i class='fas fa-exclamation-triangle'></i>" + value);
                            $(".btnNext").attr('disabled', 'disabled');
                            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
                        }
                    });
                }
            },
        });
    });
    var hnProdUrl = document.getElementById("hnProdUrl").value;

    //$("#btnTryAgain").hide();
    $("#btnretriveCancel").hide();
    $("#btnretriveCancel").click(function () {
        $("#txtLastName").val("");
        $("#txtStreetNo").val("");
        $("#txtZipCode").val("");
        $("#txtEmail").val("");
        $("#snackbar").hide();
    });
    var BrandCode = document.getElementById("getbrandUrl").value;
    if ($("#txtLastName").val() != "" && $("#txtStreetNo").val() != "" && $("#txtZipCode").val() != "" && $("#txtEmail").val() != "") {

        $(".btnNext").removeAttr("disabled");
        $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
    }
      
    $("#btnNext").click(function () {
        phone = $("#txtEmail").val();
        var phonenumber = phone.replace(/[^\d\+]/g, "");
        var data = {
            "LastName": $("#txtLastName").val(),
            "Streetnumber": $("#txtStreetNo").val(),
            "ZipCode": $("#txtZipCode").val(),
            "EmailOrPhone": phonenumber,
            "BrandCode": BrandCode,
        };
        $.ajax({
            //url: "http://localhost:27570/Account/RetriveAccount",
            url: "https://apitest.frontierutilities.com/myaccountapi/Account/RetriveAccount",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.AccountNumber !== undefined && response.AccountNumber !== null) {
                    accountNo = response.AccountNumber;
                    $('#AccountNo').append(accountNo);
                    sessionStorage.setItem("retrivedAccount", accountNo);
                    sessionStorage.setItem("userexists", response.UserExists);
                    $.cookie('Login_email', response.EmailAddress, { expires: 7, path: '/' });
                    $.cookie('Login_AccountNumber', response.AccountNumber, { expires: 7, path: '/' });
                    $.cookie('HeaderLastName', response.FirstName, { expires: 7, path: '/' });
                    window.location = hnProdUrl + '/Account/AccountFound';

                }
                else if (response.resultMessage == 'Invalid Last Name') {
                    $("#errorLastName").html("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                }
                else if (response.resultMessage == 'Invalid Streetnumber') {
                    $("#errorstreetNo").html("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                }
                else if (response.resultMessage == 'Invalid Zip Code') {
                    $("#errorZipCode").html("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                }
                else if (response.resultMessage == 'Invalid Email/Phone') {
                    $("#errorEmailOrPhone").html("<i class='fas fa-exclamation-triangle'></i>" + " " + response.resultMessage).show();
                }
                else if (response.resultMessage == 'Account Not Found') {
                    $("#btnNext").text('Try Again');
                    //$("#btnBack").text("Cancel");
                    $("#snackbar").show();
                    //$("#btnNext").hide();
                    //$("#btnTryAgain").show();
                    $("#btnBack").hide();
                    $("#btnretriveCancel").show();
                }
                else {
                    $("#snackbar").css("display", "block");

                }
            }
        });
    });

    $("#btncancel").click(function () {
        window.location = hnProdUrl + "/Account/Retrieve";
    });

    $("#btnContinue").click(function () {
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
                    window.location = hnProdUrl + '/Login';
                }
                if (response.UserExists === false) {
                    if (response.resultMessage === 'Not registered. Continue to registration') {
                        window.location = hnProdUrl + '/SSNVerify/?accountNo=' + accountNo
                    }
                }

            },

        });
    });

    $("#btnretry").click(function () {
        window.location = hnProdUrl + "/Account/Retrieve";
    });




    function phoneFormat(input) {
        // Strip all characters from the input except digits
        input = input.replace(/\D/g, '');

        // Trim the remaining input to ten characters, to preserve phone number format
        input = input.substring(0, 10);

        // Based upon the length of the string, we add formatting as necessary
        var size = input.length;
        if (size == 0) {
            input = input;
        } else if (size < 4) {
            input = '(' + input;
        } else if (size < 7) {
            input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
        } else {
            input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
        }
        return input;
    }

});
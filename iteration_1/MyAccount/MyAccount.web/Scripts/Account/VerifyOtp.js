var flag = 0;
var resendclickcount = 0;
$(document).ready(function () {

    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxSuccess(function () {
            $('#AjaxLoader').hide();
        });

    
    max_retry_attempts = 3;
    startTimer();

    function ucphone(text) {
        text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        return text;
    }
    phoneformat = ucphone(sessionStorage.getItem('phone').toString());
    maskedphone = getMaskedAccountnumber(phoneformat);
    $('#phone').append(maskedphone);


    function startTimer() {
     
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = 0;
        if (flag != 2) {
            s = checkSecond((timeArray[1] - 1));

            if (s == 59) {
                m = m - 1
            }
        }
        else {
            s = checkSecond2((timeArray[1] - 1));

        }
        document.getElementById('timer').innerHTML =
            m + ":" + s;
        if (presentTime.trim() == "00:00") {
            $("#resend1").hide();
            $("#vercode").hide();
            $("#gridverifycode").hide();
            if (flag < 3) {
                $("#resendBtn").show();
                flag += 1;
            }
             
        }

        console.log(m)
        setTimeout(startTimer, 1000);

        

        

    }
    function checkSecond(sec) {
        if (sec < 59 && sec >= 10) {
            sec = "" + sec;
        }
        else {
            sec = "0" + sec;// add zero in front of numbers < 10
        }

        if (sec < 0) { sec = "59" };
        return sec;
    }
    function checkSecond2(sec) {
        if (sec < 90 && sec >= 10) {
            sec = "" + sec;
        }
        else {
            sec = "0" + sec;// add zero in front of numbers < 10
        }

        if (sec < 0) { sec = "90" };
        return sec;
    }

    $('#verifyOtpForm').on('blur keyup change', 'input', function (event) {
        buttonValidation();
    });

    $(".inputs").keyup(function () {
        if (this.value.length == this.maxLength) {
            $(this).next('.inputs').focus();
        }
    });

    $('.inputs').keydown(function (e) {
        if ((e.which == 8 || e.which == 46) && $(this).val() == '') {
            $(this).prev('.inputs').empty().focus();
        }
    });


    function buttonValidation() {
        if ($("#digit1").val() !== '' && $("#digit2").val() !== '' && $("#digit3").val() !== '' && $("#digit4").val() !== '' && $("#digit5").val() !== '' && $("#digit6").val() !== '') {
            $(".btnNext").removeAttr("disabled");
            $(".btnNext").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else {
            $(".btnNext").attr('disabled', 'disabled');
            $(".btnNext").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    }


    $("#successmsgclose").click(function () {
        $("#gridverifycode").hide();
    });

    $("#btnNext").click(function () {
        var hnProdUrl = document.getElementById("hnProdUrl").value;
        var data = {
            "AccountNo": sessionStorage.getItem('accountNumber').toString(),
            "Email": sessionStorage.getItem('email').toString(),
            "otp": $("#digit1").val() + $("#digit2").val() + $("#digit3").val() + $("#digit4").val() + $("#digit5").val() + $("#digit6").val()
        };
        $.ajax({
            url: "https://apitest.frontierutilities.com/MyAccountAPI/User/ValidateOTP",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.resultCode === 1) {
                    window.location = hnProdUrl + '/Account/ResetPassword';
                }
                else if (response.resultCode === -4) {
                    $("#Error").empty().append("<i class='fas fa-exclamation-triangle'></i> " + " " + response.resultMessage).show();
                    $(".btnNext").attr('disabled', 'disabled');
                    $(".btnNext").addClass("btn_primary");
                }
            },
        });
    });
});

function getMaskedAccountnumber(accountnumber) {
    let skipFirstChars = 10;
    let firstThreeChar = accountnumber.slice(0, skipFirstChars);
    let domainIndexStart = accountnumber.lastIndexOf("");
    let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart)
    maskedEmail = maskedEmail.replace(/./g, '*')
    let domainPlusPreviousChar = accountnumber.slice(domainIndexStart, accountnumber.length);
    return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
}

function SendSMS() {
    phone = sessionStorage.getItem('phone').toString();
    email = sessionStorage.getItem('email').toString();
    var BrandCode = document.getElementById("getbrandUrl").value;
    var data = {
        "MobileNumber": phone,
        "EmailAddress": email,
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
            resendclickcount += 1;

            if (resendclickcount >= max_retry_attempts) {

                $("#resendBtn").hide();
                $("#resend1").hide();

                $("#gridverifycode").show();

            }
            //else {
            //    $("#resendBtn").show();
            //}




        },
    });
}

function updateTimerValue() {
    SendSMS();
    $("#timer").empty();
    if (flag == 1) {
        document.getElementById('timer').innerHTML = "00:59";

    }
    else if (flag == 2) {
        document.getElementById('timer').innerHTML = "00:90";
    }
    $("#resendBtn").hide();
    $("#resend1").show();
    $("#vercode").show();
    $("#gridverifycode").show();
    
    if (resendclickcount >= max_retry_attempts) {


        $("#resendBtn").hide();
        $("#resend1").hide();

    }
    //else {
    //    startTimer();

    //}
   
   

        
    

   
    
}

//function startTimer() {
//    var presentTime = document.getElementById('timer').innerHTML;
//    var timeArray = presentTime.split(/[:]+/);
//    var m = timeArray[0];
//    var s = checkSecond((timeArray[1] - 1));
//    if (s == 59) {
//        m = m - 1
//    }

//    document.getElementById('timer').innerHTML =
//        m + ":" + s;

//    if (presentTime.trim() == "00:00") {
//        $("#resend1").hide();

//        if (flag != 3) {
//            $("#resendBtn").show();
//            $("#vercode").hide();
//            $("#gridverifycode").hide();
//        }
//    }
//    console.log(m)
//    setTimeout(startTimer, 1200);
//}
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}
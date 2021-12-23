$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $('#AjaxLoader').show();
        })
        .ajaxSuccess(function () {
            $('#AjaxLoader').hide();
        });

    window.history.pushState('forward', null, document.URL);
    var timetrackbacksec = sessionStorage.getItem("pendingtime");
    var timeflagback = sessionStorage.getItem("timeflag");
    var preseconds = sessionStorage.getItem("timerec");
    date = new Date();
    currentmilliseconds = date.getTime();
    currentseconds = Math.round(currentmilliseconds / 1000);

    var lasttimeseconds = currentseconds - preseconds;
    var runtimer = timetrackbacksec - lasttimeseconds;

    counter = sessionStorage.getItem("count");
    /*Number_of_attempts_enable = sessionStorage.getItem(" Number_of_attempts");*/
    retry_timein_min = sessionStorage.getItem("retry_timein_minute");

    $(window).on('load', function () {
        /* $("#attemptsenable").empty();*/

        /* $("#attempts").append(Number_of_attempts_enable);*/
        //$("#timeremaining").append(retry_timein_min);
        /*    $("#attemptsenable").append(counter);*/

        if (timetrackbacksec != null && timetrackbacksec != "") {
            if (parseInt(timetrackbacksec) > lasttimeseconds && preseconds != "") {
                if (timeflagback == "true" && timetrackbacksec != null && timetrackbacksec != "") {


                    $("#myModal").show();

                    document.getElementById('pwdEnabled').style.display = "none";
                    document.getElementById('txtenable').style.display = "none";
                    document.getElementById('vectorforgot').style.display = "block";
                    // document.getElementByClass('modal-title').style.margin = "0px";
                    document.getElementById('pwdDisabled').style.display = "block";
                    document.getElementById('txtdisable').style.display = "block";
                    startTimer(runtimer);


                    sessionStorage.setItem("timeflag", "");
                    sessionStorage.setItem("pendingtime", "");
                    sessionStorage.setItem("timerec", "");



                }
                else {

                    sessionStorage.setItem("timeflag", "");
                    sessionStorage.setItem("pendingtime", "");
                    sessionStorage.setItem("timerec", "");
                }
            }
            else {
                $("#myModal").show();

                document.getElementById('pwdEnabled').style.display = "none";
                document.getElementById('txtenable').style.display = "none";
                document.getElementById('vectorforgot').style.display = "block";
                // document.getElementByClass('modal-title').style.margin = "0px";
                document.getElementById('pwdDisabled').style.display = "block";
                document.getElementById('txtdisable').style.display = "block";
                startTimer(timetrackbacksec);


                sessionStorage.setItem("timeflag", "");
                sessionStorage.setItem("pendingtime", "");
                sessionStorage.setItem("timerec", "");

            }


        }

    });


    //if (parseInt(timetrackbacksec) > lasttimeseconds && preseconds != "") {
    //    if (timeflagback == "true" && timetrackbacksec != null && timetrackbacksec != "") {


    //        $("#myModal").show();

    //        document.getElementById('pwdEnabled').style.display = "none";
    //        document.getElementById('txtenable').style.display = "none";
    //        document.getElementById('vectorforgot').style.display = "block";
    //        // document.getElementByClass('modal-title').style.margin = "0px";
    //        document.getElementById('pwdDisabled').style.display = "block";
    //        document.getElementById('txtdisable').style.display = "block";
    //        startTimer(runtimer);


    //        sessionStorage.setItem("timeflag", "");
    //        sessionStorage.setItem("pendingtime", "");
    //        sessionStorage.setItem("timerec", "");



    //    }
    //}
    //else {
    //    sessionStorage.setItem("timeflag", "");
    //    sessionStorage.setItem("pendingtime", "");
    //    sessionStorage.setItem("timerec", "");
    //}


    max_retry_attempts = 5;
    retry_time = 300;
    retry_timein_minute = retry_time / 60;

    var count = 0;
    var flag = 0;
    var Atp = 2;
    var hnProdUrl = document.getElementById("hnProdUrl").value;
    var BrandCode = document.getElementById("getbrandUrl").value;
    var data = {
        "AccountNumber": user,
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
            if (response.Email !== null) {
                accountDetails = response;
                sessionStorage.setItem("phone", response.MobileNumber);
                sessionStorage.setItem("email", response.Email);
                sessionStorage.setItem("accountNumber", response.AccountNumber);
                sessionStorage.setItem("FirstName", response.FirstName);
                sessionStorage.setItem("LastName", response.LastName);

            }
        },
    });

    $("#btnLogin").click(function () {
        $("#errorMsg").empty();
        if ($("#txtPassword").val().toString() == 'Password@123') {
            $("#errorMsg").empty();
            flag += 1;
            /*alert("flag value is =" + flag);//print flag value*/
            if (flag <= 2) {
                $("#errorMsg").empty();
                $("#errorMsg").html("<i class='fas fa-exclamation-triangle'></i>" + " Incorrect Password").show();
                document.getElementById("txtPassword").style.borderColor = "red";
                document.getElementById("txtPassword").style.borderWidth = "medium";
            }
            else if (flag >= 2 && flag < 5) {

                $("#errorMsg").empty();
                $("#errorMsg").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " Incorrect password. Attempts remaining: " + Atp);
                document.getElementById("txtPassword").style.borderColor = "red";
                document.getElementById("txtPassword").style.borderWidth = "medium";
                Atp -= 1;
            }
            else {
                $("#myModal").show();
                //document.getElementById('timer').innerHTML =
                //    000 + ":" + retry_time ;
                startTimer(retry_time);
            }
        }
        else {
            var data = {
                "email": user,
                "password": CryptoJS.MD5($("#txtPassword").val()).toString(),
                "brandCode": BrandCode,
                "ipAddress": "string",
                "source": "string"
            };
            $.ajax({
                //url: "http://localhost:27570/User/JWTLogin",
                url: "https://apitest.frontierutilities.com/myaccountapi/User/JWTLogin",
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    if (response.accessToken !== null) {
                        $.cookie('Email', user, { expires: 7, path: '/' });
                        var rememberMe = $('#chkRememberMe').prop('checked');

                        if (rememberMe) {
                            var encodedUser = btoa(user);
                            $.cookie('userId', user, { expires: 7, path: '/' });
                            $.cookie('rememberMe', true, { expires: 7, path: '/' });
                            $.cookie('encodedUser', encodedUser, { expires: 7, path: '/' });
                        }
                        else {
                            $.cookie('userId', null, { expires: -1, path: '/' });
                            $.cookie('rememberMe', null, { expires: -1, path: '/' });
                            $.cookie('encodedUser', null, { expires: -1, path: '/' });
                        }
                        sessionStorage.setItem("accessToken", response.accessToken);
                        //window.location = '/Header/Index';
                        window.location = hnProdUrl + '/Dashboard';
                    }
                    else {
                        $("#errorMsg").empty();
                        flag += 1;
                        count += 1;
                        if (flag <= 2) {
                            $("#errorMsg").empty();
                            $("#errorMsg").html("<i class='fas fa-exclamation-triangle'></i>" + " Incorrect Password").show();
                            document.getElementById("txtPassword").style.borderColor = "red";
                            document.getElementById("txtPassword").style.borderWidth = "medium";
                        }
                        else if (flag >= 2 && flag < max_retry_attempts) {
                            $("#errorMsg").empty();
                            $("#errorMsg").empty().append("<i class='fas fa-exclamation-triangle'></i>" + " Incorrect password. Attempts remaining: " + Atp);
                            document.getElementById("txtPassword").style.borderColor = "red";
                            document.getElementById("txtPassword").style.borderWidth = "medium";
                            Atp -= 1;
                        }
                        else if (flag >= max_retry_attempts) {

                            sessionStorage.setItem("retry_timein_minute", retry_timein_minute);
                            //$("#timeremaining").append(retry_timein_minute);
                            //$("#timeremaining").append(5);
                            $("#myModal").show();
                            document.getElementById('pwdEnabled').style.display = "none";
                            document.getElementById('txtenable').style.display = "none";
                            document.getElementById('vectorforgot').style.display = "block";
                            // document.getElementByClass('modal-title').style.margin = "0px";
                            document.getElementById('pwdDisabled').style.display = "block";
                            document.getElementById('txtdisable').style.display = "block";
                            //startTimer(retry_time);
                            var timerseconds = 300;
                            startTimer(timerseconds);
                            history.pushState(null, null, document.URL);
                            window.addEventListener('popstate', function () {
                                history.pushState(null, null, document.URL);
                            });

                        }
                    }
                }
            });
        }
    });

    $("input#txtPassword").on("keypress", function (e) {
        if (e.which === 13) {

            $("#btnLogin").trigger('click');
        }
    });

    function startTimer(myTime) {

        $("#attemptsenable").empty();
        var presentTime = myTime;
        console.log(presentTime);
        var myMints = Math.floor(presentTime / 60);
        myMints = myMints > 9 ? myMints : '0' + myMints

        var remaingingSec = presentTime % 60; //10
        remaingingSec = remaingingSec > 9 ? remaingingSec : '0' + remaingingSec
        if (presentTime < 0) {
            $("#errorMsg").empty();
            //document.getElementById('pwdEnabled').style.display = "block";
            //document.getElementById('pwdDisabled').style.display = "none";

            document.getElementById('pwdEnabled').style.display = "block";
            document.getElementById('txtenable').style.display = "block";
            document.getElementById('vectorforgot').style.display = "none";
            document.getElementById('pwdDisabled').style.display = "none";
            document.getElementById('txtdisable').style.display = "none";
            return;
        }
        document.getElementById('timer').innerHTML =
            myMints + ":" + remaingingSec;
        presentTime--;
        var pendingtime = presentTime;
        sessionStorage.setItem("pendingtime", pendingtime);
        setTimeout(() => { startTimer(presentTime); }, 1000);
    }

    $("#btnLogin").attr('disabled', 'disabled');

    $('#cancel').click(function () {
        $('#txtPassword').val('');
        document.getElementById("txtPassword").style.borderColor = "#ced4da";
        document.getElementById("txtPassword").style.borderWidth = "thin";

        flag = 0;
        max_retry_attempts = 3;
        retry_time += retry_time;
        retry_timein_minute += retry_timein_minute;
        retry_timein_min += retry_timein_min;
        //$("#attempts").empty();
        //$("#timeremaining").empty();
        $("#myModal").hide();
    });

    var accountDetails = [];
    $('#loginForm').on('blur keyup change', 'input', function (event) {
        buttonValidation();
    });

    function buttonValidation() {        
        if ($("#txtPassword").val() !== '') {
            $("#btnLogin").removeAttr("disabled");
            document.getElementById("txtPassword").style.borderColor = "#ced4da";
            document.getElementById("txtPassword").style.borderWidth = "thin"
            $("#btnLogin").removeClass("btn_primary_outline").addClass("btn_primary");
        }
        else if ($("#txtPassword").val() === '') {
            $("#btnLogin").attr('disabled', 'disabled');
            $("#btnLogin").removeClass("btn_primary").addClass("btn_primary_outline");
        }
    }

    function ucfirst(str) {
        str = true ? str.toLowerCase() : str;
        return str.replace(/(\b)([a-zA-Z])/,
            function (firstLetter) {
                return firstLetter.toUpperCase();
            });
    }


    document.getElementById("txtPassword").addEventListener("keyup", function (event) {
        if (event.getModifierState("CapsLock")) {
            document.getElementById("txtPassword").style.borderColor = "red";
            document.getElementById("txtPassword").style.borderWidth = "medium";
            document.getElementById("capWarning").style.display = "block";
        } else {
            document.getElementById("txtPassword").style.borderColor = "#ced4da";
            document.getElementById("txtPassword").style.borderWidth = "thin";
            document.getElementById("capWarning").style.display = "none";
        }
    });

    $("#show_password").click(function () {
        if ($("#txtPassword").attr("type") === "password") {
            $("#txtPassword").attr("type", "text");
            $('.icon').removeClass('far fa-eye-slash').addClass('far fa-eye');
        } else {
            $("#txtPassword").attr("type", "password");
            $('.icon').removeClass('far fa-eye').addClass('far fa-eye-slash');
        }
    })


    $("#forgotHeader").click(function () {
        window.location = window.location.href + 'Forgot/ForgotPassword?phone=' + accountDetails.MobileNumber + '&Email=' + accountDetails.Email;
    });


    function getMaskedEmail(email) {
        if (email != null) {
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


        let str = "tonkjhuhuhuy@gmail.com"
        str = str.split('');
        let finalArr = [];
        let len = str.indexOf('@');
        str.forEach((item, pos) => {
            (pos >= 1 && pos <= len - 2) ? finalArr.push('*') : finalArr.push(str[pos]);
        })
    }

    //Show AccountNumber Mask behavior
    function getMaskedAccountnumber(accountnumber) {
        if (accountnumber != null) {
            let skipFirstChars = 4;
            let firstThreeChar = accountnumber.slice(0, skipFirstChars);
            let domainIndexStart = accountnumber.lastIndexOf("");
            let maskedEmail = accountnumber.slice(skipFirstChars, domainIndexStart)
            maskedEmail = maskedEmail.replace(/./g, '*')
            let domainPlusPreviousChar = accountnumber.slice(domainIndexStart, accountnumber.length);
            return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
        }
        else {
            return
        }
    }

    var remember = $.cookie('rememberMe');
    if (remember == 'true') {
        $("#show_password").html("<i class='far fa-eye-slash icon'></i>").show();
        if (user != null) {
            var userMail = user
            if ($.isNumeric(user)) {
                $("#editaccount").show();
                $("#editemail").hide();
            }
            else {
                $("#editaccount").hide();
                $("#editemail").show();
            }
        }
        else {
            var userMail = $.cookie('HeaderEmail');
        }
        var HeaderName = $.cookie('HeaderLastName');
        $('#headerName').append(ucfirst(HeaderName))

        if (userMail != null && isNaN(userMail)) {
            var MaskedEmail = getMaskedEmail(userMail).toLowerCase();
            $('#headerEmail').append(MaskedEmail);
        }

        var emailedit = $.cookie('Login_email');
        var acccountedit = $.cookie('Login_AccountNumber');

        if (emailedit != null && acccountedit != null) {
            var MaskedEmailEdit = getMaskedEmail(emailedit).toLowerCase();
            var Accountmask = getMaskedAccountnumber(acccountedit);
        }
        $('#headerEmailaccount').append(MaskedEmailEdit);
        $('#headerAccount').append(Accountmask);
        $("#chkRememberMe").prop('checked', true);

    }
    else {
        $("#show_password").html("<i class='far fa-eye-slash icon'></i>").show();
        if (user != null) {
            var userMail = user
            if ($.isNumeric(user)) {
                $("#editaccount").show();
                $("#editemail").hide();
            }
            else {
                $("#editaccount").hide();
                $("#editemail").show();
            }
        }

        var HeaderName = $.cookie('HeaderLastName');
        $('#headerName').append(ucfirst(HeaderName))

        if (userMail != null && isNaN(userMail)) {
            var MaskedEmail = getMaskedEmail(userMail).toLowerCase();
            $('#headerEmail').append(MaskedEmail);
        }

        var email_login = $.cookie('Login_email');
        var acccount_login = $.cookie('Login_AccountNumber');
        if (email_login !== null && acccount_login != null) {
            var MaskedEmailEdit = getMaskedEmail(email_login).toLowerCase();
            var accountmask = getMaskedAccountnumber(acccount_login);
        }
        $('#headerEmailaccount').append(MaskedEmailEdit);
        $('#headerAccount').append(accountmask);

    }





    $('#pen_1').click(function () {
        var rememberMe = $('#chkRememberMe').prop('checked');
        if (rememberMe) {
            $.cookie('rememberMe', true, { expires: 7, path: '/' });
        }
        else {
            $.cookie('rememberMe', null, { expires: -1, path: '/' });
        }

        $.cookie('encodedUser', null, { expires: -1, path: '/' });
        window.location = hnProdUrl + '/'
    });
    $('#pen_2').click(function () {
        var rememberMe = $('#chkRememberMe').prop('checked');
        if (rememberMe) {
            $.cookie('rememberMe', true, { expires: 7, path: '/' });
        }
        else {
            $.cookie('rememberMe', null, { expires: -1, path: '/' });
        }

        $.cookie('encodedUser', null, { expires: -1, path: '/' });
        window.location = hnProdUrl + '/Account/ForgotEmail'
    });

    $('#rp').click(function () {

        var timeflag = true;
        sessionStorage.setItem("timeflag", timeflag);
        var date = new Date();
        var milliseconds = date.getTime();
        seconds = Math.round(milliseconds / 1000);
        var timerec = seconds;
        sessionStorage.setItem("timerec", timerec);
        window.location = hnProdUrl + '/Account/ForgotPassword'
    });
});

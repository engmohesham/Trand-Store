const submitOtpPath = "/airtime/submitotp";
const submitOtpPathEPC = "/airtime/epc-confirm";
const queryDiscountSurchargePath = "/airtime/queryDiscountSurcharge?checkSum=";
const delayCheckitTime = 4000;
let maxCheckCount = 0,
    fail = 0,
    loopNow = 0,
    txnId = 0,
    merchantCompleteUrl = "",
    redirectLink = "",
    checkitUrl = "",
    qrLogo = "";
let redirectCompleteUrl = "",
    pcType = "",
    otpDigit = 0,
    submitUrl = "",
    mnoId = "",
    otpCheckSum = "",
    completeUrl = "",
    qrColor = "";
let codaLogo = "",
    isIOS = false,
    moOtp, moShortCode, moOtp2, moguide, gotMo = false,
    cancelLink = "",
    isMobile = false,
    forceStep = false,
    redirectNewTab = "";
let flowType = "",
    paymentCodePrefix = "",
    phoneUtils = "",
    countryCode = "",
    identify = "",
    redirectField = "",
    voucherCodeDigit = 0,
    codeField = "";
let voucherPinDigit = 0,
    stripeValidate = true,
    updateEasyGuide = "",
    expiredText = "EXPIRED",
    stepText = "",
    captchaKey = "";
let ofText = "",
    messageHasBeenSentTo = "",
    invalidOtp = "",
    invalidPhone = "",
    thisFieldCantEmpty = "",
    thisWillUpdateWhenWeSms = "";
let smsIsFreeOfCharge = "",
    weJustSentAnSms = "",
    checkSum = "",
    language = "",
    pageStatus = "",
    tickCommand = "",
    isMoNoOTP = false,
    detailsHowtoPay = "";
let dcbChannelQty = "",
    clickHere = "",
    reopenRedirect = "",
    fullName = "",
    barcodeImageField = "",
    linkOpenOnce = "",
    isPreload = false;
let ipClient = null,
    codaWebEvent = {},
    invalidOTPEPC = 0,
    now = 0,
    clientType = 0,
    token = "",
    isAdyenApiOnlyIntegration = "",
    midtransActions = "";
let currentLang = "",
    tidhash = "",
    slowInternetCountry = false,
    headerNotFixCountry = false,
    timeLeft = 0;


function checkit() {
    const d = new Date();
    const n = d.getTime();
    if (maxCheckCount == 0) {
        maxCheckCount = 1440000;
    }

    jQuery.get(checkitUrl, {
        TxnId: txnId,
        tidhash: tidhash,
        date: n
    }, function (data) {
        if ('OK' === data) {
            if (!isEmpty(redirectNewTab)) {
                redirectNewTab.close();
            }
            window.location.href = redirectCompleteUrl;
            maxCheckCount = 0;
        } else {
            if (data === "INVALID") {
                invalidOTPEPC++;
                if (fail === 0 && invalidOTPEPC >= 5) {
                    setTimeout(function () {
                        $('.waiting-diamond').fadeOut(300);
                        setTimeout(function () {
                            $('.progress-section').fadeIn(300);
                            $('.waiting').fadeIn(300);
                        }, 300);
                    }, 1000);
                    clearOtp();

                    setTimeout(function () {
                        errorPopup(invalidOtp);
                        $('.otps').first().focus();
                    }, 1500);

                    fail++;
                    invalidOTPEPC = 0;
                }
            } else if ('YET' === data || 'RETRY' === data) {
                fail = 0;
            } else if (fail >= 3) {
                window.location.href = redirectCompleteUrl;
                maxCheckCount = 0;
            } else if ('GOT_MO1' == data || 'CHARGE_WAIT' == data) {
                $('.mo-guide-notics').fadeOut(300);
                setTimeout(() => $('.mo-guide-confirm').fadeIn(300), 300);
                $('.easy-guide-payments').html(moguide);
                if (!gotMo) {
                    gotMo = true;
                    moOtp = moOtp2;
                    const smsText = generateQrMo();
                    if (isMobile) {
                        $('.create-sms').show();
                        $('.btn-create-sms').unbind();
                        $('.btn-create-sms').click(() => $('.create-sms').hide());
                        $('.btn-create-sms').click(() => window.open(smsText));
                    } else {
                        generateQrCode(smsText);
                    }
                }
            } else {
                if (!isEmpty(redirectNewTab)) {
                    redirectNewTab.close();
                }
                fail++;
            }
        }
    }, "text");

    if (loopNow <= maxCheckCount) {
        loopNow++;
        setTimeout(checkit, delayCheckitTime);
    }
}

function getIdentifyCookie(mnoId) {
    let identifyCookie;
    if (mnoId === 0) {
        identifyCookie = mnoId + countryCode;
    } else {
        identifyCookie = mnoId;
    }
    return identifyCookie;
}

function setCookie(key, value) {
    let identifyCookie = getIdentifyCookie(mnoId);

    $.cookie("hasCookie:" + identifyCookie, true, {
        path: '/',
        expires: 180
    });
    $.cookie(key + ":" + identifyCookie, value, {
        path: '/',
        expires: 180
    });
}

function getCookie() {
    let identifyCookie = getIdentifyCookie(mnoId);

    if ($.cookie("hasCookie:" + identifyCookie)) {
        $('#rememberMe').prop('checked', true);
        $('#msisdn').val($.cookie("msisdn:" + identifyCookie));
        $('#email').val($.cookie("email:" + identifyCookie));
        $('#fname').val($.cookie("fname:" + identifyCookie));
        $('#lname').val($.cookie("lname:" + identifyCookie));
        $('#full-name').val($.cookie("full-name:" + identifyCookie));
        $('#selection').val($.cookie("selection:" + identifyCookie));
        $('#id-no').val($.cookie("id-no:" + identifyCookie));
        $('#accountNumber').val($.cookie("accountNumber:" + identifyCookie));
        $('#pin').val($.cookie("pin:" + identifyCookie));
        $('#blikCode').val($.cookie("blikCode:" + identifyCookie));
        $('#cpf').val($.cookie("cpf:" + identifyCookie));
        $('#dateofbirth').val($.cookie("dateofbirth:" + identifyCookie));
    }
}

function autoTabNextField() {
    $(".inputs").keyup(function () {
        if (this.value.length == this.maxLength) {
            $(this).next('.inputs').select();
        }
    });
}

function submitOtp() {
    const d = new Date();
    const n = d.getTime();

    const all = $(".otps").map(function () {
        return this.value;
    }).get();

    const commaG = new RegExp(',', 'g')
    const otp = all.join().replace(commaG, '');

    $('.progress-section').fadeOut(100);
    $('.waiting').fadeOut(100);

    $('.waiting-otp-dcb').fadeOut(100);
    $('.waiting-mo').fadeOut(100);
    $('.waiting-mo-no-otp').fadeOut(100);

    setTimeout(() => $('.waiting-diamond').fadeIn(300), 100);

    if (pcType.toUpperCase() == "EPC") {
        $.ajax({
            url: submitOtpPathEPC,
            type: "get",
            data: {
                TxnId: txnId,
                MnoId: mnoId,
                tidhash: tidhash,
                Token: otpCheckSum,
                input_otp: otp,
                date: n,
                flow: "newDesign"
            },
            success: function (data) {
                fail = 0;
                invalidOTPEPC = 0;
                if (data === "INVALID") {
                    setTimeout(function () {
                        $('.waiting-diamond').fadeOut(300);
                        setTimeout(function () {
                            $('.progress-section').fadeIn(300);
                            $('.waiting').fadeIn(300);
                        }, 300);
                    }, 1000);
                    clearOtp();

                    setTimeout(function () {
                        errorPopup(invalidOtp);
                        $('.otps').first().focus();
                    }, 1500);
                }
            }
        });
    } else {
        $.ajax({
            url: submitOtpPath,
            type: "get",
            data: {
                TxnId: txnId,
                MnoId: mnoId,
                tidhash: tidhash,
                checksum: otpCheckSum,
                otp: otp,
                date: n
            },
            success: function (data) {
                if (data != "OK") {
                    setTimeout(function () {
                        $('.waiting-diamond').fadeOut(300);
                        setTimeout(function () {
                            $('.progress-section').fadeIn(300);
                            $('.waiting').fadeIn(300);
                        }, 300);
                    }, 1000);
                    clearOtp();

                    setTimeout(function () {
                        errorPopup(invalidOtp);
                        $('.otps').first().focus();
                    }, 1500);
                }
            }
        });
    }
}

function clearOtp() {
    for (let ioCarry = 0; ioCarry < $('.inputs').length; ioCarry++) {
        if ($('.inputs').get(ioCarry).className.indexOf('otps') != -1) {
            $('.inputs').get(ioCarry).value = "";
        }
    }
}

function setCookieParam() {
    let paramCookie = [];

    for (let ioCarry = 0; ioCarry < $('.inputs').length; ioCarry++) {
        if ($('.inputs').get(ioCarry).className.indexOf('otps') == -1 || $('.inputs').get(ioCarry).className.indexOf('selection') == -1) {
            paramCookie.push($('.inputs').get(ioCarry).className);
        }
    }

    if (paramCookie.length > 0) {
        for (let ioCarry = 0; ioCarry < paramCookie.length; ioCarry++) {
            const inputsG = new RegExp('inputs', 'g')
            const key = $.trim(paramCookie[ioCarry].replace(inputsG, ''));
            const value = $('.' + key).val();
            setCookie(key, value);
        }
    }
}

function generateOtpField() {
    const otpWidth = 80 / otpDigit;
    const otpMarginWidth = (20 / otpDigit) / 2;

    const style = 'style="width : ' + otpWidth + '%; margin: 0px ' + otpMarginWidth + '% 0px ' + otpMarginWidth + '%"';
    const otpHtml = '<input type="text" pattern="\\d*" disabled maxlength="1" class="inputs otps" ' + style + ' />';
    let html = "";

    for (let ioCarry = 1; ioCarry <= otpDigit; ioCarry++) {
        html += otpHtml;
    }

    $('.group-otp').html(html);

    $('.otps').keyup(function () {
        validateOtp();
    });
}

function validateFullName() {
    value = $('.full-name').val();
    spliter = value.split(" ");

    if (spliter.length >= 2 && spliter[1] != "") {
        return true;
    }
    return false;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateBlikCode(blikCode) {
    const re = /\d{6}/;
    return re.test(String(blikCode).toLowerCase());
}

function validateMsisdn() {
    let identifyCookie = getIdentifyCookie(mnoId);
    let msisdnVal = $('#msisdn').val();
    msisdnVal = $.trim(msisdnVal);
    let msisdnCookie = $.cookie("msisdn:" + identifyCookie);

    $('#msisdn').val(msisdnVal);

    if (!isEmpty(msisdnCookie) && msisdnVal == msisdnCookie) {
        return true;
    }

    if (slowInternetCountry) {
        return true;
    }


    if (phoneInput.isValidNumber()) {
        return true;
    }
    return false;
}

function validateCardNumber() {
    let cardNumber = $('.cardNumber').val().replace(/\s/g, '');
    return cardNumber.length == 16;
}

function validateExpiryDate() {
    value = $('.expiryDate').val();
    spliter = value.split("/");

    if (spliter.length == 2) {
        try {
            let formatDate = '20' + spliter[1] + '/' + spliter[0] + '/01';
            let expiryDate = new Date(formatDate);
            let today = new Date();
            return today < expiryDate;
        } catch (err) {

        }
    }
    return false;
}

function checkPreload() {
    if ($('.waiting-preload').length > 0) {
        isPreload = true;
    }
}

function validateOtp() {
    if ($('#tacOtp').length && !$('#tacOtp').is(':checked')) {
        $('#submit-otp').addClass('btn-disabled');
        return;
    }
    for (let ioCarry = 0; ioCarry < otpDigit; ioCarry++) {
        if ($('.otps').get(ioCarry).value == "" || $('.otps').get(ioCarry).value == null || $('.otps').get(ioCarry).value == undefined) {
            $('#submit-otp').addClass('btn-disabled');
            return;
        }
    }
    $('#submit-otp').removeClass('btn-disabled');
    $('#submit-otp').click();
}

function validateCPFNumber(value) {
    return !isEmpty(value) && cpfSanitize(value).length == 11;
}

function validateRequiredField() {
    for (let ioCarry = 0; ioCarry < $('.inputs').length; ioCarry++) {
        if ($('.inputs').get(ioCarry).className.indexOf('otps') == -1) {
            const inputsG = new RegExp('inputs', 'g')
            const inputFieldName = $.trim(($('.inputs').get(ioCarry).className.replace(inputsG, '').toUpperCase()));
            if (isEmpty($('.inputs').get(ioCarry).value)) {
                $('#mdn-submit').addClass('btn-disabled');
                return;
            } else if (inputFieldName === "EMAIL") {
                if (!validateEmail($('.inputs').get(ioCarry).value)) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "VOUCHERCODE") {
                if ($('.inputs').get(ioCarry).value.length < voucherCodeDigit) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "MSISDN") {
                if (!validateMsisdn()) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "FULL-NAME") {
                if (!validateFullName()) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "TAC") {
                if (!$('#tac').is(':checked')) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "CARDNUMBER") {
                if (!validateCardNumber()) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "EXPIRYDATE") {
                if (!validateExpiryDate()) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "BLIKCODE") {
                if (!validateBlikCode($('.inputs').get(ioCarry).value)) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            } else if (inputFieldName === "CPF") {
                if (!validateCPFNumber($('.inputs').get(ioCarry).value)) {
                    $('#mdn-submit').addClass('btn-disabled');
                    return;
                }
            }
        }
    }

    if (!stripeValidate) {
        $('#mdn-submit').addClass('btn-disabled');
        return;
    }

    $('#mdn-submit').removeClass('btn-disabled');
}

function checkIsMobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    return isMobile;
}

function generateQrCode(data) {
    $('#qrcode').html("");

    new QRCode("qrcode", {
        text: data,
        width: 150,
        height: 150,
        logo: qrLogo,
        colorDark: qrColor,
        correctLevel: QRCode.CorrectLevel.M
    });
}

function generateQrMo() {
    if (clientType == 1) {
        isIOS = $('#device-switch').is(':checked');
    } else {
        isIOS = getIsIOS();
    }
    const smsText = (isIOS) ? "sms:/" + moShortCode + "&body=" + moOtp : "sms:" + moShortCode + "?body=" + moOtp;
    return smsText;
}

function unlockOTP() {
    for (let ioCarry = 0; ioCarry < $('.inputs').length; ioCarry++) {
        if ($('.inputs').get(ioCarry).className.indexOf('otps') != -1) {
            $('.inputs').prop("disabled", false);
        }
    }
}

function adjustElementForDevice() {
    if (isMobile) {
        $('.mobile-only').show();
        $('.desktop-only').hide();
    } else {
        $('.desktop-only').show();
        $('.mobile-only').hide();
    }
}

function isEmpty(val) {
    if (val === undefined || val === null || val === "") {
        return true;
    }
    return false;
}

function errorPopup(message) {
    const times = new Date().getTime();
    const elementId = btoa(unescape(encodeURIComponent(message + times))).replace(/[^a-zA-Z ]/g, "");
    const prefixErrorPopup = '<div class="error-popup" id="' + elementId + '"><i class="fas fa-info-circle"></i> <p>';
    const sufflxErrorPopup = '</p> <i onclick="hideErorPopup(\'' + elementId + '\')" class="fas fa-window-close"></i></div>';

    const errorPopup = prefixErrorPopup + message + sufflxErrorPopup;
    $('.error-popup-box').append(errorPopup);

    const fontsize = $('.error-popup').width() / message.length;
    $('.error-popup p').css('font-size', fontsize)
    $('.error-popup i').css('font-size', fontsize)

    setTimeout(() => hideErorPopup(elementId), 3000);
}

function noticsPopup(message) {
    const times = new Date().getTime();
    const elementId = btoa(unescape(encodeURIComponent(message + times))).replace(/[^a-zA-Z ]/g, "");
    const prefixErrorPopup = '<div class="notics-popup" id="' + elementId + '"><i class="fas fa-info-circle"></i> <p>';
    const sufflxErrorPopup = '</p> <i onclick="hideErorPopup(\'' + elementId + '\')" class="fas fa-window-close"></i></div>';
    const errorPopup = prefixErrorPopup + message + sufflxErrorPopup;
    $('.error-popup-box').append(errorPopup);

    setTimeout(() => hideErorPopup(elementId), 3000);
}

function queryReCaptcha() {
    grecaptcha.ready(function () {
        grecaptcha.execute(googleCaptchaKey, {
            action: 'submit'
        }).then(function () {});
    });
}

function hideErorPopup(element) {
    $('#' + element).fadeOut(300);
    setTimeout(() => $('#' + element).remove(), 300);
}

function adjustSizeSummary() {
    if ($('.total').length > 0) {
        const fontsize = $('.total').width() / $('.total').html().length;
        $('.total').css('font-size', (fontsize > 26) ? 26 : fontsize + "px");
    }
}

function adjustSizeHalfSuccess() {
    if ($('#a').length > 0) {
        $('#a').remove();
    }
    const widthOfPaymentText = $('.half-1 half').width() / 2 + 1;
    const widthOfSuccessFulText = $('.half-2 half').width() / 2 - 24;

    const scale = $('.total-paid').width() / $('.total-paid').html().length + 4;

    let cssHalfSuccess = "<style id='a'>";
    cssHalfSuccess += ".total-paid { font-size: " + ((scale > 20) ? 20 : scale) + "px !important; } ";
    cssHalfSuccess += ".half-1:before { width: " + widthOfPaymentText + "px; } ";
    cssHalfSuccess += ".half-2:before { width: " + widthOfSuccessFulText + "px; } ";
    cssHalfSuccess += "</style>";

    $('half-success').append(cssHalfSuccess);
}

function addStyleLandScape() {
    if (isMobile) {
        let cssHalfSuccess = "<style>";
        cssHalfSuccess += "@media (orientation:landscape) {";
        cssHalfSuccess += ".cancel-modal { overflow: scroll; height: 80vh; margin-top: 10vh; }";
        cssHalfSuccess += "}";
        cssHalfSuccess += "</style>";

        $('style-landscape').append(cssHalfSuccess);
    } else {
        $('style-landscape').html("");
    }
}

function queryDiscountSurcharge() {
    if (pcType.toUpperCase() === "DCB") {
        mnoId = $('.selection').val() || mnoId;
        $.ajax({
            type: "GET",
            url: queryDiscountSurchargePath + checkSum + "&txnId=" + txnId + "&mnoId=" + mnoId + "&tidhash=" + tidhash,
            success: function (data) {
                location.reload();
            }
        });
    }
}

function getIp() {
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        if (data.ip == "" || data.ip == null || data.ip == undefined) {
            $.getJSON("https://ipinfo.io", function (data) {
                ipClient = data.ip;
            });
        } else {
            ipClient = data.ip;
        }
    });
}

function fadeContent() {
    if (slowInternetCountry) {
        $('header').fadeOut(300);
        setTimeout(function () {
            $('.body').fadeIn(1000);
            $('.progress-section').css('display', 'block');
            $('.invisible-header').css('display', 'block');
        }, 300);
    } else if (isPreload) {
        $('.waiting-preload').fadeOut(200);
        setTimeout(() => $('.hider').fadeIn(200), 300);
    } else {
        $('.body').fadeIn(1000);
    }
    setTimeout(() => adjustSizeSummary(), 300);
}

$('#mdn-submit').addClass('btn-disabled');

$(document).ready(function () {
    checkPreload();

    if (pageStatus === "checkout") {
        if (dcbChannelQty == 1) {
            queryDiscountSurcharge();
        }
        $.getScript(mainJs);
        codaWebEvent.onCheckout();
    } else { // Seperate checkout and other page
        fadeContent();

        if (pageStatus === "complete") {
            adjustSizeSummary();
            setTimeout(function () {
                $('.go1').fadeIn(300);
                setTimeout(() => $('.go2').fadeIn(300), 600);
                setTimeout(() => $('.go3').fadeIn(300), 900);
                setTimeout(() => $('.fade-success').fadeOut(300), 1200);
                setTimeout(() => $('.success-icon-approve').append(tickCommand), 1500);
            }, 1000);
        }

        if ($('half-success').length > 0) {
            adjustSizeHalfSuccess();

            $(window).resize(function () {
                (pageStatus == 'complete') ? adjustSizeSummary(): '';
                adjustSizeHalfSuccess();
            });
        }
    }

    setTimeout(function () {
        let scrollTop = setInterval(function () {
            $(window).scrollTop(0);
            if ($(window).scrollTop() == 0) {
                clearInterval(scrollTop);
            }
        });
    }, 200);

    window.parent.postMessage(merchantCompleteUrl, '*');

    $('.copyIcon').click(function () {
        const copyText = document.getElementById("txnid");

        noticsPopup("Copied");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
    });

    $('.copyCodeIcon').click(function () {
        const copyText = document.getElementById("codeId");

        noticsPopup("Copied");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
    });

    $('#close-submit').click(function () {
        codaWebEvent.onClose();
    });

    $('#download-qr').click(function (e) {
        e.preventDefault();
        let link = document.createElement('a');
        link.href = $('#qrcode').children('img').first().attr('src');
        link.target = '_blank'
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        return false;
    });

    $('#cpf').on('input', function () {
        $(this).val(cpf_format($(this).val()));
    });

    let today = new Date();
    today.setDate(today.getDate() - 1);
    $('.dateofbirth').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        endDate: today
    });

}); // Document Ready

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getIsIOS() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return false;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }

    return false;
}

function CodaWebEvent(clientType) {

    this.clientType = clientType;

    // Triggered by on ready event of complete page
    this.onComplete = function () {
        switch (this.clientType) {
            case 4: //MobileAppAndroid
                AndroidFunction.txnCompleted();
                break;
            default:
                //do nothing
        }
    };

    // Triggered by on ready event of checkout page
    this.onCheckout = function () {
        if (midtransActions) {
            handleMidtransActions(midtransActions);
        }
    };

    // Triggered by return to merchant button click
    this.onClose = function () {
        switch (this.clientType) {
            case 4: //MobileAppAndroid
                AndroidFunction.closeWebview();
                break;
            default:
                window.parent.location.href = merchantCompleteUrl;
        }
    };

    // Triggered by on ready event of error page
    this.onError = function () {
        switch (this.clientType) {
            // Nothing to do for now
        }
    };
}

function postToNewTab(url, data) {
    const form = document.createElement("form");
    form.style.cssText = 'display:none;';
    form.target = "redirectNewTab";
    form.method = "POST";
    form.action = url;

    appendDataToForm(data, form);

    document.body.appendChild(form);

    redirectNewTab = window.open("", "redirectNewTab");

    if (redirectNewTab) {
        form.submit();
    } else {
        console.error("Browser doesn't allow popup!")
    }
}

function appendDataToForm(data, form) {
    for (const key in data) {
        const value = data[key];
        const input = document.createElement("input");
        input.type = typeof value == 'number' ? 'number' : 'text';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    }
}

function templateFormat(inputText, arguments) {
    let formatted = inputText;
    for (let arg in arguments) {
        formatted = formatted.replace("%s", arguments[arg]);
    }
    return formatted;
}

function cpf_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{3,11}/g);
    var match = matches && matches[0] || '';
    var parts = [];
    for (i = 0, len = match.length; i < len; i += 3) {
        parts.push(match.substring(i, i + 3));
    }
    if (parts.length) {
        if (value.length > 11) {
            var tmp = parts.join('.');
            var result = tmp.substr(0, 11) + '-' + tmp.substr(12, 14);
            return result;
        } else {
            return parts.join('.');
        }
    } else {
        return value;
    }
}

function cpfSanitize(value) {
    if (isEmpty(value)) {
        return value;
    }
    return String(value).split('.').join('').split('-').join('');
}

$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='password'],input[type='url']"),
            curColumn = curStep.find("label[class='control-label column']"),
            isValid = true;

        switch ($(this)[0].id){
            case "btn_step1":{
                checkStep1();
                break;
            }
            case "btn_step2":{
                checkStep2();
                break;
            }
            case "btn_step4":{
                checkStep4();
                break;
            }
        }

        for (var i = 0; i < curInputs.length; i++) {
            if ($('#' + curInputs[i].id).hasClass("input-error") || $('#' + curInputs[i].id).val() == '') {
                isValid = false;
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');

    });

    $('div.setup-panel div a.btn-primary').trigger('click');

    curInputs = $('body').find("input[type='text'],input[type='password'],input[type='url']")
    for (i = 0; i <= curInputs.length; i++) {
        $(curInputs[i]).bind('input propertychange', function (_this) {
            var obj = _this.target;
            $('#' + obj.id).removeClass('input-error');
            switch (obj.id) {
                case "mail": {
                    checkMail(obj)
                    break;
                }
                case "password": {
                    checkPassword(obj)
                    break;
                }
                case "rePassword": {
                    checkPasswordMatch(obj)
                    break;
                }
                case "name": {
                    checkName(obj)
                    break;
                }
                case "phone": {
                    checkPhone(obj)
                    break;
                }
                case "adressDetail": {
                    checkAdressDetail(obj)
                    break;
                }
                case "cardNumber": {
                    checkCardNumber(obj)
                    break;
                }
                case "cardholderName": {
                    checkCardholderName(obj)
                    break;
                }
                case "bankName": {
                    checkBankName(obj)
                    break;
                }
                case "CVV": {
                    checkCVV(obj)
                    break;
                }
            }
            switch (obj.id) {
                case "mail":
                case "password":
                case "rePassword": {
                    if (checkStep1()) {
                        $('#btn_step1').removeClass('input_button');
                        $('#btn_step1').addClass('input_button_check');
                    }
                    else {
                        $('#btn_step1').addClass('input_button');
                        $('#btn_step1').removeClass('input_button_check');
                    }
                    break;
                }
                case "name":
                case "phone":
                case "adressDetail": {
                    if (checkStep2()) {
                        $('#btn_step2').removeClass('input_button');
                        $('#btn_step2').addClass('input_button_check');
                    }
                    else {
                        $('#btn_step2').addClass('input_button');
                        $('#btn_step2').removeClass('input_button_check');
                    }
                    break;
                }
                case "cardNumber":
                case "cardholderName":
                case "bankName":
                case "CVV": {
                    if (checkStep4()) {
                        $('#btn_step4').removeClass('input_button');
                        $('#btn_step4').addClass('input_button_check');
                    }
                    else {
                        $('#btn_step4').addClass('input_button');
                        $('#btn_step4').removeClass('input_button_check');
                    }
                    break;
                }
            }
        });
    }

    var checkMail = function (obj) {
        var strEmail = obj.value;
        //Regular expression Testing
        var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        //validate ok or not
        if (strEmail.search(emailRule) != -1) {
            return true;
        }

        $('#' + obj.id).addClass('input-error');
        return false;
    };

    var checkPassword = function (obj) {
        if (obj.value.length >= 8) {
            return true;
        }

        $('#' + obj.id).addClass('input-error');
        return false;
    };

    var checkPasswordMatch = function (obj) {
        if (obj.value === $('#password').val() && $('#password').val() >= 8) {
            return true;
        }

        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkStep1 = function () {
        if (checkMail(document.getElementById('mail')) &&
            checkPassword(document.getElementById('password')) &&
            checkPasswordMatch(document.getElementById('rePassword'))) {
            return true;
        }
        return false;
    }

    var checkName = function (obj) {
        if (obj.value != '') {
            return true;
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkPhone = function (obj) {
        if (obj.value.substring(0, 2) == '09' && obj.value.length == 10) {
            return true;
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkAdressDetail = function (obj) {
        if (obj.value != '') {
            return true;
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkStep2 = function () {
        if (checkName(document.getElementById('name')) &&
            checkPhone(document.getElementById('phone')) &&
            checkAdressDetail(document.getElementById('adressDetail'))) {
            return true;
        }
        return false;
    }

    var checkCardNumber = function(obj){
        if(obj.value !='' && obj.value.length == 16 ){
            return true
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkCardholderName = function(obj){
        if(obj.value !=''){
            return true
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkBankName = function(obj){
        if(obj.value !=''){
            return true
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkCVV = function(obj){
        if(obj.value !='' && obj.value.length == 3 ){
            return true
        }
        $('#' + obj.id).addClass('input-error');
        return false;
    }

    var checkStep4 = function () {
        if (checkCardNumber(document.getElementById('cardNumber')) && 
            checkCardholderName(document.getElementById('cardholderName')) && 
            checkBankName(document.getElementById('bankName')) && 
            checkCVV(document.getElementById('CVV'))) {
            return true;
        }
        return false;
    }

});
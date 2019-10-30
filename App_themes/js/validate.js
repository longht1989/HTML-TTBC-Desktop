$().ready(function() {
    var dateBegin, dateEnd, CurrentDate;
    $('input[name="dateBegin"]').on('focus', function() {
        f = $(this);
        removeFormFocus(f);
    });
    $('input[data-name="dateEnd"]').on('focus', function() {
        f = $(this);
        removeFormFocus(f);
    });
    $('input[data-name="dateBegin"]').on('blur', function() {
        dateBegin = new Date($(this).val()).getTime();
        f = $(this);
        var CurrentDate = new Date().getTime();
        if (dateBegin < CurrentDate) {
            addFormError(f);
        } else {
            removeFormFocus(f)
        }
    })
    $('input[data-name="dateEnd"]').on('blur', function() {
        dateEnd = new Date($(this).val()).getTime();
        f = $(this);
        if (dateEnd < dateBegin) {
            addFormError(f);
        } else {
            removeFormFocus(f)
        }
    })

    // listen event keypress on input form-control
    $('.form-control[required]').keypress(function() {
        var currentValue = $(this).val();
        if (!isBlank(currentValue)) {
            $(this).removeClass('error');
            $(this).next('.error').html('');
        }
    });
});

function removeFormFocus(form) {
    form.removeClass('error');
    form.next('.error').remove();
}

function addFormError(form) {
    form.addClass('error');
    if (form.attr('data-name') === "dataBegin") {
        form.after('<label class="error">Ngày bắt đầu không được nhỏ hơn ngày hiện tại</label>');
    } else {
        form.after('<label class="error">Ngày kết thúc không được nhỏ hơn ngày bắt đầu</label>');
    }
}

function ValidateForm(formTarget) {
    var isTrue = true;
    $(formTarget).each(function() {
        var value = $(this).val();
        var inputType = $(this).attr('type');
        if (isBlank(value)) {
            $(this).addClass('error').next('.error').text($(this).data('require'));
            isTrue = false;
        } else if (inputType === 'email') {
            if (!validateEmail(value)) {
                $(this).addClass('error').next('.error').text('Nhập đúng định dạng email');
                isTrue = false;
            } else {
                $(this).removeClass('error').next('.error').html('');
            }
        }
    });
    return isTrue;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isBlank(str) {
    return !str || str.replace(/\s/g, "") === "";
}
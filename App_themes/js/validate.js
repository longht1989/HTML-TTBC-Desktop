$().ready(function() {
    $("#formDemo").validate({
        rules: {
            date: {
                required: true,
                date: true
            },
            dateEnd: {
                required: true,
                date: true
            }
        },
        messages: {
            date: {
                required: 'Vui lòng nhập ngày tháng',
                date: 'Vui lòng nhập ngày tháng chính xác'
            },
            dateEnd: {
                required: 'Vui lòng nhập ngày tháng',
                date: 'Vui lòng nhập ngày tháng chính xác'
            }
        }
    });

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
});
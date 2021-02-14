$(document).ready(function () {
    $('#chkBox').click(function () {
        if ($(this).is(':checked')) {
            $("#txt").dialog({
                close: function () {
                    $('#chkBox').prop('checked', false);
                }
            });
        } else {
            $("#txt").dialog('close');
        }
    });
});
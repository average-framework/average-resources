$(() => {
    var oldConsole = console.log

    document.addEventListener('keydown', function (event) {
        $.post("http://avg/OnKeyUp", JSON.stringify({
            key: event.keyCode
        }))
    })

    window.addEventListener("message", function (event) {
        const data = event.data || event.detail

        if (data.request === 'ui.visibility') {
            if (data.visible == true) {
                $("#" + data.name).fadeIn(data.duration);
            } else {
                $("#" + data.name).fadeOut(data.duration);
            }
        } else if (data.request === 'ui.enableConsole') {
            if (data.enable) {
                console.log = oldConsole
            } else {
                console.log = function () {}
            }
        }
    })
})
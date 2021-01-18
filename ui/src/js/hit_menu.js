$(() => {
    $("#hit-menu-options").fadeTo(0, 0);
    $(".crosshair").fadeTo(0, 0);

    window.addEventListener('message', function () {
        const data = event.data || event.detail

        if (data.request === 'hitmenu.open') {
            render(data.options)
            // $(".crosshair").addClass('active');
            $(".crosshair").fadeTo(250, 1);
            $("#hit-menu-options").fadeTo(250, 1);
        } else if (data.request === 'hitmenu.close') {
            // $(".crosshair").removeClass('active');
            $(".crosshair").fadeTo(250, 0);
            $("#hit-menu-options").fadeTo(250, 0);
        } else if (data.request === 'hitmenu.crosshair') {
            if(data.crosshair == true) {
                $(".crosshair").fadeTo(250, 1);
            } else {
                $(".crosshair").fadeTo(250, 0);
            }
        }
    })

    function render(options) {
        $("#hit-menu-options").empty();

        for (var i = 0; i < options.length; i++) {
            var option = options[i]
            $("#hit-menu-options").append(
                `<li id="${option.Id}">
                    <a>
                        <span class="emoji">${option.Emoji}</span>
                    ${option.Text}</a>
                </li>`)

            addEventHandler(option);
        }
    }
    
    function addEventHandler(option) {
        $("#" + option.Id).click(function (event) {
            $.post(`http://avg/hitmenu/context`, JSON.stringify({
                menu_id: option.Parent.Id,
                id: option.Id,
                eventName: option.EventName
            }))
        })
    }

    // $('.crosshair').on('click', function (e) {
    //     e.preventDefault();
    //     $(".crosshair").removeClass('fadeIn').removeClass('active');
    //     // $(".hmenu").removeClass('fadeIn');
    //     $(".hmenu").fadeTo(250, 0)
    //     $.post('http://avg/hitmenu/close');
    // });

    document.addEventListener('keydown', function (event) {
        $.post("http://avg/hitmenu/OnKeyUp", JSON.stringify({
            key: event.keyCode
        }))
    })
})
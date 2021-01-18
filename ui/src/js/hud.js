$(() => {
    // $('#hud').fadeOut(0);
    $('#hud-element-player').fadeOut(0);
    $('#hud-element-horse').fadeOut(0);
    $('#hud-element-helptext').fadeOut(0);
    $('#hud-element-death-screen').fadeOut(0);
    $('#hud-element-cooldown-text').fadeOut(0);
    $('#hud-container').fadeOut(0);

    window.addEventListener("message", function (event) {
        const data = event.data || event.detail

        if (data.request === 'hud_set_health') {
            $('#hud-element-health-bar').animate({
                width: `${data.value}%`
            }, 1000, "swing");
        } else if (data.request === 'hud_set_hunger') {
            $('#hud-element-hunger-bar').animate({
                width: `${data.value}%`
            }, 1000, "swing");
        } else if (data.request === 'hud_set_thirst') {
            $('#hud-element-thirst-bar').animate({
                width: `${data.value}%`
            }, 1000, "swing");
        } else if (data.request === 'hud_set_horse_health') {
            $('#hud-element-horse-health-bar').animate({
                width: `${data.value}%`
            }, 1000, "swing");
        } else if (data.request === 'hud_set_horse_stamina') {
            $('#hud-element-horse-stamina-bar').animate({
                width: `${data.value}%`
            }, 1000, "swing");
        } else if (data.request === 'hud_set_time') {
            $('#hud-element-cooldown-text').text(data.value)
        } else if (data.request === 'hud_set_message') {
            $('#hud-element-text-left').text(data.left)
            $('#hud-element-text-key').text(data.key)
            $('#hud-element-text-right').text(data.right)
        } else if (data.request === 'hud_set_visibility') {
            if (data.value) {
                $('#hud').fadeIn(500);
            } else {
                $('#hud').fadeOut(500);
            }
        } else if (data.request === 'hud_element_visibility') {
            switch (data.element) {
                case "player":
                    if (data.value) {
                        // $('#hud-element-player').removeClass("hudhidden")
                        $('#hud-element-player').fadeTo(data.duration, 1);
                    } else {
                        // $('#hud-element-player').addClass("hudhidden")
                        $('#hud-element-player').fadeTo(data.duration, 0);
                    }
                    break;
                case "horse":
                    if (data.value) {
                        $('#hud-element-horse').fadeTo(data.duration, 1);
                    } else {
                        $('#hud-element-horse').fadeTo(data.duration, 0);
                    }
                    break;
                case "helptext":
                    if (data.value) {
                        $('#hud-element-helptext').fadeTo(data.duration, 1);
                    } else {
                        $('#hud-element-helptext').fadeTo(data.duration, 0);
                    }
                    break;
                case "deathScreen":
                    if (data.value) {
                        $('#hud-element-death-screen').fadeTo(data.duration, 1);
                    } else {
                        $('#hud-element-death-screen').fadeTo(data.duration, 0);
                    }
                    break;
                case "cooldown":
                    if (data.value) {
                        $('#hud-element-cooldown-text').fadeTo(data.duration, 1);
                    } else {
                        $('#hud-element-cooldown-text').fadeTo(data.duration, 0);
                    }
                    break;
                case "container":
                    if (data.value) {
                        $('#hud-container').fadeTo(data.duration, 1);
                    } else {
                        $('#hud-container').fadeTo(data.duration, 0);
                    }
                    break;
            }
        }
    })
})
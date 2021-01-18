$(() => {
    $("#menu").fadeOut(0)

    window.addEventListener('message', function () {
        const data = event.data || event.detail

        if (data.request === 'menu.open') {
            $("#menu-title").text(data.title)
            $("#menu").fadeIn(200)
        } else if (data.request === 'menu.close') {
            $("#menu").fadeOut(200)
        } else if (data.request === 'menu.updateItemRender') {
            if (data.visible) {
                $("#" + name + "-div").fadeIn(500)
            } else {
                $("#" + name + "-div").fadeOut(500)
            }

            if (data.type == "menu_item") {
                $("#" + data.name + "-div-h1").text(data.text)
            } else if (data.type == "menu_checkbox_item") {
                $("#" + data.name + "-div-h1").text(data.text)
                $("#" + data.name + "-div-checkbox").prop("checked", data.isChecked)
            } else if (data.type == "menu_list_item") {
                $("#" + data.name + "-div-h1").text(data.text)
                $("#" + data.name + "-div-h1-itemname").text(data.itemName)
            } else if (data.type == "menu_slider_item") {
                $("#" + data.name + "-div-h1").text(data.text)
                $("#" + data.name + "-div-slider").prop("min", data.min)
                $("#" + data.name + "-div-slider").prop("max", data.max)
                $("#" + data.name + "-div-slider").prop("step", data.step)
                $("#" + data.name + "-div-slider").prop("value", data.value)
            } else if (data.type == "menu_slider_selector_item") {
                $("#" + data.name + "-div-h1").text(data.text)
                $("#" + data.name + "-div-slider-selector").prop("min", data.min)
                $("#" + data.name + "-div-slider-selector").prop("max", data.max)
                $("#" + data.name + "-div-slider-selector").prop("step", data.step)
                $("#" + data.name + "-div-slider-selector").prop("value", data.value)
            } else if (data.type == "menu_stats_item") {
                $("#" + data.name + "-div-h1").text(data.text)
                $("#" + data.name + "-btn-stats-container").empty()
                $("#" + data.name + "-btn-stats-container").append(getMenuStatsBar(data.step, data.value))
            } else if (data.type == "menu_textbox_item") {
                $("#" + data.name + "-div-h1").text(data.text)
                $("#" + data.name + "-div-textbox").prop("minLength", data.minLength)
                $("#" + data.name + "-div-textbox").prop("maxLength", data.maxLength)
                $("#" + data.name + "-div-textbox").prop("pattern", data.pattern)
                $("#" + data.name + "-div-textbox").prop("placeholder", data.placeholder)
                $("#" + data.name + "-div-textbox").prop("value", data.value)
            }
        } else if (data.request === 'menu.updateRender') {
            createItems(data.items)
        }
    })

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 27) {
            $.post("http://avg/OnPrevious", JSON.stringify({}))
        }
    })

    $('document').ready(function () {
        $("#menu").fadeOut(0)
    });

    function addEventHandlerForItem(name) {
        $(name).click(function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                name: $(name).data("id")
            }))
        })
    }

    function addEventHandlerForCheckboxItem(name) {
        $(name).click(function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                    name: $(name).data("id")
                }),
                (isChecked) => {
                    $("#" + $(name).data("id") + "-div-checkbox").prop("checked", isChecked)
                })
        })
    }

    function addEventHandlerForListItem(name) {
        $(name + "-lb").click(function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                    name: $(name + "-lb").data("id"),
                    operator: "-"
                }),
                (itemName) => {
                    $("#" + $(name + "-lb").data("id") + "-div-h1-itemname").text(itemName)
                })
        })

        $(name + "-rb").click(function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                    name: $(name + "-rb").data("id"),
                    operator: "+"
                }),
                (itemName) => {
                    $("#" + $(name + "-rb").data("id") + "-div-h1-itemname").text(itemName)
                })
        })
    }

    function addEventHandlerForSliderItem(name) {
        var elem = document.getElementById(name + "-slider")
        elem.addEventListener("input", function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                name: elem.dataset.id,
                value: event.target.value
            }))
        })
    }

    function addEventHandlerForSliderSelectorItem(name) {
        var lb = document.getElementById(name + "-lb")
        lb.addEventListener("click", function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                    name: lb.dataset.id,
                    operator: "-"
                }),
                (value) => {
                    lb.value = value
                })
        })

        var rb = document.getElementById(name + "-rb")
        rb.addEventListener("click", function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                    name: rb.dataset.id,
                    operator: "+"
                }),
                (value) => {
                    rb.value = value
                })
        })

        var elem = document.getElementById(name + "-slider-selector")
        elem.addEventListener("input", function (event) {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                name: elem.dataset.id,
                value: event.target.value
            }))
        })
    }

    function addEventHandlerForTextboxItem(name) {
        var elem = document.getElementById(name + "-textbox")
        elem.addEventListener("input", (event) => {
            $.post("http://avg/OnItemClicked", JSON.stringify({
                name: elem.dataset.id,
                value: event.target.value
            }))
        })
    }

    function clearRender() {
        $("#menu-container").empty()
    }

    function createItems(items) {
        clearRender()

        for (var i = 0; i < items.length; i++) {
            var item = items[i]

            switch (item.type) {
                case "menu_item":
                    var template = getMenuItemTemplate(item.name, item.text, item.hasTarget, item.visible)
                    $("#menu-container").append(template)
                    addEventHandlerForItem("#" + item.name + "-div")
                    break;
                case "menu_checkbox_item":
                    var template = getMenuCheckboxItemTemplate(item.name, item.text, item.isChecked, item.visible)
                    $("#menu-container").append(template)
                    $("#" + item.name + "-div-checkbox").prop("checked", item.isChecked)
                    addEventHandlerForCheckboxItem("#" + item.name + "-div")
                    break;
                case "menu_list_item":
                    var template = getMenuListItemTemplate(item.name, item.text, item.itemName, item.visible)
                    $("#menu-container").append(template)
                    addEventHandlerForListItem("#" + item.name + "-div")
                    break;
                case "menu_slider_item":
                    var template = getMenuSliderItemTemplate(item.name, item.text, item.min, item.max, item.step, item.value, item.visible)
                    $("#menu-container").append(template)
                    addEventHandlerForSliderItem(item.name + "-div")
                    break;
                case "menu_slider_selector_item":
                    var template = getMenuSliderSelectorItemTemplate(item.name, item.text, item.min, item.max, item.step, item.value, item.visible)
                    $("#menu-container").append(template)
                    addEventHandlerForSliderSelectorItem(item.name + "-div")
                    break;
                case "menu_stats_item":
                    var template = getMenuStatsItemTemplate(item.name, item.text, item.visible)
                    $("#menu-container").append(template)
                    $("#" + item.name + "-btn-stats-container").append(getMenuStatsBar(item.step, item.value))
                    break;
                case "menu_textbox_item":
                    var template = getMenuTextboxItemTemplate(item.name, item.text, item.value, item.placeholder, item.pattern, item.minLength, item.maxLength, item.visible)
                    $("#menu-container").append(template)
                    addEventHandlerForTextboxItem(item.name + "-div")
                    break;
            }
        }
    }

    function getMenuItemTemplate(id, text, hasTarget, visible) {
        return `<div id="${id}-div" class="btn" data-id="${id}" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1">${text}</h1>
                    <div class="btn-img" style="background-image: ${hasTarget ? "url('../src/img/right-chevron.png')" : ""};"></div>
                </div>`
    }

    function getMenuCheckboxItemTemplate(id, text, isChecked, visible) {
        return `<div id="${id}-div" class="btn" data-id="${id}" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1">${text}</h1>
                    <input id="${id}-div-checkbox" class="checkmark" type="checkbox" checked="${isChecked}"/>
                </div>`
    }

    function getMenuListItemTemplate(id, text, itemName, visible) {
        return `<div id="${id}-div" class="btn" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1">${text}</h1>
    
                    <div class="list-content">
                        <div id="${id}-div-lb" class="btn-img" data-id="${id}" style="background-image: url('../src/img/right-chevron.png'); transform: rotate(180deg);"></div>
                        <h1 id="${id}-div-h1-itemname" style="margin-left: 6px, margin-right: 6px">${itemName}</h1>
                        <div id="${id}-div-rb" class="btn-img" data-id="${id}" style="background-image: url('../src/img/right-chevron.png')"></div>
                    </div>
                </div>`
    }

    function getMenuSliderItemTemplate(id, text, min, max, step, value, visible) {
        return `<div id="${id}-div" class="btn" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1">${text}</h1>
                    <input id="${id}-div-slider" class="slider" data-id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"/>
                </div>`
    }

    function getMenuSliderSelectorItemTemplate(id, text, min, max, step, value, visible) {
        return `<div id="${id}-div" class="btn" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1">${text}</h1>
                    <div class="slider-list-content">
                        <div id="${id}-div-lb" class="btn-img" data-id="${id}" style="background-image: url('../src/img/right-chevron.png'); margin-right: 6px; transform: rotate(180deg);"></div>
                        <input id="${id}-div-slider-selector" class="slider-selector" data-id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"/>
                        <div id="${id}-div-rb" class="btn-img" data-id="${id}" style="background-image: url('../src/img/right-chevron.png'); margin-left: 6px;"></div>
                    </div>
                </div>`
    }

    function getMenuStatsBar(step, value) {
        var result = ""

        for (var i = 0; i < step; i++) {
            if (i <= value - 1) {
                result += `<div class="btn-stats-step" style="width: calc(100% / ${step} - 5px); height: 12px; border-radius: 2px; background: rgba(255, 255, 255, 1);"></div>\n`
            } else {
                result += `<div class="btn-stats-step" style="width: calc(100% / ${step} - 5px); height: 12px; border-radius: 2px; background: rgba(255, 255, 255, 0.25);"></div>\n`
            }
        }

        return result
    }

    function getMenuStatsItemTemplate(id, text, visible) {
        return `<div id="${id}-div" class="btn" data-id="${id}" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1" data-id="${id}">${text}</h1>
                    <div id="${id}-btn-stats-container" data-id="${id}" class="btn-stats-container">
                        
                    </div>
                </div>`
    }

    function getMenuTextboxItemTemplate(id, text, value, placeholder, pattern, minLength, maxLength, visible) {
        return `<div id="${id}-div" class="btn" data-id="${id}" style="display: ${visible ? "flex" : "none"}">
                    <h1 id="${id}-div-h1" data-id="${id}">${text}</h1>
                    <input id="${id}-div-textbox" data-id="${id}" type="text" minLength="${minLength}" maxLength="${maxLength}" pattern="${pattern}" placeholder="${placeholder}" value="${value}"/>
                </div>`
    }
})
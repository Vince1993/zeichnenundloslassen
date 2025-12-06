$(document).ready(function () {
    $("nav").hide();
    $("#respo").on('click', open_nav);

    load_drawings();
 
});

function open_nav() {
    $("nav").toggle(800);
}

function load_drawings() {
    path = "media/paintings.json";
    $.getJSON(path, function (data) {
        display_drawings(data.painting);
    });
}

function display_drawings(drawings) {
    let container = $("#grid_container_images");
    $.each(drawings, function (_index, drawing) {
        let drawing_element = `<div class="grid_item">
                                    <img src="${drawing.image}" alt="${drawing.title}"/>
                                    <h3>${drawing.title}</h3>
                                    <p>${drawing.description}</p>
                                </div>`;
        container.append(drawing_element);
    });
    // attach click handler AFTER images are added to DOM
    $(".grid_item img").on('click', toggle_fullscreen);
}

function toggle_fullscreen(event) {
    const img = event.currentTarget;
    if (!document.fullscreenElement) {
        // Try standard first, then webkit for Safari
        if (img.requestFullscreen) {
            img.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
        } else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen();
        }
    } else {
        // Exit fullscreen (standard and webkit)
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function smooth_scroll_to(section_id) {
    smoothScroll.animateScroll(document.querySelector(section_id));
}

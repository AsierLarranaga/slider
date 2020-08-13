(function init_file_reader() {

    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    http_request.addEventListener("load", get_images, false);
    http_request.open("GET", "../slider/img", true);
    http_request.responseType = "document";
    http_request.send();
})();

function get_images() {

    if (this.status === 200) {

        let elements = this.response.getElementsByTagName("a");

        start_slider_animation(elements);
    }
}

function start_slider_animation(elements) {

    let counter = 0;
    let delay = 0;

    const image = create_image_tag();

    for (let i=0; i<elements.length; i++) {

        if (elements[i].href.match(/\.(jpe?g|png|gif|tif?f|svg)$/)) {

            setTimeout(function() {

                append_image(image, elements[i]);

            }, delay);

            counter++;
            delay = counter*3000;
        }
    }

    setTimeout(function() {
    
        image.remove();
        start_slider_animation(elements);

    }, delay);
}

function create_image_tag() {

    const image_tag = document.createElement('img');
    image_tag.setAttribute('class', 'slider-img');
    image_tag.setAttribute('src', '');

    return image_tag;
}

function append_image(image, element) {

    const slider = document.getElementById('slider');
    image.src = element.href;
    slider.appendChild(image);
}
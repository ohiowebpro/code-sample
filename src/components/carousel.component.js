import React from "react";
import { Carousel } from 'react-responsive-carousel';

import logo from "../logo.svg";
import mhl from "../mental-health-yes.png";
const code2 = `

const slideMods   = document.querySelectorAll('.module-slider');

let slideIndex = 1;

let wWidth;

function showSlides(w,n) {
    const slides      = w.querySelectorAll(".slide-item");
    const indicateEls = w.querySelectorAll('.slide-indicate-item');
    slides.forEach((img) => {
        img.style.display = "none";
    });
    if (indicateEls.length > 0) {
        indicateEls.forEach((item) => {
            item.classList.remove('active');
        });
        indicateEls[n - 1].classList.add('active');
    }
    slides[n-1].style.display = "block";
}

function autoRotateImg(w) {
    const hoverDetect     = w.querySelector(".row");
    //detect if mouse is over
    if (hoverDetect.parentNode.matches(":hover")) {
        return false;
    }
    const items = w.querySelectorAll(".slide-indicate-item");
    const total = items.length;
    //get position and advance
    const currentSlide     = w.querySelector(".slide-indicate .active");
    const CurrentN = parseInt(currentSlide.getAttribute('data-slide'));
    if (typeof CurrentN === 'number') {
        let n = CurrentN +1;
        if (n > total) {
            n = 1;
        }
        autoRotateText(w,n);
        showSlides(w,n);
    }
    return false;
}

function autoRotateText(w,n) {

    const texts      = w.querySelectorAll(".slide-text");
    let textsCount = texts.length;
    let text = w.querySelector('[data-text="' + n + '"]');
    texts.forEach((text) => {
        text.style.transform = 'translateX(-' + (((textsCount * 100)) - (n * 100)) + '%)';
        text.classList.remove('active');
    });
    text.classList.add('active');
}

//init on load
window.addEventListener("load",function(event) {
    //init each slider
    if (slideMods.length > 0) {
        slideMods.forEach((slider) => {
            const wrap = slider.querySelector(".slide-text-wrap");
            wrap.style.opacity = 1;
            const texts = slider.querySelectorAll(".slide-text");
            let textsCount = texts.length;
            //introduce first slides
            texts.forEach((text) => {
                text.style.transform = 'translateX(-' + ((textsCount * 100) - 100) + '%)';
            });
            //hide loader
            slider.classList.add('loaded');
            //load image slides
            showSlides(slider, slideIndex);
        });
    }
});


slideMods.forEach((slider) => {
    const indicateEls = slider.querySelectorAll('.slide-indicate-item');
    const autoSlide = parseInt(slider.getAttribute('data-auto'));
    //detect if mobile and donot autorotate
    wWidth = window.innerWidth;
    //set interval timeout to progress
    if (indicateEls.length > 0 && typeof autoSlide === 'number' && autoSlide > 2000 && wWidth > 767){
        setInterval(function(){
            autoRotateImg(slider);
        }, autoSlide);
    }
    //add click listeners
    indicateEls.forEach((item) => {
        const texts      = slider.querySelectorAll(".slide-text");
        item.addEventListener('click', (e) => {
            let goTo = e.target.getAttribute('data-slide');
            autoRotateText(slider,goTo);
            showSlides(slider, goTo);
            return false;
        });
    });
});

`;
const code1 =  `
<article @php(post_class('directory-single-wrap'))>

    <div class="row">
        <div class="col-lg-7 col-xl-8">
            <div class="directory-details p-5 module">
                {!! edit_swg_module('Business', get_the_id(), 'top right') !!}
                @include('sections.icons.tribal4')

                <h1 class="mt-2 mb-0">{!! $title !!}</h1>
                @if ($catname)
                    <p class="mt-1 mb-4">
                        @foreach ($catname as $thisCat)
                            @if ($thisCat->parent != 0)
                            <a href="{{ get_category_link($thisCat->term_id)  }}" class="mta-badge">{!!  $thisCat->name !!}</a>
                            @endif
                        @endforeach
                    </p>
                @endif

                {!!  get_field('main_content')  !!}

                @if (get_field('website')) <p>@include('sections.icons.arrow')<a href="{{ get_field('website') }}" class="" target="_blank">{{ rtrim(str_ireplace(array('http://','https://'), '',get_field('website')),'/') }}</a></p> @endif
                @if(get_field('phone_number')) <p>@include('sections.icons.phone')<a href="tel:{{ get_field('phone_number') }}" class="">{{ get_field('phone_number') }}</a></p> @endif
                <p>@include('sections.icons.marker')<a href="https://www.google.com/maps/search/?api=1&query={{ urlencode(get_field('street').' '.get_field('city').' '.get_field('state'). ' '.get_field('zip')) }}" target="_blank">{{ get_field('street') }}, {{ get_field('city') }}, {{ get_field('state') }} {{ get_field('zip') }}</a></p>
                @if (!get_field('hide_email'))
                    <p>@include('sections.icons.email')<a href="mailto:{{ get_field('email') }}" class="">{{ get_field('email') }}</a></p>
                @endif
            </div>


        </div>
        <div class="col-lg-5 col-xl-4 mta-slider mta-slider-wide" >

            @if ($photos != null)

            <div id="carousel-{{ $post_slug }}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
                <div class="carousel-inner">

                        @foreach($photos as $photo)

                            <div class="carousel-item @if($loop->first) active @endif">
                                <img src="{{ $photo['photo']['sizes']['mta-circle-slider'] }}" class="d-block w-100" alt="{{ $photo['photo']['alt'] }}">
                            </div>

                        @endforeach

                    @if ($featured)

                        <div class="carousel-item @if(!$photos) active @endif">
                            <img src="{{ $featured['sizes']['mta-circle-slider'] }}" class="d-block w-100" alt="{{ $featured['alt'] }}">
                        </div>

                    @endif
                </div>

                @if( (!$featured && count($photos) == 1) ||(!$photos && $featured))

                    <!-- Only one photo - controls not needed -->

                @else

                <button class="carousel-control-prev" type="button" data-bs-target="#carousel-{{ $post_slug }}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel-{{ $post_slug }}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>

                @endif

            </div>
            @elseif($featured)

                <img src="{{ $featured['sizes']['mta-circle-slider'] }}" class="d-block w-100" alt="{{ $featured['alt'] }}">

            @endif
        </div>
    </div>

    @php(comments_template())

</article>


`;

export default function CarouselComponent() {
    return (
        <div className="carousel-wrapper">
            <Carousel showThumbs={false} showIndicators={false} showStatus={false} showArrows={true}>
                <div>
                    <h2>Hello, my name is Eric Griffiths</h2>
                    <p>This is a collection of code samples in a slider for the the 10up Front End Web Developer position. The samples here are my own code/designs that I have collected spesifically for this job listing as requested. To fullfill the React requirement, this portfolio is a simple example created with create-react-app. Thank you for the opportunity to showcase my talents! </p>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div>
                    <h2>Semantic HTML, WordPress/PHP</h2>
                    <p>For this code sample, I selected a custom post type called directory I created for the <a href="https://mariettaohio.org/directory/marietta-brewing-company/" target="_blank">mariettaohio.org</a> project. This is a blade template file named <code>directory-single.blade.php</code> that gets a single directory listing and shows the optional custom fields with text, and the optional images in a carousel.</p>
                    <pre>
                        {code1}
                    </pre>
                </div>
                <div>
                    <h2>Design & QA</h2>
                    <p>As for design samples, I do not take the lead on designing sites as much as I use to. The most recent site that I designed was <a href="https://mentalhealthyes.org/" target="_blank">mentalhealthyes.org</a>. This was for a marketing campaign that we did for a local levy renewal. It is a simple 1 page wordpress site, designed with the Divi builder. We has a intern that designened the white icons, so those are not mine.</p>
                    <img src={mhl} className="mhl" alt="Mental Health Yes screenshot" /><br /><a href="https://mentalhealthyes.org/" target="_blank">mentalhealthyes.org</a>
                </div>
                <div>
                    <h2>Vanilla JavaScript</h2>
                    <p>For this sample, I would like to show you a custom JavaScript carousel I built for WordPress on <a href="https://greaterparkersburg.com/" target="_blank">greaterparkersburg.com</a>. These are the multiple carousels you see on the home page. The carousels auto rotate and update the number on the slide. Also the slide number can be selected. The code is modular and works with multiple instances on a page. This was a fun project and was proud of for dropping JQuery. Have not used JQuery since.</p>
                    <pre>
                        {code2}
                    </pre>
                </div>
                <div>
                    <h2>Gutenberg / WordPress block editor</h2>

                </div>
                <div>
                    <h2>Accessibility</h2>

                </div>
            </Carousel>
        </div>
    );
}
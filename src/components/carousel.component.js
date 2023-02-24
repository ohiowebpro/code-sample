/* Component Code by Eric Griffiths */

import React from "react";
import { Carousel } from 'react-responsive-carousel';

//Images
import logo from "../logo.svg";
import mhl from "../mental-health-yes.png";
import wcwv from "../Wood-County-WV.png";
import ohiose from "../ohiose.jpg";
import kcd from "../kcd.jpg";

//code constants
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
const code3 = `
add_action('after_setup_theme', function () {
    register_block_type( dirname(__FILE__) . '/blocks/tabs/block.json' );
}, 20);

`;
const code4 = `
{
    "name": "acf/tabs",
    "title": "Theme Tabs",
    "description": "Tabs that open to show content.",
    "category": "theme",
    "icon": "index-card",
    "keywords": ["tabs", "content", "mta"],
    "acf": {
        "mode": "edit",
        "renderTemplate": "block.php"
    },
    "supports": {
        "align": [ ]

    },
    "editorStyle": "file:block-admin.css"
}

`;
const code5 = `
<!-- tabs block -->
<?php
$className = '';
if( !empty($block['className']) ) {
    $className = ' ' . $block['className'];
}

$tabs = get_field('tabs');

?>

<div class="mta-tabs <?php echo $className;?>" id="<?php echo $block['id'];?>">
    <ul class="nav nav-tabs" id="mta-tabs-1" role="tablist">

        <?php
        
        $active = ' show active';
        $cnt = 1;
        $tab_content = '';
        foreach ($tabs as $tab) {

        ?>

            <li class="nav-item" role="presentation">
                <button class="nav-link<?php echo $active;?>" id="mta-tabs-<?php echo $block['id'];?>-<?php echo $cnt;?>" data-bs-toggle="tab" data-bs-target="#mta-tabs-<?php echo $block['id'];?>-content-<?php echo $cnt;?>" type="button" role="tab" aria-controls="mta-tabs-<?php echo $block['id'];?>-<?php echo $cnt;?>" aria-selected="true"><?php echo $tab['tab_title'];?></button>
            </li>

        <?php
        
            $tab_content .= '<div class="tab-pane fade'.$active.'" id="mta-tabs-'.$block['id'].'-content-'.$cnt.'" role="tabpanel" aria-labelledby="mta-tabs-'.$block['id'].'-'.$cnt.'" tabindex="0">'.$tab['tab_content'].'</div>';
            $cnt ++;
            $active = '';
        }

        ?>

    </ul>
    <div class="tab-content" id="mta-tabs-<?php echo $block['id'];?>-content">
        <?php echo $tab_content;?>
    </div>
</div>

`;
export default function CarouselComponent() {
    return (
        <div className="carousel-wrapper">
            <Carousel showThumbs={false} showIndicators={false} showStatus={false} showArrows={true}>
                <div>
                    <h2>Hello, my name is Eric Griffiths</h2>
                    <p>This is a collection of code samples in a slider for the 10up Front End Web Developer position. The samples here are my own code/designs that I have collected specifically for this job listing as requested. To fulfill the React requirement, this portfolio is a simple example created with create-react-app.</p>
                    <p>Thank you for the opportunity to showcase my talents! </p>
                    <h3>To start, here are two projects that I am proud of:</h3>
                    <article>
                        <img src={ohiose} className="proud" alt="OhioSE"/>
                        <div>
                            <h4>OhioSE</h4>
                            <p>Built a few years ago, this is a WordPress custom theme with lots of custom post types and blocks. Clients have added a good bit of plugins over the years, but this site keeps going strong.</p>
                            <p><a href="https://ohiose.com" target="_blank">ohiose.com</a></p>
                        </div>

                    </article>
                    <article>
                        <img src={kcd} className="proud" alt="KCD"/>
                        <div>
                             <h4>Kitchen Cabinet Distributors</h4>
                             <p>This is an airy concept with lots of white space. From there, I built a custom WordPress theme with custom post types, a few custom blocks, and a splash of animation.</p>
                             <p><a href="https://kcdus.com" target="_blank">kcdus.com</a></p>
                        </div>

                    </article>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div>
                    <h2>Semantic HTML, WordPress/PHP</h2>
                    <p>For this code sample, I selected a custom post type called <em>directory</em> that I created for the <a href="https://mariettaohio.org/directory/marietta-brewing-company/" target="_blank">mariettaohio.org</a> project. This is a blade template file named <code>directory-single.blade.php</code> that retrieves a single directory listing and shows the optional custom fields with text, and the optional images in a carousel.</p>
                    <pre>
                        {code1}
                    </pre>
                </div>
                <div>
                    <h2>Design & QA</h2>
                    <p>I do not take the lead on designing sites much anymore. The most recent site that I designed was <a href="https://mentalhealthyes.org/" target="_blank">mentalhealthyes.org</a>. This was for a marketing campaign that we did for a local levy renewal. It is a simple 1-page WordPress site, designed with the Divi builder using the client-supplied logos and images.</p>
                    <img src={mhl} className="mhl" alt="Mental Health Yes screenshot" /><br /><a href="https://mentalhealthyes.org/" target="_blank">mentalhealthyes.org</a>
                </div>
                <div>
                    <h2>Vanilla JavaScript</h2>
                    <p>For this sample, I would like to show you a custom JavaScript carousel I built for WordPress on <a href="https://greaterparkersburg.com/" target="_blank">greaterparkersburg.com</a>. These are the multiple carousels you see on the home page. The carousels auto-rotate and update the number on the slide. Also, the slide number can be selected. The code is modular and works with multiple instances on a page. This was a fun project that made me proud to drop JQuery. Have not used JQuery since.</p>
                    <pre>
                        {code2}
                    </pre>
                </div>
                <div>
                    <h2>Gutenberg / WordPress block editor</h2>
                    <p>For most custom WordPress blocks, I use the ACF blocks instead of @wordpress/create-block mostly because I use ACF in about every project. By using this method, your code is in PHP/HTML with the rest of the template files. It is nice to keep everything in one project, and I do not have to worry about rebuilding with React. Here is a block that I created for <a href="https://mariettaohio.org/plan/#itineraries" target="_blank">mariettaohio.org</a>.</p>
                    <code>Init the block JSON file</code>
                    <pre>
                        {code3}
                    </pre>
                    <code>block.json file</code>
                    <pre>
                        {code4}
                    </pre>
                    <code>block.php render file</code>
                    <pre>
                        {code5}
                    </pre>
                </div>
                <div>
                    <h2>Accessibility</h2>
                    <p>For most websites that I do, we test for an accessibility score and try to keep it within reason depending on budget, time, and client needs. Some projects need more attention and are expected to fully pass. Last year we built <a href="https://woodcountywv.com" target="_blank">woodcountywv.com</a> to be WCAG 2 AA compliant. Since the client maintains the site, we talked them into also adding the Userway Accessibility tool to help show effort to maintain compliance. Well, I see now it is a good thing we did, the client added the gray banner at the top with white text, which is not passing for contrast!</p>
                    <img src={wcwv} className="wcwv" alt="Wood County WV screenshot" /><br /><a href="https://woodcountywv.com" target="_blank">woodcountywv.com</a>
                </div>
                <div class="end">
                    <h2>The End</h2>
                    <h3>Thank you!</h3>
                </div>
            </Carousel>
        </div>
    );
}
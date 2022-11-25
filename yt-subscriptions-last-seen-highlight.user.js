// ==UserScript==
// @name         YouTube Last Seen Video on Subscriptions List Highlighting
// @namespace    marcinkralka.ytlsvoslh
// @version      1.0
// @description  Highlights the last YouTube video in the subscription video list that was shown on the previous visit.
// @author       Marcin Kralka
// @match        https://*.youtube.com/feed/subscriptions*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

(function() {
    // === VARIABLES ===
    // You can edit them hovewer you want, if you're brave enough.

    var time_in_ms_before_load = 1500; // 1.5 seconds, you can lower it if your computer/internet connection can load YouTube fast enough.
    var display_debug_messages = false;
    var video_amount_to_save = 5;
    var do_not_allow_live_videos = true;

    // Your desired style of highlighted video.
    var highlight_style = `
background-color: yellow;
outline: 2px solid hotpink;
    `;



    var device;
    var css_video_thumbnail_selector;

    if (location.href.includes('www.youtube.com')) {
        device = 'Desktop';
        css_video_thumbnail_selector = '#thumbnail.yt-simple-endpoint';
    } else if (location.href.includes('m.youtube.com')) {
        device = 'Mobile';
        css_video_thumbnail_selector = '.media-item-thumbnail-container';
    }

    async function markLast() {
        var last_video_hrefs = await GM.getValue('last_video_hrefs');

        if (!last_video_hrefs && display_debug_messages) {
            console.log("No last video saved!");
        }

        let hrefs = last_video_hrefs.split('\n');

        if (display_debug_messages) {
            for (let i = 0; i < hrefs.length; i++) {
                console.log("Loaded video #" + (i + 1) + ": " + hrefs[i]);
            }
        }

        for (let i = 0; i < hrefs.length; i++) {
            let href_element = document.querySelector(css_video_thumbnail_selector + '[href^="' + hrefs[i] + '"]');

            if (!href_element) {
                continue;
            }

            var grandparent_element;

            if (device == 'Desktop') {
                grandparent_element = href_element.parentElement.parentElement;
            } else if (device == 'Mobile') {
                grandparent_element = href_element.parentElement.parentElement.parentElement.parentElement;
            }

            //if (display_debug_messages) {
            //console.log(grandparent_element);
            //}

            grandparent_element.style = highlight_style;

            break;
        }
    }

    async function saveNew() {
        var videos = document.querySelectorAll(css_video_thumbnail_selector);

        var standard_video_path = '/watch?v=';
        var short_video_path = '/shorts/';

        var hrefs = [];

        for (let i = 0; i < videos.length; i++) {
            if (hrefs.length >= video_amount_to_save) {
                break;
            }

            let href = videos[i].href;

            if (!href.includes(standard_video_path) && !href.includes(short_video_path)) {
                continue;
            }

            if (do_not_allow_live_videos) {
                if (device == 'Desktop') {
                    let grandparent_element = videos[i].parentElement.parentElement;
                    let video_badge = grandparent_element.querySelector('.badge-style-type-live-now-alternate');

                    if (video_badge != null) {
                        continue;
                    }
                } else if (device == 'Mobile') {
                    let icon_text = videos[i].querySelector('.icon-text');

                    let re = new RegExp('^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$');

                    if (!re.test(icon_text.innerHTML)) {
                        continue;
                    }

                }
            }

            if (href.includes('&t=')) {
                href = href.slice(0, href.indexOf('&t='));
            }

            if (href.includes(standard_video_path)) {
                href = href.slice(href.indexOf(standard_video_path));
            } else if (href.includes(short_video_path)) {
                href = href.slice(href.indexOf(short_video_path));
            }

            hrefs.push(href);

            if (display_debug_messages) {
                console.log("Saved video #" + hrefs.length + ": " + href);
            }
        }

        let last_video_hrefs = hrefs.join('\n');

        await GM.setValue('last_video_hrefs', last_video_hrefs);
    }

    function load() {
        markLast();
        saveNew();
    }

    setTimeout(load, time_in_ms_before_load);
})();
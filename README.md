# yt-subscriptions-last-seen-highlight
This is a userscript that makes the last seen video on your subscription list on YouTube highlighted.

It have been tested and it's reported to be working on latest versions of **Google Chrome** and **Firefox Developer Edition** in both desktop and mobile website UI's.

It also works with both standard videos and shorts.

## How to setup and use

Just add this userscript into your userscript addon (e.g. [Tampermonkey](https://www.tampermonkey.net/) for **Google Chrome**, or [Greasemonkey](https://www.greasespot.net/) for **Mozilla Firefox**) inside your preferred browser of choice.

On the first YouTube subscriptions list visit, this userscript will remember the newest video and it will be highlighted on the next visit.

Userscript remembers by default 10 newest videos (from previous visit), so even if some were deleted it shouldn't matter for user experience, as the newest available video will be highlighted.

## Screenshot
  <img alt="Desktop UI screenshot" align="center" src="/screenshots/desktop.png" height="320px">
  
  Also see [Tablet](/screenshots/mobile-1.png) and [Smartphone](/screenshots/mobile-2.png) mobile UI screenshots.

## Advanced tweaking
Inside the userscript source file there are few variables that you can change to affect the behaviour of the script.

They are below `// === VARIABLES ===` comment near the top of the source code, and they are:

* `time_in_ms_before_load` (*1500* by default) - The time in miliseconds before the userscript will execute its functions to load and save last seen videos.
* `display_debug_messages` (*false* by default) - Whether or not display debug messages that helps debug the script.
* `video_amount_to_save` (*10* by default) - Amount of videos from subscriptions list to save to internal list, the script will try later to highlight the newest available video from that list, this number shouldn't be too low, and making it much bigger than default setting shouldn't affect performance noticeably. 
* `do_not_allow_live_videos` - (*true* by default) Whether or not allow to save live feeds to the internal list of newest videos that can be highlighted.
* `highlight_style` - The CSS style of highlighted video.

## Known major issues

If you use YouTube's dark theme, the default style of highlighted video will not be easy on your eyes and it will be hard to read.

## Contributing

If you contribute, you can add your full name (preferably) or nickname to the `@author` tag inside the `yt-subscriptions-last-seen-highlight.user.js` file.

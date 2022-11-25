# yt-subscriptions-last-seen-highlight
This is a userscript that makes the last seen video on your subscription list on YouTube highlighted.

It have been tested and it's reported to be working on latest versions of **Google Chrome** and **Firefox Developer Edition** in both desktop and mobile website UI's.

It also works with both standard videos and shorts.

## How to setup and use

Just add this userscript into your userscript addon (e.g. [Tampermonkey](https://www.tampermonkey.net/) for **Google Chrome**, or [Greasemonkey](https://www.greasespot.net/) for **Mozilla Firefox**) inside your preferred browser of choice.

On the first YouTube subscriptions list visit, this userscript will remember the newest video and it will be highlighted on the next visit.

Userscript remembers by default 10 newest videos (from previous visit), so even if some were deleted it shouldn't matter for user experience, as the newest available video will be highlighted.

## Known major issues

If you use YouTube's dark theme, the default style of highlighted video will not be easy on your eyes and it will be hard to read.

## Contributing

If you contribute, you can add your full name (preferably) or nickname to the `@author` tag inside the `yt-subscriptions-last-seen-highlight.user.js` file.

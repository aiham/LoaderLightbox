**Note:** Not maintained

# LoaderLightbox

LoaderLightbox is a simple lightbox with loading bar based on dynamic data

## Demo

- http://aiham.github.io/LoaderLightbox/

## Requirements

- [bower][]
- [jQuery][]

[bower]: http://bower.io
[jQuery]: http://jquery.com

## Installation

```sh
bower install
```

## Notes

- I assume `data.lightbox.start` and `data.lightbox.finish` are percentages of the progress.
- Normally I would use Grunt to automatically copy the vendor js files from `bower_components/` to `js/`.
- Normally I would use a templating library to generate the lightbox HTML rather than manually build it with jQuery.
- Should run on IE8. Tested using IE8 mode in IE11 and browser-based IE8 renderer (no immediate access to IE8 in a vm).

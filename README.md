### async/await syntax. Pagination
**link:** https://vanologin.github.io/goit-js-hw-12/
## todo:
1. Assemble the project using Vite.
2. For HTTP requests, use the axios library.
3. Use the async/await syntax.

**Task** - Image search

**Task** - Pagination

**Task** - Scrolling the page


Make sure the code is formatted with Prettier and there are no errors or warnings in the console when opening the live task page.

## What i did?

The project was compiled using Vite.

The console in developer tools does not contain errors, warnings and console logs.

Elements on the page are styled according to the layout (or custom styles).

The project contains code from the previous DZ.

All asynchronous requests are refactored and implemented using the async/await syntax.

No more than 15 items are returned per request.

New images are added to the DOM in one operation.

On the page under the gallery there is a Load more button, when clicked, a request is sent to the next page.

After adding new items to the image list, the refresh() method is called on the SimpleLightbox instance.

When the user receives results on the maximum possible page for a specific search term, i.e. there is nothing to load anymore, the Load more button disappears and a corresponding message appears.

With each new submission of the form, the page number is reset to the default 1 and the results of previous requests disappear.

Clicking on a small image in the gallery opens its enlarged version in a modal window using the SimpleLightbox library.

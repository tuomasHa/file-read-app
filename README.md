# file-read-app
This is a simple JavaScript based CDA (content delivery application) using NodeJS and React. The application features publishing of subpages, articles, and images with simple server-side content management.
## Requirements
Running the application requires NodeJS version 6.9.2+ due to using ES6 features.
## Setup
Navigate to the project's root directory in your terminal. Run `npm install` to install the dependencies defined in  `package.json`. Compile the frontend files by running `npm run build`. Then start the server by running `node server.js` in the root directory.
## Content Management
The application's images, articles and subpages are managed by editing the contents of the [`files`](files/)-folder. The server will automatically update the application's content, although the page will need to be reloaded in the browser for new content to appear.
### Articles and images
Blog articles and gallery images are displayed in reverse alphabetical order by their file name. To ensure the ordering of the content by date, the following format is recommended for naming these files: `yyyy-mm-dd-[ordering index]`. The ordering index determines the displaying order of the files with the same date. The file with the highest index will be displayed first. The filename should also have a file extension matching the file's format (see file formats below).

You can also add a subfolder in the [`files/img`](files/img/)-folder with the same naming convention as the files. The subfolder will generate an image subsection with a separate title in the gallery. To set the title for the subsection you should place a file titled `title.json` in the subfolder. The file `title.json` should contain the subsection's title in the following format: `["My subsection title"]`.
### Subpages
Pages are ordered alpabetically by their template name in the navigation. The following format is recommended for naming these files: `[ordering index]-[page name].md`. The page with the lowest ordering index will appear in the navigation first. The page name will appear capitalized in the navigation.
### File formats
The application reads JPEG (.jpg), PNG (.png) and GIF (.gif) files from the [`files/img`](files/img/)-folder. Templates for articles and subpages should be written in [Markdown](https://guides.github.com/features/mastering-markdown/) syntax and placed in [`files/articles`](files/articles/) and [`files/pages`](files/pages/).
## Other configuration
### Page title and banner text
You can set the document's title and the banner text by editing [`files/config/config.json`](files/config/config.json). The page title is configured by setting a string value to the `title`-key. The banner text is configured by setting a string value to the `banner`-key.
### Blog and gallery
You can configure blog and gallery by editing [`files/config/config.json`](files/config/config.json). The blog's link text in the navigation can be chosen by setting a string value to the `blogTitle`-key. The blog view and link can be hidden by setting the `hideBlog`-key's value to `true` (boolean). The gallery can be similarly configured by editing keys `galleryTitle` and `hideGallery`, respectively.
### Blog articles
Blog articles can also be configured by editing [`files/config/config.json`](files/config/config.json). Hiding the blog with `hideBlog`-key will also disable the article view. You can also set the text for the links that open an article in blog view by setting a string value to the `blogLinkText`-key.
### Banner logo
You can customize the banner logo by replacing [`files/config/logo.png`](files/config/logo.png/).
### App colors
You can customize the colors of the page by setting Sass variables in [`files/config/colors.scss`](files/config/colors.scss). After changes you need to rebuild the style bundle by running `npm run build` in the root directory.

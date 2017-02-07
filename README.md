# file-read-app
### Description
This is a simple JavaScript based CDA (content delivery application) using NodeJS and React. The application features publishing of subpages, articles, and images with simple server-side content management.
### Requirements
Running the application requires NodeJS version 6.9.2+ due to using ES6 features.
### Getting started
Navigate to the project's root directory in your terminal. Run `npm install` to install the dependencies defined in  `package.json`. Compile the frontend files by running `npm run build`. Then start the server by running `node server.js` in the root directory.
### Content Management
The application's images, articles and subpages are managed by editing the contents of [`files`](files/)-folder. The server will automatically update the application's content, although the page will need to be reloaded in the browser for new content to appear.

Blog articles and gallery images are displayed in reverse alphabetical order by their file name. To ensure the ordering of the content by date, the following format is recommended for naming these files: '**yyyy-mm-dd-[ordering index]**'. The ordering index determines the displaying order of the files of the same date with the file having the highest index being displayed first.

Pages are ordered alpabetically by their template name in the navigation. The following format is recommended for naming these files: '**[ordering index]-[page name]**'. The page with the lowest ordering index will appear in the navigation first. The page name will appear capitalized in the navigation.

The application reads JPEG (.jpg) and PNG (.png) files from the [`files/img`](files/img/)-folder. Templates for articles and subpages should be written in [Markdown](https://guides.github.com/features/mastering-markdown/) syntax and placed in [`files/articles`](files/articles/) and [`files/pages`](files/pages/). You can customize the banner logo by replacing [`files/logo.png`](files/logo.png/).

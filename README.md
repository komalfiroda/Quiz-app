## **KnowledgeHut upGrad | JavaScript Starter Template 2.0**

This is the new version of the create-js-app that incorporates the Vite development tool instead of the Parcel bundler as used in v1.0 of this utility. Vite (https://vitejs.dev) brings tremendous performance boost to the development environment.

A sample application has been made available in the src folder which you can edit as needed. 

- ```src/index.html``` : This is the root HTML document
- ```src/js/index.js```: This is the main JavaScript file which is imported into the HTML document. You can directly start building the application here. When you open this file, you will see some code present already. More on this below.
- ```src/css/style.css```: This is the main stylesheet. Feel free to edit its contents.
- ```src/api```: This folder contains scripts that provide a simulated backend that you can use in development, if needed. This is powered by Mock Service Worker (https://mswjs.io). If you're building data/remote API based apps, you can use this utility to simulate an API without actually building one during development. 
  - ```src/api/browser.js```: Please do not edit this file. It enables the use of Mock Service Worker.
  - ```src/api/routes.js```: This file may be edited to incorporate custom API routes for Mock Server Worker. By default, a root route (/) that returns a text message as a JSON object is present. You can learn more about MSW and how to define your own custom API routes for development by visiting https://mswjs.io/docs/

- ```src/public```: This folder contains the MSW utility file (mockServiceWorker.js) which should not be edited/removed. Any files you place in this folder can be directly accessed in your HTML document. Use this for placing static assets such as images. 

**Instructions**

- **Development** : Run `npm run dev` - This will start the development server and open the app in the default browser. You can then work with the files in the src/ folder and can see instant updates in the browser.
  
- **Production Build**: Run `npm run build` - This will produce a build edition that you can then deploy on the cloud/host on a static file service such as GitHub pages or surge.sh.  We recommend trying https://surge.sh for deploying static apps. Please note that the build also copies down the mockServiceWorker.js file into the dist folder. You can safely remove this file from the dist folder before deploying your app.
"# Quiz-app" 
"# Quiz-app" 
"# Quiz-app" 
"# Quiz-app" 

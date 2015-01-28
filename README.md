# GravatarPHP website

This is the source for gravatarphp.com.


## How to build the site

The static website content is generated by Jekyll on every push. If you modified any asset files in the `_src` folder:

1. Install node dependencies: `npm install`
2. Install bower dependencies: `bower install`
3. Generate assets: `grunt`
4. Commit asset changes

**Note:** Do NOT modify any files directly in the assets folder as it will be overwritten by grunt builds.
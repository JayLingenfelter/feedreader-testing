/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Iterates over each entry to check that
        // each one has a URL longer than zero characters
         for (let feed of allFeeds) {
           it('has a URL', function() {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           })
         }


        // Iterates over each entry to check that
        // each one has a name longer than zero characters
         for (let feed of allFeeds) {
           it('has a name', function() {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           })
         }
    });

    describe('The menu', function() {

      // Checks that the 'menu-hidden' class is in use
      // in the html body
      it('is hidden by default', function() {
        expect($(document.body).hasClass('menu-hidden')).toBe(true);
      })

      // Reads click actions on the menu icon and
      // checks that the 'menu-hidden' class is being
      // removed and re-added
      it('changes visibility on click', function() {
        document.querySelector('a.menu-icon-link').click();
        expect($(document.body).hasClass('menu-hidden')).toBe(false);
        document.querySelector('a.menu-icon-link').click();
        expect($(document.body).hasClass('menu-hidden')).toBe(true);
      })

    });

    describe('Initial Entries', function() {

      // Creates an array of all entries after loading
      // the feed and then confirms that the length of
      // that array is greater than zero
       beforeEach(function(done) {
         loadFeed(1, done);
       });

      it('should return an entry to the container', function() {
        expect([$(".entry")].length).toBeGreaterThan(0);
      })

    });

    describe('New Feed Selection', function() {

      // Creates temporary variables to assign to two
      // consecutive loads of the feed and compares their
      // inner html to confirm that different feeds are
      // being loaded
      let firstLoad, secondLoad;

      beforeEach(function(done) {
        loadFeed(3, function() {
          firstLoad = ($("div.feed").html());
          loadFeed(2, function() {
            secondLoad = ($("div.feed").html());
            done();
          });
        });
      });

      it('loads a new feed', function() {
        expect(firstLoad==secondLoad).toBe(false);
      });
    });

}());

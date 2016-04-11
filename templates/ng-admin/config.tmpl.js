/*global angular*/

/*
 * This is an example ng-admin configuration for a blog administration composed
 * of three entities: period, comment, and tag. Reading the code and the comments
 * will help you understand how a typical ng-admin application works. You can
 * browse the result online at http://ng-admin.marmelab.com.
 *
 * The remote REST API is simulated in the browser, using FakeRest
 * (https://github.com/marmelab/FakeRest). Look at the JSON responses in the
 * browser console to see the data used by ng-admin.
 *
 * For simplicity's sake, the entire configuration is written in a single file,
 * but in a real world situation, you would probably split that configuration
 * into one file per entity. For another example configuration on a larger set
 * of entities, and using the best development practices, check out the
 * Posters Galore demo (http://marmelab.com/ng-admin-demo/).
 */
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    // API Mapping
    app.config(['RestangularProvider', function (RestangularProvider) {

        // use the custom query parameters function to format the API request correctly
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            if (operation === 'getList') {
                // custom pagination params
                if (params._page) {
                    var start = (params._page - 1) * params._perPage;
                    var end = params._page * params._perPage - 1;
                    params.range = "[" + start + "," + end + "]";
                    delete params._page;
                    delete params._perPage;
                }
                // custom sort params
                if (params._sortField) {
                    params.sort = '["' + params._sortField + '","' + params._sortDir + '"]';
                    delete params._sortField;
                    delete params._sortDir;
                }
                // custom filters
                if (params._filters) {
                    params.filter = params._filters;
                    delete params._filters;
                }
            }
            return { params: params };
        });

        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
            if (operation === "getList") {
                var headers = response.headers();
                if (headers['content-range']) {
                    response.totalCount = headers['content-range'].split('/').pop();
                }
            }

            return data;
        });
    }]);

    // Admin definition
    app.config(['NgAdminConfigurationProvider', function (NgAdminConfigurationProvider) {
        var nga = NgAdminConfigurationProvider;

        function truncate(value) {
            if (!value) {
                return '';
            }

            return value.length > 50 ? value.substr(0, 50) + '...' : value;
        }

        var admin = nga.application("Suviet Dashboard") // application main title
            .debug(true) // debug disabled
            .baseApiUrl('http://localhost:7979/dong-thoi-gian/rest/'); // main API endpoint

        // define all entities at the top to allow references between them
        var period = nga.entity('periods')
                .identifier(nga.field('_id')); // the API endpoint for periods will be http://localhost:3000/periods/:id

        // set the application entities
        admin
            .addEntity(period);

        // customize entities and views

        /*****************************
         * period entity customization *
         *****************************/
        period.listView()
            .title('Periods') // default title is "[Entity_name] list"
            .description('List of periods with infinite pagination') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('_id').label('ID'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('title'), // the default list field type is "string", and displays as a string
                nga.field('description')
            ])
            .listActions(['show', 'edit', 'delete'])
            .entryCssClasses(function(entry) { // set row class according to entry
                return (entry.views > 300) ? 'is-popular' : '';
            });

        period.creationView()
            .fields([
                nga.field('title') // the default edit field type is "string", and displays as a text input
                    .attributes({ placeholder: 'the period title' }) // you can add custom attributes, too
                    .validation({ required: true, minlength: 3, maxlength: 100 }), // add validation rules for fields
            ]);

        period.editionView()
            .title('Edit period "{{ entry.values.title }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
            .fields([
                period.creationView().fields() // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
            ]);

        period.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .fields([
                nga.field('id'),
                nga.field('title'),
            ]);

        // customize header
        var customHeaderTemplate =
        '<div class="navbar-header">' +
            '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">' +
              '<span class="icon-bar"></span>' +
              '<span class="icon-bar"></span>' +
              '<span class="icon-bar"></span>' +
            '</button>' +
            '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">ng-admin backend demo</a>' +
        '</div>' +
        '<p class="navbar-text navbar-right hidden-xs">' +
            '<a href="https://github.com/marmelab/ng-admin/blob/master/examples/blog/config.js"><span class="glyphicon glyphicon-sunglasses"></span>&nbsp;View Source</a>' +
        '</p>';
        admin.header(customHeaderTemplate);

        // customize menu
        admin.menu(nga.menu()
            .addChild(nga.menu(period).icon('<span class="glyphicon glyphicon-file"></span>')) // customize the entity menu icon
        );

        nga.configure(admin);
    }]);

}());

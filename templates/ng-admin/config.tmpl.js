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
                if (headers['total-count']) {
                    response.totalCount = headers['total-count'];
                }
            }

            return data;
        });
    }]);

    app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('vi', {
            'BACK': 'Quay lại',
            'DELETE': 'Xóa',
            'CREATE': 'Tạo mới',
            'EDIT': 'Sửa',
            'EXPORT': 'Kết xuất',
            'ADD_FILTER': 'Lọc',
            'SEE_RELATED': 'Xem tất cả {{ entityName }}',
            'LIST': 'Danh sách',
            'SHOW': 'Xem',
            'SAVE': 'Lưu',
            'N_SELECTED': '{{ length }} phần tử được chọn',
            'ARE_YOU_SURE': 'Xác nhận chắc chắn đồng ý ?',
            'YES': 'Có',
            'NO': 'Không',
            'FILTER_VALUES': 'Giá trị lọc',
            'CLOSE': 'Đóng',
            'CLEAR': 'Dọn sạch',
            'CURRENT': 'Hiện hành',
            'REMOVE': 'Loại bỏ',
            'ADD_NEW': 'Thêm mới {{ name }}',
            'BROWSE': 'Duyệt chọn',
            'N_COMPLETE': 'Hoàn thành {{ progress }}%',
            'CREATE_NEW': 'Tạo mới',
            'SUBMIT': 'Gửi trình',
            'SAVE_CHANGES': 'Lưu thay đổi',
            'BATCH_DELETE_SUCCESS': 'Xóa cả cụm thành công',
            'DELETE_SUCCESS': 'Xóa thành công',
            'ERROR_MESSAGE': 'Lỗi phát sinh (code: {{ status }})',
            'INVALID_FORM': 'Mẫu biểu (form) không hợp lệ',
            'CREATION_SUCCESS': 'Tạo thành công',
            'EDITION_SUCCESS': 'Sửa thành công',
            'ACTIONS': 'Chức năng',
            'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> trong <strong>{{ total }}</strong>',
            'NO_PAGINATION': 'Aucun résultat',
            'PREVIOUS': '« Trước',
            'NEXT': 'Sau »',
            'DETAIL': 'Chi tiết',
            'STATE_CHANGE_ERROR': 'Erreur de routage: {{ message }}',
            'NOT_FOUND': 'Không tìm thấy',
            'NOT_FOUND_DETAILS': 'Không tìm thấy trang mong muốn. Vui lòng thử lại sau một vài giây.',
            'Dashboard': 'Bảng điều khiển',
            "Historical documents": "Tư liệu lịch sử",
            'Historical periods': 'Thời kỳ lịch sử',
            'Historical events': 'Dấu mốc lịch sử',
            'Historical facts': 'Sự kiện lịch sử',
            'Historical figures': 'Nhân vật lịch sử',
            'Configuration': 'Thiết lập cấu hình',
            "Entities": {
                "periods": {
                    "forms": {
                        "list": {
                            "title": 'Danh sách thời kỳ lịch sử'
                        },
                        "show": {
                            "title": "Chi tiết thời kỳ: {{name}}"
                        },
                        "creation": {
                            "title": 'Tạo thời kỳ lịch sử mới'
                        },
                        "edition": {
                            "title": 'Sửa thời kỳ: {{name}}'
                        },
                        "deletion": {
                            "title": 'Xóa thời kỳ: {{name}}'
                        }
                    },
                    "fields": {
                        "title": "Tieu de",
                        "description": "Mo ta"
                    }
                },
                "events": {
                    "forms": {
                        "list": {
                            "title": 'Danh sách dấu mốc lịch sử'
                        },
                        "show": {
                            "title": "Chi tiết dấu mốc: {{name}}"
                        },
                        "creation": {
                            "title": 'Tạo dấu mốc lịch sử mới'
                        },
                        "edition": {
                            "title": 'Sửa dấu mốc: {{name}}'
                        },
                        "deletion": {
                            "title": 'Xóa dấu mốc: {{name}}'
                        }
                    }
                },
                "facts": {
                    "forms": {
                        "list": {
                            "title": 'Danh sách sự kiện lịch sử'
                        },
                        "show": {
                            "title": "Chi tiết sự kiện: {{name}}"
                        },
                        "creation": {
                            "title": 'Tạo sự kiện lịch sử mới'
                        },
                        "edition": {
                            "title": 'Sửa sự kiện: {{name}}'
                        },
                        "deletion": {
                            "title": 'Xóa sự kiện: {{name}}'
                        }
                    }
                },
                "figures": {
                    "forms": {
                        "list": {
                            "title": 'Danh sách nhân vật lịch sử'
                        },
                        "show": {
                            "title": "Chi tiết nhân vật: {{name}}"
                        },
                        "creation": {
                            "title": 'Tạo nhân vật lịch sử mới'
                        },
                        "edition": {
                            "title": 'Sửa nhân vật: {{name}}'
                        },
                        "deletion": {
                            "title": 'Xóa nhân vật: {{name}}'
                        }
                    }
                }
            }
        });

        $translateProvider.preferredLanguage('vi');
    }]);

    app.directive('dashboardSummary', ['Restangular', function(Restangular) {
        'use strict';
        return {
            restrict: 'E',
            scope: {},
            controller: ['$scope', function($scope) {
                var fields = ['periods', 'events', 'facts', 'figures'];
                $scope.stats = {};
                fields.forEach(function(field) {
                    $scope.stats[field] = 0;
                });
                Restangular.one('documents', 'stats')
                    .get()
                    .then(result => {
                        var data = result.data;
                        fields.forEach(field => {
                            $scope.stats[field] = data[field];         
                        })
                    });
            }],
            template: `<div class="row">
    <div class="col-lg-3">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-sitemap fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{{ stats.periods | number:0 }}</div>
                        <div>Thời kỳ</div>
                    </div>
                </div>
            </div>
            <a ui-sref="list({entity:'periods'})">
                <div class="panel-footer">
                    <span class="pull-left">Danh sách</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>

        </div>
    </div>
    <div class="col-lg-3">
        <div class="panel panel-green">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-tags fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{{ stats.events | number:0 }}</div>
                        <div>Dấu mốc</div>
                    </div>
                </div>
            </div>
            <a ui-sref="list({entity:'events'})">
                <div class="panel-footer">
                    <span class="pull-left">Danh sách</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="panel panel-yellow">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-photo fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{{ stats.facts | number:0 }}</div>
                        <div>Sự kiện</div>
                    </div>
                </div>
            </div>
            <a ui-sref="list({entity:'facts'})">
                <div class="panel-footer">
                    <span class="pull-left">Danh sách</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="panel panel-red">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-user fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{{ stats.figures | number:0 }}</div>
                        <div>Nhân vật</div>
                    </div>
                </div>
            </div>
            <a ui-sref="list({entity:'figures'})">
                <div class="panel-footer">
                    <span class="pull-left">Danh sách</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>
</div>`
        };
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
            .baseApiUrl('/dong-thoi-gian/rest/'); // main API endpoint

        // define all entities at the top to allow references between them
        var entityPeriod = nga.entity('periods')
                .identifier(nga.field('_id'));

        var entityEvent = nga.entity('events')
                .identifier(nga.field('_id'));

        var entityFact = nga.entity('facts')
                .identifier(nga.field('_id'));

        var entityFigure = nga.entity('figures')
                .identifier(nga.field('_id'));

        admin
            .addEntity(entityPeriod)
            .addEntity(entityEvent)
            .addEntity(entityFact)
            .addEntity(entityFigure);

        // customize entities and views

        /*****************************
         * period entity customization *
         *****************************/
        entityPeriod.listView()
            .title('{{ "Entities.periods.forms.list.title" | translate }}')
            .infinitePagination(true)
            .fields([
                nga.field('i', 'template')
                    .label('')
                    .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/200/150"></div>'),
                nga.field('title'),
                nga.field('period'),
                nga.field('description', 'wysiwyg')
            ])
            .perPage(10)
            .sortField('start_year')
            .sortDir('asc')
            .filters([
                nga.field('q')
                    .label('Filter by title')
            ])
            .listActions(['show', 'edit', 'delete'])
            .entryCssClasses(function(entry) { // set row class according to entry
                return (entry.views > 300) ? 'is-popular' : '';
            });

        entityPeriod.creationView()
            .title('{{ "Entities.periods.forms.creation.title" | translate }}')
            .fields([
                nga.field('title')
                    .attributes({ placeholder: 'the period title' })
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('description', 'wysiwyg'),
                nga.field('slug')
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('start_year', 'number')
                    .validation({ required: true }),
                nga.field('end_year', 'number')
                    .validation({ required: true }),
                nga.field('period'),
                nga.field('picture', 'file')
                    .uploadInformation({ 'url': '/filestore/upload', 'apifilename': 'fileId' }),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityPeriod.editionView()
            .title('{{ "Entities.periods.forms.edition.title" | translate: {name: entry.values.title} }}')
            .actions(['list', 'show', 'delete'])
            .fields([
                entityPeriod.creationView().fields()
            ]);

        entityPeriod.showView()
            .title('{{ "Entities.periods.forms.show.title" | translate: {name: entry.values.title} }}')
            .fields([
                nga.field('title'),
                nga.field('description'),
                nga.field('slug'),
                nga.field('period'),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityPeriod.deletionView()
            .title('{{ "Entities.periods.forms.deletion.title" | translate: {name: entry.values.title} }}');

        /*****************************
         * event entity customization *
         *****************************/
        entityEvent.listView()
            .title('{{ "Entities.events.forms.list.title" | translate }}')
            .infinitePagination(true)
            .fields([
                nga.field('image', 'template')
                .label('')
                .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.image || \'unknown\' }}/200/150"></div>'),
                nga.field('headline'),
                nga.field('text', 'wysiwyg')
            ])
            .filters([
                nga.field('q')
                    .label('Filter by title')
            ])
            .listActions(['show', 'edit', 'delete'])
            .entryCssClasses(function(entry) {
                return (entry.views > 300) ? 'is-popular' : '';
            });

        entityEvent.creationView()
            .title('{{ "Entities.events.forms.creation.title" | translate }}')
            .fields([
                nga.field('headline')
                    .attributes({ placeholder: 'the event headline' })
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('text', 'wysiwyg'),
                nga.field('start_date')
                    .validation({ required: true, minlength: 1 }),
                nga.field('end_date'),
                nga.field('display_date'),
                nga.field('image', 'file')
                    .uploadInformation({ 'url': '/filestore/upload', 'apifilename': 'fileId' }),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.image || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityEvent.editionView()
            .title('{{ "Entities.events.forms.edition.title" | translate: {name: entry.values.headline} }}')
            .actions(['list', 'show', 'delete'])
            .fields([
                entityEvent.creationView().fields()
            ]);

        entityEvent.showView()
            .title('{{ "Entities.events.forms.show.title" | translate: {name: entry.values.headline} }}')
            .fields([
                nga.field('headline'),
                nga.field('text', 'wysiwyg'),
                nga.field('start_date'),
                nga.field('end_date'),
                nga.field('display_date'),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.image || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityEvent.deletionView()
            .title('{{ "Entities.events.forms.deletion.title" | translate: {name: entry.values.headline} }}');

        /*****************************
         * fact entity customization *
         *****************************/
        entityFact.listView()
            .title('{{ "Entities.facts.forms.list.title" | translate }}')
            .infinitePagination(true)
            .fields([
                nga.field('i', 'template')
                    .label('')
                    .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.picture}}/200/150"></div>'),
                nga.field('name'),
                nga.field('description', 'wysiwyg'),
                nga.field('periodId', 'reference')
                    .label('Period')
                    .targetEntity(admin.getEntity('periods'))
                    .targetField(nga.field('title'))
            ])
            .filters([
                nga.field('name')
                    .label('Filter by name'),
                nga.field('periodId', 'reference')
                    .label('Filter by Period')
                    .targetEntity(entityPeriod)
                    .targetField(nga.field('title'))
                    .remoteComplete(true, {
                        refreshDelay: 200,
                        searchQuery: function(search) { return { q: search }; }
                    })
            ])
            .listActions(['show', 'edit', 'delete'])
            .entryCssClasses(function(entry) { // set row class according to entry
                return (entry.views > 300) ? 'is-popular' : '';
            });

        entityFact.creationView()
            .title('{{ "Entities.facts.forms.creation.title" | translate }}')
            .fields([
                nga.field('name')
                    .attributes({ placeholder: 'the fact name' })
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('description', 'wysiwyg'),
                nga.field('slug')
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('periodId', 'reference')
                    .label('Period')
                    .targetEntity(admin.getEntity('periods'))
                    .targetField(nga.field('title'))
                    .validation({required: true })
                    .cssClasses('col-sm-4'),
                nga.field('events', 'reference_many')
                    .targetEntity(entityEvent)
                    .targetField(nga.field('headline'))
                    .attributes({ placeholder: 'Select some events ...' })
                    .remoteComplete(true, {
                        refreshDelay: 300,
                        searchQuery: function(search) { return { q: search }; }
                    })
                    .singleApiCall(ids => { return {'id': ids }; }),
                nga.field('picture', 'file')
                    .uploadInformation({ 'url': '/filestore/upload', 'apifilename': 'fileId' }),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityFact.editionView()
            .title('{{ "Entities.facts.forms.edition.title" | translate: {name: entry.values.name} }}')
            .actions(['list', 'show', 'delete'])
            .fields([
                entityFact.creationView().fields()
            ]);

        entityFact.showView()
            .title('{{ "Entities.facts.forms.edition.title" | translate: {name: entry.values.name} }}')
            .fields([
                nga.field('name'),
                nga.field('description'),
                nga.field('slug'),
                nga.field('periodId', 'reference')
                    .label('Period')
                    .targetEntity(admin.getEntity('periods'))
                    .targetField(nga.field('title'))
                    .editable(false),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityFact.deletionView()
            .title('{{ "Entities.facts.forms.deletion.title" | translate: {name: entry.values.name} }}');

        /*****************************
         * figure entity customization *
         *****************************/
        entityFigure.listView()
            .title('{{ "Entities.figures.forms.list.title" | translate }}')
            .infinitePagination(true)
            .fields([
                nga.field('i', 'template')
                    .label('')
                    .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.picture}}/200/150"></div>'),
                nga.field('name'),
                nga.field('description', 'wysiwyg'),
                nga.field('periodId', 'reference')
                    .label('Period')
                    .targetEntity(admin.getEntity('periods'))
                    .targetField(nga.field('title'))
            ])
            .filters([
                nga.field('name')
                    .label('Filter by name'),
                nga.field('periodId', 'reference')
                    .label('Filter by Period')
                    .targetEntity(entityPeriod)
                    .targetField(nga.field('title'))
                    .remoteComplete(true, {
                        refreshDelay: 200,
                        searchQuery: function(search) { return { q: search }; }
                    })
            ])
            .listActions(['show', 'edit', 'delete'])
            .entryCssClasses(function(entry) { // set row class according to entry
                return (entry.views > 300) ? 'is-popular' : '';
            });

        entityFigure.creationView()
            .title('{{ "Entities.figures.forms.creation.title" | translate }}')
            .fields([
                nga.field('name')
                    .attributes({ placeholder: 'the figure name' })
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('description', 'wysiwyg'),
                nga.field('slug')
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('periodId', 'reference')
                    .label('Period')
                    .targetEntity(admin.getEntity('periods'))
                    .targetField(nga.field('title'))
                    .validation({required: true })
                    .cssClasses('col-sm-4'),
                nga.field('events', 'reference_many')
                    .targetEntity(entityEvent)
                    .targetField(nga.field('headline'))
                    .attributes({ placeholder: 'Select some events ...' })
                    .remoteComplete(true, {
                        refreshDelay: 300,
                        searchQuery: function(search) { return { q: search }; }
                    })
                    .singleApiCall(ids => { return {'id': ids }; }),
                nga.field('picture', 'file')
                    .uploadInformation({ 'url': '/filestore/upload', 'apifilename': 'fileId' }),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityFigure.editionView()
            .title('{{ "Entities.figures.forms.edition.title" | translate: {name: entry.values.name} }}')
            .actions(['list', 'show', 'delete'])
            .fields([
                entityFigure.creationView().fields()
            ]);

        entityFigure.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .title('{{ "Entities.figures.forms.show.title" | translate: {name: entry.values.name} }}')
            .fields([
                nga.field('name'),
                nga.field('description'),
                nga.field('slug'),
                nga.field('periodId', 'reference')
                    .label('Period')
                    .targetEntity(admin.getEntity('periods'))
                    .targetField(nga.field('title'))
                    .editable(false),
                nga.field('events', 'reference_many')
                    .targetEntity(entityEvent)
                    .targetField(nga.field('headline')),
                nga.field('preview', 'template')
                    .label('')
                    .template('<img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/512/390/preview.png">')
            ]);

        entityFigure.deletionView()
            .title('{{ "Entities.figures.forms.deletion.title" | translate: {name: entry.values.name} }}');

        // customize header
        var customHeaderTemplate =
        '<div class="navbar-header">' +
            '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">' +
              '<span class="icon-bar"></span>' +
              '<span class="icon-bar"></span>' +
              '<span class="icon-bar"></span>' +
            '</button>' +
            '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">{{ "SUVIET.NET Dashboard" | translate }}</a>' +
        '</div>' +
        '<p class="navbar-text navbar-right hidden-xs">' +
            '<a href="https://github.com/suviet/suviet-web.git"><span class="glyphicon glyphicon-sunglasses"></span>&nbsp;View Source</a>' +
        '</p>';
        admin.header(customHeaderTemplate);

        var customMenuTemplate = 
        '<div class="sidebar-nav navbar-collapse collapse" uib-collapse="$parent.isCollapsed">' +
            '<ul class="nav" id="side-menu">' +
                '<li class="entities-repeat" ng-repeat="(key, menu) in ::menu.children()" data-menu-id="{{ ::menu.uuid }}" compile="menu.template()">' +
                    '<a ng-if="::menu.hasChild()" ng-click="toggleMenu(menu)" ng-class="::{\'active\': menu.isActive(path)}">' +
                        '<span compile="::menu.icon()"><span class="glyphicon glyphicon-list"></span></span>' +
                        '{{ menu.title() | translate }}' +
                        '<span class="glyphicon arrow" ng-class="::{\'glyphicon-menu-down\': isOpen(menu), \'glyphicon-menu-right\': !isOpen(menu) }"></span>' +
                    '</a>' +
                    '<a ng-if="::!menu.hasChild()" href="#{{ menu.link() }}" ng-click="activateLink(menu)" ng-class="::{\'active\': menu.isActive(path)}">' +
                        '<span compile="::menu.icon()"><span class="glyphicon glyphicon-list"></span></span>' +
                        '{{ menu.title() | translate }}' +
                    '</a>' +
                    '<ul ng-if="::menu.hasChild()" class="nav nav-second-level collapsible" ng-class="::{\'collapsed\': !isOpen(menu) }">' +
                        '<li ng-repeat="menu in ::menu.children()" data-menu-id="{{ ::menu.uuid }}" compile="menu.template()">' +
                            '<a href="#{{menu.link()}}" ng-click="activateLink(menu)" ng-class="::{\'active\': menu.isActive(path)}">' +
                                '<span compile="::menu.icon()"><span class="glyphicon glyphicon-list"></span></span>' +
                                '{{ menu.title() | translate }}' +
                            '</a>' +
                        '</li>' +
                    '</ul>' +
                '</li>' +
            '</ul>' +
        '</div>'

        // customize menu
        admin.menu(nga.menu().template(customMenuTemplate)
            .addChild(nga.menu()
                .title('Dashboard')
                .icon('<span class="fa fa-home fa-fw"></span>')
                .link('/dashboard')
                .active(path => path.indexOf('/dashboard') === 0)
            )
            .addChild(nga.menu()
                .title('Historical documents')
                .icon('<span class="fa fa-th-list fa-fw"></span>')
                .addChild(nga.menu(entityPeriod)
                    .title('Historical periods')
                    .icon('<span class="fa fa-sitemap fa-fw"></span>'))
                .addChild(nga.menu(entityEvent)
                    .title('Historical events')
                    .icon('<span class="fa fa-tags fa-fw"></span>'))
                .addChild(nga.menu(entityFact)
                    .title('Historical facts')
                    .icon('<span class="fa fa-photo fa-fw"></span>'))
                .addChild(nga.menu(entityFigure)
                    .title('Historical figures')
                    .icon('<span class="fa fa-user fa-fw"></span>'))
            )
            .addChild(nga.menu()
                .title('Configuration')
                .icon('<span class="fa fa-cog fa-fw"></span>')
                .link('/settings')
                .active(path => path.indexOf('/settings') === 0)
            )
        );

        admin.dashboard(nga.dashboard()
            .addCollection(nga.collection(admin.getEntity('periods'))
                .name('latest_periods')
                .title('Latest periods')
                //.permanentFilters({ date: { gte: moment().substract(1, 'months').toDate() } })
                .fields([
                    nga.field('i', 'template')
                        .label('')
                        .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/120/90"></div>'),
                    nga.field('title').isDetailLink(true).label(''),
                ])
                .sortField('date')
                .sortDir('ASC')
                .perPage(5)
            )
            .addCollection(nga.collection(admin.getEntity('facts'))
                .name('latest_facts')
                .title('Latest facts')
                //.permanentFilters({ date: { gte: moment().substract(1, 'months').toDate() } })
                .fields([
                    nga.field('i', 'template')
                        .label('')
                        .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/120/90"></div>'),
                    nga.field('name').isDetailLink(true).label(''),
                ])
                .sortField('date')
                .sortDir('ASC')
                .perPage(5)
            )
            .addCollection(nga.collection(admin.getEntity('figures'))
                .name('latest_figures')
                .title('Latest figures')
                //.permanentFilters({ date: { gte: moment().substract(1, 'months').toDate() } })
                .fields([
                    nga.field('i', 'template')
                        .label('')
                        .template('<div class="picture"><img src="/filestore/picture/{{ entry.values.picture || \'unknown\' }}/120/90"></div>'),
                    nga.field('name').isDetailLink(true).label(''),
                ])
                .sortField('date')
                .sortDir('ASC')
                .perPage(5)
            )
            .template(`
<div class="row dashboard-starter"></div>
<dashboard-summary></dashboard-summary>
<div class="row dashboard-content">
    <div class="col-lg-6">
        <div class="panel panel-default">
            <ma-dashboard-panel collection="dashboardController.collections.latest_facts" entries="dashboardController.entries.latest_facts" datastore="dashboardController.datastore"></ma-dashboard-panel>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="panel panel-default">
            <ma-dashboard-panel collection="dashboardController.collections.latest_figures" entries="dashboardController.entries.latest_figures" datastore="dashboardController.datastore"></ma-dashboard-panel>
        </div>
    </div>
</div>
<div class="row dashboard-content">
    <div class="col-lg-12">
        <div class="panel panel-default">
            <ma-dashboard-panel collection="dashboardController.collections.latest_periods" entries="dashboardController.entries.latest_periods" datastore="dashboardController.datastore"></ma-dashboard-panel>
        </div>
    </div>
</div>
`)
        );

        nga.configure(admin);
    }]);

}());

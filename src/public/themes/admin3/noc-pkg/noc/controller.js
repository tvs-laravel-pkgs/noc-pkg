app.component('nocList', {
    templateUrl: noc_list_template_url,
    controller: function($http, $window, HelperService, $scope, $rootScope, $mdSelect,$routeParams) {
        $scope.loading = true;
        var self = this;
        self.hasPermission = HelperService.hasPermission;
        self.filter_img_url = filter_img_url;
        self.export_activities = export_activities;
        self.canExportActivity = canExportActivity;
        self.canImportActivity = canImportActivity;
        self.csrf = token;

        self.type_id = $routeParams.type_id;
        /*$http({
            url: laravel_routes['getEntityTypeData'],
            method: 'GET',
            params: {
                'entity_type_id': typeof($routeParams.entity_type_id) == 'undefined' ? null : $routeParams.entity_type_id,
            }
        }).then(function(response) {
            self.entity_type = response.data.entity_type;
            self.entity_list = response.data.entity_list;
            self.entity_list.unshift({'id' : '','name' :  'Select Entity'});
            self.status_list = [{'id' : '','name' :  'Select Status'},{'id' : 0,'name' :  'Active'},{'id' : 1,'name' :  'Inactive'}];
            console.log(response.data);
            console.log(self.status_list);
            $('.dataTables_length select').select2();
            $('.page-header-content .display-inline-block .data-table-title').html(self.entity_type.name +' <span class="badge badge-secondary" id="table_info">0</span>');
            $('.page-header-content .search.display-inline-block .add_close_button').html('<button type="button" class="btn btn-img btn-add-close"><img src="' + image_scr2 + '" class="img-responsive"></button>');
            $('.page-header-content .refresh.display-inline-block').html('<button type="button" class="btn btn-refresh"><img src="' + image_scr3 + '" class="img-responsive"></button>');
            $('.add_new_button').html(
                '<a href="#!/entity-pkg/entity/add/' + $routeParams.entity_type_id + '" type="button" class="btn btn-secondary" dusk="add-btn">' +
                'Add ' + self.entity_type.name +
                '</a>  <button class="btn btn-secondary" data-toggle="modal" data-target="#entity-filter-modal"><i class="icon ion-md-funnel"></i>Filter</button>'
            );

            $('.btn-add-close').on("click", function() {
                $('#entities_list').DataTable().search('').draw();
            });

            $('.btn-refresh').on("click", function() {
                $('#entities_list').DataTable().ajax.reload();
            });

            app.filter('removeString', function () {
                return function (text) {
                    var str = text.replace('s', '');
                    return str;
                };
            });
            $scope.entityChange = function(){
                $('#entities_list').DataTable().draw();
            }
            $scope.entityStatus = function(){
                $('#entities_list').DataTable().draw();
            }
            $scope.reset_filter = function() {
                self.entity_data = self.status_data = '';
                $('#entities_list').DataTable().draw();
            }
        });*/
        $scope.deleteConfirm = function($id) {
                bootbox.confirm({
                    message: 'Do you want to delete this activity?',
                    className: 'action-confirm-modal',
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function(result) {
                        if (result) {
                            $http.get(
                                laravel_routes['deleteNoc'], {
                                    params: {
                                        id: $id,
                                    }
                                }
                            ).then(function(response) {
                                if (response.data.success) {
                                    custom_noty('success', response.data.message);
                                    $('#noc_table').DataTable().ajax.reload();
                                    $scope.$apply();
                                } else {
                                    custom_noty('error', response.data.errors);
                                }
                            });
                            //$window.location.href = activity_status_delete_url + '/' + $id;
                        }
                    }
                });
            }
            self.noc_status_id = self.noc_type_id = self.noc_number = self.asp_code ='';
        $http.get(
            get_filter_data
        ).then(function(response) {
            self.noc_type_list = response.data.noc_type_list;
            self.noc_status_list = response.data.noc_status_list;
            console.log(self.noc_type_list);
            $rootScope.loading = false;
        });
        var dataTable = $('#noc_table').DataTable({
            "dom": dom_structure,
            "language": {
                "search": "",
                "searchPlaceholder": "Search",
                "lengthMenu": "Rows Per Page _MENU_",
                "paginate": {
                    "next": '<i class="icon ion-ios-arrow-forward"></i>',
                    "previous": '<i class="icon ion-ios-arrow-back"></i>'
                },
            },
            stateSave: true,
            pageLength: 10,
            processing: true,
            serverSide: true,
            paging: true,
            ordering: false,
            ajax: {
                url: laravel_routes['getNocList'],
                data: function(d) {
                    d.type_id = $routeParams.type_id;
                    d.noc_type_id = self.noc_type_id;
                    d.noc_status_id = self.noc_status_id;
                    d.noc_number = self.noc_number;
                    d.asp_code = self.asp_code;
                }
            },
            columns: [
                { data: 'action', searchable: false, class: 'action' },
                { data: 'create_date', searchable: false},
                { data: 'number', name: 'nocs.number', searchable: true},
                { data: 'noc_type_name', name: 'noc_types.name', searchable: true},
                { data: 'asp_name', name: 'asps.name', searchable: true},
                { data: 'status_name', name: 'configs.name', searchable: true},
            ],
            "infoCallback": function(settings, start, end, max, total, pre) {
                $('#table_info').html(total + '/' + max)
            },
            rowCallback: function(row, data) {
                $(row).addClass('highlight-row');
                if(data.status=="Active")
                {
                  $(row).find('td:eq(1)').addClass('color-success');
                }else 
                {
                  $(row).find('td:eq(1)').addClass('color-error'); 
                }
            },
            initComplete: function() {
                $('.search label input').focus();
            },
        });
         var dataTable = $('#noc_table').dataTable();
        $(".filterTable").keyup(function() {
                dataTable.fnFilter(this.value);
        });
        $(".filter-data").keyup(function() {
                dataTable.fnFilter();
        });
        $scope.changeType = function(){
           
             dataTable.fnFilter();
        };
        $scope.changeNocStatus = function(){
             dataTable.fnFilter();
        };
        $scope.openFilter = function(){
            $('#filterticket').toggleClass('open');
        };
        $scope.closeFilter = function(){
            $('#filterticket').removeClass('open');
        };
        $scope.resetFilter =function(){
            self.noc_type_id = '';
            self.noc_status_id = '';
            self.noc_number = '';
            self.asp_code = '';
            dataTable.fnFilter();
        };
        $('.dataTables_length select').select2();
        /*image_scr2 = image_scr3 ='';
            $('.page-header-content .display-inline-block .data-table-title').html('Nocs <span class="badge badge-secondary" id="table_info">0</span>');
            $('.page-header-content .search.display-inline-block .add_close_button').html('<button type="button" class="btn btn-img btn-add-close"><img src="' + image_scr2 + '" class="img-responsive"></button>');
            $('.page-header-content .refresh.display-inline-block').html('<button type="button" class="btn btn-refresh"><img src="' + image_scr3 + '" class="img-responsive"></button>');
            $('.add_new_button').html(
                '<a href="#!/entity-pkg/entity/add/' + $routeParams.type_id + '" type="button" class="btn btn-secondary" dusk="add-btn">' +
                'Add ' + 's' +
                '</a>  <button class="btn btn-secondary" data-toggle="modal" data-target="#entity-filter-modal"><i class="icon ion-md-funnel"></i>Filter</button>'
            );
*/

        //DELETE
        /*$scope.deleteEntity = function($id) {
            $('#entity_id').val($id);
        }*/
        /*$scope.deleteConfirm = function() {
            $id = $('#entity_id').val();
            $http.get(
                laravel_routes['deleteEntity'], {
                    params: {
                        id: $id,
                    }
                }
            ).then(function(response) {
                if (response.data.success) {
                    custom_noty('success', response.data.message);
                    $('#entities_list').DataTable().ajax.reload();
                    $scope.$apply();
                } else {
                    custom_noty('error', response.data.errors);
                }
            });
        }*/
        /*$http.get(
            noc_filter_url
        ).then(function(response) {
            self.extras = response.data.extras;
            // response.data.extras.status_list.splice(0, 1);
            self.status_list = response.data.extras.portal_status_list;
            // self.status_list.splice(0, 1);
            self.modal_close = modal_close;
            var cols = [
                { data: 'action', searchable: false },
                { data: 'case_date', searchable: false },
                { data: 'number', name: 'cases.number', searchable: true },
                { data: 'asp_code', name: 'asps.asp_code', searchable: true },
                { data: 'crm_activity_id', searchable: false },
                { data: 'source', name: 'configs.name', searchable: true },
                // { data: 'activity_number', name: 'activities.number', searchable: true },
                { data: 'sub_service', name: 'service_types.name', searchable: true },
                { data: 'finance_status', name: 'activity_finance_statuses.name', searchable: true },
                // { data: 'asp_status', name: 'activity_asp_statuses.name', searchable: true },
                { data: 'status', name: 'activity_portal_statuses.name', searchable: true },
                { data: 'noc', name: 'noces.name', searchable: true },
                { data: 'client', name: 'clients.name', searchable: true },
                { data: 'call_center', name: 'call_centers.name', searchable: true },
            ];

            var activities_status_dt_config = JSON.parse(JSON.stringify(dt_config));

            $('#activities_status_table').DataTable(
                $.extend(activities_status_dt_config, {
                    columns: cols,
                    ordering: false,
                    processing: true,
                    serverSide: true,
                    "scrollX": true,
                    stateSave: true,
                    stateSaveCallback: function(settings, data) {
                        localStorage.setItem('SIDataTables_' + settings.sInstance, JSON.stringify(data));
                    },
                    stateLoadCallback: function(settings) {
                        var state_save_val = JSON.parse(localStorage.getItem('SIDataTables_' + settings.sInstance));
                        if (state_save_val) {
                            $('.filterTable').val(state_save_val.search.search);
                        }
                        return JSON.parse(localStorage.getItem('SIDataTables_' + settings.sInstance));
                    },
                    ajax: {
                        url: noc_get_list_url,
                        data: function(d) {
                            d.ticket_date = $('#ticket_date').val();
                            d.call_center_id = $('#call_center_id').val();
                            d.case_number = $('#case_number').val();
                            d.asp_code = $('#asp_code').val();
                            d.service_type_id = $('#service_type_id').val();
                            d.finance_status_id = $('#finance_status_id').val();
                            d.status_id = $('#status_id').val();
                            d.noc_id = $('#noc_id').val();
                            d.client_id = $('#client_id').val();
                        }
                    },
                    infoCallback: function(settings, start, end, max, total, pre) {
                        $('.count').html(total + ' / ' + max + ' listings')
                    },
                    initComplete: function() {},
                }));
            $('.dataTables_length select').select2();

            var dataTable = $('#activities_status_table').dataTable();

            $(".filterTable").keyup(function() {
                dataTable.fnFilter(this.value);
            });

            $('#ticket_date').on('change', function() {
                dataTable.fnFilter();
            });

            $('#case_number,#asp_code').on('keyup', function() {
                dataTable.fnFilter();
            });

            $scope.changeCommonFilter = function(val, id) {
                $('#' + id).val(val);
                dataTable.fnFilter();
            };

            $scope.resetFilter = function() {
                self.ticket_filter = [];
                $('#call_center_id').val('');
                $('#service_type_id').val('');
                $('#finance_status_id').val('');
                $('#status_id').val('');
                $('#noc_id').val('');
                $('#client_id').val('');

                setTimeout(function() {
                    dataTable.fnFilter();
                    $('#activities_status_table').DataTable().ajax.reload();
                }, 1000);
            };

            $scope.refresh = function() {
                $('#activities_status_table').DataTable().ajax.reload();
            };

            $scope.deleteConfirm = function($id) {
                bootbox.confirm({
                    message: 'Do you want to delete this activity?',
                    className: 'action-confirm-modal',
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function(result) {
                        if (result) {
                            $window.location.href = noc_delete_url + '/' + $id;
                        }
                    }
                });
            }
            $('.filterToggle').click(function() {
                $('#filterticket').toggleClass('open');
            });

            $('.close-filter, .filter-overlay').click(function() {
                $(this).parents('.filter-wrapper').removeClass('open');
            });

            $('.date-picker').datepicker({
                format: 'dd-mm-yyyy',
                autoclose: true,
            });
            $('input[name="period"]').daterangepicker({
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month'),
            });

            self.pc_all = false;
            $rootScope.loading = false;
            window.mdSelectOnKeyDownOverride = function(event) {
                event.stopPropagation();
            };
            $('.filter-content, .modal-dialog, #asp_excel_export').bind('click', function(event) {
                if ($('.md-select-menu-container').hasClass('md-active')) {
                    $mdSelect.hide();
                }
            });
            $scope.changeStatus = function(ids) {
                console.log(ids);
                if (ids) {
                    $size_rids = ids.length;
                    if ($size_rids > 0) {
                        $('#pc_sel_all').addClass('pc_sel_all');
                    }
                } else {
                    $('#pc_sel_all').removeClass('pc_sel_all');
                }
            }
            $scope.selectAll = function(val) {
                self.pc_all = (!self.pc_all);
                if (!val) {
                    r_list = [];
                    angular.forEach(self.extras.status_list, function(value, key) {
                        r_list.push(value.id);
                    });

                    $('#pc_sel_all').addClass('pc_sel_all');
                } else {
                    r_list = [];
                    $('#pc_sel_all').removeClass('pc_sel_all');
                }
                self.status_ids = r_list;
            }
            $("form[name='export_excel_form']").validate({
                rules: {
                    status_ids: {
                        required: true,
                    },
                    period: {
                        required: true,
                    }
                },
                messages: {
                    period: "Please Select Period",
                    status_ids: "Please Select Activity Status",
                },

                submitHandler: function(form) {
                    form.submit();
                }
            });

        });*/

    }
});

app.component('nocView', {
    templateUrl: noc_view_template_url,
    controller: function($http, $location, $window, HelperService, $scope, $routeParams, $rootScope, $location) {
        $scope.loading = true;
        var self = this;
        self.hasPermission = HelperService.hasPermission;
        self.filter_img_url = filter_img_url;
        // self.style_dot_image_url = style_dot_image_url;
        console.log(noc_view_data_url);
        get_view_data_url = typeof($routeParams.id) == 'undefined' ? noc_view_data_url + '/' : noc_view_data_url + '/'  + $routeParams.id;
        $http.get(
            get_view_data_url
        ).then(function(response) {
            if (!response.data.success) {
                var errors = '';
                for (var i in response.data.errors) {
                    errors += '<li>' + response.data.errors[i] + '</li>';
                }
                $noty = new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: errors,
                    animation: {
                        speed: 500 // unavailable - no need
                    },

                }).show();
                setTimeout(function() {
                    $noty.close();
                }, 1000);
                $location.path('/noc-pkg/noc/list/1');
                $scope.$apply();
                return;
            }else{
                self.noc = response.data.noc;
            }
            $rootScope.loading = false;
        });
        $scope.confirmNoc = function($noc_id) {
            generate_otp_url = generate_otp + '/'  + $noc_id;
            console.log(generate_otp_url);
            $http.get(
                generate_otp_url
                ).then(function(response){
                    console.log(response);
                    $("#confirm-noc-modal").modal();
            });
        }

        $scope.checkOtp = function(){

            if ($scope.otp_form.$valid) {
                    //$('.approve_btn').button('loading');
                    if ($(".loader-type-2").hasClass("loader-hide")) {
                        $(".loader-type-2").removeClass("loader-hide");
                    }
                    $http.post(
                        laravel_routes['validateOTP'], {
                            noc_id: self.noc.id,
                            otp: self.otp,
                        }
                    ).then(function(response) {
                        $("#confirm-noc-modal").modal("hide");
                        //$(".loader-type-2").addClass("loader-hide");
                        $('.approve_btn').button('reset');

                        if (!response.data.success) {
                            var errors = '';
                            for (var i in response.data.errors) {
                                errors += '<li>' + response.data.errors[i] + '</li>';
                            }
                            $noty = new Noty({
                                type: 'error',
                                layout: 'topRight',
                                text: errors,
                                animation: {
                                    speed: 500 // unavailable - no need
                                },

                            }).show();
                            setTimeout(function() {
                                $noty.close();
                            }, 2000);
                            return;
                        } else {
                            $noty = new Noty({
                                type: 'success',
                                layout: 'topRight',
                                text: 'NOC Accepted',
                                animation: {
                                    speed: 500
                                }
                            }).show();
                            setTimeout(function() {
                                $noty.close();
                            }, 1000);

                            setTimeout(function() {
                                $location.path('/noc-pkg/noc/list/'+response.data.type_id);
                                $scope.$apply();
                            }, 1500);
                        }
                        // item.selected = false;
                        //$scope.getChannelDiscountAmounts();

                    });
                }
            
        }

        $scope.downloadNoc = function($noc_id){
        //$('#downloadNoc').button('loading');
        download_noc_pdf = download_now_pdf + '/'  + $noc_id;
        $http.get(
            download_noc_pdf
        ).then(function(response) {
            if (!response.data.success) {
                var errors = '';
                for (var i in response.data.errors) {
                    errors += '<li>' + response.data.errors[i] + '</li>';
                }
                $noty = new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: errors,
                    animation: {
                        speed: 500 // unavailable - no need
                    },

                }).show();
                setTimeout(function() {
                    $noty.close();
                }, 1000);
                $location.path('/noc-pkg/noc/list/1');
                $scope.$apply();
                return;
            }else{
                self.noc = response.data.noc;
            }
            $rootScope.loading = false;
        });
            
        }
    }
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
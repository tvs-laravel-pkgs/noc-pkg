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
        self.style_modal_close_image_url = style_modal_close_image_url;
        self.type_id = $routeParams.type_id;
        $('.date-picker').datepicker({
                format: 'dd-mm-yyyy',
                autoclose: true,
            });
        $('input[name="period"]').daterangepicker({
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month'),
            });

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
            console.log(response.data);
            self.noc_type_list = response.data.noc_type_list;
            self.noc_status_list = response.data.noc_status_list;
            self.asp_permission = response.data.asp_permission;
            console.log(self.noc_type_list);
            $rootScope.loading = false;
        });
            var activities_status_dt_config = JSON.parse(JSON.stringify(dt_config));
        var dataTable = $('#noc_table').DataTable(

            $.extend(activities_status_dt_config, {
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
                        url: laravel_routes['getNocList'],
                        data: function(d) {
                            d.type_id = $routeParams.type_id;
                            d.noc_type_id = self.noc_type_id;
                            d.noc_status_id = self.noc_status_id;
                            d.noc_number = self.noc_number;
                            d.asp_code = self.asp_code;
                            d.period = self.period;
                        }
                    },
                    columns: [
                        { data: 'action', searchable: false, class: 'action' },
                        { data: 'create_date', searchable: false},
                        { data: 'number', name: 'nocs.number', searchable: true},
                        { data: 'noc_type_name', name: 'noc_types.name', searchable: true},
                        { data: 'asp_code', name: 'asps.asp_code', searchable: true},
                        { data: 'status_name', name: 'configs.name', searchable: true},
                    ],
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
                    infoCallback: function(settings, start, end, max, total, pre) {
                        $('.count').html(total + ' / ' + max + ' listings')
                    },
                }));


       /* {
            infoCallback: function(settings, start, end, max, total, pre) {
                console.log('sss');
                $('.count').html(total + ' / ' + max + ' listings');
            },
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
            info: true,
            ajax: {
                url: laravel_routes['getNocList'],
                data: function(d) {
                    d.type_id = $routeParams.type_id;
                    d.noc_type_id = self.noc_type_id;
                    d.noc_status_id = self.noc_status_id;
                    d.noc_number = self.noc_number;
                    d.asp_code = self.asp_code;
                    d.period = self.period;
                }
            },
            columns: [
                { data: 'action', searchable: false, class: 'action' },
                { data: 'create_date', searchable: false},
                { data: 'number', name: 'nocs.number', searchable: true},
                { data: 'noc_type_name', name: 'noc_types.name', searchable: true},
                { data: 'asp_code', name: 'asps.asp_code', searchable: true},
                { data: 'status_name', name: 'configs.name', searchable: true},
            ],
            
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
        });*/
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
            self.period = '';
            dataTable.fnFilter();
        };
        $('.dataTables_length select').select2();

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
            $http.get(
                generate_otp_url
                ).then(function(response){
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
@if(config('noc-pkg.DEV'))
    <?php $noc_pkg_prefix = '/packages/abs/noc-pkg/src';?>
@else
    <?php $noc_pkg_prefix = '';?>
@endif

<script type="text/javascript">

	app.config(['$routeProvider', function($routeProvider) {

	    $routeProvider.
	    when('/noc-pkg/noc/list/:type_id', {
	        template: '<noc-list></noc-list>',
	        title: 'NOCs',
	    }).
	    when('/noc-pkg/noc/add/:type_id', {
	        template: '<noc-form></noc-form>',
	        title: 'Add NOC',
	    }).
	    when('/noc-pkg/noc/view/:id', {
	        template: '<noc-view></noc-view>',
	        title: 'View NOC',
	    });
	}]);


    var noc_list_template_url = "{{asset($noc_pkg_prefix.'/public/themes/'.$theme.'/noc-pkg/noc/list.html')}}";
    var noc_form_template_url = "{{asset($noc_pkg_prefix.'/public/themes/'.$theme.'/noc-pkg/noc/form.html')}}";
    var noc_view_template_url = "{{asset($noc_pkg_prefix.'/public/themes/'.$theme.'/noc-pkg/noc/view.html')}}";
    var noc_view_data_url = "{{url('/noc-pkg/noc/view/')}}";
    var generate_otp = "{{url('/noc-pkg/noc/sendotp/')}}";
    var download_now_pdf ="{{url('/noc-pkg/noc/download/')}}";
  var style_modal_close_image_url = "{{URL::asset('resources/assets/images/modal-close.svg')}}";
    
</script>
<script type="text/javascript" src="{{asset($noc_pkg_prefix.'/public/themes/'.$theme.'/noc-pkg/noc/controller.js')}}"></script>

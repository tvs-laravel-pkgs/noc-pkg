@if(config('noc-pkg.DEV'))
    <?php $noc_pkg_prefix = '/packages/abs/noc-pkg/src';?>
@else
    <?php $noc_pkg_prefix = '';?>
@endif

<script type="text/javascript">
    var noc_list_template_url = "{{asset($noc_pkg_prefix.'/public/themes/'.$theme.'/noc-pkg/noc/nocs.html')}}";
</script>
<script type="text/javascript" src="{{asset($noc_pkg_prefix.'/public/themes/'.$theme.'/noc-pkg/noc/controller.js')}}"></script>

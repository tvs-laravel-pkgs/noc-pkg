<!DOCTYPE html>
<html dir="ltr" lang="en-US" style="width: 793px; margin: 0 auto;">
    <head>
        <title>No Due Certificate</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Titillium+Web:200,300,400,600,700,900&display=swap" rel="stylesheet">
        <style>
            body {width: 100%;color: #000;min-height: 1110px;padding: 0px;font-family: 'Titillium Web', sans-serif;line-height: 1.4;margin: 0;}             
            table {font-family: 'Titillium Web', sans-serif;border-collapse: collapse;width: 100%;margin-top: 0px;margin-bottom: 0;}
            table:last-child {margin-bottom: 0;} 
            th {font-size: 12px;font-weight: bold;line-height: normal;padding: 5px;}
            td {font-size: 12px;line-height: normal;padding: 5px;font-family: 'Titillium Web', sans-serif;}
            .table-outter > tbody > tr > td {padding: 0;border: 1px solid #dfdfdf;}
            .table-header > tbody > tr > td {padding: 43px 76px 42px 65px;color: #fff;background-color: #364c9c;}
            .table-body > tbody > tr > td {padding: 36px 76px 100px 65px;}
            .table-body-header > thead > tr > th {padding: 42px 0;text-align: center;}
            .table-body-content {margin-top: 42px;}
            .table-body-content > tbody > tr > td {padding: 0;font-size: 20px;font-weight: 400;}
            .table-body-content > tbody > tr > td.space {padding-top: 15px;padding-bottom: 15px;}
            .table-body-content > tbody > tr > td > p {font-size: 20px;line-height: normal;}

            p {margin: 0;}
            .mt-20 {margin-top: 20px;}
            .text-center {text-align: center;}
            .text-left {text-align: left;}
            .text-right {text-align: right;}
            .opacity-0 {opacity: 0;}
            .block {display: block;}
            .table-header-title {font-size: 30px;font-weight: bold;line-height: normal;color: #fff;margin: 0;}
            .table-header-subtitle {font-size: 22px;font-weight: 200;line-height: normal;color: #fff;margin: 0;}
            .table-body-title {font-size: 30px;font-weight: bold;line-height: normal;color: #333333;margin: 0;}
            .table-body-title-border {width: 150px;height: 3px;display: inline-block;background-color: #f0b034;}
        </style>
    </head>
    <body>
        <!-- ORDER FORM -->
        <table class="table-outter">
            <tbody>
                <tr>  
                    <td>
                        <table class="table-header">
                            <tbody>
                                <tr>
                                    <td class="text-center">
                                        <h1 class="table-header-title">{{$ctrl.noc.workshop_name}}</h1>
                                        <p class="table-header-subtitle">{{$ctrl.noc.workshop_address}}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table><!-- Table Header -->
                        <table class="table-body">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="table-body-header">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <h2 class="table-body-title">No Due Certificate</h2>
                                                        <span class="table-body-title-border"></span>
                                                    </th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <table class="table-body-content">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>To</p>
                                                        <p>TVS Auto Assist India Limited</p>
                                                        <p>Chennai</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="space"></td>
                                                </tr>
                                                <tr>
                                                    <td>Subject: Account balance confirmation as on {{$ctrl.noc.cur_date}}</td>
                                                </tr>
                                                <tr>
                                                    <td class="space"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Sir</p>
                                                        <p>This is to confirm that there is no amount dues from TVS Auto Assist India Limited for the services rendered during the period of  {{$ctrl.noc.start_date}} to {{$ctrl.noc.end_date}}({{$ctrl.noc.quarter_name}}).</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="space"></td>
                                                </tr>
                                                <tr>
                                                    <td>Thanking you</td>
                                                </tr>
                                                <tr>
                                                    <td class="space"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Digitally Authorized by OTP</p>
                                                        <p><b>{{$ctrl.noc.asp_name}}</b></p>
                                                        <p>{{$ctrl.noc.contact_number}}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- Table Outter -->
    </body>
</html>
 <!doctype html>
    <html lang="{{ app()->getLocale() }}">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="csrf-token" content="{{ csrf_token() }}">

            <title :titile="titile">Outlet for SPA</title>

            <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
            <link rel="stylesheet" type="text/css" href="css/app.css">
        </head>
        <body>
            <div id="app">
                <app ></app>
            </div>
        <script type="text/javascript" src="{{url('js')}}/vueapp.js"></script>
        @if(config('app.env') == 'local')
            <script src="http://localhost:35729/livereload.js"></script>
        @endif
        </body>
    </html>
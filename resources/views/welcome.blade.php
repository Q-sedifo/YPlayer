<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <!-- Link the shortcut icon -->
        <link rel="shortcut icon" href="{{ asset('icons/yplayer.svg') }}">

        <title>YPlayer</title>
        
        <!-- Manifest -->
        <link rel="manifest" href="{{ asset('build/manifest.json') }}">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover, user-scalable=no">

        @viteReactRefresh
        @vite('resources/js/app.js')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>

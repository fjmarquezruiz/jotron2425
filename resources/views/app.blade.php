<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    <?php
    /**
     * Call to the routes config to make them available 
     * routes/web.php
     */
    ?>
    @routes
    <?php
    /**
     * When we change something in the project app the project is reloaded
     */
    ?>
    @viteReactRefresh
    <?php
    /**
     * Load react app.tsx and all pages related
     */
    ?>
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    <?php
    /**
     * Generate all the meta
     */
    ?>
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
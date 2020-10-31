@extends('base')

@section('styles')
    <link rel="stylesheet" href="css/cover.css"/>
@endsection

@section('content')
<body class="text-center">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="masthead mb-auto">
        <div class="inner">
        <h3 class="masthead-brand">Cover</h3>
        <nav class="nav nav-masthead justify-content-center">
            <a class="nav-link" href="{!! url('/registration') !!}">S'inscrire</a>
            <a class="nav-link" href="#">Mot de passe oublié</a>
        </nav>
        </div>
    </header>

    <main role="main" class="inner cover">
        <h1 class="cover-heading">SocialEngine</h1>
        <p class="lead">
Share anything and everything with anyone</p>
        <p class="lead">
        <!-- <a href="#" class="btn btn-lg btn-secondary">Learn more</a> -->
        <form class="form-signin" action="{!! url('/') !!}" method="POST">
        @csrf
        <div class="form-label-group">
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus name="email">
        </div>
        <div class="form-label-group">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required name="password">
        </div>
        <div class="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me" name="remember"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        </p>
    </main>

    <footer class="mastfoot mt-auto">
        <div class="inner">
        <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        </div>
    </footer>
    </div>
</body>
@endsection
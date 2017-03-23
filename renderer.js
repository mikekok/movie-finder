const remote = require('electron').remote;

$(document).ready(function() {

    // Header Controls

    $(".winclose").click(function() {
        var window = remote.getCurrentWindow();
        window.close();
    });

    $(".winmax").click(function() {
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });

    $(".winmini").click(function() {
        var window = remote.getCurrentWindow();
        window.minimize();
    });

    // Main Functions

    $('.form-control').keyup(function(e) {
        if (e.keyCode == 13 && $(this).val() != '') {
            $('.status').fadeOut();
            $('#movies').empty();
            var searchValue = $(this).val();
            var typeValue = $('select').val();
            axios.get('http://www.omdbapi.com/?s=' + searchValue + '&type=' + typeValue)
                .then(function(response) {
                    if (response.data.Response == 'True') {
                        var movies = response.data.Search;
                        for (var x in movies) {
                            if (movies[x].Poster != 'N/A') {
                                var moviePoster = movies[x].Poster;
                            } else {
                                var moviePoster = './assets/img/defaultPoster.jpg';
                            }
                            $('#movies').hide().append('<div class="col-sm-3 col-xs-4"><div class="movie"><img src="' + moviePoster + '" class="img-responsive img-thumbnail undraggable"><div class="overlay"></div><div class="name">' + movies[x].Title + '</div><div class="year">' + movies[x].Year + '</div><input id="imdb" type="hidden" value="' + movies[x].imdbID + '"></div></div>').fadeIn();
                        }
                    } else {
                        $('.status').html('No results found').fadeIn();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else {
            $('#movies').empty();
            $('.status').html('<img src="./assets/img/search.png">').fadeIn();
        }
    });

    $("#movies").on("click", ".movie", function() {
        var imdb = $(this).children('input').val();
        window.location.href = 'movie.html?imdb=' + imdb;
    });
});

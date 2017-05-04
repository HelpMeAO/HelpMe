<!DOCTYPE html>
<html>
  <head>
    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="css/main.css">
    <title>Wachtroij | HelpMe</title>
  </head>
  <body>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul class="right hide-on-med-and-down">
          <li><a href="#"><i class="material-icons">search</i></a></li>
          <li><a href="#"><i class="material-icons">add</i></a></li>
          <li><a href="#"><i class="material-icons">refresh</i></a></li>
          <li><a href="#"><i class="material-icons">more_vert</i></a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
        <h4 class="header">Overzicht wachtrij</h4>
        <!-- <p class="caption">Loop je vast, of heb je gewoon een vraag?<br>Dan komt er misschien ooit een leeraar langs</p> -->
        <div class="divider"></div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col s12">
            <table class="bordered centered responsive-table striped">
                <thead>
                  <tr>
                      <th>Naam</th>
                      <th>Categorie</th>
                      <th>Wachtend sinds</th>
                      <th>Wordt geholpen Door</th>
                      <th>Aanpassen</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Me</td>
                    <td>PHP</td>
                    <td>12:00</td>
                    <td>Nouwen</td>
                    <td><i class="material-icons">mode_edit</i></td>
                  </tr>
                  <tr>
                    <td>Jane</td>
                    <td>JS</td>
                    <td>13:00</td>
                    <td><i class="material-icons">clear</i></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Johnson</td>
                    <td>SQL</td>
                    <td>14:00</td>
                    <td><i class="material-icons">clear</i></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Robertson</td>
                    <td>CSS</td>
                    <td>14:00</td>
                    <td><i class="material-icons">clear</i></td>
                    <td></td>
                  </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </div>
    <!--Import jQuery before materialize.js-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
        
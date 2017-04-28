<?php

include 'vendor/autoload.php'
include 'app_settings.php'

use FacebookAds\Api;

doSomething();

function doSomething() {
  if (!$_GET['user_token']) {
    return;
  }

  Api::init($APP_ID, $APP_SECRET, $_GET['user_token']);

  $Api = Api::instance();
}

?>

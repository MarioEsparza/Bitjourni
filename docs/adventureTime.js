//Global Variables
var AVATAR_ID = null;
var NAME = null;
var LOCATION = null;
var ACTIVITY = null;
var bitmojiUrl = null;
var bitMojiURLBook = null;
var COMIC_ID = null;
var LNG = null;
var LAT = null;
var ADDRESS = null;
var PLACE_INDEX = 0;
var PLACE_COUNT = 0;
var currentName = null;
var currentPhoto = null;
var currentType = null;
var currentADR = null;
var currentMap = null;
var currentPhonNum = null;
var currentWeb = null;
var currentRating = null;
var Width;
var Height;
var RANDOM_COUNT = 0;
var RANDOM_URL = null;
var RANDOM_NAME = null;
var RANDOM_MAP = null;
var RANDOM_ID = null;
var RANDOM_TYPE = null;
var RANDOM_ACTI = null;
var randomPhoto = null;
var randomADR = null;
var randomPhonNum = null;
var randomRating = null;
var randomWeb = null;
var randomWidth;
var randomHeight;
var GoogleApiKey = "AIzaSyCc4n7YcIoj-vkkSJ1SVO4_MWvBJ4ECtaI";
var googleMapStyle1 = "&style=element:labels|visibility:off|color:0xf49f53&style=feature:water|element:geometry|color:0x42a9ee|lightness:17&style=feature:landscape|element:geometry|color:0xf5f5f5|lightness:20&style=feature:road.highway|element:geometry.fill|color:0xffffff|lightness:17&style=feature:road.highway|element:geometry.stroke|color:0xffffff|lightness:29|weight:0.2&style=feature:road.arterial|element:geometry|color:0xffffff|lightness:18&style=feature:road.local|element:geometry|color:0xffffff|lightness:16&style=feature:poi|element:geometry|color:0xf5f5f5|lightness:21&style=feature:poi.park|element:geometry|color:0xdedede|lightness:21&style=element:labels.text.stroke|visibility:off|color:0xffffff|lightness:16&style=element:labels.text.fill|saturation:36|color:0x333333|lightness:40&style=element:labels.icon|visibility:off&style=feature:transit|element:geometry|color:0xf2f2f2|lightness:19&style=feature:administrative|element:geometry.fill|color:0xfefefe|lightness:20&style=feature:administrative|element:geometry.stroke|color:0xfefefe|lightness:17|weight:1.2"

// Fail State Checks
var whereFAIL = getCookie('whereFailed');
var whatFAIL = getCookie('whatFailed');
var avatarFAIL = getCookie('avatarFailed');

$(document).ready(cookieTest); //Calls cookie test function when page sucessfully loads

//Show Section OnClick
$(document).ready(function () {
    $("#avatarNextbtn").click(function () {
        $("#where").show();
    });
});

//Input Fail State Check
$(document).ready(function () {
    if (whereFAIL == "true") {

        inputFail("where");
    }
    if (whatFAIL == "true") {

        inputFail("what");
    }
    if (avatarFAIL == "true") {

        inputFail("avatarIMG");
    }
});

function cookieTest() {
    //Cookies Check Functions: These functions will test for cookies, if it finds one it sets a global variable that will be used by the functions.
    var cookieTest = getCookie('Who');
    if (cookieTest == null) {
        NAME = 'John Doe';
        $("#avatar").hide();
        $("#where").hide();
        $("#what").hide();
        $('.js-name').text(NAME);
    }
    else {
        NAME = cookieTest;
        $("#nameInput").attr("value", NAME);
        $('.js-name').text(NAME);

        //Displays the "Valid" icon 
        $("#validCheck1").addClass("glyphicon-ok success-green");
        $("#nameInput").addClass("form-control-success");
       
        //Dynamic Title Code
        var dynamicTitle = NAME;
        dynamicTitle += "'s Adventure!";
        document.title = dynamicTitle;
    }


    console.log("Cookie Name: ", cookieTest);
    //Cookies Check: Avatar ID
    cookieTest = getCookie('avatarID');
    if (cookieTest == null) {
        var $bitmojiImage = $('.js-bitmoji');
        $bitmojiImage.attr('src', "images/guesscard.png");
        $("#where").hide();
        $("#what").hide();
        $("#avatarNextbtn").hide();
        $('.js-name').text(NAME);
    }
    else {
        AVATAR_ID = cookieTest;

        var $bitmojiImage = $('.js-bitmoji');
        $bitmojiImage.attr('src', "images/Placeholder_img.jpg");
        startBitmoji();
    }
    console.log("Cookie Avatar ID: ", cookieTest);

    //Cookies Check: Location
     cookieTest = getCookie('Where');
    if (cookieTest == null ) {
        $("#where").hide();
        $("#whereNextbtn").hide();
        $("#avatarNextbtn").hide();
        $("#what").hide();
        $("#startbtn").hide();
        getCurrentLocation()
       
    }
    else {
        $("#where").hide();
        $("#whereNextbtn").hide();
        LOCATION = cookieTest; 
        $("#locationInput").attr("value", LOCATION);

        //Displays the "Valid" icon 
        $("#validCheck2").addClass("glyphicon-ok success-green");
        $('.js-location').text(LOCATION);
    }
    console.log("Cookie Location: ", cookieTest);

    //Cookies Check: Activity
     cookieTest = getCookie('What');
    if (cookieTest == null) {
        $("#whereNextbtn").hide();
        $("#what").hide();
        $("#startbtn").hide();
    }
    else {
        $("#whereNextbtn").hide();
        $("#what").hide();
        $("#startbtn").hide();
        ACTIVITY = cookieTest;
        $('.js-activity').text(ACTIVITY);
    }
    console.log("Cookie Activity: ", cookieTest);

    //Cookies Check: Avatar Image
     cookieTest = getCookie('avatarURL');
    if (cookieTest == null) {
        $("#avatar").hide();
    }
    else {
        bitmojiUrl = cookieTest;
        var $bitmojiImage = $('.js-bitmoji');
        $bitmojiImage.attr('src', bitmojiUrl);
    }
    console.log("Cookie Bitmoji URL: ", cookieTest);

    //Cookies Check:Google Place Photos
    cookieTest = getCookie('placePhotoURL' + PLACE_COUNT);
    if (cookieTest == null) {
    }
    else {
        landingBitmoji();
        currentPhoto  = cookieTest;
        $('.googlePhotoBG').css({ 'background-image': 'url(' + currentPhoto + ')' });
        var tmpImg = new Image();
        tmpImg.src = currentPhoto;
        $(tmpImg).one('load', function () {
            Width = tmpImg.width;
            Height = tmpImg.height;
            console.log(Width + "x" + Height);
            $('.googlePhotoBG').css({ 'height': '' + Height + '' });
            $('.googlePhotoBG').css({ 'width': '' + Width + '' });
        });      
        var buttonName = 'userContent';
        getPhotoSize(buttonName);
        getPlaceDetails(buttonName);
        //Generates the first Random page
        randomPage();

    }
    //Cookies Check: Google Address
    cookieTest = getCookie('validAddress');
    if (cookieTest == null) {
        LAT = 33.9850469;
        LNG = -118.4694832;
    }
    else {
        ADDRESS = cookieTest;
        LAT = getCookie('Latitude');
        LNG = getCookie('Longitude');

    }
    console.log("Cookie Google Location: ", ADDRESS, "Lat: ", LAT, "Long: ", LNG);
    return true;
}

//Client side IP GEOLocator
function getCurrentLocation() {
    $.get("http://ipinfo.io", function (response) {

        var currentLocation = response.city + ", " + response.region;
        console.log("Current Location Test: ", currentLocation);
        if (currentLocation != null) {
            //If the the call was a success
            $("#locationInput").attr("value", currentLocation);
            $('.js-location').text(currentLocation);
            LOCATION = currentLocation; 
        }
        else {
            LOCATION = $('#locationInput').prop('defaultValue');
        }
        setCookie('Where', LOCATION);
        $("#address").html("Location: " + response.city + ", " + response.region);
    }, "jsonp");

}


//Cookies Function: This is the function for setting cookies. It takes two parameters "key, and value"
//Key is the identifier you need to supply in order to get a value back
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;

}

function clearCookies() {
    document.cookie = 'Where' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.cookie = 'What' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.cookie = 'validAddress' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.cookie = 'Latitude' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.cookie = 'Longitude' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.cookie = 'placeArrSize' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    for (var i = 0; i < 20; i++) {
        document.cookie = 'placePhotoURL' + i + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        document.cookie = 'placeID' + i + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }  
}

//Broken Avatar ID: This detects and broken link and replaces the image with our error pic. Here what the html looks like:
$(document).ready(function () {
    $(".image_Error").on("error", function () {
        $(this).attr('src', 'images/ID-err_img.png');
        inputFail("avatarIMG");
        return true;
    });
});

//Input Functions
//These functions detect keyboard key stroke associate with HTML ID, in this 'nameInput',
//and stores in a (global) variable
$("#nameInput").keyup(function () {
    NAME = $("#nameInput").val();   
    if (NAME) {
        setCookie('Who', NAME);
        //Displays the "Valid" icon whe
        $("#validCheck1").removeClass("glyphicon-remove text-danger");
        $("#validCheck1").addClass("glyphicon-ok success-green");
        $("#avatar").show();
        if (LOCATION != null) {
            $("#where").show();
        }
        else {
            $("#where").hide();
            $("#what").hide();
        }
        if (ACTIVITY!= null) {
            $("#what").show();
        }
        else {
            $("#whereNextbtn").hide();
            $("#what").hide();
        }
        $('.js-name').text(NAME);
    }
    else {
        $("#validCheck1").removeClass("glyphicon-ok success-green");
        $("#validCheck1").addClass("glyphicon-remove text-danger");
        $("#avatar").hide();
        $("#where").hide();
        $("#what").hide();
    }
})

//Random Number Generator
//This function uses a build js function to generate a random number. The parameters (min, max) you pass it determine the range. The most used function in our script.
function getNumber(min, max) {
    var number = min + Math.floor(Math.random() * max);
    return number;
}

//Random Avatar Generator Function
function randomBitmoji() {

   

        var value = getNumber(100001, 999999);
        var value2 = getNumber(1, 5);

        AVATAR_ID = '2' + value + '_' + value2 + '-s4';

        console.log("Random Avatar ID: ", AVATAR_ID);

        $('.js-avatar-id').text('Random Selected');
        setCookie('avatarID', AVATAR_ID);

        var bitmojiRenderUrl = 'https://render.bitstrips.com/v2/cpanel/COMIC_ID-AVATAR_ID-v1.png?transparent=1';
        var comicId = getNumber(1, 7);

        switch (comicId) {
            case 1:
                comicId = 10212025;
                break;
            case 2:
                comicId = 10212044;
                break;
            case 3:
                comicId = 10212028;
                break;
            case 4:
                comicId = 10212039;
                break;
            case 5:
                comicId = 10212047;
                break;
            case 6:
                comicId = 10212371;
                break;
            case 7:
                comicId = 10212038;
                break;
            default:
                comicId = 10187987;
        }
        bitmojiUrl = bitmojiRenderUrl
                       .replace('COMIC_ID', comicId)
                       .replace('AVATAR_ID', AVATAR_ID);

    
        urlAutoCheck(bitmojiUrl, function (exists) {

        });

        setCookie('avatarURL', bitmojiUrl);
        setCookie('avatarFailed', "false");
        $("#avatarNextbtn").fadeIn("slow");

        var $bitmojiImage = $('.js-bitmoji');
        $bitmojiImage.attr('src', bitmojiUrl);
        //Sets start section bitmoji
        startBitmoji();

    //Waits for the Bitmoji to be loaded in and then changes the background image
        var wwidth = $(window).width();
        var hheight = $(window).height();
        $('#avatarImage').load(
      function () {
          var valueBG = getNumber(1, 3);
          switch (valueBG) {
              case 1:
                  if ((wwidth <= 767)) {
                      $('.avatarcardBG').css({ 'background-image': 'url("/images/guesscardBGred-sm.png")' });
                  } else {
                      $('.avatarcardBG').css({ 'background-image': 'url("/images/guesscardBGred.png")' });

                  }
                  break;
              case 2:
                  if ((wwidth <= 767)) {
                      $('.avatarcardBG').css({ 'background': 'url("/images/guesscardBGgreen-sm.png")' });
                  } else {
                      $('.avatarcardBG').css({ 'background': 'url("/images/guesscardBGgreen.png")' });

                  }
                  
                  break;
              case 3:
                  if ((wwidth <= 767)) {
                      $('.avatarcardBG').css({ 'background': 'url("/images/guesscardBGblue-sm.png")' });
                  } else {
                      $('.avatarcardBG').css({ 'background': 'url("/images/guesscardBGblue.png")' });

                  }
                
                  break;
              default:

          }
      });

       


}


//User Bitmoji URL
$("#bitMojiID2").keyup(function () {
        var urlString = $('#bitMojiID2').val();
        var splitURL = urlString.split("/").pop()  
        var splitURL2 = splitURL.split("-");
        AVATAR_ID = splitURL2[1] + "-" + splitURL2[2];
        //COMIC_ID = splitURL2[0];
        //console.log("COMID ID: ", COMIC_ID);
    
        setCookie('avatarID', AVATAR_ID);
        var bitmojiRenderUrl = 'https://render.bitstrips.com/v2/cpanel/COMIC_ID-AVATAR_ID-v1.png?transparent=1';
        var comicId = 9945775;
        bitmojiUrl = bitmojiRenderUrl
                       .replace('COMIC_ID', comicId)
                       .replace('AVATAR_ID', AVATAR_ID);

        setCookie('avatarURL', bitmojiUrl);

        var $bitmojiImage = $('.js-bitmoji');
        $bitmojiImage.attr('src', bitmojiUrl);
    //Sets start section bitmoji
    console.log("USER AVATAR ID: ", COMIC_ID);
        startBitmoji();
        urlAutoCheck(bitmojiUrl, function (exists) {

        });
})

$('#bitBtn2').click(function () {
    console.log("User BitMoji ID: ", AVATAR_ID);
    console.log("User BitMoji URL: ", bitmojiUrl);
    urlManualCheck(bitmojiUrl, function (exists) {

    });
})

//These function validate the user Bitmoji by testing the URL is good.
function urlManualCheck(url, callback) {
    $.ajax({
        type: 'HEAD',
        url: url,
        success: function () {
            setCookie('avatarFailed', "false");
            inputSuccess("avatarIMG");
            callback(true);
        },
        error: function () {
            setCookie('avatarFailed', "true");
            inputFail("avatarIMG");
            alert('Invalid URL: Try Again!');
     
            callback(false);
        }
    });
}
function urlAutoCheck(url, callback) {
    $.ajax({
        type: 'HEAD',
        url: url,
        success: function () {
            setCookie('avatarFailed', "false");
            inputSuccess("avatarIMG");
            callback(true);
        },
     
    });
}

//Location Input
$("#locationInput").keyup(function () {
    LOCATION = $("#locationInput").val();
    setCookie('Where', LOCATION);
    $('.js-location').text(LOCATION);
})

//Activity Search Input
$("#activityInput").keyup(function () {
    ACTIVITY = $("#activityInput").val();
    setCookie('What', ACTIVITY);
})

//Scroll Function
$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//Nav Bar Resize Function
if (window.location.pathname != "/yourAdv.html") {
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
}


//Dynamic Page Content
$('#mybook').on("click", "#random-add-end", function () {   
    var buttonName = 'randomContent';
    fillPages(buttonName);
});

function randomPage() {
    generateRandomPlaces();
    findRandom();
}

$('#mybook').on("click", "#custom-add-end", function () {
    var buttonName = 'userContent';
    fillPages(buttonName);
});

function fillPages(buttonName) {  

    console.log("Button Name: ", buttonName);
    var word = wordGenerator();

    var tempType = currentType.replace(/_/g, ' ');
    if (tempType == "points of interest") {
        tempType = "interesting";
    }
    var userbtn = "More " + tempType + " places.";


    var placesArraySize = getCookie('placeArrSize');
    if (!(PLACE_COUNT < placesArraySize)) {
        userbtn = "Something new."
    }
    if (buttonName == 'randomContent') {   
        console.log("Random Pages Count: ", RANDOM_COUNT);
    } else {    
        console.log("PLACES: ", placesArraySize, "PAGE COUNT :", PLACE_COUNT);
    }

    if (buttonName == 'userContent') {
        if (!(PLACE_COUNT < placesArraySize)) {
            buttonName = 'randomContent';//If page count is not smaller than the amount of user generated places use random places instead
            console.log("User Content is done: RANDOM CONTENT ONLY")      
        }
    }

      
        if (buttonName == 'randomContent') {
            var placeNam = RANDOM_NAME;
            var placeMap = RANDOM_MAP;
            var placeType = RANDOM_TYPE;
        } else {
            var placeNam = currentName;
            var placeMap = currentMap;
            var placeType = currentType;
            //userbtn = "More "+placeType+"s."
        
        }
        getPhotoSize(buttonName);
        //Calls the dynamicBitmoji function
        dynamicBitmoji(placeType);  

        //Image Layout is determined by width and height
        var random_mojiWidth = mojiWidth = 175;
        var random_mojiHeight = mojiHeight = 175;

        if (buttonName == 'randomContent') {
            var random_marginLeft = ((400 - randomWidth) / 2)

            if (randomWidth <= 150) {
                random_mojiHeight = random_mojiWidth = randomWidth - 10;
            }
            else if (randomHeight <= 150) {
                random_mojiHeight = random_mojiWidth = randomHeight - 10;
            }

        } else {
            var marginLeft = ((400 - Width) / 2)

            if (Width <= 150) {
                mojiHeight = mojiWidth = Width - 10;
            }
            else if (Height <= 150) {
                mojiHeight = mojiWidth = Height - 10;
            }
        }
        //400 is the maximum div width for the pages. This subtracts the image width from it and divides that result by two to give a left margin that always centers the image
      
     //Uses the random number function to choose a CSS class to apply to the pictures
        var value = getNumber(1, 2);
        if (value != 1) {
            var classRotate = "picRotato1"
            var classRotate2 = "picRotato2"
        }
        else {
            var classRotate = "picRotato2"
            var classRotate2 = "picRotato1"
        }


        if (buttonName == 'randomContent') {
            // Left Page
            $('#mybook').booklet("add", "end", "<div><h1 class='js-randomname" + RANDOM_COUNT + "'>PLACE NAME</h1><p class='pageLabel'>Address: </p><p class='pageDetails js-randomADR" + RANDOM_COUNT + "'>N/A</p><p class='pageLabel'>Phone Number: <span class='pageDetails js-randomPHN" + RANDOM_COUNT + "'>N/A</span></p><p class='pageLabel'>More Info: <a class='pageDetails' href=" + randomWeb + " target='_blank'>Website</a></p><p class='pageLabel'>Rating: <span class='pageDetails js-randomRTG" + RANDOM_COUNT + "'>N/A</span></p><div class=' tape two " + classRotate2 + " image_Error' style=' background-image: url(" + placeMap + "); height: 200px; width: 350px; margin-left:25px; position: absolute; bottom:50px;'></div></div>");

            //Right Page
            $('#mybook').booklet("add", "end", "<div> <div class=' tape one " + classRotate + " photoBG image_Error' style=' background-image: url(" + randomPhoto + "); height: " + randomHeight + "px; width: " + randomWidth + "px; margin-left: " + random_marginLeft + "px;'><img class='js-randombitmoji-rightPage" + RANDOM_COUNT + " media-object col-sm-4 " + classRotate + " image_Error' style='height: " + random_mojiHeight + "px; width: " + random_mojiWidth + "px; position: absolute; right: 0px; bottom: -10px;' alt='Book Bitmoji' /></div> <p style='margin-top:15px;'><span class='js-randomname" + RANDOM_COUNT + "'></span> was " + word + ". I took a picture and then decided I wanted to see what else <span class='js-location'></span> had to offer. I hailed a cab and visited...</p><div class='row'><a id='custom-add-end' class='btn btn-default custom-next'>" + userbtn + "</a><a id='random-add-end' class='btn btn-default	custom-next'>Something new.</a></div></div>");

            // Dynamic Content has to be loaded
            //Left Page Content
            $('.js-name').text(NAME);
            $('.js-location').text(LOCATION);
            $('.js-randomname' + RANDOM_COUNT).text(placeNam);
            $('.js-randomADR' + RANDOM_COUNT).text(randomADR);
            $('.js-randomPHN' + RANDOM_COUNT).text(randomPhonNum);
            $('.js-randomRTG' + RANDOM_COUNT).text(randomRating);

            //Right Page Content
            var $bitmojiRightPage = $('.js-randombitmoji-rightPage' + RANDOM_COUNT);
            $bitmojiRightPage.attr('src', bitMojiURLBook);
        }
        else {
            // Left Page
            $('#mybook').booklet("add", "end", "<div><h1 class='js-placename" + PLACE_COUNT + "'>PLACE NAME</h1><p class='pageLabel'>Address: </p><p class='pageDetails js-placeADR" + PLACE_COUNT + "'>N/A</p><p class='pageLabel'>Phone Number: <span class='pageDetails js-placePHN" + PLACE_COUNT + "'>N/A</span></p><p class='pageLabel'>More Info: <a class='pageDetails' href=" + currentWeb + " target='_blank'>Website</a></p><p class='pageLabel'>Rating: <span class='pageDetails js-placeRTG" + PLACE_COUNT + "'>N/A</span></p><div class=' tape two " + classRotate2 + " image_Error' style=' background-image: url(" + placeMap + "); height: 200px; width: 350px; margin-left:25px; position: absolute; bottom:50px;'></div></div>");

            //Right Page
            $('#mybook').booklet("add", "end", "<div> <div class=' tape one " + classRotate + " photoBG image_Error' style=' background-image: url(" + currentPhoto + "); height: " + Height + "px; width: " + Width + "px; margin-left: " + marginLeft + "px;'><img class='js-bitmoji-rightPage" + PLACE_COUNT + " media-object col-sm-4 " + classRotate + " image_Error' style='height: " + mojiHeight + "px; width: " + mojiWidth + "px; position: absolute; right: 0px; bottom: -10px;' alt='Book Bitmoji' /></div><p style='margin-top:15px;'><span class='js-placename" + PLACE_COUNT + "'></span> was " + word + ". I took a picture and then decided I wanted to see what else <span class='js-location'></span> had to offer. I hailed a cab and visited...</p><div class='row'><a id='custom-add-end' class='btn btn-default custom-next'>" + userbtn + "</a><a id='random-add-end' class='btn btn-default custom-next'>Something new.</a></div></div>");

            // Dynamic Content has to be loaded
            //Left Page Content
            $('.js-name').text(NAME);
            $('.js-location').text(LOCATION);
            $('.js-placename' + PLACE_COUNT).text(placeNam);
            $('.js-placeADR' + PLACE_COUNT).text(currentADR);
            $('.js-placePHN' + PLACE_COUNT).text(currentPhonNum);
            $('.js-placeRTG' + PLACE_COUNT).text(currentRating);

            //Right Page Content
            var $bitmojiRightPage = $('.js-bitmoji-rightPage' + PLACE_COUNT);
            $bitmojiRightPage.attr('src', bitMojiURLBook);
        }
        
        if (buttonName == 'randomContent') {
            RANDOM_COUNT++;
            //Calls Random Page function and gets the next random page content prepared
            randomPage();
        } else {
            PLACE_COUNT++ //Add a new page to the page
        }
       


    getPhotoSize(buttonName);
    getPlaceDetails(buttonName);
}

//Extracts the Height and Width of the current photo url and sets the "height" and "width" variables which will be insert in our CSS.
function getPhotoSize(buttonName) {
    if (buttonName == 'randomContent') {
        randomPhoto = RANDOM_URL;
        var tmpImg = new Image();
        tmpImg.src = randomPhoto;
        $(tmpImg).one('load', function () {
            randomWidth = tmpImg.width;
            randomHeight = tmpImg.height;
        });
    } else {
        if (PLACE_COUNT == 0) {
            currentPhoto = getCookie('placePhotoURL' + PLACE_COUNT);
        } 
        var tmpImg = new Image();
        tmpImg.src = currentPhoto;
        $(tmpImg).one('load', function () {
            Width = tmpImg.width;
            Height = tmpImg.height;
        });
    }
}

function getPlaceDetails(buttonName) {
    var placeID_Details;
    var serviceHelper;
    if (buttonName == "userContent") {
       var placeID_Details = getCookie("placeID" + PLACE_COUNT);
    }
    else {
        placeID_Details = RANDOM_ID;
    }

    var request = {
        placeId: placeID_Details
    };
    var service = new google.maps.places.PlacesService($('#service-helper2').get(0));
    service.getDetails(request, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            if (buttonName == 'userContent') {
                var photoURL = place.photos;
                currentPhoto = photoURL[0].getUrl({ 'maxWidth': 350, 'maxHeight': 250 });
                getPhotoSize(buttonName);

                currentName = place.name
                console.log(currentName);

                console.log(place.vicinity);
                var locationTok = place.vicinity;
                locationTok = locationTok.replace(/\s+/g, '+');
                var googleStaticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + locationTok + '&zoom=15&size=350x225&key=' + GoogleApiKey;
                console.log("Google Static Map: ", googleStaticMapUrl);
                currentMap = googleStaticMapUrl;

                var types = String(place.types);
                types = types.split(",");
                console.log(types[0]);
                currentType = types[0];

                currentADR = place.formatted_address;
                currentPhonNum = place.international_phone_number;
                currentRating = place.rating;
                currentWeb = place.url;
                console.log("User Website: ", currentWeb)
            } else {
                randomADR = place.formatted_address;
                randomPhonNum = place.international_phone_number;
                randomRating = place.rating;
                randomWeb = place.url;
                console.log("Random Website: ", randomWeb)
            }
    
        } else {
            alert("Get Details Function Failed");
        }
    }
}

function findPlace() {
    //Take content of Global variable LOCATION and replaces the spaces in the string with "+" to format it compatible with the Google API request format
    locationToken = LOCATION.replace(/\s+/g, '+');
    var googleAddressUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationToken + '&key=' + GoogleApiKey;
    console.log("GOOGLE API: Info:", googleAddressUrl);

    $.getJSON(googleAddressUrl, function (data, textStatus) {
        if (data.status == "OK") {
            //Determines the zoom for the background image of the next section
            var mapZoom = data.results[0].types;
            mapZoom = mapZoom[0]
            console.log("GOOGLE API TEST: Location Type:", mapZoom);
            switch (mapZoom) {
                case 'country':
                    mapZoom = 7;
                    break;
                case 'administrative_area_level_1':
                    mapZoom = 9;
                    break;
                case 'locality':
                    mapZoom = 11;
                    break;
                case 'route':
                    mapZoom = 12;
                    break;
                case 'neighborhood':
                    mapZoom = 13;
                    break;
                default:
                    mapZoom = 11;
            }
            //Sets the zoom for the background image of the next section
            var googleStaticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + locationToken + googleMapStyle1 + '&zoom=' + mapZoom + '&size=640x640&key=' + GoogleApiKey;
            //console.log("Google Static Map: ", googleStaticMapUrl);
            $('.what-section').css({ 'background-image': '  linear-gradient( rgba(63, 161, 227, 0.5), rgba(63, 161, 227, 0.5)),url(' + googleStaticMapUrl + ')' });

            //Location Cookie is only set when input is valid
            setCookie('whereFailed', "false");
            //Calls the inputFail function and passes the section that failed
            inputSuccess("where");
            
            ADDRESS = data.results[0].formatted_address;
            setCookie('validAddress', ADDRESS);
            console.log("GOOGLE API TEST: Street Adress:", ADDRESS);  
            LAT = data.results[0].geometry.location.lat;
            setCookie('Latitude', LAT);
            console.log("GOOGLE API TEST: Latitude:", LAT);
            LNG = data.results[0].geometry.location.lng;
            setCookie('Longitude', LNG);
            console.log("GOOGLE API TEST: Longitude:", LNG);     
        }
        else {
            //If location is invalid, the LOCATION cookie is set to null
            alert('Invalid: Hmmm, something is not right. Try somewhere else!');

            setCookie('whereFailed', "true");
            //Calls the inputFail function and passes the section that failed
            inputFail("where");                 
        }     
    });
};

function findWhat() {
    var myLatlng = new google.maps.LatLng(LAT, LNG);
    var service = new google.maps.places.PlacesService($('#service-helper').get(0));

    service.nearbySearch({
        location: myLatlng,
        keyword: ACTIVITY,
        rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            //Location Cookie is only set when input is valid 
            setCookie('whatFailed', "false");
            //Calls the inputFail function and passes the section that failed 
            inputSuccess("what");

            for (var i = 0; i < results.length; i++) {
                var e = 0;
              var place = results[i];
              //place photo from current result is stored in a variable then the image url is retrieved
              var photoURL = place.photos;
                //Only places with atleast one image are stored. The rest are ignored.
                    if (photoURL) {
                        //Saves only the first photoURL in a cookie for use on the next page.
                        if (e == 0) {
                            photoURL = photoURL[0].getUrl({ 'maxWidth': 350, 'maxHeight': 250 });      
                            setCookie('placePhotoURL' + PLACE_INDEX, photoURL);
                            e = 1;
                        }
                        //Only the place ID is saved in cookies.
                        setCookie('placeID' + PLACE_INDEX, place.place_id);
                        PLACE_INDEX++;
                    }
                    else {
                        console.log("NO PHOTO! Result ", i, " ignored");
                    }
            }
            console.log("Total Valid Places FOUND (Add 1): ", PLACE_INDEX);
            setCookie('placeArrSize', PLACE_INDEX);
        }
        else {
            //If location is invalid, the LOCATION cookie is set to null 
            if (whatFAIL != "true") {
                alert('Invalid: Hmmm, somthing went wrong. Try something else!');
            }
            setCookie('whatFailed', "true");
            //Calls the inputFail function and passes the section that failed  
            inputFail("what");
        }
    }
};

function findRandom() {
    var myLatlng = new google.maps.LatLng(LAT, LNG);
    var service = new google.maps.places.PlacesService($('#service-helper2').get(0));
    service.nearbySearch({
        location: myLatlng,
        keyword: RANDOM_ACTI,
        radius:25000
    }, callback);
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log("!RANDOM PLACE!");
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var photoURL = place.photos;
                if (photoURL) {
                    //Set the exit to true (i == results.length) so only the first result is store in temporary variables
                    i = results.length;
                    RANDOM_URL = photoURL[0].getUrl({ 'maxWidth': 350, 'maxHeight': 250 });
                    console.log(RANDOM_URL);
                    
                    console.log("RANDOM URL: ", RANDOM_URL);
                    console.log(place.name);
                    RANDOM_NAME = place.name;

                    console.log(place.vicinity);
                    var locationTok = place.vicinity;
                    locationTok = locationTok.replace(/\s+/g, '+');
                    var googleStaticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + locationTok + '&zoom=15&size=350x225&key=' + GoogleApiKey;
                    console.log("Google Static Map: ", googleStaticMapUrl);
                    RANDOM_MAP = googleStaticMapUrl;

                    console.log(place.place_id);
                    RANDOM_ID = place.place_id;
                    var types = String(place.types);
                    types = types.split(",");
                    console.log(types[0]);
                    RANDOM_TYPE = types[0];
                }
                else {
                    console.log("NO PHOTO RESULTS");
                }
            }
            var buttonName = 'randomContent';
            getPlaceDetails(buttonName);
            getPhotoSize(buttonName);
        }
        else {
            //If location is invalid, it calls the random function and attempts again until a vaild result is found
                console.log("RANDOM FAILED ");
                randomPage();
        }
    }
};


// Input Fail Function: Displays End User Warnings, depending on what section name is passed 
function inputFail(sectionID) {

    if (sectionID == "avatarIMG") {
        $("#validCheckAvatar").removeClass("glyphicon-ok success-green");
        $("#validCheckAvatar").addClass(" glyphicon-remove text-danger");

        $("#where").hide();
        $("#what").hide();
        $("#avatarNextbtn").hide();
    }
    if (sectionID == "where") {
        $("#validCheck2").removeClass("glyphicon-ok success-green");
        $("#validCheck2").addClass(" glyphicon-remove text-danger");

        $("#what").hide();
        $("#whereNextbtn").hide();
    }
    if (sectionID == "what") {
        $("#validCheck3").removeClass("glyphicon-ok success-green");
        $("#validCheck3").addClass(" glyphicon-remove text-danger");

        $("#startbtn").hide();
    }

};

// Input Success Function: Displays End User Warnings, depending on what section name is passed 
function inputSuccess(sectionID) {

    if (sectionID == "avatarIMG") {
        $("#validCheckAvatar").removeClass("glyphicon-remove text-danger");
        $("#validCheckAvatar").addClass("glyphicon-ok success-green");

        $("#avatarNextbtn").fadeIn("slow");
    }
    if (sectionID == "where") {
        //User Validation Alert
        $("#validCheck2").removeClass("glyphicon-remove text-danger");
        $("#validCheck2").addClass("glyphicon-ok success-green");

        $("#what").show();
        $("#whereNextbtn").fadeIn("slow");

    }
    if (sectionID == "what") {
        //User Validation Alert
        $("#validCheck3").removeClass("glyphicon-remove text-danger");
        $("#validCheck3").addClass("glyphicon-ok success-green");

        $("#startbtn").fadeIn("slow");
     
    }
};
//Set Start Bitmoji
function startBitmoji() {
    var bitmojiRenderUrl = 'https://render.bitstrips.com/v2/cpanel/10161404-AVATAR_ID-v1.png?transparent=1';
    bitmojiRenderUrl = bitmojiRenderUrl
                   .replace('AVATAR_ID', AVATAR_ID);
    var $bitmojiImage = $('.js-bitmoji-start');
    $bitmojiImage.attr('src', bitmojiRenderUrl);
}
//Set Start Bitmoji
function landingBitmoji() {
    var bitmojiRenderUrl = 'https://render.bitstrips.com/v2/cpanel/10156048-AVATAR_ID-v1.png?transparent=1';
    bitmojiRenderUrl = bitmojiRenderUrl
                   .replace('AVATAR_ID', AVATAR_ID);
    var $bitmojiImage = $('.js-bitmoji-stamp');
    $bitmojiImage.attr('src', bitmojiRenderUrl);
}

//.modal-backdrop classes
$(".modal-fullscreen").on('show.bs.modal', function () {
    setTimeout(function () {
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    }, 0);
});
$(".modal-fullscreen").on('hidden.bs.modal', function () {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
});

//Google API Initialization Function
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {

    }); 
}
//Generates a random place type to be used by the randomPlace function
function generateRandomPlaces() {

    var randomNum= getNumber(1, 11);
    switch (randomNum) {
        case 1:
            RANDOM_ACTI = 'bar';
            break;
        case 2:
            RANDOM_ACTI = 'point_of_interest';
            break;
        case 3:
            RANDOM_ACTI = 'museum';
            break;
        case 4:
            RANDOM_ACTI = 'club';
            break;
        case 5:
            RANDOM_ACTI = 'park';
            break;
        case 6:
            RANDOM_ACTI = 'restaurant';
            break;
        case 7:
            RANDOM_ACTI = 'shopping_mall';
            break
        case 8:
            RANDOM_ACTI = 'cafe';
            break;
        case 9:
            RANDOM_ACTI = 'sushi';
            break;
        case 10:
            RANDOM_ACTI = 'university';
            break
        case 11:
            RANDOM_ACTI = 'movie_theater';
            break;

        default:
            RANDOM_ACTI = 'point_of_interest';
    }
    console.log("RANDOM ACTIVITY GENERATED:, ", RANDOM_ACTI);
}

function wordGenerator() {
    var value = getNumber(1, 3);
    var word;

    switch (value) {
        case 1:
            word = 'great';
            break;
        case 2:
            word = 'awesome';
            break;
        case 3:
            word = 'a good time';
            break;
        default:
            word = 'what I was looking for';
    }
    return word
}
//Generates a Bitmoji URL using the google Place type to determine the comic id.
function dynamicBitmoji(placeType) {

    var bitmojiRenderUrl2 = 'https://render.bitstrips.com/v2/cpanel/COMIC_ID-AVATAR_ID-v1.png?transparent=1';
    var tempComicID

    var value1 = getNumber(1, 2);
    var value2 = getNumber(1, 3);
    var value3 = getNumber(1, 4);

    if (placeType == 'atm' || placeType == 'bank' || placeType == 'casino') {
        if (value1 == 1) {
            tempComicID = 9176167;
        }
        else {
            tempComicID = 9954585;
        }     
    } else if (placeType == 'park' || placeType == 'museum' || placeType == 'point_of_interest') {
        if (value2 == 1) {
            tempComicID = 9686290;
        } else if (value2 == 2) {
            tempComicID = 7216901;
        } else {
            tempComicID = 8508524;
        }

        //7681590


    } else if (placeType == 'night_club') {
        tempComicID = 7724871;
    } else if (placeType == 'store' || placeType == 'convenience_store' || placeType == 'shopping_mall' || placeType == 'clothing_store') {
        if (value2 == 1) {
            tempComicID = 7622034;
        } else if (value2 == 2) {
            tempComicID = 9205465;
        } else {
            tempComicID = 7622034;
        }
    } else if (placeType == 'restaurant' || placeType == 'food') {
        if (value2 == 1) {
            tempComicID = 10211583;
        } else if (value2 == 2) {
            tempComicID = 7622034;
        } else {
            tempComicID = 9941516;
        }
    } else if (placeType == 'cafe') {
        if (value2 == 1) {
            tempComicID = 7197733;
        } else if (value2 == 2) {
            tempComicID = 10187809;
        } else {
            tempComicID = 9989003;
        }
    } else if (placeType == 'movie_theater') {
        tempComicID = 10211503;
    } else if (placeType == 'meal_delivery' || placeType == 'meal_takeaway') {
        tempComicID = 9090383;
    } else if (placeType == 'airport') {
        tempComicID = 10161404;
    } else if (placeType == 'art_gallery') {
        tempComicID = 10212136;
    } else if (placeType == 'bakery') {
        tempComicID = 8793838;
    } else if (placeType == 'bar' || placeType == 'liquor_store') {
        if (value3 == 1) {
            tempComicID = 7197752;
        } else if (value3 == 2) {
            tempComicID = 8149238;
        } else if(value3 == 3){
            tempComicID = 8810106;

        } else {
            tempComicID = 10134284;
        }
    } else if (placeType == 'book_store') {
        tempComicID = 10212405;
    } else if (placeType == 'cemetery' || placeType == 'funeral_home') {
        if (value2 == 1) {
            tempComicID = 8793838;
        } else if (value2 == 2) {
            tempComicID = 9993636;
        } else {
            tempComicID = 9936428;
        }

    } else if (placeType == 'church') {
        tempComicID = 9742934;
    } else if (placeType == 'fire_station') {
        tempComicID = 10211862;
    }
    else if (placeType == 'florist') {
        tempComicID = 9945017;
    }
    else if (placeType == 'gas_station') {
        tempComicID = 10079856;
    }
    else if (placeType == 'gym') {
        tempComicID = 10211551;
    }
    else if (placeType == 'hair_care' || placeType == 'beauty_salon') {
        if (value2 == 1) {
            tempComicID = 9606677;
        } else if (value2 == 2) {
            tempComicID = 9991448;
        } else {
            tempComicID = 9991430;
        }

    }
    else if (placeType == 'hospital' || placeType == 'pharmacy') {
        if (value1 == 1) {
            tempComicID = 9954585;
        }
        else {
            tempComicID = 8149220;

        }
    }
    else if (placeType == 'library') {
        tempComicID = 10079832;
    }
    else if (placeType == 'pet_store') {
        if (value1 == 1) {
            tempComicID = 9284933;
        }
        else {
            tempComicID = 8171344;
        }
    }
    else if (placeType == 'school' || placeType == 'university') {
        tempComicID = 10212384;
    } else if (placeType == 'stadium') {
        tempComicID = 7548831;
    }
    else if (placeType == 'subway_station' || placeType == 'train_station' || placeType == 'transit_station') {
        tempComicID = 9991736;
    }
        //Default Cases
    else {
        if (value3 == 1) {
            tempComicID = 7681590;
        } else if (value3 == 2) {
            tempComicID = 9946762;
        } else if (value3 == 3) {
            tempComicID = 9686290;

        } else {
            tempComicID = 8736904;
        }
        //10152648
    }
    bitMojiURLBook = bitmojiRenderUrl2
                                       .replace('COMIC_ID', tempComicID)
                                       .replace('AVATAR_ID', AVATAR_ID);
}
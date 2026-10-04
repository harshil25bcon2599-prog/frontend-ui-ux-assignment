// Travel and Tourism website - jQuery code

$(document).ready(function () {

  // 1. Destination cards: Read more / Read less
  $(".read-more").on("click", function (event) {
    event.preventDefault();                       // do not jump to the top of the page
    $(this).prev(".more-text").slideToggle();     // show or hide the extra text
    if ($(this).text() === "Read more") {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });

  // 2. Package "Book Now" button: choose the package in the form and scroll down
  $(".book-btn").on("click", function () {
    $("#package").val($(this).attr("data-price")).trigger("change");
    $("html, body").animate({ scrollTop: $("#booking").offset().top - 70 }, 600);
  });

  // 3. Estimated cost = package price x number of persons
  function updateCost() {
    var price = Number($("#package").val());
    var persons = Number($("#persons").val());
    $("#totalCost").text(price * persons);
  }
  $("#package").on("change", updateCost);
  $("#persons").on("keyup change", updateCost);

  // 4. Gallery: click on an image to see it big in a Bootstrap modal
  $(".gallery-img").on("click", function () {
    $("#bigImage").attr("src", $(this).attr("data-large")).attr("alt", $(this).attr("alt"));
    $("#imageTitle").text($(this).attr("alt"));
    new bootstrap.Modal($("#imageModal")[0]).show();
  });

  // 5. Travel date: cannot choose a date from the past
  var today = new Date().toISOString().split("T")[0];
  $("#travelDate").attr("min", today);

  // 6. Booking form submit
  $("#bookingForm").on("submit", function (event) {
    event.preventDefault();                       // stop page reload
    var name = $("#bName").val();
    var packageName = $("#package option:selected").text();

    var box = $('<div class="alert alert-success"></div>');
    box.text("Thank you " + name + "! We got your request for " + packageName +
             ". We will call you soon.");
    $("#bookMsg").empty().append(box).hide().fadeIn();

    this.reset();                                 // clear the form
    $("#totalCost").text(0);
  });

  // 7. Close the mobile menu after clicking a link
  $(".navbar-nav .nav-link").on("click", function () {
    $("#navMenu").removeClass("show");
  });

  // 8. Back to top button: show after scrolling down, click to go up
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $("#topBtn").fadeIn();
    } else {
      $("#topBtn").fadeOut();
    }
  });
  $("#topBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

});

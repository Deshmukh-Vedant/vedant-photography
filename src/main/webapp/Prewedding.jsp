<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Pre-Wedding Photography - Vedant Photography</title>
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <link href="vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="css/main.css" rel="stylesheet">
</head>
<body>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <a href="Home.jsp" class="logo d-flex align-items-center me-auto me-lg-0">
        <img src="vedantlogo.jpeg" alt="Logo">
      </a>
      <nav id="navbar" class="navbar">
        <ul>
          <li><a href="Home.jsp">Home</a></li>
          <li><a href="About.jsp">About</a></li>
          <li class="dropdown"><a href="#" class="active"><span>Category</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="Nature.jsp">Nature</a></li>
              <li><a href="Sports.jsp">Sports</a></li>
              <li><a href="Travel.jsp">Travel</a></li>
              <li class="dropdown"><a href="Marriage.jsp"><span>Marriage</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="Prewedding.jsp" class="active">Pre-Wedding</a></li>
                  <li><a href="babyshower.jsp">Baby-shower</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="Signup.jsp">Signup</a></li>
          <li><a href="Login.jsp">Login</a></li>
          <li><a href="Contact.jsp">Contact</a></li>
        </ul>
      </nav>
      <div class="header-social-links">
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
      </div>
    </div>
  </header>

  <main id="main">
    <div class="page-header d-flex align-items-center">
      <div class="container position-relative">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6 text-center">
            <h2>Pre-Wedding Shoot</h2>
            <p>Celebrate your love story with cinematic pre-wedding photography. Gorgeous locations, candid chemistry, and timeless frames.</p>
            <a class="cta-btn" href="Book.jsp">Book Pre-Wedding Shoot</a>
          </div>
        </div>
      </div>
    </div>

    <section id="gallery" class="gallery">
      <div class="container-fluid">
        <div class="row gy-4 justify-content-center">
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="gallery-item h-100">
              <img src="marriage5.jpg" class="img-fluid" alt="Prewedding">
              <div class="gallery-links d-flex align-items-center justify-content-center">
                <a href="marriage5.jpg" title="Romantic Moments" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="gallery-item h-100">
              <img src="marriage3.jpg" class="img-fluid" alt="Prewedding">
              <div class="gallery-links d-flex align-items-center justify-content-center">
                <a href="marriage3.jpg" title="Couple Shoot" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="gallery-item h-100">
              <img src="marriage2.jpeg" class="img-fluid" alt="Prewedding">
              <div class="gallery-links d-flex align-items-center justify-content-center">
                <a href="marriage2.jpeg" title="Candid Sunset" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="gallery-item h-100">
              <img src="wedding.jpg" class="img-fluid" alt="Prewedding">
              <div class="gallery-links d-flex align-items-center justify-content-center">
                <a href="wedding.jpg" title="Celebration" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="vendor/glightbox/js/glightbox.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
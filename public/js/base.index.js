const d = document,
  $autos = d.querySelector(".autos"),
  $crear = d.querySelector(".crear");

  if(window.location.href === "http://localhost:8080/auto/create"){
    $autos.classList.remove("is-active");
    $crear.classList.add("is-active");
  } else if(window.location.href === "http://localhost:8080/auto" || window.location.href === "http://localhost:8080/"){
    $crear.classList.remove("is-active");
    $autos.classList.add("is-active");
  }
  
  
  // document.addEventListener("click", (e) => {
  //   // e.preventDefault();
  //   if (e.target.matches(".autos") && !$autos.classList.contains("is-active")) {
  //     window.location.href = "/auto"
  //   } else if (
  //     e.target.matches(".crear") &&
  //     !$crear.classList.contains("is-active")
  //   ) {
  //     window.location.href = "/auto/create"
  //   }
  // });
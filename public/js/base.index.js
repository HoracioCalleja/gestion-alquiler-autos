const d = document,
  $autos = d.querySelector(".autos"),
  $clientes = d.querySelector(".clientes");

  if(window.location.href === "http://localhost:8080/cliente"){
    $autos.classList.remove("is-active");
    $clientes.classList.add("is-active");
  } else if(window.location.href === "http://localhost:8080/auto" || window.location.href === "http://localhost:8080/"){
    $clientes.classList.remove("is-active");
    $autos.classList.add("is-active");
  }

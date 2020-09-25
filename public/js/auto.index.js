document.querySelectorAll(".action-delete").forEach(($deleteAction) => {
  $deleteAction.addEventListener("click", (e) => {
    const { id, marca } = $deleteAction.dataset;

    if (!confirm(`¿Desea eliminar el auto ID: ${id} - MARCA ${marca} ?`)) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});

document.querySelectorAll(".cerrar-notificacion").forEach($cerrar => {
  $cerrar.addEventListener("click", (e) => {
    const $container = document.querySelector(".container-fluid");
    const parent = $container.parentNode;
    parent.removeChild($container)
  })
})
  


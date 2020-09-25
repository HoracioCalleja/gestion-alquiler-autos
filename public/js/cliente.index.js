document.querySelectorAll(".action-delete").forEach(($deleteAction) => {
  $deleteAction.addEventListener("click", (e) => {
    const { id, nombre } = $deleteAction.dataset;

    if (!confirm(`¿Desea eliminar el cliente con ID: ${id} - NOMBRE: ${nombre} ?`)) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});

document.querySelectorAll(".cerrar-notificacion").forEach($cerrar => {
  $cerrar.addEventListener("click", (e) => {
    const $container = document.querySelector(".container");
    const parent = $container.parentNode;
    parent.removeChild($container)
  })
})

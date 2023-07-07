
const forgotPassword = document.getElementById("forgotPassword");
forgotPassword.addEventListener("submit", (e) => {
    e.preventDefault();
const data = Object.fromEntries(new FormData(forgotPassword));

    if (data.email == ""){
      Swal.fire({
        title: 'El Campo Email no puede estar Vacio ',
        icon:"error",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/forgotPassword";
        }
      });

  } else{
  
  fetch("/api/session/forgotPassword", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json",},
  })
  
    .then((res) => res.json())
    .then((data) => {
      if(data.status !== "error"){
        Swal.fire({
          title: `${data.message}`,
          icon:`${data.status}`,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      } else{
        Swal.fire({
          title: `${data.message}`,
          icon:`${data.status}`,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/forgotPassword";
          }
        });
      }
    
})
.catch((err) => {
      Swal.fire({
    title: "Error Inesperado",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Continuar",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/forgotPassword";
    }
  });
});

  }

  
})
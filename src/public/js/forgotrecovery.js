const params = new URLSearchParams(window.location.search)
const token = params.get('token')
const forgotrecovery = document.getElementById("forgotrecovery");
forgotrecovery.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(forgotrecovery));
    if (data.password == ""){
      Swal.fire({
        title: 'El Campo Password no puede estar Vacio ',
        icon:"error",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/forgotrecovery/?token=${token}`;
        }
      });

  } else{
  
  fetch(`/api/session/forgotrecovery/${token}`, {
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
            window.location.href = `/forgotrecovery/?token=${token}`;
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
      window.location.href = `/forgotrecovery/?token=${token}`;
    }
  });
})}
 
})
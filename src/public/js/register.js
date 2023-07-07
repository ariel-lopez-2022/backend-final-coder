const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm));
  
  fetch("/api/session/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json"},
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
          window.location.href = "/login";
        }
      });
    }
  
})
  .catch((err) => {
    
    Swal.fire({
      title: 'Error Inesperado',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/register';
      }
    })
  });
});
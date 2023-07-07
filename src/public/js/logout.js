const btnLogout = document.getElementById('logout');
   
    btnLogout.addEventListener('click', () => {
        
        Swal.fire({
            title: 'Esta por Cerrar Session',
            text: "Esta Seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                location.assign("http://localhost:8080/login");
            }
        })
          })
 
const Ingresar = document.querySelector("#Alert");

Ingresar.addEventListener("click", (e) => {
  Swal.fire({
    title: "Digita la contraseña",
    input: "password",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Send",
    showLoaderOnConfirm: true,
    preConfirm: (pass) => {
      const password = {
        pass,
      };
      return fetch(`/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      })
        .then((response) => {
          if (!response.ok) {
            const e = new Error("Acceso denegado, Contraseña incorrecta");
            throw e;
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`${error.message}🥺`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      location.href = "/DatosUsuarios";
    }
  });
});

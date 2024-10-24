(function () {
  let DB;
  const listadoClientes = document.querySelector("#listado-clientes");

  document.addEventListener("DOMContentLoaded", async () => {
    await crearDB();

    const openRequest = window.indexedDB.open("crmclientes", 1);
    openRequest.onsuccess = () => obtenerClientes();

    listadoClientes.addEventListener("click", eliminarCliente); //
  });

  function crearDB() {
    return new Promise((resolve, reject) => {
      const crearDB = window.indexedDB.open("crmclientes", 1);

      crearDB.onerror = () => reject("Error creating database.");

      crearDB.onsuccess = () => {
        DB = crearDB.result;
        resolve();
      };

      crearDB.onupgradeneeded = (e) => {
        const db = e.target.result;
        const objectStore = db.createObjectStore("crmclientes", {
          keyPath: "id",
          autoIncrement: true,
        });

        objectStore.createIndex("CustomerName", "CustomerName", {
          unique: false,
        });
        objectStore.createIndex("Company", "Company", { unique: false });
        objectStore.createIndex("Email", "Email", { unique: true });
        objectStore.createIndex("PhoneNumber", "PhoneNumber", {
          unique: false,
        });
        objectStore.createIndex("Country", "Country", { unique: false });
        objectStore.createIndex("id", "id", { unique: true });
        objectStore.createIndex("Status", "Status", { unique: true });

        console.log("Database created successfully.");
      };
    });
  }

  function obtenerClientes() {
    const abrirConexion = window.indexedDB.open("crmclientes", 1);

    abrirConexion.onerror = () =>
      console.error("Error al abrir la base de datos.");

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
      const objectStore =
        DB.transaction("crmclientes").objectStore("crmclientes");

      objectStore.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;

        if (cursor) {
          const {
            CustomerName,
            Company,
            Country,
            PhoneNumber,
            Email,
            id,
            Status,
          } = cursor.value;
          listadoClientes.innerHTML += `
            <tr>
              <td></td>${CustomerName}</td>
               <td>${Company}</td>
              <td>${Email}</td>
              <td>${PhoneNumber}</td>
              <td>${Country}</td>
              <td>
                <a href="editar-cliente.html?id=${id}" class="btn btn-modificar">Cancel</a>
                <a href="#" data-cliente="${id}" class="btn btn-delete  delete">Delete</a>
              </td>
                <td>${Status}</td>
            </tr>
          `;
          cursor.continue();
        } else {
          console.log("There are no more records.");
        }
      };
    };
  }

  function eliminarCliente(e) {
    //
    if (e.target.classList.contains("delete")) {
      const idEliminar = Number(e.target.dataset.cliente);

      swal({
        title: "Are you sure to delete the client?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const transaction = DB.transaction(["crmclientes"], "readwrite");
          const objectStore = transaction.objectStore("crmclientes");

          objectStore.delete(idDelete);

          transaction.oncomplete = () => {
            swal("Record deleted", { icon: "success" });
            e.target.parentElement.parentElement.remove();
          };

          transaction.onerror = () => console.error("Error deleting client.");
        } else {
          swal("The client has not been deleted!");
        }
      });
    }
  }
})();

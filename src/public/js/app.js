(function () {
  let DB;
  const listadoClientes = document.querySelector("#listado-clientes");
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");

  const recordsPerPage = 8; // Кількість записів на сторінку
  let currentPage = 1;

  document.addEventListener("DOMContentLoaded", async () => {
    await crearDB();

    const openRequest = window.indexedDB.open("crmclientes", 1);
    openRequest.onsuccess = () => {
      DB = openRequest.result;
      obtenerClientes(currentPage);
      updatePagination();
    };

    listadoClientes.addEventListener("click", eliminarCliente);
    paginationList.addEventListener("click", handlePagination);
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
        objectStore.createIndex("Status", "Status", { unique: false });

        console.log("Database created successfully.");
      };
    });
  }

  function obtenerClientes(page) {
    const abrirConexion = window.indexedDB.open("crmclientes", 1);
    abrirConexion.onerror = () =>
      console.error("Error al abrir la base de datos.");

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
      const objectStore =
        DB.transaction("crmclientes").objectStore("crmclientes");

      listadoClientes.innerHTML = ""; // Очищення таблиці перед додаванням нових записів

      let index = 0;
      const startRecord = (page - 1) * recordsPerPage;
      const endRecord = page * recordsPerPage;

      objectStore.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;

        if (cursor) {
          if (index >= startRecord && index < endRecord) {
            const {
              CustomerName,
              Company,
              PhoneNumber,
              Email,
              Country,
              id,
              Status,
            } = cursor.value;

            listadoClientes.innerHTML += `
              <tr>
                <td>${CustomerName}</td>
                <td>${Company}</td>
                <td>${PhoneNumber}</td>
                <td>${Email}</td>
                <td>${Country}</td>
                <td>
                  <a href="editar-cliente.html?id=${id}" class="btn btn-modificar">Edit</a>
                  <a href="#" data-cliente="${id}" class="btn btn-delete delete">Delete</a>
                </td>
                <td>${Status}</td>
              </tr>
            `;
          }
          index++;
          cursor.continue();
        } else {
          console.log("There are no more records.");
        }
      };
    };
  }

  function updatePagination() {
    const abrirConexion = window.indexedDB.open("crmclientes", 1);

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
      const objectStore =
        DB.transaction("crmclientes").objectStore("crmclientes");

      objectStore.count().onsuccess = (e) => {
        const totalEntries = e.target.result;
        paginationInfo.textContent = `Showing data ${Math.min(
          (currentPage - 1) * recordsPerPage + 1,
          totalEntries
        )} to ${Math.min(
          currentPage * recordsPerPage,
          totalEntries
        )} of ${totalEntries} entries`;

        paginationList.innerHTML = ""; // Очищення пагінації
        const totalPages = Math.ceil(totalEntries / recordsPerPage);

        for (let i = 1; i <= totalPages; i++) {
          const pageItem = document.createElement("li");
          pageItem.classList.add("page-item");
          if (i === currentPage) pageItem.classList.add("active");

          const pageLink = document.createElement("a");
          pageLink.href = "#";
          pageLink.textContent = i;
          pageLink.dataset.page = i;

          pageItem.appendChild(pageLink);
          paginationList.appendChild(pageItem);
        }
      };
    };
  }

  function handlePagination(e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      currentPage = parseInt(e.target.dataset.page);
      obtenerClientes(currentPage);
      updatePagination();
    }
  }

  function eliminarCliente(e) {
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

          objectStore.delete(idEliminar);

          transaction.oncomplete = () => {
            swal("Record deleted", { icon: "success" });
            obtenerClientes(currentPage); // Оновити таблицю після видалення
            updatePagination(); // Оновити пагінацію після видалення
          };

          transaction.onerror = () => console.error("Error deleting client.");
        } else {
          swal("The client has not been deleted!");
        }
      });
    }
  }
})();

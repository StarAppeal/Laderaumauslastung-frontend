const addToRow = (row, elementType, text) => {
    const element = document.createElement(elementType);
    element.innerHTML = text;
    row.appendChild(element);
}

const loadTable = (vehicles) => {
    const table = document.getElementById("table");
    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    vehicles.forEach((vehicle) => {
        const tr = document.createElement("tr");

        addToRow(tr, "td", vehicle.vehicleId);
        addToRow(tr, "td", vehicle.loadingTime);
        addToRow(tr, "td", vehicle.dischargeTime);
        addToRow(tr, "td", vehicle.loadFactor);
        addToRow(tr, "td", vehicle.freeCapacity);

        const buttonContainer = document.createElement("div");

        const updateButton = createButton("bi-pencil", () => {
            prepareModal(true, 'Bestehendes Fahrzeug editieren')
            doGetCall(vehicle._links.raw.href)
                .then(vehicle => {
                    $('#vehicleEditModal').modal('show');
                    document.getElementById("vehicleRawIdCreate").value = vehicle.id;
                    document.getElementById("vehicleIdCreate").value = vehicle.vehicleId;
                    document.getElementById("loadingTimeCreate").value = vehicle.loadingTime;
                    document.getElementById("dischargeTimeCreate").value = vehicle.dischargeTime;
                    document.getElementById("loadFactorCreate").value = vehicle.loadFactor;
                    document.getElementById("blockedCreate").checked = vehicle.blocked;

                    document.getElementById("heightCreate").value = vehicle.storage.height;
                    document.getElementById("widthCreate").value = vehicle.storage.width;
                    document.getElementById("depthCreate").value = vehicle.storage.depth;
                });
        });

        buttonContainer.appendChild(updateButton);

        const deleteButton = createButton("bi-trash", () => {
            doDeleteCall(vehicle._links.self.href)
                .then(resetFilter)
                .catch(console.log);
        });

        buttonContainer.appendChild(deleteButton);

        tr.appendChild(buttonContainer);

        tr.className = vehicle.blocked ? "blocked" : "unblocked";

        tbody.appendChild(tr);
    });
}

const createButton = (iconClass, callback) => {
    const button = document.createElement("button");
    const icon = document.createElement("i");

    button.onclick = callback;
    icon.classList.add(iconClass)

    button.classList.add("btn-icon");
    button.appendChild(icon);
    return button;
}


const fillTableWithAll = () => {
    doGetCall("http://localhost:8080/vehicles/")
        .then(vehicles => {
            if (jQuery.isEmptyObject(vehicles)) {
                return Promise.resolve([]);
            }
            return Promise.resolve(vehicles._embedded.vehicleResponseList);
        })
        .then(loadTable)
        .catch(console.log);
}
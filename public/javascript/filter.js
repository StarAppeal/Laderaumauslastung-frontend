const createFilter = (key, operator, type, value) => {
    if (value === "") return;
    return {
        key,
        operator,
        field_type: type,
        value
    }
}

const filter = () => {
    const vehicleId = document.getElementById("vehicleId").value;
    const loadingTime = document.getElementById("loadingTime").value;
    const dischargeTime = document.getElementById("dischargeTime").value;
    const loadFactor = document.getElementById("loadFactor").value;

    const freeCapacity = document.getElementById("freeCapacity").checked;

    let filters = [
        createFilter("vehicleId", "LIKE  ", "STRING", vehicleId),
        createFilter("loadingTime", "GREATER_THAN_EQUALS", "INTEGER", loadingTime),
        createFilter("dischargeTime", "GREATER_THAN_EQUALS", "INTEGER", dischargeTime),
        createFilter("loadFactor", "GREATER_THAN_EQUALS", "DOUBLE", loadFactor)
    ];

    filters = filters.filter(filter => filter); // filter

    const searchRequest = {
        filters,
        sorts: []
    }

    doCallWithBody("http://localhost:8080/vehicles/filter", searchRequest)
        .then(vehicles => {
            if (vehicles.page.totalElements === 0) {
                return Promise.resolve([]);
            }
            return Promise.resolve(vehicles._embedded.vehicleResponseList);
        })
        .then(vehicles => {
            if (freeCapacity) {
                return vehicles.filter(vehicle => vehicle.freeCapacity > 0);
            }
            return vehicles;
        })
        .then(loadTable)
        .catch(console.log);
}

const resetFilter = () => {
    document.getElementById("vehicleId").value = "";
    document.getElementById("loadingTime").value = "";
    document.getElementById("dischargeTime").value = ""
    document.getElementById("loadFactor").value = ""
    document.getElementById("freeCapacity").checked = false;
    fillTableWithAll();
}
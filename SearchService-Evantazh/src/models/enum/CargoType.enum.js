const CargoTypes = {
    values: {
        0: {content: "Пасажири", name: "passengers"},
        1: {content: "Діти", name: "children"},
        2: {content: "Люди з обмеженими можливостями", name: "persons_with_disabilities"},
        3: {content: "Рідини", name: "liquids"},
        4: {content: "Вибухові", name: "explosive"},
        5: {content: "Продукти", name: "products"},
        6: {content: "Потребую охолодження", name: "need_cooling"},
        7: {content: "Військового призначення", name: "military_purposes"},
    },
    getCargoTypeKey(name) {
        return Object.keys(this.values).find((key) => this.values[key].name === name) || -1
    },
};


module.exports = CargoTypes;
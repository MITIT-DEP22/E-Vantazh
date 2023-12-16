const OrderStatus = {
    values: {
        0: {content: "Новий тендер", name: "new"},
        1: {content: "Прийняття пропозицій", name: "receiving_proposals"},
        2: {content: "Очікується тендер", name: "pending_tender"},
        3: {content: "Тендер завершився", name: "tender_completed"},
        4: {content: "Тендер закритий", name: "closed"},
        5: {content: "Тендер відмінено", name: "canceled"}
    },
    getOrderStatusKey(name) {
        return Object.keys(this.values).find((key) => this.values[key].name === name) || -1
    },
};


module.exports = OrderStatus;
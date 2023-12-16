### Filter options:

- [x] order status
- [ ] region
- [x] price (order price and minimal step)
- [x] dates
- [x] cargo type

### Possible filter options

- [ ] weight (cargo) (_general for ordering?_)
- [ ] volume (cargo) (_general for ordering?_)
- [ ] passengers capacity (cargo)
- [ ] dimension [h, w, l] (cargo) (_general for ordering?_)

### Search by field

- [x] title (order)
- [x] description (order)
- [x] title (cargo)
- [x] description (cargo)
- [x] requirement (requirements)

### SSL

- **Paste your ssl keys and certificates into the ssl directory**

### Example http request with query parameters

- https://localhost:9099/api/v1/orders?satus=new
- https://localhost:9099/api/v1/orders?satus=new&rangePrice[start]=100&rangePrice[end]=10000
- https://localhost:9099/api/v1/orders?satus=new&rangePrice[start]=100&rangePrice[end]=10000&rangeMinimalStep[start]=1&rangeMinimalStep[end]=100

#### Example in the form of a json

```json
{
    "status": "string",
    // ["new", "receiving_proposals", "pending_tender", "tender_completed", "closed", "canceled"]
    "cargoType": "string",
    // ["passengers", "children", "persons_with_disabilities", "liquids", "explosive", "products", "need_cooling", "military_purposes"]
    "rangePrice": {
        "start": "number",
        "end": "number"
    },
    "rangeMinimalStep": {
        "start": "number",
        "end": "number"
    },
    "rangeDate": {
        "satrt": "yyyy-mm-dd",
        "end": "yyyy-mm-dd"
    },
    "_search": "string"
    // Search is based on the following fields: orders (title, description), cargo (title, description), requirement (requirements) 
}
```


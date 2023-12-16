package dep22.mitit.feature.cargo;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.order.OrderService;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CargoService {

    private final CargoRepository cargoRepository;
    private final OrderService orderService;

    public Map<String, Map<String, String>> getCargoTypes() {
        Map<String, Map<String, String>> enumMap = new HashMap<>();

        for (Type type : Type.values()) {
            Map<String, String> innerMap = new HashMap<>();
            innerMap.put("name", type.getName());
            innerMap.put("status", type.getCategory());
            enumMap.put(type.name(), innerMap);
        }

        return enumMap;
    }

    public Cargo getCargoById(UUID id) {
        return cargoRepository.findById(id)
                .orElseThrow(() ->  new EntityWasNotFoundException(
                        String.format("Cargo with id %s was not found", id)
                ));
    }

    public List<Cargo> getCargoesByOrderId(UUID orderId) {
        return cargoRepository.findByOrder_Id(orderId);
    }

    public Cargo createCargoForOrder(Cargo cargo, UUID orderId, User user) {
        Order order = orderService.getOrderById(orderId);
        cargo.setOrder(order);
        return cargoRepository.save(cargo);
    }

    public void deleteById(UUID id) {
        cargoRepository.deleteById(id);
    }
}

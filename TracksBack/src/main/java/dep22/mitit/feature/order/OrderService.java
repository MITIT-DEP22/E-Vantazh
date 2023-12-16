package dep22.mitit.feature.order;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.cargo.Cargo;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Page<Order> getLastOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Order getOrderById(UUID id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Order with id %s was not found", id))
                );
    }

    public Order createOrder(Order order, User customer) {

        for (Cargo cargo : order.getCargos()) {
            cargo.setOrder(order);
        }

        for (Requirement requirement : order.getRequirements()) {
            requirement.setOrder(order);
        }

        order.setTenderStart(LocalDateTime.now().plusDays(6));

        order.setCustomer(customer);
        return orderRepository.save(order);
    }

    public boolean existsById(UUID orderId) {
        return orderRepository.existsById(orderId);
    }
}

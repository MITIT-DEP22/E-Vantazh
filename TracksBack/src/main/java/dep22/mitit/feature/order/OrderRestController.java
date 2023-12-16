package dep22.mitit.feature.order;

import dep22.mitit.feature.route.Route;
import dep22.mitit.feature.route.RouteRepository;
import dep22.mitit.feature.route.RouteService;
import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderRestController {

    private final OrderService orderService;
    private final UserService userService;
    private final RouteService routeService;
    private final RouteRepository routeRepository;

    @GetMapping
    public Page<Order> getLastOrders(Pageable pageable) {
        return orderService.getLastOrders(pageable);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable UUID id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order,
                             Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);

        Route route = routeService.getRouteById(order.getRouteId());

        Order savedOrder = orderService.createOrder(order, user);
        route.setOrder(order);
        routeRepository.save(route);
        return orderService.createOrder(order, user);
    }
}

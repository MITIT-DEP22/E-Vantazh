package dep22.mitit.feature.route;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.order.OrderService;
import dep22.mitit.feature.route.point.Point;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;
    private final OrderService orderService;

    public Route createRoute(Route route, User user) {
        route.getRouteDistance().setRoute(route);
        route.getRouteDuration().setRoute(route);
        for (Point point : route.getPoints()) {
            point.setRoute(route);

            point.getLocation().setPoint(point);
            point.getAddress().setPoint(point);
        }

        return routeRepository.save(route);
    }

    public Route getRouteById(UUID routeId) {
        return routeRepository.findById(routeId)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Route with id %s was not found", routeId)
                ));
    }

    public Route getRouteByOrderId(UUID orderId) {
        return routeRepository.findByOrder_Id(orderId)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Route with order_id %s was not found", orderId)
                ));
    }
}

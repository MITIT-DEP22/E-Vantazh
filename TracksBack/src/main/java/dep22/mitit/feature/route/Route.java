package dep22.mitit.feature.route;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.route.point.Point;
import dep22.mitit.feature.route.route_distance.RouteDistance;
import dep22.mitit.feature.route.route_duration.RouteDuration;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "routes")
@NoArgsConstructor
@AllArgsConstructor
public class Route extends AbstractBaseEntity {

    @OneToOne
    @JsonIgnore
    private Order order;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("route_duration")
    private RouteDuration routeDuration;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("route_distance")
    private RouteDistance routeDistance;

    @Enumerated(EnumType.ORDINAL)
    @JsonProperty("direction_mode")
    private DirectionMode directionMode;

    @JsonProperty("direction_json")
    @Column(name = "direction_json", columnDefinition = "TEXT")
    private String directionJson;

    @JsonProperty("is_back_direction")
    private boolean isBackDirection;

    @JsonProperty("route_from")
    private LocalDateTime routeFrom;

    @JsonProperty("route_to")
    private LocalDateTime routeTo;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Point> points = new ArrayList<>();
}

package dep22.mitit.feature.route.route_distance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.route.Route;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "route_distances")
@NoArgsConstructor
@AllArgsConstructor
public class RouteDistance extends AbstractBaseEntity {

    @OneToOne
    @JsonIgnore
    private Route route;

    @JsonProperty("distance_string")
    private String distanceString;

    private int distance;
}

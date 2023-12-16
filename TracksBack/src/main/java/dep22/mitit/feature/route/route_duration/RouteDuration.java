package dep22.mitit.feature.route.route_duration;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.route.Route;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@Table(name = "route_duration")
@NoArgsConstructor
@AllArgsConstructor
public class RouteDuration extends AbstractBaseEntity {

    @OneToOne
    @JsonIgnore
    private Route route;

    @JsonProperty("duration_string")
    private String durationString;

    private int duration;
 }

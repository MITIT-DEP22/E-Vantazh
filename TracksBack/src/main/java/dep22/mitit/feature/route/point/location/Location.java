package dep22.mitit.feature.route.point.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.route.point.Point;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "locations")
@NoArgsConstructor
@AllArgsConstructor
public class Location extends AbstractBaseEntity {

    @OneToOne
    @JsonIgnore
    private Point point;

    @JsonProperty("lng")
    private double longitude;

    @JsonProperty("ltd")
    private double latitude;
}

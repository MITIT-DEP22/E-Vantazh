package dep22.mitit.feature.route.point;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.route.Route;
import dep22.mitit.feature.route.point.address.Address;
import dep22.mitit.feature.route.point.location.Location;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "points")
@NoArgsConstructor
@AllArgsConstructor
public class Point extends AbstractBaseEntity {

    @ManyToOne
    @JsonIgnore
    private Route route;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("point_address")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    private Location location;

    @JsonProperty("formatted_address")
    private String formattedAddress;

    private int sequence;
}

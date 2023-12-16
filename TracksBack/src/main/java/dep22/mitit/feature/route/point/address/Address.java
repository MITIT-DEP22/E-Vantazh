package dep22.mitit.feature.route.point.address;

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
@Table(name = "addresses")
@NoArgsConstructor
@AllArgsConstructor
public class Address extends AbstractBaseEntity {

    @OneToOne
    @JsonIgnore
    private Point point;

    @JsonProperty("street_address")
    private String streetAddress;

    private String route;
    private String intersection;
    private String political;
    private String country;
    private String administrative_area_level_1;
    private String administrative_area_level_2;
    private String administrative_area_level_3;
    private String administrative_area_level_4;
    private String administrative_area_level_5;
    private String administrative_area_level_6;
    private String administrative_area_level_7;
    private String colloquial_area;
    private String locality;
    private String sublocality;
    private String neighborhood;
    private String premise;
    private String subpremise;
    private String plus_code;
    private String postal_code;
    private String natural_features;
    private String airport;
    private String park;
    private String point_of_interest;
}

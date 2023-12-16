package dep22.mitit.feature.driver;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.image.Image;
import dep22.mitit.feature.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "drivers")
public class Driver extends AbstractBaseEntity {

    @ManyToOne
    @JsonIgnore
    private User operator;

    private String name;
    private String surname;
    private String typeOfLicense;

    @OneToOne
    private Image image;
}

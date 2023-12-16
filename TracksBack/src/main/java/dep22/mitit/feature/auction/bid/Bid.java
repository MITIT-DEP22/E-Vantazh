package dep22.mitit.feature.auction.bid;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.auction.Auction;
import dep22.mitit.feature.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bids")
@Data
public class Bid extends AbstractBaseEntity {

    @OneToOne
    @JsonIgnore
    private Auction auction;

    @OneToOne
    private User operator;

    private double bidAmount;
}

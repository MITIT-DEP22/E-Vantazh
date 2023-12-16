package dep22.mitit.feature.auction;

import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.auction.bid.Bid;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auctions")
public class Auction extends AbstractBaseEntity {

    @OneToOne
    private Order order;

    private int rounds;
    private double currentPrice;

    // Operator
    @OneToOne
    private User winner;

    private String url;

    @OneToMany
    private List<Bid> bids = new ArrayList<>();

    private LocalDateTime startAt;
}

package dep22.mitit.feature.tender_proposal;

import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@Table(name = "tender_proposals")
@NoArgsConstructor
@AllArgsConstructor
public class TenderProposal extends AbstractBaseEntity {
    @Column(name = "alias")
    private String alias;
    @Column(name = "price")
    private Double price;
    @Column(name = "approved")
    private Boolean approved;
    @Column(name = "canceled")
    private Boolean canceled;

    @ManyToOne
    @JoinColumn(name = "operator_id", referencedColumnName = "id")
    private User operator;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;
}

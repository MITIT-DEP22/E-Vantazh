package dep22.mitit.feature.tender_comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@Table(name = "tender_comments")
@NoArgsConstructor
@AllArgsConstructor
public class TenderComment extends AbstractBaseEntity {

    @Column(name = "alias")
    private String alias;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnore
    private Order order;

    public TenderComment(UUID id, String alias, String content, User author, Order order) {
        super(id);
        this.alias = alias;
        this.content = content;
        this.author = author;
        this.order = order;
    }
}

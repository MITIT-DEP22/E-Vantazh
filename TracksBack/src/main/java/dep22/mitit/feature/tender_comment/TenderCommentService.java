package dep22.mitit.feature.tender_comment;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.order.OrderService;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TenderCommentService {

    private final TenderCommentRepository tenderCommentRepository;
    private final OrderService orderService;

    public TenderComment getTenderCommentById(UUID id) {
        return tenderCommentRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Comment with id %s was not found", id)
                ));
    }

    public List<TenderComment> getTenderCommentsByOrderId(UUID orderId) {
        return tenderCommentRepository.findByOrder_Id(orderId);
    }


    public TenderComment createTenderComment(TenderComment tenderComment, UUID orderId, User user) {
        Order order = orderService.getOrderById(orderId);

        tenderComment.setAlias(user.getId().toString());

        tenderComment.setAuthor(user);
        tenderComment.setOrder(order);

        return tenderCommentRepository.save(tenderComment);
    }

    public void deleteTenderCommentById(UUID id) {
        tenderCommentRepository.deleteById(id);
    }

    public TenderComment updateTenderCommentById(UUID id, TenderComment tenderComment) {
        TenderComment tenderCommentToUpdate = getTenderCommentById(id);

        tenderCommentToUpdate.setContent(tenderComment.getContent());

        return tenderCommentRepository.save(tenderCommentToUpdate);
    }
}

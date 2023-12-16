package dep22.mitit.feature.tender_proposal;

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
public class TenderProposalService {

    private final TenderProposalRepository tenderProposalRepository;
    private final OrderService orderService;

    public List<TenderProposal> getTenderProposalsByOrderId(UUID orderId) {
        return tenderProposalRepository.findByOrder_Id(orderId);
    }


    public TenderProposal getTenderProposalById(UUID id) {
        return tenderProposalRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Proposal with id %s was not found", id)
                ));
    }

    public TenderProposal createTenderProposal(TenderProposal tenderProposal, UUID orderId, User user) {
        Order order = orderService.getOrderById(orderId);

        tenderProposal.setAlias(user.getId().toString());
        tenderProposal.setOrder(order);
        tenderProposal.setOperator(user);

        return tenderProposalRepository.save(tenderProposal);
    }

    public TenderProposal updateTenderProposal(TenderProposal tenderProposal, UUID tenderProposalId) {
        TenderProposal tenderProposalToUpdate = getTenderProposalById(tenderProposalId);

        tenderProposalToUpdate.setPrice(tenderProposal.getPrice());
        tenderProposalToUpdate.setApproved(tenderProposal.getApproved());
        tenderProposalToUpdate.setCanceled(tenderProposal.getCanceled());

        return tenderProposalRepository.save(tenderProposalToUpdate);
    }

    public void deleteTenderProposal(UUID tenderProposalId) {
        TenderProposal tenderProposal = getTenderProposalById(tenderProposalId);
        tenderProposal.setCanceled(true);
        tenderProposalRepository.save(tenderProposal);
    }
}

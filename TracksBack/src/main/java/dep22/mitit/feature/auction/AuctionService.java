package dep22.mitit.feature.auction;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.order.Order;
import dep22.mitit.feature.order.OrderService;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final OrderService orderService;

    public boolean existsById(UUID auctionId) {
        return auctionRepository.existsById(auctionId);
    }

    public Auction getById(UUID auctionId) {
        return auctionRepository.findById(auctionId)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Auction with id %s was not found", auctionId)
                ));
    }

    public Auction getAuctionByOrderId(UUID orderId) {
        return auctionRepository.findByOrder_Id(orderId)
                .orElse(null);
    }

    public Auction createAuction(Auction auction, UUID orderId, User user) {
        Order order = orderService.getOrderById(orderId);
        auction.setOrder(order);

        // TODO: 26.11.23 Logic of auction creation

        return auctionRepository.save(auction);
    }

    public void deleteById(UUID id) {
        auctionRepository.deleteById(id);
    }
}

package dep22.mitit.feature.auction.bid;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.auction.Auction;
import dep22.mitit.feature.auction.AuctionService;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BidService {

    private final AuctionService auctionService;
    private final BidRepository bidRepository;

    public Bid createBid(Bid bid, UUID auctionId, User user) {
        Auction auction = auctionService.getById(auctionId);
        bid.setOperator(user);
        bid.setAuction(auction);

        return bidRepository.save(bid);
    }

    public List<Bid> getBidsByAuctionId(UUID auctionId) {
        return bidRepository.findByAuction_Id(auctionId);
    }

    public Bid getById(UUID id) {
        return bidRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Bid with id %s was not found", id)
                ));
    }

    public void deleteById(UUID id) {
        bidRepository.deleteById(id);
    }
}

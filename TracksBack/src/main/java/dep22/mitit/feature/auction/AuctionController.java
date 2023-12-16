package dep22.mitit.feature.auction;

import dep22.mitit.feature.auction.bid.Bid;
import dep22.mitit.feature.auction.bid.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AuctionController {

    private final BidService bidService;

    @MessageMapping("/auction")
    @SendTo("/topic/proposal")
    public Bid bid(Bid bid) {
        return bidService.createBid(bid, bid.getAuction().getId(), bid.getOperator());
    }
}

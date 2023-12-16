package dep22.mitit.feature.dia;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import dep22.mitit.feature.dia.dto.DiaBranchDto;
import dep22.mitit.feature.dia.dto.DiaDeepLinkDto;
import dep22.mitit.feature.dia.dto.DiaOfferDto;
import dep22.mitit.feature.dia.dto.DiaSessionDto;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Random;

@Service
public class DiaAuthService {

    @Value("${dia.url}")
    private String DIA_API_URL;

    @Value("${dia.acquirer_token}")
    private String ACQUIRER_TOKEN;

    @Value("${dia.auth_acquirer_token}")
    private String AUTH_ACQUIRER_TOKEN;

    public String getToken() throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(DIA_API_URL + "/v1/auth/acquirer/" + ACQUIRER_TOKEN)
                .addHeader("Authorization", "Basic " + AUTH_ACQUIRER_TOKEN)
                .get()
                .build();
        try (Response response = client.newCall(request).execute()) {

            if (response.body() != null) {
                String responseBody = response.body().string();
                Gson gson = new Gson();
                DiaSessionDto session = gson.fromJson(responseBody, DiaSessionDto.class);
                return session.token();
            }

            return null;
        }
    }

    public String createBranchAndGetId(String sessionToken) throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create("{\"name\": \"Team-2 MITIT\", \"location\": \"Kyiv\", \"street\": \"Henerala-Almazova\",\"house\": \"45/1\", \"deliveryTypes\": [\"api\"], \"offerRequestType\": \"dynamic\", \"scopes\": { \"sharing\": [\"passport\", \"internal-passport\", \"taxpayer-card\"] }}",
                mediaType);
        Request request = new Request.Builder()
                .url(DIA_API_URL + "/v2/acquirers/branch")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + sessionToken)
                .build();
        try (Response response = client.newCall(request).execute()) {

            if (response.body() != null) {
                String responseBody = response.body().string();
                ObjectMapper objectMapper = new ObjectMapper();
                DiaBranchDto branchDto = objectMapper.readValue(responseBody, DiaBranchDto.class);
                return branchDto.id();
            }
            return null;

        }
    }

    public String createOfferAndGetId(String sessionToken, String branchId, String returnLink) throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create("{\"name\": \"Авторизація\",\"returnLink\": \"" + returnLink + "\",\"scopes\": { \"sharing\": [\"passport\", \"internal-passport\", \"taxpayer-card\"] }}\r\n",
                mediaType);
        Request request = new Request.Builder()
                .url(DIA_API_URL + "/v1/acquirers/branch/" + branchId + "/offer")
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + sessionToken)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()) {

            if (response.body() != null) {
                String responseBody = response.body().string();
                ObjectMapper objectMapper = new ObjectMapper();
                DiaOfferDto offer = objectMapper.readValue(responseBody, DiaOfferDto.class);
                return offer.id();
            }
            return null;

        }
    }

    public String createOfferRequestAndGetDeeplink(String branchId, String offerId, String sessionToken, String returnLink) throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create("{\"offerId\": \"" + offerId + "\",\"returnLink\": \"" + returnLink + "\"requestId\": \""  + generateRequestId() + "\"}", mediaType);
        Request request = new Request.Builder()
                .url(DIA_API_URL + "/v2/acquirers/branch/" + branchId + "/offer-request/dynamic")
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {

            if (response.body() != null) {
                String responseBody = response.body().string();
                ObjectMapper objectMapper = new ObjectMapper();
                DiaDeepLinkDto deeplink = objectMapper.readValue(responseBody, DiaDeepLinkDto.class);
                return deeplink.deeplink();
            }
            return null;

        }
    }

    private String generateRequestId() throws Exception {
        byte[] array = new byte[32]; // mb 44 due to documentation
        new Random().nextBytes(array);
        return Arrays.toString(array);
    }
}

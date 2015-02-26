package com.edard.websocket;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

/**
 * Created by Park on 15. 2. 26..
 */
@Controller
public class WebsocketController {

    @Autowired
    private WebSocketUtil webSocketUtil;

    @MessageMapping("/read")
    public void ListenRead(String message, Message<?> inputMessage) throws Exception {
        JsonFactory factory = new JsonFactory();
        ObjectMapper objectMapper = new ObjectMapper(factory);

        Map messageMap = objectMapper.readValue(message, Map.class);

        String sessionId = messageMap.get("sessionId").toString();
        String getMessage = messageMap.get("message").toString();

        webSocketUtil.PushNotification(sessionId, "/topic/alert", getMessage);
    }
}

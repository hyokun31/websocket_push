package com.edard.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.IdTimestampMessageHeaderInitializer;
import org.springframework.stereotype.Component;

/**
 * Created by Park on 15. 2. 26..
 */
@Component
public class WebSocketUtil {

    private IdTimestampMessageHeaderInitializer idTimestampMessageHeaderInitializer;

    @Autowired
    private SimpMessagingTemplate template;

    public void PushNotification(String websocketKey, String destination,String message) {
        this.template.convertAndSendToUser(websocketKey, destination, message,  createHeaders(websocketKey));
    }

    private MessageHeaders createHeaders(String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);

        if (idTimestampMessageHeaderInitializer == null)
            idTimestampMessageHeaderInitializer = new IdTimestampMessageHeaderInitializer();

        idTimestampMessageHeaderInitializer.initHeaders(headerAccessor);

        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }
}


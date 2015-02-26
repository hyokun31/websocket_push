package com.edard.websocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * Created by Park on 15. 2. 26..
 */
public class WebSocketHandshakeInterceptor extends HttpSessionHandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   org.springframework.web.socket.WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

        ServletServerHttpRequest serverRequest = (ServletServerHttpRequest) request;
        HttpSession session = serverRequest.getServletRequest().getSession(false);

        try {
            String uri[] = request.getURI().toString().split("/");
            String websocketKey = uri[uri.length - 2];

            System.out.println(websocketKey);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}

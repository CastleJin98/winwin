package com.example.winwin.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object userNumber = request.getSession().getAttribute("userNumber");

        if(userNumber == null){
            HttpSession session = request.getSession();
            session.setAttribute("showLoginModal", true);
            session.setMaxInactiveInterval(1);
            response.sendRedirect("/main/main");
            return false;
        }

        return true;
    }
}

package net.balsoftware.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.balsoftware.bean.RRule;
import net.balsoftware.icalendar.properties.component.recurrence.RecurrenceRule;
import net.balsoftware.icalendar.properties.component.time.DateTimeStart;
import net.balsoftware.service.RRuleService;

/**
 * Servlet implementation
 */
//@WebServlet("/RRuleServlet")
public class RRuleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private RRuleService service = new RRuleService();
	
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

//    	System.out.println("in servlet:");
    	
    	String rruleContent = request.getParameter("rrule");
		int maxRecurrences = Integer.parseInt(request.getParameter("maxRecurrences"));
		String dtstartContent = request.getParameter("dtstart");
		DateTimeStart dateTimeStart = DateTimeStart.parse(dtstartContent);
		String ipAddress = request.getHeader("X-FORWARDED-FOR");
	       if (ipAddress == null || ipAddress.equals("null")) {  
	         ipAddress = request.getRemoteAddr();
	   }
	
		String recurrences;
		try {
			RecurrenceRule rrule = RecurrenceRule.parse(rruleContent);
			recurrences = rrule.getValue().streamRecurrences(dateTimeStart.getValue())
					.limit(maxRecurrences)
					.map(t -> t.toString())
					.collect(Collectors.joining(","));
		} catch (Exception e)
		{
			recurrences = "Invalid";
		}

		// Return response to client
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.print(recurrences);

		// Store request in database if ip is not null
		try
		{
			if ((ipAddress != null) && ! ipAddress.equals("null"))
			{
				RRule r = new RRule(rruleContent, dtstartContent, maxRecurrences, ipAddress);
				service.addRRule(r);
//				System.out.println("finished adding to DB");
			}
		} catch (Exception e)
		{
			// No database access - just display results
			System.out.println("no database access");
		}
	}
}
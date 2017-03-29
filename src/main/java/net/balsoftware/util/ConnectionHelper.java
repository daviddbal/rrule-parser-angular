package net.balsoftware.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class ConnectionHelper {
	// TODO - Use connection pool
	private static Connection connection;
    
	public static Connection getConnection() throws SQLException
	{
		if (connection != null && ! connection.isClosed())
		{
			return connection;
		} else
		{
			try {
				Class.forName("com.mysql.jdbc.Driver");
				
//				String dbName = System.getProperty("RDS_DB_NAME");
//				String userName = System.getProperty("RDS_USERNAME");
//				String password = System.getProperty("RDS_PASSWORD");
//				String hostname = System.getProperty("RDS_HOSTNAME");
//				String port = System.getProperty("RDS_PORT");
//				String jdbcUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName + "?user=" + userName + "&password=" + password;
//				connection = DriverManager.getConnection(jdbcUrl);
				
            	ResourceBundle bundle = ResourceBundle.getBundle("net/balsoftware/util/db");
                String url = bundle.getString("url");
                String user = bundle.getString("user");
                String password = bundle.getString("password");
//	            String url = "jdbc:mysql://localhost:3306/rrule";
//	            String user = "root";
//	            String password = "skywalker";
				connection =  DriverManager.getConnection(url, user, password);
	//			return DriverManager.getConnection(instance.url);
			} catch (SQLException e) {
				throw e;
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			return connection;
		}
	}

	public static void close(Connection c) {
		try {
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}

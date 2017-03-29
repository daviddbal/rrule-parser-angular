package net.balsoftware.util;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ResourceBundle;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;

public class ConnectionHelper {
	// TODO - Use connection pool
//	private static Connection connection;
	private static DataSource datasource = new DataSource();
	
	static
	{
        PoolProperties p = new PoolProperties();
    	ResourceBundle bundle = ResourceBundle.getBundle("net/balsoftware/util/db");
        String url = bundle.getString("url");
        String user = bundle.getString("user");
        String password = bundle.getString("password");
        p.setUrl(url);
        p.setDriverClassName("com.mysql.jdbc.Driver");
        p.setUsername(user);
        p.setPassword(password);
        p.setJmxEnabled(true);
        p.setTestWhileIdle(false);
        p.setTestOnBorrow(true);
        p.setValidationQuery("SELECT 1");
        p.setTestOnReturn(false);
        p.setValidationInterval(30000);
        p.setTimeBetweenEvictionRunsMillis(30000);
        p.setMaxActive(100);
        p.setInitialSize(10);
        p.setMaxWait(10000);
        p.setRemoveAbandonedTimeout(60);
        p.setMinEvictableIdleTimeMillis(30000);
        p.setMinIdle(10);
        p.setLogAbandoned(true);
        p.setRemoveAbandoned(true);
        p.setJdbcInterceptors(
          "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
          "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");
        datasource.setPoolProperties(p);
	}
    
	public static Connection getConnection() throws SQLException
	{
		return datasource.getConnection();
	}
	
	
//	public static Connection getConnectionOld() throws SQLException
//	{
//		if (connection != null && ! connection.isClosed())
//		{
//			return connection;
//		} else
//		{
//			try {
//				Class.forName("com.mysql.jdbc.Driver");
//				
////				String dbName = System.getProperty("RDS_DB_NAME");
////				String userName = System.getProperty("RDS_USERNAME");
////				String password = System.getProperty("RDS_PASSWORD");
////				String hostname = System.getProperty("RDS_HOSTNAME");
////				String port = System.getProperty("RDS_PORT");
////				String jdbcUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName + "?user=" + userName + "&password=" + password;
////				connection = DriverManager.getConnection(jdbcUrl);
//				
//            	ResourceBundle bundle = ResourceBundle.getBundle("net/balsoftware/util/db");
//                String url = bundle.getString("url");
//                String user = bundle.getString("user");
//                String password = bundle.getString("password");
////	            String url = "jdbc:mysql://localhost:3306/rrule";
////	            String user = "root";
////	            String password = "skywalker";
//				connection =  DriverManager.getConnection(url, user, password);
//	//			return DriverManager.getConnection(instance.url);
//			} catch (SQLException e) {
//				throw e;
//			} catch (ClassNotFoundException e) {
//				e.printStackTrace();
//			}
//			return connection;
//		}
//	}
//
//	public static void close(Connection c) {
//		try {
//			connection.close();
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
//	}
	
	public static void close(Connection c)
	{
		// no opp - connection pool handles it
	}
}

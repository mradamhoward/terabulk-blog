export class AppConstants {
  //public static API_BASE_URL = "https://tb-3r6yem7jnq-uc.a.run.app/"
 // public static API_BASE_URL =  "https://thirdtimesthecharm-3r6yem7jnq-uc.a.run.app/"

 public static API_BASE_URL = "http://localhost:8089/";
  public static API_BASE_URL_CHAT = "http://localhost:8092/";
  //public static WP_URL = "http://localhost/wordpress/wp-json/";
  public static WP_URL = "https://terabulk-blog-83c965.ingress-baronn.ewp.live/wp-json/";
  //public static API_BASE_URL =  "https://tb3-ubuyjnwxla-nw.a.run.app/"
  //public static API_BASE_URL = "https://spring-boot-security-jwt-auth-mongodb-ubuyjnwxla-ew.a.run.app/"
  private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
  private static REDIRECT_URL = "?redirect_uri=http://localhost:8081/login";
  public static API_URL = AppConstants.API_BASE_URL + "api/";
  public static AUTH_API = AppConstants.API_URL + "auth/";
  public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
  public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
  public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
}

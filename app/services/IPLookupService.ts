import { IPInfo } from "../types/ip-info";
import { isValidIP } from "../utils/ipValidation";

// Singleton class for IP lookup operations
class IPLookupService {
  private static instance: IPLookupService;
  private userIP: string = "";

  private constructor() {}

  // Lazy loading singleton pattern
  public static getInstance(): IPLookupService {
    if (!IPLookupService.instance) {
      IPLookupService.instance = new IPLookupService();
    }
    return IPLookupService.instance;
  }

  // Get the user's IP without fetching details
  public async getUserIP(): Promise<string | null> {
    try {
      // Return cached IP if available
      if (this.userIP) {
        return this.userIP;
      }

      const response = await fetch("https://api.ipify.org?format=text");

      if (!response.ok) {
        return null;
      }

      const userIPAddress = await response.text();
      this.userIP = userIPAddress; // Cache the IP
      return userIPAddress;
    } catch (err) {
      // Silently fail - we don't want to show errors on initial load
      console.error("Could not get user IP:", err);
      return null;
    }
  }

  // Fetch IP data from the API
  public async fetchIPData(ip?: string): Promise<IPInfo | null> {
    if (!ip) return null;

    try {
      // Build the URL with the IP
      const url = `https://api.ipquery.io/${ip}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Check if the response is valid JSON before parsing
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        throw new Error(
          "The API returned an invalid response. This service may require an API key or is currently unavailable."
        );
      }

      return data as IPInfo;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Failed to fetch IP data: ${err.message}`);
      }
      throw err;
    }
  }

  // Validate IP and fetch data
  public async lookupIP(ip: string): Promise<IPInfo | null> {
    if (!ip.trim()) {
      throw new Error("Please enter an IP address");
    }

    // Validate IP address before making the API call
    if (!isValidIP(ip)) {
      throw new Error("Please enter a valid IP address");
    }

    return await this.fetchIPData(ip);
  }

  // Fetch data for the user's IP
  public async lookupMyIP(): Promise<{ ip: string; data: IPInfo | null }> {
    const userIP = await this.getUserIP();
    
    if (!userIP) {
      throw new Error("Could not determine your IP address");
    }
    
    const data = await this.fetchIPData(userIP);
    return { ip: userIP, data };
  }
}

export default IPLookupService.getInstance();
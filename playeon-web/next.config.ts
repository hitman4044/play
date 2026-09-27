import path from "node:path";
import os from "node:os";
import type { NextConfig } from "next";

function getLocalIps(): string[] {
  const ips: string[] = ["172.202.106.33", "172.202.106.33", "music.deltastack.fun", "music.deltastack.fun"];
  try {
    const ifaces = os.networkInterfaces();
    for (const name of Object.keys(ifaces)) {
      for (const net of ifaces[name] ?? []) {
        if (net.family === "IPv4" && !net.internal) {
          ips.push(net.address);
        }
      }
    }
  } catch {}
  return ips;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalIps(),
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;

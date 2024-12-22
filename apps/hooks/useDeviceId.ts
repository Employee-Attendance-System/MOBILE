import { useEffect, useState } from "react";
import * as Device from "expo-device";

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const id = Device.osBuildId || null;
        setDeviceId(id);
      } catch (error) {
        console.error("Error getting Device ID: ", error);
        setDeviceId("Error");
      }
    };

    fetchDeviceId();
  }, []);

  return deviceId;
};

export default useDeviceId;

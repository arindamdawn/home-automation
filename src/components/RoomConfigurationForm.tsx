import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MinusCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Sensor {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

interface Device {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Room {
  id: string;
  name: string;
  type: string;
  sensors: Sensor[];
  devices: Device[];
}

interface RoomConfigurationFormProps {
  rooms: Room[];
  onRoomsChange: (rooms: Room[]) => void;
  onTotalPriceChange?: (price: number) => void;
}

const roomTypes = [
  { value: "living", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "office", label: "Home Office" },
  { value: "dining", label: "Dining Room" },
  { value: "other", label: "Other" },
];

const defaultSensors: Sensor[] = [
  {
    id: "motion",
    name: "Motion Sensor",
    description:
      "The PIR Motion Sensor Detector Module allows you to sense motion.",
    price: 1200,
    selected: false,
  },
  {
    id: "human-presence",
    name: "Human Presence Detection",
    description:
      "Want to detect if the room is occupied or if someone is moving in the room?",
    price: 2500,
    selected: false,
  },
  {
    id: "light-intensity",
    name: "Light Intensity",
    description:
      "Want to detect if the room is dark or bright using a light intensity sensor.",
    price: 800,
    selected: false,
  },
  {
    id: "air-temp-humidity",
    name: "Air Pressure, Temperature, Humidity",
    description:
      "Want to detect Air Pressure, Temperature, and Humidity in this Room?",
    price: 1500,
    selected: false,
  },
  {
    id: "local-communication",
    name: "Local Communication",
    description:
      "Local Communication and auto-discoverable in home assistant via ESP-Now Protocol",
    price: 1000,
    selected: false,
  },
  {
    id: "air-quality",
    name: "Air Quality Index",
    description: "Air Quality Index for home",
    price: 2200,
    selected: false,
  },
];

const defaultDevices: Device[] = [
  {
    id: "led-dimmer",
    name: "12 Watt LED COB Dimmer",
    description: "Dimmable LED light controller for ambient lighting",
    price: 1800,
    quantity: 0,
  },
  {
    id: "switch-module",
    name: "4 Switch Module",
    description: "Control up to 4 different electrical appliances",
    price: 2500,
    quantity: 0,
  },
];

const RoomConfigurationForm: React.FC<RoomConfigurationFormProps> = ({
  rooms = [],
  onRoomsChange,
  onTotalPriceChange = () => {},
}) => {
  const [localRooms, setLocalRooms] = useState<Room[]>(
    rooms.length > 0 ? rooms : [],
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Initialize rooms with default sensors and devices if empty
    if (rooms.length > 0 && localRooms.length === 0) {
      const initializedRooms = rooms.map((room, index) => ({
        ...room,
        id: room.id || `room-${index}`,
        name: room.name || `Room ${index + 1}`,
        type: room.type || "living",
        sensors: room.sensors || JSON.parse(JSON.stringify(defaultSensors)),
        devices: room.devices || JSON.parse(JSON.stringify(defaultDevices)),
      }));
      setLocalRooms(initializedRooms);
    }
  }, [rooms]);

  useEffect(() => {
    // Calculate total price whenever rooms change
    calculateTotalPrice();
    // Notify parent component of room changes
    if (typeof onRoomsChange === "function") {
      onRoomsChange(localRooms);
    }
  }, [localRooms, onRoomsChange]);

  const calculateTotalPrice = () => {
    const price = localRooms.reduce((total, room) => {
      const sensorPrice = room.sensors.reduce(
        (sum, sensor) => sum + (sensor.selected ? sensor.price : 0),
        0,
      );
      const devicePrice = room.devices.reduce(
        (sum, device) => sum + device.price * device.quantity,
        0,
      );
      return total + sensorPrice + devicePrice;
    }, 0);

    setTotalPrice(price);
    onTotalPriceChange(price);
  };

  const handleRoomNameChange = (roomId: string, name: string) => {
    setLocalRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === roomId ? { ...room, name } : room)),
    );
  };

  const handleRoomTypeChange = (roomId: string, type: string) => {
    setLocalRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === roomId ? { ...room, type } : room)),
    );
  };

  const handleSensorToggle = (
    roomId: string,
    sensorId: string,
    checked: boolean,
  ) => {
    setLocalRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              sensors: room.sensors.map((sensor) =>
                sensor.id === sensorId
                  ? { ...sensor, selected: checked }
                  : sensor,
              ),
            }
          : room,
      ),
    );
  };

  const handleDeviceQuantityChange = (
    roomId: string,
    deviceId: string,
    change: number,
  ) => {
    setLocalRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              devices: room.devices.map((device) =>
                device.id === deviceId
                  ? {
                      ...device,
                      quantity: Math.max(0, device.quantity + change),
                    }
                  : device,
              ),
            }
          : room,
      ),
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateRoomPrice = (room: Room) => {
    const sensorPrice = room.sensors.reduce(
      (sum, sensor) => sum + (sensor.selected ? sensor.price : 0),
      0,
    );
    const devicePrice = room.devices.reduce(
      (sum, device) => sum + device.price * device.quantity,
      0,
    );
    return sensorPrice + devicePrice;
  };

  return (
    <div className="space-y-8 bg-background">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Room Configuration</h2>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Total: {formatPrice(totalPrice)}
        </Badge>
      </div>

      {localRooms.map((room, index) => (
        <Card key={room.id} className="shadow-md">
          <CardHeader className="bg-muted/30">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {room.name || "Unnamed Room"}: {roomTypes.find(t => t.value === room.type)?.label || room.type}
              </CardTitle>
              <Badge variant="outline" className="px-3 py-1">
                {formatPrice(calculateRoomPrice(room))}
              </Badge>
            </div>
            <CardDescription>
              Configure sensors and devices for this room
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor={`room-name-${room.id}`}>Room Name</Label>
                <Input
                  id={`room-name-${room.id}`}
                  value={room.name}
                  onChange={(e) =>
                    handleRoomNameChange(room.id, e.target.value)
                  }
                  placeholder="Enter room name"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor={`room-type-${room.id}`}>Room Type</Label>
                <Select
                  value={room.type}
                  onValueChange={(value) =>
                    handleRoomTypeChange(room.id, value)
                  }
                >
                  <SelectTrigger id={`room-type-${room.id}`}>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold mb-4">Sensors</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {room.sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className={`p-4 rounded-lg border ${sensor.selected ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`sensor-${room.id}-${sensor.id}`}
                        checked={sensor.selected}
                        onCheckedChange={(checked) =>
                          handleSensorToggle(
                            room.id,
                            sensor.id,
                            checked as boolean,
                          )
                        }
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-center">
                          <Label
                            htmlFor={`sensor-${room.id}-${sensor.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {sensor.name}
                          </Label>
                          <span className="text-sm font-semibold">
                            {formatPrice(sensor.price)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {sensor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold mb-4">Devices</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {room.devices.map((device) => (
                  <div
                    key={device.id}
                    className={`p-4 rounded-lg border ${device.quantity > 0 ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{device.name}</h4>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-60">{device.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(device.price)} each
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleDeviceQuantityChange(room.id, device.id, -1)
                            }
                            disabled={device.quantity === 0}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {device.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleDeviceQuantityChange(room.id, device.id, 1)
                            }
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(device.price * device.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {localRooms.length === 0 && (
        <Card className="shadow-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No rooms to configure. Please add rooms in the previous step.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomConfigurationForm;

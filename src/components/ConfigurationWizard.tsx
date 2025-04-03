import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  FileText,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import RoomConfigurationForm from "./RoomConfigurationForm";
import SummaryView from "./SummaryView";

// Define types for our configuration data
interface BasicInfo {
  propertyType: "existing" | "new";
  roomCount: number;
  name?: string;
  email?: string;
  phone?: string;
}

export interface SensorOption {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface DeviceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface RoomConfig {
  id: string;
  name: string;
  type: string;
  sensors: SensorOption[];
  devices: DeviceOption[];
}

interface ConfigurationData {
  basicInfo: BasicInfo;
  rooms: RoomConfig[];
}

const ConfigurationWizard: React.FC = () => {
  // Define the steps of the wizard
  const steps = ["Basic Information", "Room Details", "Summary"];

  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState(0);

  // State for storing the configuration data
  const [configData, setConfigData] = useState<ConfigurationData>({
    basicInfo: {
      propertyType: "existing",
      roomCount: 1,
    },
    rooms: [],
  });

  // Default sensor options
  const defaultSensors: SensorOption[] = [
    {
      id: "motion",
      name: "Motion Sensor",
      description:
        "The PIR Motion Sensor Detector Module allows you to sense motion.",
      price: 1200,
      selected: false,
    },
    {
      id: "human",
      name: "Human Presence Detection",
      description:
        "Want to detect if the room is occupied or if someone is moving in the room?",
      price: 2500,
      selected: false,
    },
    {
      id: "light",
      name: "Light Intensity",
      description:
        "Want to detect if the room is dark or bright using a light intensity sensor.",
      price: 800,
      selected: false,
    },
    {
      id: "environment",
      name: "Air Pressure, Temperature, Humidity",
      description:
        "Want to detect Air Pressure, Temperature, and Humidity in this Room?",
      price: 1500,
      selected: false,
    },
    {
      id: "communication",
      name: "Local Communication",
      description:
        "Local Communication and auto-discoverable in home assistant via ESP-Now Protocol",
      price: 1000,
      selected: false,
    },
    {
      id: "air",
      name: "Air Quality Index",
      description: "Air Quality Index for home",
      price: 2200,
      selected: false,
    },
  ];

  // Default device options
  const defaultDevices: DeviceOption[] = [
    {
      id: "led",
      name: "12 Watt LED COB Dimmer",
      description: "Dimmable LED light controller for ambient lighting",
      price: 1800,
      quantity: 0,
    },
    {
      id: "switch",
      name: "4 Switch Module",
      description: "Control up to 4 different electrical appliances or lights",
      price: 2500,
      quantity: 0,
    },
  ];

  // Initialize rooms when room count changes
  React.useEffect(() => {
    const { roomCount } = configData.basicInfo;
    const currentRoomCount = configData.rooms.length;

    if (roomCount > currentRoomCount) {
      // Add new rooms
      const newRooms = Array.from(
        { length: roomCount - currentRoomCount },
        (_, index) => ({
          id: `room-${currentRoomCount + index}-${Date.now()}`,
          name: `Room ${currentRoomCount + index + 1}`,
          type: "bedroom",
          sensors: JSON.parse(JSON.stringify(defaultSensors)),
          devices: JSON.parse(JSON.stringify(defaultDevices)),
        }),
      );

      setConfigData((prev) => ({
        ...prev,
        rooms: [...prev.rooms, ...newRooms],
      }));
    } else if (roomCount < currentRoomCount) {
      // Remove excess rooms
      setConfigData((prev) => ({
        ...prev,
        rooms: prev.rooms.slice(0, roomCount),
      }));
    }
  }, [configData.basicInfo.roomCount]);

  // Handle basic info changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfigData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
    }));
  };

  // Handle property type selection
  const handlePropertyTypeChange = (value: "existing" | "new") => {
    setConfigData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        propertyType: value,
      },
    }));
  };

  // Handle room count selection
  const handleRoomCountChange = (value: string) => {
    setConfigData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        roomCount: parseInt(value),
      },
    }));
  };

  // Handle room configuration updates
  const handleRoomUpdate = (updatedRoom: RoomConfig) => {
    setConfigData((prev) => ({
      ...prev,
      rooms: prev.rooms.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room,
      ),
    }));
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return configData.rooms.reduce((total, room) => {
      const sensorCost = room.sensors.reduce(
        (sum, sensor) => sum + (sensor.selected ? sensor.price : 0),
        0,
      );

      const deviceCost = room.devices.reduce(
        (sum, device) => sum + device.quantity * device.price,
        0,
      );

      return total + sensorCost + deviceCost;
    }, 0);
  };

  // Navigate to next step
  const isRoomConfigValid = () => {
    if (currentStep === 1) {
      return configData.rooms.every(room => 
        room.name.trim() !== "" && 
        (room.sensors.some(sensor => sensor.selected) || 
        room.devices.some(device => device.quantity > 0))
      );
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!isRoomConfigValid()) {
        alert("Please configure at least one sensor or device for each room");
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission with personal details
  const handleSubmit = (personalDetails: { name: string; email: string; phone: string }) => {
    const finalConfig = {
      ...configData,
      basicInfo: {
        ...configData.basicInfo,
        ...personalDetails
      }
    };
    // Here you would typically send the data to your backend
    console.log("Configuration submitted:", finalConfig);
    alert("Your configuration has been submitted successfully!");
    // Reset the form after successful submission
    setCurrentStep(0);
    setConfigData({
      basicInfo: {
        propertyType: "existing",
        roomCount: 1,
      },
      rooms: [],
    });
    // Reset the form after successful submission
    setCurrentStep(0);
    setConfigData({
      basicInfo: {
        propertyType: "existing",
        roomCount: 1,
      },
      rooms: [],
    });
  };

  // Check if basic info form is valid
  const isBasicInfoValid = () => {
    return true; // No validation needed for initial step anymore
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 bg-white p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <Label>Property Type</Label>
                <RadioGroup
                  value={configData.basicInfo.propertyType}
                  onValueChange={handlePropertyTypeChange}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing">Existing Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">New Construction</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="roomCount">Number of Rooms</Label>
                <Select
                  value={configData.basicInfo.roomCount.toString()}
                  onValueChange={handleRoomCountChange}
                >
                  <SelectTrigger id="roomCount" className="w-full">
                    <SelectValue placeholder="Select number of rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Room" : "Rooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 bg-white p-6 rounded-lg">
            {configData.rooms.map((room, index) => (
              <RoomConfigurationForm
                key={room.id}
                rooms={[room]}
                onRoomsChange={(updatedRooms) => {
                  if (updatedRooms.length > 0) {
                    handleRoomUpdate(updatedRooms[0]);
                  }
                }}
              />
            ))}
          </div>
        );

      case 2:
        return (
          <SummaryView
            basicInfo={{
              name: configData.basicInfo.name,
              email: configData.basicInfo.email,
              phone: configData.basicInfo.phone,
              propertyType:
                configData.basicInfo.propertyType === "existing"
                  ? "Existing Home"
                  : "New Construction",
              numberOfRooms: configData.basicInfo.roomCount,
            }}
            roomConfigurations={configData.rooms}
            onBack={handleBack}
            onSubmit={handleSubmit}
            onSave={() => console.log("Save configuration")}
          />
        );

      default:
        return null;
    }
  };

  // Step icons
  const stepIcons = [
    <Home key="home" className="h-5 w-5" />,
    <Settings key="settings" className="h-5 w-5" />,
    <FileText key="summary" className="h-5 w-5" />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-8 flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">
            Home Automation Configuration Wizard
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Customize your smart home setup in just a few steps
          </CardDescription>
        </CardHeader>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${index <= currentStep ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300 text-gray-300"}`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepIcons[index]
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${index <= currentStep ? "text-indigo-600" : "text-gray-500"}`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2 mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <CardContent>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </CardContent>

        <CardFooter className="flex justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={currentStep === 0 && !isBasicInfoValid()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => handleSubmit({ name: "", email: "", phone: "" })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
            >
              Submit Order <Send className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="mt-6 text-center text-gray-600 text-sm">
        <p>All prices are in Indian Rupees (INR) and include GST</p>
      </div>
    </div>
  );
};

export default ConfigurationWizard;

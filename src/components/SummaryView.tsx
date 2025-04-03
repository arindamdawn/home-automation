import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Download, Send } from "lucide-react";

interface SensorItem {
  name: string;
  price: number;
  selected: boolean;
  description?: string;
}

interface DeviceItem {
  name: string;
  price: number;
  quantity: number;
}

interface RoomConfiguration {
  id: string;
  name: string;
  type: string;
  sensors: SensorItem[];
  devices: DeviceItem[];
}

interface SummaryViewProps {
  basicInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    propertyType?: string;
    numberOfRooms?: number;
  };
  roomConfigurations?: RoomConfiguration[];
  onBack?: () => void;
  onSubmit?: (updatedBasicInfo: { name: string; email: string; phone: string }) => void;
  onSave?: () => void;
  onRoomsChange?: (rooms: RoomConfiguration[]) => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({
  basicInfo = {},
  roomConfigurations = [],
  onBack = () => {},
  onSubmit = () => {},
  onSave = () => {},
}) => {
  // Add form state for personal details
  const [personalDetails, setPersonalDetails] = React.useState({
    name: basicInfo.name || "",
    email: basicInfo.email || "",
    phone: basicInfo.phone || ""
  });

  // Add error state
  const [hasError, setHasError] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({
    name: false,
    email: false,
    phone: false
  });

  React.useEffect(() => {
    // Validate required data
    if (roomConfigurations.length === 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [roomConfigurations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    setFormErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const validateForm = () => {
    const errors = {
      name: !personalDetails.name.trim(),
      email: !personalDetails.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email),
      phone: !personalDetails.phone.trim() || !/^[0-9]{10}$/.test(personalDetails.phone)
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(personalDetails);
    }
  };

  if (hasError) {
    return (
      <motion.div
        className="w-full max-w-5xl mx-auto bg-background p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-destructive">
              Configuration Error
            </CardTitle>
            <CardDescription className="text-lg">
              Unable to display summary due to missing configuration data.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-start pt-6">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft size={16} />
              Back to Configuration
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // Calculate subtotals and total
  const calculateRoomSubtotal = (room: RoomConfiguration) => {
    const sensorTotal = room.sensors
      .filter((sensor) => sensor.selected)
      .reduce((sum, sensor) => sum + sensor.price, 0);

    const deviceTotal = room.devices.reduce(
      (sum, device) => sum + device.price * device.quantity,
      0,
    );

    return sensorTotal + deviceTotal;
  };

  const roomSubtotals = roomConfigurations.map((room) => ({
    id: room.id,
    name: room.name,
    subtotal: calculateRoomSubtotal(room),
  }));

  const totalCost = roomSubtotals.reduce((sum, room) => sum + room.subtotal, 0);

  // Format currency in INR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto bg-background p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Configuration Summary
          </CardTitle>
          <CardDescription className="text-lg">
            Review your smart home automation setup before finalizing your
            order.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Property Type</p>
                <p className="font-medium">{basicInfo.propertyType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Number of Rooms</p>
                <p className="font-medium">{basicInfo.numberOfRooms}</p>
              </div>
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Personal Details</h3>
            <div className="grid gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={personalDetails.name}
                  onChange={handleInputChange}
                  className={`w-full mt-1 px-3 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <p className="text-sm text-red-500 mt-1">Please enter your name</p>}
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={personalDetails.email}
                  onChange={handleInputChange}
                  className={`w-full mt-1 px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>}
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={personalDetails.phone}
                  onChange={handleInputChange}
                  className={`w-full mt-1 px-3 py-2 border rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your 10-digit phone number"
                />
                {formErrors.phone && <p className="text-sm text-red-500 mt-1">Please enter a valid 10-digit phone number</p>}
              </div>
            </div>
          </div>

          {/* Room Configurations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Room Configurations</h3>

            {roomConfigurations.map((room, index) => (
              <Card key={room.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription>{room.type}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal</p>
                      <p className="font-semibold text-lg">
                        {formatCurrency(roomSubtotals[index].subtotal)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Selected Sensors</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sensor</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {room.sensors
                          .filter((sensor) => sensor.selected)
                          .map((sensor, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{sensor.name}</p>
                                  {sensor.description && (
                                    <p className="text-sm text-muted-foreground">
                                      {sensor.description}
                                    </p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(sensor.price)}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>

                  <Separator />

                  <div className="p-4">
                    <h4 className="font-medium mb-2">Selected Devices</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {room.devices.map((device, i) => (
                          <TableRow key={i}>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.quantity}</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(device.price)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(device.price * device.quantity)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Subtotal</h3>
                  <p className="font-medium">{formatCurrency(totalCost)}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">GST (18%)</h3>
                  <p className="font-medium">
                    {formatCurrency(totalCost * 0.18)}
                  </p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">Total</h3>
                  <p className="text-xl font-bold">
                    {formatCurrency(totalCost * 1.18)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>

        <CardFooter className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft size={16} />
            Back to Room Details
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onSave} className="gap-2">
              <Download size={16} />
              Save Configuration
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Send size={16} />
              Submit Order
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SummaryView;

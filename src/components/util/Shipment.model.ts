export interface Shipment {
  id: string;
  recipientName: string;
  recipientAddress: string;
  weight: number;
  shipmentType: string;
  deliveryType: string;
  trackingNumber: string;
  shipmentStatus: string;
}

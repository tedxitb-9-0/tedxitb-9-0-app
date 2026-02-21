import QRCode from "qrcode";

/**
 * Generates a unique attendance QR code string for an order
 * Format: TEDX-PE-{orderId}
 */
export function generateAttendanceQRString(orderId: string): string {
  return `TEDX-PE-${orderId}`;
}

/**
 * Generates a QR code image from a QR string
 * Returns a data URL that can be used as an image src
 */
export async function generateQRCodeImage(qrString: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(qrString, {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
    return dataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

/**
 * Generates a QR code as a Canvas element (for client-side rendering)
 */
export async function generateQRCodeCanvas(
  qrString: string,
  canvasElement: HTMLCanvasElement,
): Promise<void> {
  try {
    await QRCode.toCanvas(canvasElement, qrString, {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.error("Error generating QR code on canvas:", error);
    throw new Error("Failed to generate QR code");
  }
}

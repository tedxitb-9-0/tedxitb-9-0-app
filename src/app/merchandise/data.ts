// src/app/merchandise/data.ts

export interface MerchItem {
    id: string;
    name: string;
    price: string;
    image: string;
    category: "bundle" | "collection";
    link: string; 
  }
  
//contoh ae
  export const merchBundles: MerchItem[] = [
    { id: "b1", name: "Starter Pack", price: "IDR 150.000", image: "/merch/placeholder.png", category: "bundle", link: "#" },
    { id: "b2", name: "Joy Bundle", price: "IDR 200.000", image: "/merch/placeholder.png", category: "bundle", link: "#" },
    { id: "b3", name: "Bundle", price: "IDR 350.000", image: "/merch/placeholder.png", category: "bundle", link: "#" },
    { id: "b4", name: "Bundle", price: "IDR 120.000", image: "/merch/placeholder.png", category: "bundle", link: "#" },
  ];
  
  export const merchCollection: MerchItem[] = [
    { id: "c1", name: "T-Shirt A", price: "IDR 100.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c2", name: "Tote Bag", price: "IDR 85.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c3", name: "Sticker Pack", price: "IDR 25.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c4", name: "Keychain", price: "IDR 30.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c5", name: "Lanyard", price: "IDR 45.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c6", name: "Notebook", price: "IDR 60.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c7", name: "Notebook", price: "IDR 60.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
    { id: "c8", name: "Notebook", price: "IDR 60.000", image: "/merch/placeholder.png", category: "collection", link: "#" },
  ];

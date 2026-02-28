import Image from "next/image";

interface MerchandiseCardProps {
  type: "bundle" | "regular";
  name: string;
  price: string;
  imageUrl?: string;
}

const MerchandiseCard = ({
  type,
  name,
  price,
  imageUrl,
}: MerchandiseCardProps) => {
  // Use the colors defined in globals.css: text-blue for bundles, text-pink for regular
  const textColorClass = type === "bundle" ? "text-blue" : "text-pink";

  return (
    <div className="flex w-72 flex-col rounded-2xl bg-white p-4 shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square w-64 overflow-hidden rounded-xl border-2 border-black bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            draggable={false}
          />
        ) : (
          // Black placeholder
          <div className="h-full w-full bg-black" />
        )}
      </div>

      {/* Text Content */}
      <div className="mt-6 flex flex-col text-left">
        <h3
          className={`font-titan truncate text-xl font-bold ${textColorClass}`}
          title={name}
        >
          {name}
        </h3>
        <p className="text-md text-gray-600">{price}</p>
      </div>
    </div>
  );
};

export default MerchandiseCard;

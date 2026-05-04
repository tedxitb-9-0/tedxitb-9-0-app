export default function MainEventBuyTicketsLink() {
  return (
    <div className="mx-auto my-8 w-fit max-w-full overflow-x-auto overflow-y-hidden rounded-2xl border border-red-100 bg-white/95 p-8 text-center shadow-2xl backdrop-blur">
      <h2 className="mb-3 text-4xl font-black tracking-tight text-[#E62B1E] md:text-5xl">
        SOLD OUT
      </h2>
      <p className="text-lg font-bold text-gray-800 md:text-xl">
        All main event tickets have been fully claimed.
      </p>
      <p className="mt-2 font-medium text-gray-600">
        Thank you for your overwhelming enthusiasm!
      </p>
    </div>
  );
}

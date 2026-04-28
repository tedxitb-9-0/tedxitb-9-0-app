"use client";

export default function MerchandiseGrid() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
            <div className="mx-2 mx-auto w-full max-w-2xl rounded-2xl border-2 border-red-200 bg-red-50 px-2 py-4 text-center shadow-sm sm:px-2 sm:py-5 md:px-8 md:py-6">
                <h2 className="font-titan text-xl font-bold text-red-600 sm:text-2xl md:text-3xl">
                    Merchandise Sales Are Closed
                </h2>
                <p className="mt-2 text-xs text-red-700/80 sm:text-sm md:text-base">
                    Thank you for your interest! Merchandise purchases are no
                    longer available.
                </p>
            </div>
        </section>
    );
}

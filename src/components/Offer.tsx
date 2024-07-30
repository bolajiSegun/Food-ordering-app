import Image from 'next/image';
import Countdown from './Countdown';

const Offer = () => {
  return (
    <div className="flex flex-col min-h-min h-full bg-black text-white sm:flex-row md:items-center md:bg-[url('/offerBg.png')]">
      {/* TEXT CONTAINER */}
      <div className="flex flex-col items-center justify-center gap-6 text-center flex-1 p-4 py-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-[20ch]">
          SPICY ARRABBIATA & BACON DELUXE
        </h2>
        <p className="max-w-[50ch] lg:text-lg">
          Indulge in smoky goodness with a flame-grilled beef patty, topped with
          crispy bacon, melted cheddar cheese.
        </p>
        <div className="text-4xl lg:text-5xl text-yellow-500 font-extrabold">
          <Countdown />
        </div>
        <button className="bg-green-500 p-2 rounded-md text-xl font-bold">
          Order Now
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 relative h-full w-full aspect-square">
        <Image
          src={'/offerProduct.png'}
          alt=""
          className="object-contain"
          fill
          sizes="100%"
        />{' '}
      </div>
    </div>
  );
};
export default Offer;

import { AddressElement } from '@stripe/react-stripe-js';

const AdressForm = () => {
  return (
    <form>
      <p className="my-2">Shipping Address Information</p>
      <AddressElement
        options={{ mode: 'shipping', allowedCountries: ['US'] }}
        // Access the address like so:
        onChange={(event) => {
          //   setAddressState(event.value);
        }}
      />
    </form>
  );
};
export default AdressForm;

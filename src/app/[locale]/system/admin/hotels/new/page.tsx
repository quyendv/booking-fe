import HotelForm from '~/components/layouts/hotels/HotelForm';

interface NewHotelPageProps {}

const NewHotelPage = ({}: NewHotelPageProps) => {
  return (
    <>
      <HotelForm title="HotelForm.title.create" />
    </>
  );
};

export default NewHotelPage;

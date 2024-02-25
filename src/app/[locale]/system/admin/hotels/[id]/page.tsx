import HotelForm from '~/components/layouts/hotels/HotelForm';

interface PageProps {}

const EditHotelPage = ({}: PageProps) => {
  return (
    <div>
      <HotelForm title="HotelForm.title.edit" />
    </div>
  );
};

export default EditHotelPage;

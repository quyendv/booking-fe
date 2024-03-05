import BookRoom from '~/components/layouts/booking/BookRoom';

interface BookRoomPageProps {}

export default function BookRoomPage({}: BookRoomPageProps) {
  return (
    <div className="p-8">
      <BookRoom />
    </div>
  );
}
